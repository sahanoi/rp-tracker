import { Image, type ImageProps } from "expo-image";
import { useMemo } from "react";
import {
  Dimensions,
  Image as RNImage,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import type { WorkoutExerciseMediaSource } from "@/lib/workoutExercises";

type Props = {
  visible: boolean;
  title: string;
  source?: WorkoutExerciseMediaSource | null;
  onClose: () => void;
};

function resolveIntrinsicSize(
  source: WorkoutExerciseMediaSource
): { width: number; height: number } | null {
  try {
    const resolved =
      typeof source === "string"
        ? RNImage.resolveAssetSource({ uri: source })
        : RNImage.resolveAssetSource(source as number | { uri: string });
    if (
      resolved &&
      typeof resolved.width === "number" &&
      typeof resolved.height === "number" &&
      resolved.width > 0 &&
      resolved.height > 0
    ) {
      return { width: resolved.width, height: resolved.height };
    }
  } catch {
    /* remote or unknown — fall back to full-area contain */
  }
  return null;
}

export function ExerciseImagePreviewModal({
  visible,
  title,
  source,
  onClose,
}: Props) {
  const { width: sw, height: sh } = Dimensions.get("window");
  const horizontalPad = 24;
  const maxFrameW = sw - horizontalPad;
  const maxFrameH = sh * 0.88;

  const frame = useMemo(() => {
    if (source == null) return { w: maxFrameW, h: maxFrameH * 0.5 };
    const intrinsic = resolveIntrinsicSize(source);
    if (!intrinsic) {
      return { w: maxFrameW, h: maxFrameH };
    }
    const ratio = intrinsic.height / intrinsic.width;
    let w = Math.min(intrinsic.width, maxFrameW);
    let h = w * ratio;
    if (h > maxFrameH) {
      h = maxFrameH;
      w = h / ratio;
    }
    return { w, h };
  }, [source, maxFrameW, maxFrameH]);

  const empty =
    source == null ||
    source === "" ||
    (typeof source === "object" && source && "uri" in source && !source.uri);

  const imageSource = (
    typeof source === "string" ? { uri: source } : source
  ) as ImageProps["source"];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-center bg-black/90 px-3"
        onPress={onClose}
        accessibilityRole="none"
        accessibilityLabel="Kapat"
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="self-center"
          accessibilityRole="none"
        >
          <Text className="mb-3 text-center text-sm font-medium text-white/90">
            {title}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {empty ? (
              <View
                style={{ width: maxFrameW, height: maxFrameH * 0.4 }}
                className="items-center justify-center rounded-2xl bg-white/10"
              >
                <Text className="text-center text-xs text-white/70">
                  Görsel yok
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: frame.w,
                  height: frame.h,
                  alignSelf: "center",
                }}
              >
                <Image
                  source={imageSource}
                  style={{ width: frame.w, height: frame.h }}
                  contentFit="contain"
                  transition={0}
                  cachePolicy="memory-disk"
                />
              </View>
            )}
          </ScrollView>
          <Text className="mt-4 text-center text-xs text-white/60">
            Kapatmak için dışarı dokun
          </Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
