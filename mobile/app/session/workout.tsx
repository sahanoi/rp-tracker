import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  View,
} from "react-native";

import { ExerciseImagePreviewModal } from "@/components/ExerciseImagePreviewModal";
import { SessionLoggedSetsList } from "@/components/SessionLoggedSetsList";
import { SessionTimerBar } from "@/components/SessionTimerBar";
import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { DEMO_EXERCISE_IDS } from "@/lib/demoExercises";
import {
  groupedSectionsForPicker,
  type DifficultyLevel,
} from "@/lib/reformerExerciseCatalog";
import {
  getWorkoutExercise,
  listWorkoutExercises,
  type WorkoutExercise,
  type WorkoutExerciseMediaSource,
} from "@/lib/workoutExercises";

const DIFFICULTY_FILTERS: readonly (DifficultyLevel | "all")[] = [
  "all",
  "beginner",
  "intermediate",
  "advanced",
] as const;

const DIFFICULTY_LABEL: Record<DifficultyLevel | "all", string> = {
  all: "Tümü",
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
};

const LEVEL_BADGE: Record<DifficultyLevel, string> = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
};

export default function SessionWorkoutPickPage() {
  const { draft } = useSessionDraft();
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel | "all">("all");
  const [expandedCategoryIds, setExpandedCategoryIds] = useState(
    () => new Set<string>()
  );
  const [demoEnabled, setDemoEnabled] = useState(false);
  const [selectedDemoCategoryIds, setSelectedDemoCategoryIds] = useState(
    () => new Set<string>()
  );
  const [imagePreview, setImagePreview] = useState<{
    title: string;
    source: WorkoutExerciseMediaSource;
  } | null>(null);

  const grouped = useMemo(
    () => groupedSectionsForPicker(search, difficulty),
    [search, difficulty]
  );

  const sections = useMemo(
    () =>
      grouped.map((sec) => {
        const data = sec.exercises
          .map((f) => getWorkoutExercise(f.id))
          .filter((e): e is WorkoutExercise => e != null);
        return {
          categoryId: sec.categoryId,
          categoryTitle: sec.categoryTitle,
          categoryColor: sec.categoryColor,
          exerciseCount: data.length,
          data: expandedCategoryIds.has(sec.categoryId) ? data : [],
        };
      }),
    [grouped, expandedCategoryIds]
  );

  const totals = useMemo(() => {
    const visible = grouped.reduce((s, sec) => s + sec.exercises.length, 0);
    return { categories: grouped.length, visible };
  }, [grouped]);

  const demoGrouped = useMemo(() => {
    const demo = listWorkoutExercises().filter((e) => DEMO_EXERCISE_IDS.has(e.id));
    const byCategory = new Map<
      string,
      { categoryId: string; categoryTitle: string; categoryColor: string; data: WorkoutExercise[] }
    >();
    for (const ex of demo) {
      const current = byCategory.get(ex.categoryId);
      if (current) {
        current.data.push(ex);
      } else {
        byCategory.set(ex.categoryId, {
          categoryId: ex.categoryId,
          categoryTitle: ex.categoryTitle,
          categoryColor: ex.categoryColor,
          data: [ex],
        });
      }
    }
    return [...byCategory.values()].sort((a, b) =>
      a.categoryTitle.localeCompare(b.categoryTitle, "tr")
    );
  }, []);

  const filteredDemoGrouped = useMemo(() => {
    if (!demoEnabled) return [];
    if (selectedDemoCategoryIds.size === 0) return demoGrouped;
    return demoGrouped.filter((g) => selectedDemoCategoryIds.has(g.categoryId));
  }, [demoEnabled, demoGrouped, selectedDemoCategoryIds]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  const toggleDemoCategory = (categoryId: string) => {
    setSelectedDemoCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  };

  useEffect(() => {
    if (!draft) {
      router.replace("/session/start");
    }
  }, [draft]);

  return (
    <View className="min-h-full w-full flex-1 bg-background">
    <SectionList
      className="min-h-full w-full flex-1 bg-background"
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 32,
        paddingTop: 12,
      }}
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
      ListHeaderComponent={
        <>
          {draft ? (
            <SessionTimerBar
              startedAtMs={draft.startedAtMs}
              sessionTitle={draft.name}
            />
          ) : null}

          <View className="mb-4 flex-row items-center justify-between">
            <LinkBack />
            <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
              Egzersiz seç
            </Text>
            <View className="w-10" />
          </View>

          {draft ? (
            <Text className="mb-3 text-xs text-muted">
              {draft.routineTemplateName
                ? `Rutin: ${draft.routineTemplateName}`
                : "Serbest oturum"}
            </Text>
          ) : null}

          <View className="mb-3 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs font-semibold uppercase tracking-wide text-foreground">
                  Demo
                </Text>
                <Text className="text-[11px] text-muted">
                  Uygulama görünümü için seçili demo egzersizler
                </Text>
              </View>
              <Pressable
                onPress={() => setDemoEnabled((v) => !v)}
                className={`rounded-full px-3 py-1.5 ring-1 ${
                  demoEnabled
                    ? "bg-accent ring-accent"
                    : "bg-background ring-border-subtle"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    demoEnabled ? "text-black" : "text-foreground"
                  }`}
                >
                  {demoEnabled ? "Açık" : "Kapalı"}
                </Text>
              </Pressable>
            </View>
          </View>

          {demoEnabled ? (
            <View className="mb-4 gap-3 rounded-2xl bg-surface p-3 ring-1 ring-border-subtle">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ flexDirection: "row", gap: 8 }}
              >
                {demoGrouped.map((g) => {
                  const active =
                    selectedDemoCategoryIds.size === 0 ||
                    selectedDemoCategoryIds.has(g.categoryId);
                  return (
                    <Pressable
                      key={g.categoryId}
                      onPress={() => toggleDemoCategory(g.categoryId)}
                      className={`rounded-full px-3.5 py-1.5 ring-1 ${
                        active
                          ? "bg-foreground ring-foreground"
                          : "bg-background ring-border-subtle"
                      }`}
                    >
                      <Text
                        className={`text-xs font-medium ${
                          active ? "text-background" : "text-foreground"
                        }`}
                      >
                        {g.categoryTitle}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <Text className="text-[11px] text-muted">
                Demo egzersizleri ({filteredDemoGrouped.reduce((s, g) => s + g.data.length, 0)})
              </Text>

              {filteredDemoGrouped.map((group) => (
                <View key={group.categoryId} className="gap-1">
                  <View className="flex-row items-center gap-2 pb-1 pt-1">
                    <View
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: group.categoryColor }}
                    />
                    <Text className="text-xs font-semibold text-foreground">
                      {group.categoryTitle}
                    </Text>
                    <Text className="text-[10px] text-muted">
                      {group.data.length} egzersiz
                    </Text>
                  </View>
                  {group.data.map((ex) => (
                    <ExerciseRowCard
                      key={`demo-${ex.id}`}
                      ex={ex}
                      onOpenExercise={() =>
                        router.push({
                          pathname: "/session/active",
                          params: { exerciseId: ex.id },
                        })
                      }
                      onOpenImage={() =>
                        setImagePreview({
                          title: ex.title,
                          source: ex.media as WorkoutExerciseMediaSource,
                        })
                      }
                    />
                  ))}
                </View>
              ))}
            </View>
          ) : null}

          {draft ? (
            <SessionLoggedSetsList
              lines={draft.exercises}
              onEditLine={(lineIndex) => {
                const line = draft.exercises[lineIndex];
                if (!line?.exerciseId) return;
                router.push({
                  pathname: "/session/active",
                  params: {
                    exerciseId: line.exerciseId,
                    editIndex: String(lineIndex),
                  },
                });
              }}
            />
          ) : null}

          <Text className="mb-1 text-xl font-semibold text-foreground">
            Hareket seç
          </Text>
          <Text className="mb-3 text-sm text-muted">
            Süre üstte akar. Set kaydettikçe listede görünür; istediğin sırayla
            hareket ekleyebilirsin. Fotoğrafı tam çözünürlükte görmek için
            satırdaki Görsel düğmesine dokun.
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Egzersiz ara (TR / EN / kategori)"
            placeholderTextColor="#a3a3a380"
            autoCorrect={false}
            autoCapitalize="none"
            className="mb-3 rounded-2xl bg-surface px-3 py-3 text-sm text-foreground ring-1 ring-border-subtle"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-3"
            contentContainerStyle={{ flexDirection: "row", gap: 8 }}
          >
            {DIFFICULTY_FILTERS.map((key) => (
              <Pressable
                key={key}
                onPress={() => setDifficulty(key)}
                className={`rounded-full px-3.5 py-1.5 ring-1 ${
                  difficulty === key
                    ? "bg-foreground ring-foreground"
                    : "bg-surface ring-border-subtle"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    difficulty === key ? "text-background" : "text-foreground"
                  }`}
                >
                  {DIFFICULTY_LABEL[key]}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View className="mb-3 flex-row gap-3">
            <View className="min-w-0 flex-1 rounded-xl bg-surface py-2 px-3 ring-1 ring-border-subtle">
              <Text className="text-lg font-semibold tabular-nums text-foreground">
                {totals.visible}
              </Text>
              <Text className="text-[10px] text-muted">Görünen</Text>
            </View>
            <View className="min-w-0 flex-1 rounded-xl bg-surface py-2 px-3 ring-1 ring-border-subtle">
              <Text className="text-lg font-semibold tabular-nums text-foreground">
                {totals.categories}
              </Text>
              <Text className="text-[10px] text-muted">Kategori</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/session/summary")}
            className="mb-6 w-full rounded-2xl bg-surface py-3.5 ring-1 ring-border-subtle active:opacity-90"
          >
            <Text className="text-center text-sm font-semibold text-foreground">
              Oturumu bitir · özete git
            </Text>
          </Pressable>
        </>
      }
      ListEmptyComponent={
        <View className="rounded-xl bg-surface px-4 py-6 ring-1 ring-border-subtle">
          <Text className="text-center text-sm text-muted">
            Arama veya filtre kriterlerine uygun egzersiz yok.
          </Text>
        </View>
      }
      renderSectionHeader={({ section }) => {
        const expanded = expandedCategoryIds.has(section.categoryId);
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={section.categoryTitle}
            accessibilityHint={
              expanded
                ? "Kapatmak için iki kez dokunun"
                : "Egzersizleri göstermek için iki kez dokunun"
            }
            accessibilityState={{ expanded }}
            onPress={() => toggleCategory(section.categoryId)}
            className="flex-row items-center gap-2 border-b border-border-subtle bg-background pb-2 pt-4 active:opacity-80"
          >
            <Text
              className="w-4 text-center text-xs text-muted"
              importantForAccessibility="no"
            >
              {expanded ? "▼" : "▸"}
            </Text>
            <View
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: section.categoryColor }}
            />
            <Text className="flex-1 text-sm font-semibold text-foreground">
              {section.categoryTitle}
            </Text>
            <Text className="text-xs text-muted">
              {section.exerciseCount} egzersiz
            </Text>
          </Pressable>
        );
      }}
      renderItem={({ item: ex }) => {
        return (
          <ExerciseRowCard
            ex={ex}
            onOpenExercise={() =>
              router.push({
                pathname: "/session/active",
                params: { exerciseId: ex.id },
              })
            }
            onOpenImage={() =>
              setImagePreview({
                title: ex.title,
                source: ex.media as WorkoutExerciseMediaSource,
              })
            }
          />
        );
      }}
    />
      <ExerciseImagePreviewModal
        visible={imagePreview != null}
        title={imagePreview?.title ?? ""}
        source={imagePreview?.source}
        onClose={() => setImagePreview(null)}
      />
    </View>
  );
}

