import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { formatElapsedSeconds } from "@/lib/formatElapsed";

type Props = {
  startedAtMs: number;
  sessionTitle: string;
  /** "compact" = slightly smaller time (egzersiz kaydı üstü) */
  variant?: "default" | "compact";
};

export function SessionTimerBar({
  startedAtMs,
  sessionTitle,
  variant = "default",
}: Props) {
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAtMs]);

  const elapsedSec = Math.max(0, (nowMs - startedAtMs) / 1000);
  const timeClass =
    variant === "compact"
      ? "text-2xl font-semibold tabular-nums tracking-tight text-foreground"
      : "text-3xl font-semibold tabular-nums tracking-tight text-foreground";

  return (
    <View className="mb-3 w-full flex-row items-center gap-3 rounded-xl bg-surface px-3 py-2 ring-1 ring-accent/40">
      <View className="min-w-0 flex-1">
        <Text
          className="text-sm font-medium uppercase tracking-wider text-accent"
          numberOfLines={1}
        >
          Oturum · {sessionTitle}
        </Text>
      </View>
      <View className="flex-shrink-0 flex-row items-center gap-1.5">
        <Text className={timeClass}>{formatElapsedSeconds(elapsedSec)}</Text>
        <View className="h-1.5 w-1.5 rounded-full bg-red-500" />
      </View>
    </View>
  );
}
