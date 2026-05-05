import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { ExerciseMedia } from "@/components/ExerciseMedia";
import { SessionLoggedSetsList } from "@/components/SessionLoggedSetsList";
import { SessionTimerBar } from "@/components/SessionTimerBar";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import {
  buildPersistedSetsFromRows,
  emptyLogRow,
  getExerciseLogDefinition,
  normalizeLogRows,
  rowHasLogContent,
  type ExerciseLogDefinition,
  type LogFieldKey,
  type LogFieldValues,
} from "@/lib/exerciseDefinitions";
import { alertCompat } from "@/lib/alertCompat";
import { getWorkoutExercise } from "@/lib/workoutExercises";

const springs = [
  { key: "r", color: "bg-red-500" },
  { key: "b", color: "bg-blue-500" },
  { key: "y", color: "bg-amber-400" },
  { key: "g", color: "bg-emerald-500" },
];

/** Boşken soluk görünür tipik örnekler (tam değil, rehber). */
function fieldReferencePlaceholder(key: LogFieldKey): string {
  switch (key) {
    case "reps":
      return "10";
    case "rpe":
      return "6";
    case "durationSec":
      return "30";
    case "weight":
      return "5";
    default:
      return "";
  }
}

function fieldLabel(def: ExerciseLogDefinition, key: LogFieldKey): string {
  const custom = def.fieldLabels?.[key];
  if (custom) return custom;
  switch (key) {
    case "reps":
      return "Tekrar";
    case "rpe":
      return "RPE (1–10)";
    case "durationSec":
      return "Süre (sn)";
    case "weight":
      return "Ağırlık (kg)";
    default:
      return key;
  }
}

const SET_FIELD_PLACEHOLDER_COLOR = "#a3a3a360";

