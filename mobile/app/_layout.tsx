import "../global.css";

import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";
import { SessionDraftProvider } from "@/contexts/SessionDraftContext";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const PilatesTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000000",
    card: "#1a1a1a",
    text: "#ffffff",
    border: "#2e2e2e",
    primary: "#ff4d2e",
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-background">
        <AuthProvider>
          <SessionDraftProvider>
            <ThemeProvider value={PilatesTheme}>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#000" },
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="session/start" />
                <Stack.Screen name="session/workout" />
                <Stack.Screen name="session/active" />
                <Stack.Screen name="session/summary" />
                <Stack.Screen name="exercise/[id]" />
                <Stack.Screen name="progress" options={{ presentation: "card" }} />
              </Stack>
            </ThemeProvider>
          </SessionDraftProvider>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  );
}
