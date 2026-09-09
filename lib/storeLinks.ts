/**
 * App listings are not published yet. Generic store homepages were a QA bug.
 * Keep hrefs local so we do not send people to Play/App Store search.
 */
export const STORE_LISTINGS_LIVE = false;

export const PLAY_STORE_URL = "#";
export const APP_STORE_URL = "#";

export const STORE_COMING_SOON_LABEL = "Coming soon";

export function handleStoreClick(
  event: { preventDefault: () => void }
): void {
  if (!STORE_LISTINGS_LIVE) {
    event.preventDefault();
  }
}
