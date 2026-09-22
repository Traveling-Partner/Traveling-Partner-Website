import { Compass, MapPin, Navigation, User } from "lucide-react";
import PersonInfo from "@/components/live-trip/PersonInfo";
import VehicleInfo from "@/components/live-trip/VehicleInfo";
import { firstName } from "@/lib/rideLocation/parse";
import type { RideLocationPageState, RideLocationViewData } from "@/lib/rideLocation/types";
import { RIDE_STATUS_LINE } from "@/lib/rideLocation/types";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function statusMeta(data: RideLocationViewData, pageState: RideLocationPageState) {
  if (pageState === "cancelled") {
    return { label: "Cancelled", headline: "This ride was cancelled." };
  }
  if (pageState === "completed") {
    return {
      label: "Completed",
      headline: "This ride is complete — live tracking stopped.",
    };
  }
  if (pageState === "ended") {
    return {
      label: "Sharing ended",
      headline: "Sharing has ended — live tracking stopped.",
    };
  }
  const rideLine =
    (data.rideStatus && RIDE_STATUS_LINE[data.rideStatus]) || "Live location";
  const eta =
    typeof data.etaMinutes === "number" && data.etaMinutes > 0
      ? `About ${data.etaMinutes} min`
      : null;
  return {
    label: rideLine,
    headline: eta ?? rideLine,
  };
}

function formatCoord(value: number | null): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value.toFixed(4);
}

function formatHeading(value: number | null): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const dir = dirs[Math.round((((value % 360) + 360) % 360) / 45) % 8];
  return `${Math.round(value)}° ${dir}`;
}

