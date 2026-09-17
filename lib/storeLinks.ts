/**
 * App store destinations used by every download / store button on the site.
 * Update here once — all CTAs pick it up.
 */

/** Play Store listing is live. */
export const STORE_LISTINGS_LIVE = true;

/** Live Android listing */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.travelingpartner.app";

/**
 * iOS App Store — Traveling Partner is not published on the App Store yet.
 * Points at Apple’s App Store until a listing URL is available.
 */
export const APP_STORE_URL = "https://www.apple.com/app-store/";

/** @deprecated Kept for older call sites; buttons now use store-specific labels. */
export const STORE_COMING_SOON_LABEL = "Coming soon";

export function handleStoreClick(
  event: { preventDefault: () => void }
): void {
  if (!STORE_LISTINGS_LIVE) {
    event.preventDefault();
  }
}
