/** Turkish locale for session timestamps in lists and forms. */
const LOCALE = "tr-TR";

export function formatSessionDateTime(ts: number) {
  return new Date(ts).toLocaleString(LOCALE, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatSessionTime(ts: number) {
  return new Date(ts).toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
