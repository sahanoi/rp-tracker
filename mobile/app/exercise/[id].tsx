import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { getExerciseCopy } from "@/lib/exerciseCopy";

const hero =
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80";

export default function ExercisePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = getExerciseCopy(typeof id === "string" ? id : "default");

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="relative aspect-[4/3] w-full">
        <Image source={hero} className="h-full w-full" contentFit="cover" />
        <View className="absolute inset-0 bg-black/70" />
        <View className="absolute bottom-0 left-0 w-full p-4">
          <Text className="text-2xl font-bold text-white">{c.title}</Text>
        </View>
        <Link href="/" asChild>
          <Pressable className="absolute left-3 top-3 h-9 w-9 items-center justify-center rounded-full bg-black/50">
            <Text className="text-sm text-white">←</Text>
          </Pressable>
        </Link>
      </View>

      <View className="px-4 pb-8 pt-2">
        <Text className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          Movement focus
        </Text>
        <Text className="mb-6 text-sm leading-relaxed text-muted">{c.focus}</Text>

        <Text className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          Cues
        </Text>
        <View className="mb-6 gap-2 pl-4">
          {c.steps.map((s, i) => (
            <Text key={s} className="text-sm text-foreground/90">
              {i + 1}. {s}
            </Text>
          ))}
        </View>

        <View className="mb-6 flex-row gap-3 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
          <View>
            <Text className="text-[10px] uppercase text-muted">Last stress</Text>
            <Text className="font-mono text-foreground">{c.last.stress}</Text>
          </View>
          <View>
            <Text className="text-[10px] uppercase text-muted">Reps</Text>
            <Text className="font-mono text-foreground">{c.last.reps}</Text>
          </View>
        </View>

        <Link href="/session/start" asChild>
          <Pressable className="mb-6 w-full rounded-2xl bg-accent py-3.5 active:opacity-90">
            <Text className="text-center text-sm font-semibold text-black">
              Start exercise
            </Text>
          </Pressable>
        </Link>

        <Text className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
          Equipment
        </Text>
        <View className="gap-2 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          {[
            "Springs: Middle (high)",
            "Straps: Long loops",
            "Headrest: Up / level 1",
          ].map((line) => (
            <Text key={line} className="text-sm text-muted">
              {line}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