export default function ActiveSessionPage() {
  const { draft, pushExercise, replaceExerciseAt } = useSessionDraft();
  const params = useLocalSearchParams<{
    exerciseId?: string;
    editIndex?: string;
  }>();
  const exerciseId =
    typeof params.exerciseId === "string" ? params.exerciseId : undefined;
  const editIndexParam =
    typeof params.editIndex === "string" ? params.editIndex : undefined;
  const editLineIndex = useMemo(() => {
    if (editIndexParam === undefined) return null;
    const n = Number.parseInt(editIndexParam, 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }, [editIndexParam]);
  const exercise = getWorkoutExercise(exerciseId);
  const def = useMemo(
    () => (exercise ? getExerciseLogDefinition(exercise.id) : null),
    [exercise]
  );

  useEffect(() => {
    if (!draft) {
      router.replace("/session/start");
    }
  }, [draft]);

  useEffect(() => {
    if (!exercise) {
      router.replace("/session/workout");
    }
  }, [exercise]);

  const [rows, setRows] = useState<LogFieldValues[]>([emptyLogRow()]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!draft || !exercise || !def) return;

    if (editLineIndex != null) {
      const line = draft.exercises[editLineIndex];
      if (line?.exerciseId === exercise.id) {
        setNote(line.note ?? "");
        if (line.setRows?.length) {
          setRows(normalizeLogRows(line.setRows));
        } else {
          setRows([emptyLogRow()]);
        }
        return;
      }
    }
    setRows([emptyLogRow()]);
    setNote("");
  }, [draft, exercise, exerciseId, editLineIndex, def]);

  if (!draft) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-sm text-muted">Yükleniyor…</Text>
      </View>
    );
  }

  if (!exercise || !def) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-sm text-muted">Yükleniyor…</Text>
      </View>
    );
  }

  const showSpring =
    def.showSpringTension || exercise.requiresSpringTension;

  function setRowField(
    rowIndex: number,
    key: keyof LogFieldValues,
    text: string
  ): void {
    setRows((prev) =>
      prev.map((r, i) => (i === rowIndex ? { ...r, [key]: text } : r))
    );
  }

  function addRow(): void {
    setRows((prev) => [...prev, emptyLogRow()]);
  }

  function removeRow(index: number): void {
    setRows((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index)
    );
  }

  function onSave(): void {
    if (!draft || !exercise || !def) return;
    const kept = rows.filter((r) => rowHasLogContent(def, r));
    if (kept.length === 0) {
      alertCompat(
        "Set yok",
        "En az bir set satırında değer gir veya satır ekle."
      );
      return;
    }
    const sets = buildPersistedSetsFromRows(def, rows);
    const linePayload = {
      name: exercise.title,
      exerciseId: exercise.id,
      sets,
      setRows: kept,
      note: note.trim() || undefined,
    };
    const replacing =
      editLineIndex != null &&
      draft.exercises[editLineIndex]?.exerciseId === exercise.id;

    if (replacing) {
      replaceExerciseAt(editLineIndex, linePayload);
    } else {
      pushExercise(linePayload);
    }
    router.replace("/session/workout");
  }

  return (
    <ScrollView
      className="min-h-full w-full flex-1 bg-background px-4 pb-8 pt-3"
      keyboardShouldPersistTaps="handled"
    >
      <SessionTimerBar
        variant="compact"
        startedAtMs={draft.startedAtMs}
        sessionTitle={draft.name}
      />

      <View className="mb-2 flex-row items-center justify-between">
        <Link href="/session/workout" asChild>
          <Pressable>
            <Text className="text-sm text-muted">Geri</Text>
          </Pressable>
        </Link>
        <View className="flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
            {editLineIndex != null ? "Kayıt düzenle" : "Egzersiz kaydı"}
          </Text>
        </View>
        <View className="w-8" />
      </View>

      <SessionLoggedSetsList
        title="Şu ana kadarki setler"
        lines={draft.exercises}
        tailCount={6}
        onEditLine={(lineIndex) => {
          const line = draft.exercises[lineIndex];
          if (!line?.exerciseId) return;
          router.replace({
            pathname: "/session/active",
            params: {
              exerciseId: line.exerciseId,
              editIndex: String(lineIndex),
            },
          });
        }}
      />

      <View className="mb-4 overflow-hidden rounded-2xl ring-1 ring-border-subtle">
        <View className="relative aspect-[16/9] w-full overflow-hidden">
          <ExerciseMedia
            source={exercise.media}
            className="absolute inset-0 h-full w-full"
            contentFit="contain"
          />
        </View>
      </View>

      <View className="mb-6 items-center gap-1">
        <Text className="text-center font-mono text-2xl font-semibold tabular-nums tracking-tight text-foreground">
          {exercise.title}
        </Text>
        {exercise.subtitle ? (
          <Text className="text-center text-sm text-muted">
            {exercise.subtitle}
          </Text>
        ) : null}
      </View>

      {showSpring ? (
        <>
          <Text className="mb-2 text-xs font-medium text-muted">
            Yay gerilimi (dokun)
          </Text>
          <View className="mb-4 flex-row gap-3">
            {springs.map((s) => (
              <Pressable
                key={s.key}
                accessibilityLabel={`Yay ${s.key}`}
                className={`h-10 w-10 rounded-full ${s.color} ring-2 ring-white/20`}
              />
            ))}
          </View>

          <View className="mb-4 flex-row flex-wrap gap-2">
            {["Yüksek", "Orta", "Alçak", "Yukarı"].map((l) => (
              <Pressable
                key={l}
                className="min-w-[22%] flex-1 rounded-xl bg-surface py-2.5 ring-1 ring-border-subtle"
              >
                <Text className="text-center text-xs font-medium text-foreground">
                  {l}
                </Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      <Text className="mb-2 text-xs font-medium text-muted">Setler</Text>
      <View className="mb-3 gap-3">
        {rows.map((row, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            className="flex-row items-start gap-2 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle"
          >
            <View className="w-9 shrink-0 pt-2">
              <Text className="text-center text-sm font-semibold tabular-nums text-foreground">
                {rowIndex + 1}
              </Text>
            </View>
            <View className="min-w-0 flex-1 flex-row flex-wrap gap-2">
              {def.fields.map((fieldKey) => (
                <View
                  key={fieldKey}
                  className={`min-w-0 ${
                    def.fields.length <= 2 ? "flex-1" : "basis-[47%] grow"
                  } flex-col gap-1`}
                >
                  <Text className="text-xs font-semibold text-foreground">
                    {fieldLabel(def, fieldKey)}
                  </Text>
                  <TextInput
                    keyboardType={
                      fieldKey === "weight"
                        ? "decimal-pad"
                        : "number-pad"
                    }
                    placeholder={fieldReferencePlaceholder(fieldKey)}
                    placeholderTextColor={SET_FIELD_PLACEHOLDER_COLOR}
                    textAlignVertical="center"
                    className="min-h-[42px] rounded-xl border border-border-subtle bg-background px-3 py-2 font-mono text-base tabular-nums text-foreground"
                    value={row[fieldKey]}
                    onChangeText={(t) => setRowField(rowIndex, fieldKey, t)}
                  />
                </View>
              ))}
            </View>
            {rows.length > 1 ? (
              <Pressable
                accessibilityLabel="Satırı sil"
                onPress={() => removeRow(rowIndex)}
                className="shrink-0 self-center rounded-lg px-2 py-1 active:opacity-70"
              >
                <Text className="text-xs text-muted">Sil</Text>
              </Pressable>
            ) : (
              <View className="w-8 shrink-0" />
            )}
          </View>
        ))}
      </View>

      <Pressable
        onPress={addRow}
        className="mb-4 self-start rounded-xl bg-surface px-4 py-2.5 ring-1 ring-border-subtle active:opacity-90"
      >
        <Text className="text-xs font-medium text-foreground">
          + Satır / set ekle
        </Text>
      </Pressable>

      <Text className="mb-1 text-xs text-muted">Not</Text>
      <TextInput
        className="mb-4 min-h-[72px] rounded-2xl bg-surface p-3 text-sm text-foreground ring-1 ring-border-subtle"
        placeholder="Omurga, nefes, yük…"
        placeholderTextColor="#a3a3a360"
        multiline
        value={note}
        onChangeText={setNote}
      />

      <Pressable
        className="mb-4 w-full rounded-2xl border border-border-subtle py-3.5 active:opacity-90"
        onPress={onSave}
      >
        <Text className="text-center text-sm font-semibold text-foreground">
          {editLineIndex != null
            ? "Güncelle · egzersiz seçimine dön"
            : "Kaydet · egzersiz seçimine dön"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
