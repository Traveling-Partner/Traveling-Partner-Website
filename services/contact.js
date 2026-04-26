/**
 * Upload an image/file for contact form. Backend returns JSON with `data` = public URL string.
 */
export async function uploadContactDocument(file) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${apiBaseUrl}/api/documents/contact-us`, {
    method: "POST",
    body,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJsonResponse = contentType.includes("application/json");
  const responseData = isJsonResponse
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (isJsonResponse && responseData?.message) ||
      (typeof responseData === "string" && responseData) ||
      `Document upload failed with status ${response.status}.`;
    throw new Error(message);
  }

  const url = isJsonResponse ? responseData?.data : null;
  if (!url || typeof url !== "string") {
    throw new Error("Document upload did not return a file URL.");
  }

  return url;
}

export async function submitContactForm(formData) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${apiBaseUrl}/api/contact/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const contentType = response.headers.get("content-type") || "";
  const isJsonResponse = contentType.includes("application/json");
  const responseData = isJsonResponse
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let message =
      (isJsonResponse && responseData?.message) ||
      (typeof responseData === "string" && responseData) ||
      `Contact form request failed with status ${response.status}.`;

    if (
      isJsonResponse &&
      response.status === 400 &&
      Array.isArray(responseData?.errors) &&
      responseData.errors.length > 0
    ) {
      const detail = responseData.errors
        .map((e) => e?.defaultMessage || e?.message || String(e))
        .filter(Boolean)
        .join(" ");
      if (detail) message = `${message} ${detail}`.trim();
    }

    throw new Error(message);
  }

  return responseData;
}
