import type { DriverInfo as DriverInfoType } from "@/lib/liveTrip/types";
import PersonInfo from "./PersonInfo";

export default function DriverInfo({ driver }: { driver: DriverInfoType }) {
  return <PersonInfo name={driver.name} rating={driver.rating} />;
}
