import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ExerciseMedia } from "@/components/ExerciseMedia";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { listWorkoutExercises } from "@/lib/workoutExercises";

export default function SessionWorkoutPickPage() {
  const { draft } = useSessionDraft();
  const exercises = listWorkoutExercises();

  useEffect(() => {
    if (!draft) {
      router.replace("/session/start");
    }
  }, [draft]);

  return (
    <ScrollView
      className="mx-auto min-h-full w-full max-w-md flex-1 bg-background px-4 pb-8 pt-3"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View className="mb-6 flex-row items-center justify-between">
        <LinkBack />
        <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
          Empty workout
        </Text>
        <View className="w-10" />
      </View>

      <Text className="mb-1 text-xl font-semibold text-foreground">
        Choose exercise
      </Text>
      <Text className="mb-6 text-sm text-muted">
        Hareketini seç; mat, ekipman ve Cadillac görselleri senkronize. İleride egzersiz tipine göre (ör. yay gerilimi) ayarlar değişecek.
      </Text>

      <View className="gap-4">
        {exercises.map((ex) => (
          <Pressable
            key={ex.id}
            accessibilityRole="button"
            accessibilityLabel={ex.title}
            className="overflow-hidden rounded-2xl bg-surface ring-1 ring-border-subtle active:opacity-90"
            onPress={() =>
              router.push({
                pathname: "/session/active",
                params: { exerciseId: ex.id },
              })
            }
          >
            <View className="relative aspect-[4/3] w-full overflow-hidden">
              <ExerciseMedia
                source={ex.media}
                className="absolute inset-0 h-full w-full"
              />
            </View>
            <View className="p-4">
              <Text className="text-base font-semibold text-foreground">
                {ex.title}
              </Text>
              {ex.subtitle ? (
                <Text className="mt-1 text-xs text-muted">{ex.subtitle}</Text>
              ) : null}
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function LinkBack() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to home"
      onPress={() => router.back()}
      hitSlop={12}
    >
      <Text className="text-sm text-muted">← Back</Text>
    </Pressable>
  );
}
