import { Pressable, Text, View } from "react-native";

import type { SessionExerciseLine } from "@/contexts/SessionDraftContext";
import {
  buildSetsSummary,
  getExerciseLogDefinition,
} from "@/lib/exerciseDefinitions";

type Props = {
  lines: SessionExerciseLine[];
  title?: string;
  /** Only show last N entries (e.g. on active exercise screen). */
  tailCount?: number;
  /** `lines` içindeki 0 tabanlı satır dizini. `exerciseId` yoksa düğme gösterilmez. */
  onEditLine?: (lineIndex: number) => void;
};

export function SessionLoggedSetsList({
  lines,
  title = "Bu oturumda kayıtlar",
  tailCount,
  onEditLine,
}: Props) {
  const hidden =
    tailCount != null ? Math.max(0, lines.length - tailCount) : 0;
  const visible =
    tailCount != null ? lines.slice(-tailCount) : lines;
  const displayLines = visible;
  const offset = tailCount != null ? lines.length - displayLines.length : 0;

  if (lines.length === 0) {
    return (
      <View className="mb-4 rounded-2xl bg-surface/50 px-4 py-3 ring-1 ring-border-subtle">
        <Text className="text-xs text-muted">
          Henüz set kaydı yok. Aşağıdan hareket seç.
        </Text>
      </View>
    );
  }

  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-medium text-foreground">{title}</Text>
      {hidden > 0 ? (
        <Text className="mb-2 text-xs text-muted">
          ··· önceki {hidden} kayıt (tam listeyi seçim ekranında görebilirsin)
        </Text>
      ) : null}
      <View className="gap-2">
        {displayLines.map((line, i) => {
          const globalIndex = offset + i + 1;
          const key = `${line.exerciseId ?? line.name}-${globalIndex}`;
          const def =
            line.exerciseId != null && line.exerciseId.length > 0
              ? getExerciseLogDefinition(line.exerciseId)
              : null;
          const setRows =
            line.setRows?.filter((r) =>
              def ? buildSetsSummary(def, r) !== "—" : true
            ) ?? [];

          const lineIndex = offset + i;

          return (
            <View
              key={key}
              className="rounded-xl bg-surface px-3 py-2.5 ring-1 ring-border-subtle"
            >
              <View className="flex-row items-start justify-between gap-2">
                <Text className="text-[10px] font-mono text-muted">
                  #{globalIndex}
                </Text>
                {onEditLine != null &&
                line.exerciseId != null &&
                line.exerciseId.length > 0 ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${line.name} kaydını düzenle`}
                    hitSlop={8}
                    onPress={() => onEditLine(lineIndex)}
                    className="shrink-0 rounded-lg px-2 py-1 active:opacity-70"
                  >
                    <Text className="text-[11px] font-semibold text-accent">
                      Düzenle
                    </Text>
                  </Pressable>
                ) : null}
              </View>
              <Text className="text-sm font-medium text-foreground">
                {line.name}
              </Text>
              {setRows.length > 0 && def ? (
                <View className="mt-2 gap-1.5 border-t border-border-subtle/80 pt-2">
                  {setRows.map((row, si) => (
                    <View
                      key={`${key}-set-${si}`}
                      className="flex-row items-start gap-2"
                    >
                      <Text className="w-5 shrink-0 text-xs font-semibold tabular-nums text-muted">
                        {si + 1}
                      </Text>
                      <Text className="min-w-0 flex-1 text-xs text-muted">
                        {buildSetsSummary(def, row)}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : line.sets ? (
                <Text className="mt-0.5 whitespace-pre-line text-xs text-muted">
                  {line.sets}
                </Text>
              ) : null}
              {line.note ? (
                <Text className="mt-1.5 text-xs text-muted/90">{line.note}</Text>
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
}
