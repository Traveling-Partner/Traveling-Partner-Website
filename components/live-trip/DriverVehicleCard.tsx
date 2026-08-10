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
 * Full manifest of the trip: driver, passenger and vehicle — everyone in
 * the car, with photos, plus the car itself. Ordering follows the viewer:
 * passenger-shared links lead with the driver (verify who is picking you
 * up); driver-shared links lead with the passenger (driver protection —
 * the driver's family/dispatcher should know who is riding along).
 */
export default function DriverVehicleCard({
  viewAs,
  driver,
  passenger,
  vehicle,
}: DriverVehicleCardProps) {
  const isPassengerView = viewAs === "passenger";

  const driverSection = (
    <div className="flex flex-col gap-2.5">
      <span className={EYEBROW_CLASS}>{isPassengerView ? "Your driver" : "Driver"}</span>
      <DriverInfo driver={driver} />
    </div>
  );

  const passengerSection = (
    <div className="flex flex-col gap-2.5">
      <span className={EYEBROW_CLASS}>
        {isPassengerView ? "Passenger" : "Passenger on board"}
      </span>
      <PersonInfo
        name={passenger.name}
        avatarUrl={passenger.avatarUrl}
        verified={passenger.verified}
        totalTrips={passenger.totalTrips}
        memberSince={passenger.memberSince}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-[#eceae4] bg-white p-4 shadow-[0_4px_16px_rgba(11,11,11,0.04)]">
      {isPassengerView ? driverSection : passengerSection}
      <div className="h-px w-full bg-[#eceae4]" />
      {isPassengerView ? passengerSection : driverSection}
      <div className="h-px w-full bg-[#eceae4]" />
      <div className="flex flex-col gap-2.5">
        <span className={EYEBROW_CLASS}>Vehicle</span>
        <VehicleInfo vehicle={vehicle} />
      </div>
    </div>
  );
}
