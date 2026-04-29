import { Alert, Platform } from "react-native";

/** react-native-web's Alert is a no-op — use window.alert on web. */
export function alertCompat(title: string, message?: string): void {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}
