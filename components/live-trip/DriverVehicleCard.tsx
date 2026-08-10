import type {
  DriverInfo as DriverInfoType,
  PassengerInfo,
  ShareRole,
  VehicleInfo as VehicleInfoType,
} from "@/lib/liveTrip/types";
import DriverInfo from "./DriverInfo";
import PersonInfo from "./PersonInfo";
import VehicleInfo from "./VehicleInfo";

const EYEBROW_CLASS = "text-[11px] font-bold uppercase tracking-[0.08em] text-[#6f6e68]";

interface DriverVehicleCardProps {
  viewAs: ShareRole;
  driver: DriverInfoType;
  passenger: PassengerInfo;
  vehicle: VehicleInfoType;
}

/**
 * Passenger-shared links show the driver row (verify who is picking you
 * up). Driver-shared links show the passenger's name — a driver-safety
 * measure requested by the business: the driver's family/dispatcher should
 * know who is riding in the car. Everyone sees the vehicle, since matching
 * the plate is the core safety check.
 */
export default function DriverVehicleCard({
  viewAs,
  driver,
  passenger,
  vehicle,
}: DriverVehicleCardProps) {
  const isPassengerView = viewAs === "passenger";

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
      {isPassengerView ? (
        <div className="flex flex-col gap-2">
          <span className={EYEBROW_CLASS}>Your driver</span>
          <DriverInfo driver={driver} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className={EYEBROW_CLASS}>Passenger on board</span>
          <PersonInfo name={passenger.name} subtitle="Passenger" />
        </div>
      )}
      <div className="h-px w-full bg-[#eceae4]" />
      <div className="flex flex-col gap-2">
        <span className={EYEBROW_CLASS}>Vehicle</span>
        <VehicleInfo vehicle={vehicle} />
      </div>
    </div>
  );
}
