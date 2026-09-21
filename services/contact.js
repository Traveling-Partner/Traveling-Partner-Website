function buildContactUrl(apiBaseUrl) {
  const normalized = String(apiBaseUrl || "").replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/web/contact/submit`;
  }
  return `${normalized}/api/web/contact/submit`;
}

function readPhotoAsString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read photo."));
    reader.readAsDataURL(file);
  });
}

/**
 * Public website contact — POST /api/web/contact/submit (no JWT).
 * Payload: ContactUsDto
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
    payload.photo = await readPhotoAsString(formData.photoFile);
  }

  const response = await fetch(buildContactUrl(apiBaseUrl), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

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
      `Contact form request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return responseData;
}
