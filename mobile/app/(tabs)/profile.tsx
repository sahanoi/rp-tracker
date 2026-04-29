import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function ProfilePage() {
  return (
    <ScrollView
      className="flex-1 bg-background px-4 pt-3"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="mb-6 flex-row items-center gap-4">
        <View className="h-16 w-16 rounded-full bg-surface-elevated ring-1 ring-border-subtle" />
        <View>
          <Text className="text-lg font-semibold text-foreground">Julian</Text>
          <Text className="text-sm text-muted">Reformer member</Text>
        </View>
      </View>
      <Link href="/progress" asChild>
        <Pressable className="mb-3 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle active:opacity-90">
          <Text className="text-sm font-medium text-foreground">Analytics &amp; streaks</Text>
          <Text className="text-xs text-muted">Momentum, volume, consistency</Text>
        </Pressable>
      </Link>
      <View className="rounded-2xl border border-dashed border-border-subtle p-4">
        <Text className="text-sm text-muted">
          Settings and account actions can be wired here in a next step.
        </Text>
      </View>
    </ScrollView>
  );
}
