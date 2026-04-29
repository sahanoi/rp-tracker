import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useWorkoutSessions } from "@/hooks/useWorkoutSessions";
import { formatSessionDateTime } from "@/lib/formatSession";

export default function ActivityPage() {
  const { sessions, loading, hasFirebase } = useWorkoutSessions();

  return (
    <ScrollView
      className="flex-1 bg-background px-4 pt-3"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text className="mb-1 text-2xl font-semibold text-foreground">Activity</Text>
      <Text className="mb-6 text-sm text-muted">Son oturumların özeti.</Text>

      {loading ? (
        <Text className="text-sm text-muted">Yükleniyor…</Text>
      ) : !hasFirebase ? (
        <Text className="text-sm text-muted">
          Firebase yapılandırılmadı — kayıtlar burada görünmez.
        </Text>
      ) : sessions.length === 0 ? (
        <Text className="text-sm text-muted">Henüz kayıtlı oturum yok.</Text>
      ) : (
        <View className="gap-3">
          {sessions.map((s) => (
            <View
              key={s.id}
              className="rounded-2xl bg-surface p-4 ring-1 ring-border-subtle"
            >
              <Text className="font-medium text-foreground">{s.title}</Text>
              <Text className="mt-1 text-xs text-muted">
                {formatSessionDateTime(s.startedAt)} → {formatSessionDateTime(s.endedAt)}
              </Text>
              <Text className="mt-1 text-xs text-muted">
                {s.metrics?.durationMinutes != null
                  ? `${s.metrics.durationMinutes} dk`
                  : "—"}
                {" · "}
                {s.metrics?.sequenceCount ?? 0} hareket
              </Text>
            </View>
          ))}
        </View>
      )}

      <Link href="/progress" asChild>
        <Pressable className="mt-6 w-full rounded-2xl border border-border-subtle py-3 active:opacity-90">
          <Text className="text-center text-sm font-medium text-foreground/90">
            Analytics
          </Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}
