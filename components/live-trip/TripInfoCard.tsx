import type { LiveVehicleState, ShareRole, TripShareData } from "@/lib/liveTrip/types";
import TripHeroCard from "./TripHeroCard";
import DriverVehicleCard from "./DriverVehicleCard";
import TripRoute from "./TripRoute";

interface TripInfoCardProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
  /**
   * Who shared this link — decides who is foregrounded as "the person being
   * tracked". Passenger-shared links keep driver + vehicle visible below for
   * safety verification; driver-shared links show the passenger's name so
   * the driver's own contacts know who is riding along (driver protection).
   */
  viewAs: ShareRole;
}

/**
 * Pure content — the parent decides how to present this (bottom sheet on
 * mobile, side panel on desktop). One dark hero card carries every urgent
 * fact (status, ETA, who you're tracking); routine and grouped details sit
 * in their own clearly bordered cards below so nothing competes for
 * attention at the same visual weight.
 */
export default function TripInfoCard({ trip, liveState, viewAs }: TripInfoCardProps) {
  const etaMinutes = liveState?.etaMinutes ?? trip.etaMinutes;
  const distanceKm = liveState?.distanceRemainingKm ?? trip.distanceKm;

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-1 sm:px-5">
      <TripHeroCard
        status={trip.status}
        etaMinutes={etaMinutes}
        arrivalTimeLabel={trip.arrivalTimeLabel}
        distanceKm={distanceKm}
        viewAs={viewAs}
        passenger={trip.passenger}
        driver={trip.driver}
      />

      <DriverVehicleCard
        viewAs={viewAs}
        driver={trip.driver}
        passenger={trip.passenger}
        vehicle={trip.vehicle}
      />

      <TripRoute pickup={trip.pickup} destination={trip.destination} />
    </div>
  );
}
