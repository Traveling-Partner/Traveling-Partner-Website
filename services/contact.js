function buildApiUrl(apiBaseUrl, path) {
  const normalized = String(apiBaseUrl || "").replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}${path}`;
  }
  return `${normalized}/api${path}`;
}

async function parseApiResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  const isJsonResponse = contentType.includes("application/json");
  const responseData = isJsonResponse
    ? await response.json()
    : await response.text();

  if (
    !response.ok ||
    (isJsonResponse && responseData && responseData.success === false)
  ) {
    const message =
      (isJsonResponse && responseData?.message) ||
      (typeof responseData === "string" && responseData) ||
      fallbackMessage;
    throw new Error(message);
  }

  return responseData;
}

async function uploadContactFile(file, apiBaseUrl) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(
    buildApiUrl(apiBaseUrl, "/documents/contact-us"),
    { method: "POST", body }
  );

  const responseData = await parseApiResponse(
    response,
    `File upload failed with status ${response.status}.`
  );

  const url = responseData && responseData.data;
  if (typeof url !== "string" || !url) {
    throw new Error("File upload did not return a URL.");
  }
  return url;
}

/**
 * Public website contact:
 * 1. optional file → POST /api/documents/contact-us (form-data `file`)
 * 2. POST /api/web/contact/submit with ContactUsDto (`photo` = uploaded URL)
 */
export async function submitContactForm(formData) {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.traveling-partner.com/api";

  const payload = {
    name: formData.name ?? "",
    email: formData.email ?? "",
    subject: formData.subject ?? "",
    message: formData.message ?? "",
    phoneNumber: formData.phoneNumber ?? "",
    photo: formData.photo ?? "",
  };

  if (formData.photoFile instanceof File) {
    payload.photo = await uploadContactFile(formData.photoFile, apiBaseUrl);
  }

  const response = await fetch(
    buildApiUrl(apiBaseUrl, "/web/contact/submit"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  return parseApiResponse(
    response,
    `Contact form request failed with status ${response.status}.`
  );
}
