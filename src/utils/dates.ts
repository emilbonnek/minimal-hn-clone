export const RTF = new Intl.RelativeTimeFormat("en", { style: "short" });

/**
 * Format a date to a relative time string
 *
 * @param time The time to format
 * @returns A relative time string
 */
export function formatRelativeTimeFormat(time: Date) {
  const diff = Date.now() - time.getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) {
    return RTF.format(-seconds, "second");
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return RTF.format(-minutes, "minute");
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return RTF.format(-hours, "hour");
  }
  const days = Math.floor(hours / 24);
  return RTF.format(-days, "day");
}
