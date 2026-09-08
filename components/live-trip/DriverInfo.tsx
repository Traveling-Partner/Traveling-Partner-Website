import type { DriverInfo as DriverInfoType } from "@/lib/liveTrip/types";
import PersonInfo from "./PersonInfo";

export default function DriverInfo({ driver }: { driver: DriverInfoType }) {
  return (
    <PersonInfo
      name={driver.name}
      avatarUrl={driver.avatarUrl}
      rating={driver.rating}
      verified={driver.verified}
      totalTrips={driver.totalTrips}
      memberSince={driver.memberSince}
    />
  );
}
