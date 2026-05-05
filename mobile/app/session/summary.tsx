import {
  detectRoutineListDrift,
  type SummaryFormState,
} from "@reformer/shared";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { alertCompat } from "@/lib/alertCompat";
import { formatSessionDateTime } from "@/lib/formatSession";
import { updateRoutineExerciseIds } from "@/lib/routineStorage";
import { saveWorkoutSession } from "@/lib/sessions";

const moods = ["Flowing", "Focused", "Challenged"] as const;

export default function SessionSummaryPage() {
  const { user, firebaseEnabled, ready } = useAuth();
  const { draft, clearDraft } = useSessionDraft();
  const [mood, setMood] = useState<string | null>("Focused");
  const [saving, setSaving] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());
  const [routineModalOpen, setRoutineModalOpen] = useState(false);
  const [pendingSummary, setPendingSummary] = useState<SummaryFormState | null>(
    null
  );

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

  function buildSummary(endedAtMs: number): SummaryFormState {
    if (!draft) {
      throw new Error("draft_missing");
    }
    return {
      title: draft.name,
      mood,
      sequences: sequences.map((s) => {
        const base = s.sets ?? "—";
        const withNote =
          s.note && s.note.trim().length > 0
            ? `${base}\nNot: ${s.note.trim()}`
            : base;
        return { name: s.name, sets: withNote };
      }),
      durationMinutes: Math.max(
        1,
        Math.round((endedAtMs - draft.startedAtMs) / 60_000)
      ),
      flowTensionLabel: "—",
      sequenceCount: sequences.length,
      startedAtMs: draft.startedAtMs,
      endedAtMs,
    };
  }

  async function persistSummary(
    summary: SummaryFormState,
    updateRoutineTemplate: boolean
  ): Promise<void> {
    if (!draft || !user) return;
    setSaving(true);
    try {
      if (updateRoutineTemplate && draft.routineTemplateId) {
        const ids = draft.exercises
          .map((e) => e.exerciseId)
          .filter((x): x is string => typeof x === "string" && x.length > 0);
        await updateRoutineExerciseIds(draft.routineTemplateId, ids);
      }
      await saveWorkoutSession(user.uid, summary);
      clearDraft();
      setRoutineModalOpen(false);
      setPendingSummary(null);
      router.replace("/");
    } catch (e) {
      alertCompat("Oturum kaydedilemedi", String(e));
    } finally {
      setSaving(false);
    }
  }

  async function onDone() {
    if (!draft) return;

    const endedAtMs = Date.now();
    const summary = buildSummary(endedAtMs);

    if (!firebaseEnabled || !user) {
      alertCompat(
        "Kaydedilemedi",
        !firebaseEnabled
          ? "Firebase yapılandırması eksik. mobile/.env içinde EXPO_PUBLIC_FIREBASE_* ayarlayıp Expo’yu yeniden başlatın."
          : "Oturum açılıyor — bir dakika sonra Tekrar deneyin."
      );
      return;
    }

    const hasRoutineContext =
      draft.routineTemplateId != null &&
      draft.baselineRoutineExerciseIds != null &&
      draft.baselineRoutineExerciseIds.length > 0;

    if (hasRoutineContext) {
      const sessionOrderedIds = draft.exercises
        .map((e) => e.exerciseId)
        .filter((x): x is string => typeof x === "string" && x.length > 0);
      const { changed } = detectRoutineListDrift({
        baselineOrderedIds: draft.baselineRoutineExerciseIds!,
        sessionOrderedIds,
      });
      if (changed) {
        setPendingSummary(summary);
        setRoutineModalOpen(true);
        return;
      }
    }

    await persistSummary(summary, false);
  }

  function onRoutineModalUpdateTemplate() {
    if (pendingSummary) void persistSummary(pendingSummary, true);
  }

  function onRoutineModalLogOnly() {
    if (pendingSummary) void persistSummary(pendingSummary, false);
  }

  if (!draft) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-sm text-muted">Yükleniyor…</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="min-h-full w-full flex-1 bg-background px-4 pb-8 pt-3">
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
        {draft.routineTemplateName ? (
          <Text className="mb-2 text-center text-xs text-muted">
            Rutin: {draft.routineTemplateName}
          </Text>
        ) : null}
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
                    <Text className="text-xs text-muted whitespace-pre-line">
                      {s.sets}
                    </Text>
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
          onPress={() => void onDone()}
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

      <Modal
        visible={routineModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!saving) setRoutineModalOpen(false);
        }}
      >
        <View className="flex-1 items-center justify-center bg-black/70 px-6">
          <View className="w-full max-w-sm rounded-2xl bg-surface p-5 ring-1 ring-border-subtle">
            <Text className="mb-2 text-lg font-semibold text-foreground">
              Rutin güncellensin mi?
            </Text>
            <Text className="mb-4 text-sm leading-relaxed text-muted">
              Bu oturumda seçilen egzersiz sırası, rutin şablonundan farklı.
              Rutini güncellersen yalnızca bu rutin ve sonraki oturumlar etkilenir;
              geçmiş kayıtlar değişmez.
            </Text>
            <Pressable
              onPress={onRoutineModalUpdateTemplate}
              disabled={saving}
              className="mb-2 rounded-xl bg-accent py-3 disabled:opacity-50"
            >
              <Text className="text-center text-sm font-semibold text-black">
                Rutini güncelle
              </Text>
            </Pressable>
            <Pressable
              onPress={onRoutineModalLogOnly}
              disabled={saving}
              className="rounded-xl bg-surface py-3 ring-1 ring-border-subtle disabled:opacity-50"
            >
              <Text className="text-center text-sm font-semibold text-foreground">
                Sadece bu oturumu kaydet
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!saving) {
                  setRoutineModalOpen(false);
                  setPendingSummary(null);
                }
              }}
              className="mt-3 py-2"
            >
              <Text className="text-center text-sm text-muted">İptal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
