/** Map API errors to UI copy. Does not change the subscribe request. */

export function newsletterFeedbackMessage(
  error: unknown,
  fallback = "Couldn’t subscribe right now. Please try again."
): string {
  const raw =
    error instanceof Error ? error.message.trim() : String(error || "").trim();
  if (!raw) return fallback;
  if (/already|exist|duplicate|subscribed/i.test(raw)) {
    return "This email is already subscribed.";
  }
  if (/invalid|valid email|not a valid/i.test(raw)) {
    return "Please enter a valid email address.";
  }
  if (/failed to fetch|networkerror/i.test(raw)) {
    return "Couldn’t subscribe. Check your connection and try again.";
  }
  return raw;
}
