import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useWorkoutSessions } from "@/hooks/useWorkoutSessions";
import { formatSessionDateTime } from "@/lib/formatSession";

export default function HomePage() {
  const { sessions, loading, hasFirebase } = useWorkoutSessions();

  return (
    <ScrollView
      className="flex-1 bg-background px-4 pt-3"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="text-lg font-bold tracking-[0.25em] text-white">
          PILATES
        </Text>
        <View
          className="h-9 w-9 rounded-full bg-surface-elevated ring-1 ring-border-subtle"
          accessibilityElementsHidden
        />
      </View>

      <Text className="mb-1 text-2xl font-semibold text-foreground">
        Hello, Julian
      </Text>
      <Text className="mb-6 text-sm text-muted">
        Let&apos;s keep your flow sharp.
      </Text>

      <Link href="/session/start" asChild>
        <Pressable className="mb-8 flex w-full flex-row items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 active:opacity-90">
          <Text className="text-lg leading-none text-black">+</Text>
          <Text className="text-center text-sm font-semibold text-black">
            Start empty workout
          </Text>
        </Pressable>
      </Link>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-semibold tracking-wide text-foreground">
          Today&apos;s plan
        </Text>
        <Link href="/library" asChild>
          <Pressable>
            <Text className="text-[11px] font-medium uppercase tracking-wider text-accent">
              View all plans
            </Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/exercise/leg-circles" asChild>
        <Pressable className="mb-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-border-subtle">
          <View className="relative aspect-[16/9] w-full">
            <Image
              source="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
              className="h-full w-full"
              contentFit="cover"
            />
            <View className="absolute inset-0 bg-black/80" style={{ opacity: 0.85 }} />
            <View className="absolute bottom-0 left-0 p-4">
              <Text className="text-lg font-semibold text-white">Full Body Flow</Text>
              <Text className="text-xs text-muted">22m · Intermediate</Text>
            </View>
          </View>
        </Pressable>
      </Link>

      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-semibold tracking-wide text-foreground">
          Momentum
        </Text>
        <Link href="/progress" asChild>
          <Pressable>
            <Text className="text-[11px] font-medium text-muted">Open analytics</Text>
          </Pressable>
        </Link>
      </View>
      <View className="mb-8 flex-row items-center gap-4 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
        <View className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-black">
          <View
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "#2e2e2e",
            }}
          />
          <View
            className="absolute inset-0 rounded-full"
            style={{
              borderWidth: 4,
              borderColor: "#ff4d2e",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
              transform: [{ rotate: "-45deg" }],
            }}
          />
          <View className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-black">
            <Text className="text-xl font-bold text-white">12</Text>
          </View>
        </View>
        <View>
          <Text className="text-sm font-medium text-foreground">Day streak</Text>
          <Text className="text-xs text-muted">
            You&apos;re building real consistency.
          </Text>
        </View>
      </View>

      <Text className="mb-3 text-sm font-semibold tracking-wide text-foreground">
        Oturum kayıtları
      </Text>
      {loading ? (
        <Text className="mb-4 text-sm text-muted">Yükleniyor…</Text>
      ) : !hasFirebase ? (
        <View className="mb-4 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="text-sm text-muted">
            Oturumları bulutta saklamak için Firebase ortam değişkenlerini ayarlayın (mobile/.env).
          </Text>
        </View>
      ) : sessions.length === 0 ? (
        <View className="mb-4 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="text-sm text-muted">
            Henüz kayıt yok. Boş antrenmanla başlayıp oturum adı vererek kaydedebilirsiniz.
          </Text>
        </View>
      ) : (
        <View className="mb-4 gap-2">
          {sessions.map((s) => (
            <View
              key={s.id}
              className="rounded-2xl bg-surface p-4 ring-1 ring-border-subtle"
            >
              <Text className="font-medium text-foreground">{s.title}</Text>
              <Text className="mt-1 text-xs text-muted">
                Başlangıç: {formatSessionDateTime(s.startedAt)}
              </Text>
              <Text className="text-xs text-muted">
                Bitiş: {formatSessionDateTime(s.endedAt)}
              </Text>
              {s.metrics?.durationMinutes != null ? (
                <Text className="mt-2 text-xs font-mono text-foreground/90">
                  Süre: {s.metrics.durationMinutes} dk · Hareket:{" "}
                  {s.metrics.sequenceCount ?? 0}
                </Text>
              ) : null}
              {s.exercises?.length ? (
                <View className="mt-2 border-t border-border-subtle pt-2">
                  <Text className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted">
                    Hareketler
                  </Text>
                  {s.exercises.slice(0, 8).map((ex, i) => (
                    <Text
                      key={`${s.id}-${i}-${ex.name}`}
                      className="text-xs text-muted"
                    >
                      · {ex.name}
                      {ex.sets ? ` (${ex.sets})` : ""}
                    </Text>
                  ))}
                </View>
              ) : null}
              {s.notes ? (
                <Text className="mt-2 text-xs text-muted">{s.notes}</Text>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
