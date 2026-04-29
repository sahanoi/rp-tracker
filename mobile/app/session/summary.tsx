import type { SummaryFormState } from "@reformer/shared";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { alertCompat } from "@/lib/alertCompat";
import { formatSessionDateTime } from "@/lib/formatSession";
import { saveWorkoutSession } from "@/lib/sessions";

const moods = ["Flowing", "Focused", "Challenged"] as const;

export default function SessionSummaryPage() {
  const { user, firebaseEnabled, ready } = useAuth();
  const { draft, clearDraft } = useSessionDraft();
  const [mood, setMood] = useState<string | null>("Focused");
  const [saving, setSaving] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!draft) {
      router.replace("/");
    }
  }, [draft]);

  const durationMinutes = draft
    ? Math.max(1, Math.round((nowMs - draft.startedAtMs) / 60_000))
    : 0;

  const sequences = draft?.exercises ?? [];

  async function onDone() {
    if (!draft) return;

    const endedAtMs = Date.now();
    const summary: SummaryFormState = {
      title: draft.name,
      mood,
      sequences: sequences.map((s) => ({
        name: s.name,
        sets: s.sets ?? "—",
      })),
      durationMinutes: Math.max(
        1,
        Math.round((endedAtMs - draft.startedAtMs) / 60_000)
      ),
      flowTensionLabel: "—",
      sequenceCount: sequences.length,
      startedAtMs: draft.startedAtMs,
      endedAtMs,
    };

    if (!firebaseEnabled || !user) {
      alertCompat(
        "Kaydedilemedi",
        !firebaseEnabled
          ? "Firebase yapılandırması eksik. mobile/.env içinde EXPO_PUBLIC_FIREBASE_* ayarlayıp Expo’yu yeniden başlatın."
          : "Oturum açılıyor — bir dakika sonra Tekrar deneyin."
      );
      return;
    }
    setSaving(true);
    try {
      await saveWorkoutSession(user.uid, summary);
      clearDraft();
      router.replace("/");
    } catch (e) {
      alertCompat("Oturum kaydedilemedi", String(e));
    } finally {
      setSaving(false);
    }
  }

  if (!draft) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-sm text-muted">Yükleniyor…</Text>
      </View>
    );
  }

  return (
    <ScrollView className="mx-auto min-h-full w-full max-w-md flex-1 bg-background px-4 pb-8 pt-3">
      <View className="mb-4 flex-row">
        <Link href="/" asChild>
          <Pressable accessibilityLabel="Kapat">
            <Text className="text-sm text-muted">✕</Text>
          </Pressable>
        </Link>
      </View>
      <Text className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
        Özet
      </Text>
      <Text className="mb-1 text-center text-2xl font-bold text-foreground">
        Antrenman tamamlandı
      </Text>
      <Text className="mb-2 text-center text-base font-medium text-foreground">
        {draft.name}
      </Text>
      <Text className="mb-6 text-center text-xs text-muted">
        Başlangıç: {formatSessionDateTime(draft.startedAtMs)}
      </Text>

      <View className="mb-6 gap-3">
        <View className="rounded-2xl bg-surface px-4 py-3 ring-1 ring-border-subtle">
          <Text className="text-center text-[10px] font-medium uppercase tracking-wider text-muted">
            Süre (yaklaşık)
          </Text>
          <Text className="text-center font-mono text-lg font-semibold text-foreground">
            {durationMinutes} dk
          </Text>
        </View>
        <View className="rounded-2xl bg-surface px-4 py-3 ring-1 ring-border-subtle">
          <Text className="text-center text-[10px] font-medium uppercase tracking-wider text-muted">
            Kayıtlı hareket
          </Text>
          <Text className="text-center font-mono text-lg font-semibold text-foreground">
            {sequences.length}
          </Text>
        </View>
      </View>

      <Text className="mb-2 text-sm font-medium text-foreground">
        Akış ve nefes nasıldı?
      </Text>
      <View className="mb-6 flex-row flex-wrap gap-2">
        {moods.map((m) => (
          <Pressable
            key={m}
            onPress={() => setMood(m)}
            className={
              mood === m
                ? "rounded-full bg-accent px-4 py-1.5"
                : "rounded-full border border-border-subtle bg-surface px-4 py-1.5"
            }
          >
            <Text
              className={
                mood === m
                  ? "text-sm font-medium text-black"
                  : "text-sm text-foreground/90"
              }
            >
              {m}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text className="mb-2 text-sm font-medium text-foreground">
        Kaydedilen setler
      </Text>
      {sequences.length === 0 ? (
        <Text className="mb-6 text-sm text-muted">
          Bu oturumda henüz set kaydı yok.
        </Text>
      ) : (
        <View className="mb-6 gap-2">
          {sequences.map((s, i) => (
            <View
              key={`${s.name}-${i}`}
              className="flex-row items-center justify-between rounded-2xl bg-surface px-4 py-3 ring-1 ring-border-subtle"
            >
              <View className="min-w-0 flex-1 pr-2">
                <Text className="text-sm font-medium text-foreground">
                  {s.name}
                </Text>
                {s.sets ? (
                  <Text className="text-xs text-muted">{s.sets}</Text>
                ) : null}
              </View>
              <Text className="text-accent" accessibilityLabel="Tamam">
                ✓
              </Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        onPress={onDone}
        disabled={saving}
        className="mb-2 w-full rounded-2xl bg-accent py-3.5 active:opacity-90 disabled:opacity-50"
      >
        {saving ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text className="text-center text-sm font-semibold text-black">
            {!ready ? "Kaydet (giriş yapılıyor…)" : "Kaydet"}
          </Text>
        )}
      </Pressable>
    </ScrollView>
  );
}
