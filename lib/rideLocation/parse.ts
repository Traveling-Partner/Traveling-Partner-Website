import type {
  RideLocationCurrentData,
  RideLocationSnapshotData,
  RideLocationUpdatePayload,
  RideLocationViewData,
  RideShareStatus,
} from "./types";

export function isFiniteCoord(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function hasLivePosition(data: Pick<RideLocationViewData, "latitude" | "longitude">): boolean {
  return isFiniteCoord(data.latitude) && isFiniteCoord(data.longitude);
}

/**
 * Socket timestamp may be [year, month, day, hour, minute, second, nanosecond]
 * in Asia/Karachi (legacy) or a normal ISO string (current handoff).
 */
export function parseKarachiTimestampArray(value: unknown): number | null {
  if (!Array.isArray(value) || value.length < 6) return null;
  const [year, month, day, hour, minute, second, nano] = value as number[];
  if (![year, month, day, hour, minute, second].every((n) => Number.isFinite(n))) {
    return null;
  }
  const ms = typeof nano === "number" && Number.isFinite(nano) ? Math.floor(nano / 1e6) : 0;
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  const hourStr = String(hour).padStart(2, "0");
  const minStr = String(minute).padStart(2, "0");
  const secStr = String(second).padStart(2, "0");
  const parsed = Date.parse(
    `${year}-${monthStr}-${dayStr}T${hourStr}:${minStr}:${secStr}.${String(ms).padStart(3, "0")}+05:00`
  );
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseIsoTimestamp(value: unknown): number | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/** Accept ISO string or legacy Karachi array. */
export function parseUpdateTimestamp(value: unknown): number | null {
  return parseIsoTimestamp(value) ?? parseKarachiTimestampArray(value);
}

function asNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function asNullableNumber(value: unknown): number | null {
  return isFiniteCoord(value) ? value : null;
}

function asNullableInt(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function asNullableRating(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  if (value < 0 || value > 5) return null;
  return value;
}

/**
 * Handoff: status is "live" | "ended" | "completed" | "cancelled".
 * Anything other than "live" is a terminal end signal for the public page.
 */
export function deriveShareStatus(
  status: unknown,
  sharingActive: boolean | null | undefined,
  rideStatus: unknown
): RideShareStatus {
  const normalized = typeof status === "string" ? status.trim().toLowerCase() : "";
  if (normalized === "cancelled" || normalized === "canceled") return "cancelled";
  if (normalized === "completed") return "completed";
  if (normalized === "ended") return "ended";
  if (normalized === "live") {
    if (sharingActive === false) return "ended";
    return "live";
  }

  const ride = typeof rideStatus === "string" ? rideStatus.trim().toUpperCase() : "";
  if (ride === "CANCELED") return "cancelled";
  if (ride === "COMPLETED") return "completed";
  if (sharingActive === false || ride === "EXPIRED") return "ended";

  // Unknown status string that isn't "live" → treat as ended (handoff rule)
  if (normalized && normalized !== "live") return "ended";

  return "live";
}

const EMPTY: RideLocationViewData = {
  rideId: null,
  partnerId: null,
  latitude: null,
  longitude: null,
  heading: null,
  sharingActive: true,
  rideStatus: null,
  status: "live",
  partnerName: null,
  partnerPhoto: null,
  driverId: null,
  driverName: null,
  driverPhoto: null,
  driverRating: null,
  vehicleMake: null,
  vehicleModel: null,
  vehiclePlate: null,
  vehicleColor: null,
  pickupLatitude: null,
  pickupLongitude: null,
  pickupAddress: null,
  dropoffLatitude: null,
  dropoffLongitude: null,
  dropoffAddress: null,
  etaMinutes: null,
  passengerFirstName: null,
  lastUpdatedAt: null,
};

function merge(
  base: RideLocationViewData,
  patch: Partial<RideLocationViewData>
): RideLocationViewData {
  return { ...base, ...patch };
}

function patchFromUpdate(
  data: RideLocationUpdatePayload,
  base: RideLocationViewData
): Partial<RideLocationViewData> {
  const sharingActive = data.sharingActive !== false;
  return {
    rideId: asNullableInt(data.rideId) ?? base.rideId,
    partnerId: asNullableInt(data.partnerId) ?? base.partnerId,
    latitude: asNullableNumber(data.latitude) ?? base.latitude,
    longitude: asNullableNumber(data.longitude) ?? base.longitude,
    heading: asNullableNumber(data.heading) ?? base.heading,
    sharingActive,
    rideStatus: asNullableString(data.rideStatus) ?? base.rideStatus,
    status: deriveShareStatus(data.status, data.sharingActive, data.rideStatus),
    partnerName: asNullableString(data.partnerName) ?? base.partnerName,
    partnerPhoto: asNullableString(data.partnerPhoto) ?? base.partnerPhoto,
    driverId: asNullableInt(data.driverId) ?? base.driverId,
    driverName: asNullableString(data.driverName) ?? base.driverName,
    driverRating: asNullableRating(data.driverRating) ?? base.driverRating,
    vehicleMake: asNullableString(data.vehicleMake) ?? base.vehicleMake,
    vehicleModel: asNullableString(data.vehicleModel) ?? base.vehicleModel,
    vehiclePlate: asNullableString(data.vehiclePlate) ?? base.vehiclePlate,
    vehicleColor: asNullableString(data.vehicleColor) ?? base.vehicleColor,
    pickupLatitude: asNullableNumber(data.pickupLatitude) ?? base.pickupLatitude,
    pickupLongitude: asNullableNumber(data.pickupLongitude) ?? base.pickupLongitude,
    pickupAddress: asNullableString(data.pickupAddress) ?? base.pickupAddress,
    dropoffLatitude: asNullableNumber(data.dropoffLatitude) ?? base.dropoffLatitude,
    dropoffLongitude: asNullableNumber(data.dropoffLongitude) ?? base.dropoffLongitude,
    dropoffAddress: asNullableString(data.dropoffAddress) ?? base.dropoffAddress,
    etaMinutes: asNullableInt(data.etaMinutes) ?? base.etaMinutes,
    passengerFirstName: asNullableString(data.passengerFirstName) ?? base.passengerFirstName,
    lastUpdatedAt: parseUpdateTimestamp(data.timestamp) ?? Date.now(),
  };
}

export function viewFromSocket(
  data: RideLocationUpdatePayload,
  previous: RideLocationViewData | null
): RideLocationViewData {
  const base = previous ?? EMPTY;
  // Live frames should replace coordinates when present (null lat means keep previous)
  const sharingActive = data.sharingActive !== false;
  const lat = asNullableNumber(data.latitude);
  const lng = asNullableNumber(data.longitude);
  return merge(base, {
    ...patchFromUpdate(data, base),
    latitude: lat ?? base.latitude,
    longitude: lng ?? base.longitude,
    sharingActive,
    lastUpdatedAt: parseUpdateTimestamp(data.timestamp) ?? Date.now(),
  });
}

export function viewFromSnapshot(
  data: RideLocationSnapshotData,
  previous: RideLocationViewData | null
): RideLocationViewData {
  const base = previous ?? EMPTY;
  const seconds = asNullableInt(data.estimatedDurationInSeconds);
  const etaFromSeconds = seconds !== null ? Math.max(1, Math.round(seconds / 60)) : null;
  const sharingActive = data.sharingActive !== false;
  return merge(base, {
    rideId: asNullableInt(data.rideId) ?? base.rideId,
    latitude: asNullableNumber(data.latitude) ?? base.latitude,
    longitude: asNullableNumber(data.longitude) ?? base.longitude,
    sharingActive,
    rideStatus: asNullableString(data.status) ?? base.rideStatus,
    status: deriveShareStatus(null, data.sharingActive, data.status),
    driverName: asNullableString(data.driverName) ?? base.driverName,
    driverPhoto: asNullableString(data.driverPhoto) ?? base.driverPhoto,
    partnerName: base.partnerName ?? asNullableString(data.driverName),
    partnerPhoto: base.partnerPhoto ?? asNullableString(data.driverPhoto),
    vehiclePlate: asNullableString(data.vehicleRegistrationNo) ?? base.vehiclePlate,
    vehicleColor: asNullableString(data.vehicleColor) ?? base.vehicleColor,
    pickupAddress: asNullableString(data.pickupAddress) ?? base.pickupAddress,
    dropoffAddress: asNullableString(data.dropoffAddress) ?? base.dropoffAddress,
    etaMinutes: etaFromSeconds ?? base.etaMinutes,
    lastUpdatedAt: parseIsoTimestamp(data.lastUpdatedAt) ?? base.lastUpdatedAt ?? Date.now(),
  });
}

export function viewFromCurrent(
  data: RideLocationCurrentData,
  previous: RideLocationViewData | null
): RideLocationViewData {
  return viewFromSocket(data, previous);
}

export function firstName(full: string | null): string | null {
  if (!full) return null;
  return full.split(/\s+/)[0] || null;
}
