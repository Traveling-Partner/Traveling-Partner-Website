import { User } from "lucide-react";
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
  if (pageState === "ended") {
    return {
      label: "Ended",
      headline: "This ride has ended — live tracking stopped.",
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

interface RideLocationPanelProps {
  data: RideLocationViewData;
  pageState: RideLocationPageState;
}

export default function RideLocationPanel({ data, pageState }: RideLocationPanelProps) {
  const meta = statusMeta(data, pageState);
  const trackedName = data.partnerName;
  const passengerName = data.passengerFirstName;
  const driverName = data.driverName;
  const vehicleReady = Boolean(data.vehicleMake || data.vehicleModel || data.vehiclePlate);

  return (
    <div className="relative w-full rounded-t-[24px] bg-white pt-4 shadow-[0_-8px_30px_rgba(11,11,11,0.06)] lg:w-[440px] lg:shrink-0 lg:overflow-y-auto lg:rounded-none lg:border-l lg:border-[#eceae4] lg:pt-5 lg:shadow-none xl:w-[500px]">
      <div className="flex flex-col gap-4 px-4 pb-6 pt-1 sm:px-5">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#111110] via-[#0b0b0b] to-[#0b0b0b] px-5 py-5 shadow-[0_20px_45px_rgba(11,11,11,0.3)] sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#fdb813]/20 blur-3xl" />
          <div className="relative flex items-center gap-2">
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
              {data.partnerPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.partnerPhoto}
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]">
                    Driver
                  </span>
                  <PersonInfo
                    name={driverName}
                    avatarUrl={data.driverPhoto || undefined}
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
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]">
                  Vehicle
                </span>
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
      </div>
    </div>
  );
}