function formatTime(value: number | null): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return new Date(value).toLocaleTimeString("en-PK", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

function Fact({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="min-w-0 rounded-xl bg-[#f7f6f1] px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9b9a93]">
        {label}
      </p>
      <p className="mt-0.5 truncate font-poppins text-[13px] font-semibold text-[#0b0b0b]">
        {value}
      </p>
    </div>
  );
}

const EYEBROW = "text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]";

interface RideLocationPanelProps {
  data: RideLocationViewData;
  pageState: RideLocationPageState;
  preview?: boolean;
}

export default function RideLocationPanel({
  data,
  pageState,
  preview = false,
}: RideLocationPanelProps) {
  const meta = statusMeta(data, pageState);
  const trackedName = data.partnerName || data.driverName;
  const passengerName = data.passengerFirstName;
  const driverName = data.driverName;
  const vehicleReady = Boolean(
    data.vehicleMake || data.vehicleModel || data.vehiclePlate || data.vehicleColor
  );
  const pickupLat = formatCoord(data.pickupLatitude);
  const pickupLng = formatCoord(data.pickupLongitude);
  const dropLat = formatCoord(data.dropoffLatitude);
  const dropLng = formatCoord(data.dropoffLongitude);
  const liveLat = formatCoord(data.latitude);
  const liveLng = formatCoord(data.longitude);
  const heading = formatHeading(data.heading);
  const updated = formatTime(data.lastUpdatedAt);

  return (
    <div className="relative w-full rounded-t-[24px] bg-white pt-4 shadow-[0_-8px_30px_rgba(11,11,11,0.06)] lg:w-[440px] lg:shrink-0 lg:overflow-y-auto lg:rounded-none lg:border-l lg:border-[#eceae4] lg:pt-5 lg:shadow-none xl:w-[500px]">
      <div className="flex flex-col gap-4 px-4 pb-6 pt-1 sm:px-5">
        {preview ? (
          <div className="rounded-full bg-[#0b0b0b] px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#fce001]">
            Preview · sample payload
          </div>
        ) : null}

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#111110] via-[#0b0b0b] to-[#0b0b0b] px-5 py-5 shadow-[0_20px_45px_rgba(11,11,11,0.3)] sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#fdb813]/20 blur-3xl" />
          <div className="relative flex flex-wrap items-center gap-2">
            {pageState === "live" ? (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813]" />
              </span>
            ) : (
              <span className="h-2 w-2 rounded-full bg-white/40" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#fce001]">
              {meta.label}
            </span>
            {data.sharingActive ? (
              <span className="rounded-full bg-[#fce001]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#fce001]">
                Sharing on
              </span>
            ) : (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/55">
                Sharing off
              </span>
            )}
            {data.status ? (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/70">
                {data.status}
              </span>
            ) : null}
          </div>

          <p className="relative mt-2.5 font-poppins text-2xl font-extrabold leading-tight text-white sm:text-[28px]">
            {meta.headline}
          </p>
          {pageState === "live" && data.etaMinutes != null && (
            <p className="relative mt-1.5 text-[13px] font-medium text-white/50">
              Estimated when the ride was booked — not a live countdown.
            </p>
          )}

          {trackedName && (
            <div className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              {data.partnerPhoto || data.driverPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.partnerPhoto || data.driverPhoto || ""}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#fdb813] ring-offset-2 ring-offset-[#0b0b0b]"
                />
              ) : (
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-2 ring-[#fdb813] ring-offset-2 ring-offset-[#0b0b0b]">
                  {initials(trackedName)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
                  Sharing location
                </p>
                <p className="truncate text-[15px] font-bold text-white">{trackedName}</p>
              </div>
            </div>
          )}
        </div>

        {(data.pickupAddress || data.dropoffAddress || pickupLat || dropLat) && (
          <div className="rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
            <span className={EYEBROW}>Route</span>
            <div className="mt-3 flex flex-col gap-3">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#fdb813]" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9b9a93]">
                    Pickup
                  </p>
                  <p className="text-[14px] font-semibold text-[#0b0b0b]">
                    {data.pickupAddress || "Pickup"}
                  </p>
                  {pickupLat && pickupLng ? (
                    <p className="mt-0.5 font-mono text-[11px] text-[#6f6e68]">
                      {pickupLat}, {pickupLng}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="ml-[7px] h-4 w-px bg-[#eceae4]" />
              <div className="flex gap-3">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[#0b0b0b]" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#9b9a93]">
                    Drop-off
                  </p>
                  <p className="text-[14px] font-semibold text-[#0b0b0b]">
                    {data.dropoffAddress || "Drop-off"}
                  </p>
                  {dropLat && dropLng ? (
                    <p className="mt-0.5 font-mono text-[11px] text-[#6f6e68]">
                      {dropLat}, {dropLng}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

        {(liveLat || heading || updated) && (
          <div className="rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
            <div className="mb-3 flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#fdb813]" />
              <span className={EYEBROW}>Live position</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Fact label="Latitude" value={liveLat} />
              <Fact label="Longitude" value={liveLng} />
              <Fact label="Heading" value={heading} />
              <Fact label="Updated" value={updated} />
            </div>
          </div>
        )}

        {passengerName && (
          <div className="flex items-center gap-3 rounded-2xl border border-[#eceae4] bg-white p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f6f1] text-[#0b0b0b]">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]">
                Passenger on board
              </p>
              <p className="truncate text-[15px] font-semibold text-[#0b0b0b]">{passengerName}</p>
            </div>
          </div>
        )}

        {(driverName || vehicleReady) && (
          <div className="flex flex-col gap-3.5 rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
            {driverName && (
              <>
                <div className="flex flex-col gap-2.5">
                  <span className={EYEBROW}>Driver</span>
                  <PersonInfo
                    name={driverName}
                    avatarUrl={data.driverPhoto || undefined}
                    rating={data.driverRating ?? undefined}
                    subtitle={
                      firstName(data.partnerName) &&
                      data.partnerName !== driverName
                        ? "Assigned driver"
                        : undefined
                    }
                  />
                </div>
                {vehicleReady && <div className="h-px w-full bg-[#eceae4]" />}
              </>
            )}

            {vehicleReady && (
              <div className="flex flex-col gap-2.5">
                <span className={EYEBROW}>Vehicle</span>
                <VehicleInfo
                  vehicle={{
                    make: data.vehicleMake || "Vehicle",
                    model: data.vehicleModel || "",
                    plateNumber: data.vehiclePlate || "—",
                    color: data.vehicleColor || undefined,
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
          <span className={EYEBROW}>Ride details</span>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Fact label="Ride ID" value={data.rideId} />
            <Fact label="Driver ID" value={data.driverId} />
            <Fact label="Partner ID" value={data.partnerId} />
            <Fact label="Ride status" value={data.rideStatus} />
            <Fact label="Share status" value={data.status} />
            <Fact
              label="Sharing"
              value={data.sharingActive ? "Active" : "Off"}
            />
            <Fact label="ETA" value={data.etaMinutes != null ? `${data.etaMinutes} min` : null} />
            <Fact label="Last update" value={updated} />
          </div>
        </div>
      </div>
    </div>
  );
}