function exerciseHasPreviewableMedia(media: unknown): boolean {
  if (media == null || media === "") return false;
  if (typeof media === "object" && media && "uri" in media) {
    return Boolean((media as { uri?: string }).uri);
  }
  return true;
}

function ExerciseRowCard({
  ex,
  onOpenExercise,
  onOpenImage,
}: {
  ex: WorkoutExercise;
  onOpenExercise: () => void;
  onOpenImage: () => void;
}) {
  const hasMedia = exerciseHasPreviewableMedia(ex.media);
  const levelText = ex.difficulties.map((l) => LEVEL_BADGE[l]).join(" · ");
  return (
    <View className="mb-2 mt-1 flex-row items-stretch overflow-hidden rounded-xl bg-surface ring-1 ring-border-subtle">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${ex.title} — set kaydına git`}
        className="min-w-0 flex-1 flex-row items-center py-3 pl-3 pr-2 active:opacity-90"
        onPress={onOpenExercise}
      >
        <View className="min-w-0 flex-1">
          <Text className="text-sm font-semibold text-foreground" numberOfLines={2}>
            {ex.title}
          </Text>
          {ex.subtitle ? (
            <Text className="mt-0.5 text-[11px] text-muted" numberOfLines={2}>
              {ex.subtitle}
            </Text>
          ) : null}
          <Text className="mt-1 text-[10px] font-medium text-accent">{levelText}</Text>
        </View>
      </Pressable>
      {hasMedia ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${ex.title} — görseli aç`}
          hitSlop={8}
          className="justify-center border-l border-border-subtle px-3 active:bg-white/5"
          onPress={onOpenImage}
        >
          <Text className="text-center text-[11px] font-medium text-accent">Görsel</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function LinkBack() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Geri"
      onPress={() => router.back()}
      hitSlop={12}
    >
      <Text className="text-sm text-muted">← Geri</Text>
    </Pressable>
  );
}
