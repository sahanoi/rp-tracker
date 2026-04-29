import { Link, Stack } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const week = [
  { d: "M", on: true },
  { d: "T", on: true },
  { d: "W", on: false },
  { d: "T", on: true },
  { d: "F", on: true },
  { d: "S", on: false },
  { d: "S", on: true },
];

export default function ProgressPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "Analytics" }} />
      <ScrollView className="flex-1 bg-background px-4 pt-3 pb-8">
        <View className="mb-6 flex-row items-end justify-between gap-4">
          <Text className="text-3xl font-semibold text-foreground">Analytics</Text>
          <View className="flex-row gap-1 rounded-lg bg-surface p-0.5 ring-1 ring-border-subtle">
            <Text className="rounded-md bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground">
              Month
            </Text>
            <Text className="px-3 py-1.5 text-xs text-muted">Year</Text>
          </View>
        </View>

        <View className="mb-4 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="text-xs font-medium text-muted">Current streak</Text>
          <Text className="text-2xl font-bold text-foreground">14 days</Text>
          <Text className="text-xs text-accent">+2 vs last week</Text>
          <View className="mt-2 h-8 overflow-hidden rounded-md bg-surface-elevated">
            <View className="h-full w-[60%] bg-accent/80" />
          </View>
        </View>

        <View className="mb-4">
          <View className="mb-2 flex-row items-baseline justify-between">
            <Text className="text-sm font-semibold text-foreground">
              Time under tension
            </Text>
            <Text className="text-[11px] text-accent">+12% vs last month</Text>
          </View>
          <View className="h-36 flex-row items-end justify-between gap-1 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
            {[40, 65, 30, 80, 55, 20, 70].map((h, i) => (
              <View key={i} className="flex-1 rounded-t bg-surface-elevated" style={{ height: `${h}%` }} />
            ))}
          </View>
        </View>

        <Text className="mb-2 text-sm font-semibold text-foreground">Weekly consistency</Text>
        <View className="mb-6 flex-row justify-between gap-1 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
          {week.map((c, i) => (
            <View key={i} className="flex-1 items-center gap-1.5">
              <Text className="text-[10px] text-muted">{c.d}</Text>
              <View
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: c.on ? "#ff4d2e" : "#2e2e2e" }}
              />
            </View>
          ))}
        </View>

        <Text className="mb-2 text-sm font-semibold text-foreground">Milestones</Text>
        <ScrollView horizontal className="mb-4 pb-1" showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2">
            {["Centurion club", "Tempo master", "Breath focus"].map((m) => (
              <View
                key={m}
                className="shrink-0 rounded-xl border border-border-subtle bg-surface-elevated px-3 py-2"
              >
                <Text className="text-xs text-foreground">{m}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="text-sm font-medium text-foreground">Private form audit</Text>
          <Text className="mb-3 text-xs text-muted">
            Book a 1:1 to refine your lines and load management.
          </Text>
          <Link href="/profile" asChild>
            <Pressable className="w-full rounded-xl bg-accent py-2.5 active:opacity-90">
              <Text className="text-center text-sm font-semibold text-black">Book session</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </>
  );
}
