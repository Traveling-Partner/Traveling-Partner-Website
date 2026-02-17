// Trip.jsx (Main parent component)
import TripHero from "@/components/trip-sections/TripHero";
import TripWeekend from "@/components/trip-sections/TripWeekend";
import TripReliable from "@/components/trip-sections/TripReliable";
import TripHowItWorks from "@/components/trip-sections/TripHowItWorks";

export default function Trip() {
  return (
    <div>
      <TripHero />
      <TripWeekend />
      <TripReliable />
      <TripHowItWorks />
    </div>
  );
}