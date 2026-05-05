import type { ImageContentFit } from "expo-image";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import type { WorkoutExerciseMediaSource } from "@/lib/workoutExercises";

type Props = {
  source?: WorkoutExerciseMediaSource | null;
  className?: string;
  placeholderLabel?: string;
  contentFit?: ImageContentFit;
};

export function ExerciseMedia({
  source,
  className = "",
  placeholderLabel = "Add image or GIF in workout catalog",
  contentFit = "cover",
}: Props) {
  const empty =
    source == null ||
    source === "" ||
    (typeof source === "object" && "uri" in source && !source.uri);

  if (empty) {
    return (
      <View
        className={`items-center justify-center bg-surface ring-1 ring-border-subtle ${className}`}
      >
        <Text className="max-w-[220px] px-4 text-center text-xs text-muted">
          {placeholderLabel}
        </Text>
      </View>
    );
  }

  const imageSource =
    typeof source === "string" ? { uri: source } : source;

  return (
    <Image
      source={imageSource}
      className={className}
      contentFit={contentFit}
    />
  );
}
