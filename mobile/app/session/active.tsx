import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { ExerciseMedia } from "@/components/ExerciseMedia";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { getWorkoutExercise } from "@/lib/workoutExercises";

const springs = [
  { key: "r", color: "bg-red-500" },
  { key: "b", color: "bg-blue-500" },
  { key: "y", color: "bg-amber-400" },
  { key: "g", color: "bg-emerald-500" },
];

export default function ActiveSessionPage() {
  const { draft, pushExercise } = useSessionDraft();
  const params = useLocalSearchParams<{ exerciseId?: string }>();
  const exerciseId =
    typeof params.exerciseId === "string" ? params.exerciseId : undefined;
  const exercise = getWorkoutExercise(exerciseId);

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

  const [reps, setReps] = useState("12");
  const [rpe, setRpe] = useState("7");

  if (!exercise) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-sm text-muted">Loading…</Text>
      </View>
    );
  }

  const showSpringTension = exercise.requiresSpringTension;

  return (
    <ScrollView
      className="mx-auto min-h-full w-full max-w-md flex-1 bg-background px-4 pb-8 pt-3"
      keyboardShouldPersistTaps="handled"
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Link href="/" asChild>
          <Pressable>
            <Text className="text-sm text-muted">End</Text>
          </Pressable>
        </Link>
        <View className="flex-row items-center gap-1.5">
          <View className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
            Recording
          </Text>
        </View>
        <View className="w-8" />
      </View>

      <View className="mb-4 overflow-hidden rounded-2xl ring-1 ring-border-subtle">
        <View className="relative aspect-[16/9] w-full overflow-hidden">
          <ExerciseMedia
            source={exercise.media}
            className="absolute inset-0 h-full w-full"
          />
        </View>
      </View>

      <View className="mb-6 items-center">
        <Text className="font-mono text-5xl font-semibold tabular-nums tracking-tight text-foreground">
          34:12
        </Text>
        <Text className="mt-2 text-sm text-muted">{exercise.title}</Text>
      </View>

      {showSpringTension ? (
        <>
          <Text className="mb-2 text-xs font-medium text-muted">
            Spring tension (tap)
          </Text>
          <View className="mb-4 flex-row gap-3">
            {springs.map((s) => (
              <Pressable
                key={s.key}
                accessibilityLabel={`Spring ${s.key}`}
                className={`h-10 w-10 rounded-full ${s.color} ring-2 ring-white/20`}
              />
            ))}
          </View>

          <View className="mb-4 flex-row flex-wrap gap-2">
            {["High", "Med", "Low", "Up"].map((l) => (
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

      <View className="mb-4 flex-row gap-3">
        <View className="min-w-0 flex-1 flex-col gap-1 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
          <Text className="text-xs text-muted">Reps</Text>
          <TextInput
            keyboardType="number-pad"
            className="bg-transparent font-mono text-lg text-foreground"
            value={reps}
            onChangeText={setReps}
          />
        </View>
        <View className="min-w-0 flex-1 flex-col gap-1 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
          <Text className="text-xs text-muted">RPE (1–10)</Text>
          <TextInput
            keyboardType="number-pad"
            className="bg-transparent font-mono text-lg text-foreground"
            value={rpe}
            onChangeText={setRpe}
          />
        </View>
      </View>

      <Text className="mb-1 text-xs text-muted">Form (1–5)</Text>
      <View className="mb-4 flex-row gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable
            key={n}
            className="h-9 w-9 items-center justify-center rounded-lg bg-surface ring-1 ring-border-subtle"
          >
            <Text className="text-sm text-foreground">{n}</Text>
          </Pressable>
        ))}
      </View>

      <Text className="mb-1 text-xs text-muted">Notes</Text>
      <TextInput
        className="mb-4 min-h-[72px] rounded-2xl bg-surface p-3 text-sm text-foreground ring-1 ring-border-subtle"
        placeholder="Spine, breath, or load…"
        placeholderTextColor="#a3a3a360"
        multiline
      />

      <Pressable
        className="mb-4 w-full rounded-2xl border border-border-subtle py-3.5 active:opacity-90"
        onPress={() => {
          pushExercise({
            name: exercise.title,
            sets: `${reps} tekrar · RPE ${rpe}`,
          });
          router.push("/session/summary");
        }}
      >
        <Text className="text-center text-sm font-semibold text-foreground">
          Seti kaydet ve özete git
        </Text>
      </Pressable>

      <Text className="mb-2 text-xs font-medium text-muted">Up next</Text>
      <View className="gap-2">
        {["The Hundred", "Stomach massage"].map((name) => (
          <View
            key={name}
            className="rounded-xl bg-surface px-3 py-2 ring-1 ring-border-subtle"
          >
            <Text className="text-sm text-muted">{name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
