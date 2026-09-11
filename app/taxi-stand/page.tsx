import StaticRedirect from "@/components/StaticRedirect";

/** Old URL — send visitors to /taxi-ride. */
export default function TaxiStandRedirect() {
  return <StaticRedirect to="/taxi-ride" />;
}
