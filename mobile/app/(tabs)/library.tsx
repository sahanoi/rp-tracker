import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const plans = [
  { title: "Full Body Flow", time: "22m", level: "Intermediate" },
  { title: "Core & control", time: "18m", level: "Beginner" },
  { title: "Athletic power", time: "35m", level: "Advanced" },
];

export default function LibraryPage() {
  return (
    <ScrollView
      className="flex-1 bg-background px-4 pt-3"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text className="mb-1 text-2xl font-semibold text-foreground">Library</Text>
      <Text className="mb-6 text-sm text-muted">Plans, sequences, and progressions.</Text>
      <View className="gap-3">
        {plans.map((p) => (
          <Link key={p.title} href="/exercise/leg-circles" asChild>
            <Pressable className="flex-row items-center justify-between rounded-2xl bg-surface px-4 py-3 ring-1 ring-border-subtle active:opacity-90">
              <View>
                <Text className="font-medium text-foreground">{p.title}</Text>
                <Text className="text-xs text-muted">
                  {p.time} · {p.level}
                </Text>
              </View>
              <Text className="text-muted">→</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
