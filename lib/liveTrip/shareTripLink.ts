/**
 * Share-link helpers for Live Trip Sharing.
 *
 * Follows the same conventions as lib/blogShare.ts (reuses getSiteUrl and
 * the same wa.me / mailto link-building pattern) so trip sharing behaves
 * consistently with the rest of the site.
 */

import { getSiteUrl } from "@/lib/blogShare";
import type { ShareRole } from "./types";

/**
 * `as` encodes who is sharing — it decides who the recipient tracks on the
 * public page (see ShareRole in types.ts). Defaults to "passenger" since
 * that's the common case (a rider sharing their own trip); a driver/partner
 * app screen should explicitly pass "driver" when embedding the trigger.
 */
export function getTripTrackingUrl(token: string, sharedBy: ShareRole = "passenger"): string {
  const params = new URLSearchParams({ token, as: sharedBy });
  return `${getSiteUrl()}/trip/track?${params.toString()}`;
}

export function buildTripShareText(url: string, sharedBy: ShareRole = "passenger"): string {
  return sharedBy === "driver"
    ? `I'm on my way with Traveling Partner — track my live location here: ${url}`
    : `I'm on my way with Traveling Partner — follow my live trip here: ${url}`;
}

export function buildTripShareLinks(
  url: string,
  sharedBy: ShareRole = "passenger"
): {
  whatsapp: string;
  sms: string;
  email: string;
} {
  const text = buildTripShareText(url, sharedBy);
  return {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
    sms: `sms:?body=${encodeURIComponent(text)}`,
    email: `mailto:?subject=${encodeURIComponent(
      "Follow my live trip"
    )}&body=${encodeURIComponent(text)}`,
  };
}

export function canUseNativeShare(): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof (navigator as Navigator & { share?: unknown }).share === "function"
  );
}

export async function shareTripNatively(
  url: string,
  sharedBy: ShareRole = "passenger",
  title = "Live Trip — Traveling Partner"
): Promise<boolean> {
  if (!canUseNativeShare()) return false;
  try {
    await navigator.share({ title, text: buildTripShareText(url, sharedBy), url });
    return true;
  } catch {
    // AbortError from the user dismissing the native sheet is expected — not a failure.
    return false;
  }
}

export async function copyTripLink(url: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    // fall through to legacy fallback
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = url;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}
