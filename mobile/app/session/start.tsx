import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useSessionDraft } from "@/contexts/SessionDraftContext";
import { formatSessionDateTime } from "@/lib/formatSession";

export default function SessionStartPage() {
  const { beginSession } = useSessionDraft();
  const [name, setName] = useState("");
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  function onContinue() {
    const ok = beginSession(name);
    if (!ok) return;
    router.push("/session/workout");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-background"
    >
      <ScrollView
        className="mx-auto w-full max-w-md flex-1 px-4 pb-8 pt-3"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Geri"
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Text className="text-sm text-muted">← Geri</Text>
          </Pressable>
          <Text className="text-[10px] font-medium uppercase tracking-wider text-accent">
            Yeni oturum
          </Text>
          <View className="w-12" />
        </View>

        <Text className="mb-1 text-xl font-semibold text-foreground">
          Oturum adı
        </Text>
        <Text className="mb-4 text-sm text-muted">
          Bu ad kayıtlarında görünür. Başlangıç zamanı otomatik kaydedilir.
        </Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Örn. Sabah mat akışı"
          placeholderTextColor="#a3a3a360"
          className="mb-6 rounded-2xl bg-surface px-4 py-3.5 text-base text-foreground ring-1 ring-border-subtle"
          autoCapitalize="sentences"
          returnKeyType="done"
          onSubmitEditing={onContinue}
        />

        <View className="mb-8 rounded-2xl bg-surface p-4 ring-1 ring-border-subtle">
          <Text className="mb-1 text-[10px] font-medium uppercase tracking-wide text-muted">
            Başlangıç zamanı
          </Text>
          <Text className="font-mono text-lg text-foreground">
            {formatSessionDateTime(nowMs)}
          </Text>
        </View>

        <Pressable
          onPress={onContinue}
          disabled={!name.trim()}
          className="w-full rounded-2xl bg-accent py-3.5 active:opacity-90 disabled:opacity-40"
        >
          <Text className="text-center text-sm font-semibold text-black">
            Devam · egzersiz seç
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
