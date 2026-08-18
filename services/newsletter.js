function buildSubscribeUrl(apiBaseUrl) {
  const normalized = apiBaseUrl.replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/subscribers/subscribe`;
  }
  return `${normalized}/api/subscribers/subscribe`;
}

/**
 * Subscribe an email to the Traveling Partner newsletter.
 * POST {NEXT_PUBLIC_API_BASE_URL}/subscribers/subscribe
 * Body: { email }
 */
export async function subscribeNewsletter(email) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const trimmed = typeof email === "string" ? email.trim() : "";
  if (!trimmed) {
    throw new Error("Email is required.");
  }

  const response = await fetch(buildSubscribeUrl(apiBaseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: trimmed }),
  });

  const contentType = response.headers.get("content-type") || "";
  const isJsonResponse = contentType.includes("application/json");
  const responseData = isJsonResponse
    ? await response.json()
    : await response.text();

  const apiMessage =
    (isJsonResponse && responseData?.message) ||
    (typeof responseData === "string" && responseData) ||
    null;

  if (!response.ok || (isJsonResponse && responseData?.success === false)) {
    throw new Error(
      apiMessage ||
        `Newsletter subscribe failed with status ${response.status}.`,
    );
  }

  return responseData;
}
