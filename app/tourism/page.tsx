import TripHero from "@/components/trip-sections/TripHero";
import TripWeekend from "@/components/trip-sections/TripWeekend";
import TripReliable from "@/components/trip-sections/TripReliable";
import TripHowItWorks from "@/components/trip-sections/TripHowItWorks";
import OurServicesSection from "@/components/trip-sections/OurServicesSection";
import ReadyToTripSection from "@/components/trip-sections/ReadyToTripSection";

export default function Tourism() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <TripHero />
      <TripWeekend />
      <TripReliable />
      <TripHowItWorks />
      <OurServicesSection />
      <ReadyToTripSection />
    </div>
  );
}
