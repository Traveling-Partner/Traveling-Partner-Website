type RideApiEnvelope<T> = {
  success?: boolean;
  statusCode?: number;
  message?: string | null;
  data?: T | null;
};

export type RideApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; statusCode: number; message: string | null };

/**
 * Public GET. URL may contain the share token — never log it.
 */
export async function fetchRideLocationJson<T>(url: string): Promise<RideApiResult<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, { cache: "no-store", signal: controller.signal });
    let body: RideApiEnvelope<T> | null = null;
    try {
      body = (await res.json()) as RideApiEnvelope<T>;
    } catch {
      body = null;
    }
    const statusCode = body?.statusCode ?? res.status;
    if (!res.ok || body?.success === false || statusCode === 404 || body?.data == null) {
      return {
        ok: false,
        statusCode,
        message: typeof body?.message === "string" ? body.message : null,
      };
    }
    return { ok: true, data: body.data };
  } catch {
    return { ok: false, statusCode: 0, message: null };
  } finally {
    clearTimeout(timer);
  }
}
