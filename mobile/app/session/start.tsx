import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { formatSessionDateTime } from "@/lib/formatSession";
import {
  loadRoutineTemplates,
  type RoutineTemplate,
} from "@/lib/routineStorage";

export default function SessionStartPage() {
  const { beginSession } = useSessionDraft();
  const [name, setName] = useState("");
  const [nowMs, setNowMs] = useState(Date.now());
  const [routines, setRoutines] = useState<RoutineTemplate[]>([]);
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const list = await loadRoutineTemplates();
      if (!cancelled) setRoutines(list);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedRoutine =
    selectedRoutineId == null
      ? null
      : routines.find((r) => r.id === selectedRoutineId) ?? null;

  function onContinue() {
    const ok = beginSession(name, {
      routineTemplateId: selectedRoutine?.id ?? null,
      routineTemplateName: selectedRoutine?.name ?? null,
      baselineExerciseIds: selectedRoutine?.exerciseIds ?? null,
    });
    if (!ok) return;
    router.push("/session/workout");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        className="w-full flex-1 px-4 pb-8 pt-3"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Geri"
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Text className="text-sm text-muted">← Geri</Text>
          </Pressable>
          <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
            Yeni oturum
          </Text>
          <View className="w-12" />
        </View>

        <Text className="mb-1 text-xl font-semibold text-foreground">
          Oturum adı
        </Text>
        <Text className="mb-4 text-sm text-muted">
          Devam dediğinde antrenman oturumu başlar: üstte süre sayacı çalışır,
          egzersizleri sırayla eklersin. Bu ad kayıtlarında görünür. İstersen rutin
          şablonu seç; kapanışta liste değiştiyse rutini güncellemeyi sorarız.
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Örn. Sabah mat akışı"
          placeholderTextColor="#a3a3a360"
          className="mb-4 rounded-2xl bg-surface px-4 py-3.5 text-base text-foreground ring-1 ring-border-subtle"
          autoCapitalize="sentences"
          returnKeyType="done"
          onSubmitEditing={onContinue}
        />

        <Text className="mb-2 text-sm font-medium text-foreground">
          Rutin (isteğe bağlı)
        </Text>
        <Pressable
          onPress={() => setSelectedRoutineId(null)}
          className={`mb-2 rounded-2xl px-4 py-3 ring-1 ${
            selectedRoutineId == null
              ? "bg-accent/20 ring-accent"
              : "bg-surface ring-border-subtle"
          }`}
        >
          <Text className="text-sm font-medium text-foreground">
            Serbest oturum
          </Text>
          <Text className="text-xs text-muted">
            Şablondan sapma sorusu çıkmaz.
          </Text>
        </Pressable>
        {routines.map((r) => (
          <Pressable
            key={r.id}
            onPress={() => setSelectedRoutineId(r.id)}
            className={`mb-2 rounded-2xl px-4 py-3 ring-1 ${
              selectedRoutineId === r.id
                ? "bg-accent/20 ring-accent"
                : "bg-surface ring-border-subtle"
            }`}
          >
            <Text className="text-sm font-medium text-foreground">{r.name}</Text>
            <Text className="text-xs text-muted">
              {r.exerciseIds.length} egzersiz · şablon
            </Text>
          </Pressable>
        ))}

        <View className="mb-8 mt-4 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted">
            Başlangıç zamanı
          </Text>
          <Text className="text-lg text-foreground">
            {formatSessionDateTime(nowMs)}
          </Text>
        </View>

        <Pressable
          onPress={onContinue}
          disabled={!name.trim()}
          className="w-full rounded-2xl bg-accent py-3.5 active:opacity-90 disabled:opacity-40"
        >
          <Text className="text-center text-sm font-semibold text-black">
            Devam · egzersiz seç
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
