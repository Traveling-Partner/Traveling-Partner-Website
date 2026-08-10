import type { LiveVehicleState, ShareRole, TripShareData } from "@/lib/liveTrip/types";
import TripInfoCard from "./TripInfoCard";

interface TripInfoPanelProps {
  trip: TripShareData;
  liveState: LiveVehicleState | null;
  viewAs: ShareRole;
  onShare: () => void;
}

/**
 * Sits below the map on mobile and beside it on desktop — never floating on
 * top of it, so the map stays fully visible on every screen size instead of
 * being partly hidden behind a details card.
 */
export default function TripInfoPanel({ trip, liveState, viewAs, onShare }: TripInfoPanelProps) {
  return (
    <div className="relative w-full rounded-t-[24px] bg-white pt-4 shadow-[0_-8px_30px_rgba(11,11,11,0.06)] lg:w-[400px] lg:shrink-0 lg:rounded-none lg:border-l lg:border-[#eceae4] lg:pt-5 lg:shadow-none lg:overflow-y-auto">
      <TripInfoCard trip={trip} liveState={liveState} viewAs={viewAs} onShare={onShare} />
    </div>
  );
}
