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
    const message =
      (isJsonResponse && responseData?.message) ||
      (typeof responseData === "string" && responseData) ||
      `Contact form request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return responseData;
}
