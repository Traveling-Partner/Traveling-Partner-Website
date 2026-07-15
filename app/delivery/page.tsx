// Delivery.jsx (Main parent component)
import DeliveryHero from "@/components/Delivery-sections/DeliveryHero";
import DeliveryTreasureSection from "@/components/Delivery-sections/DeliveryTreasureSection";
// import WhyChooseUs from "@/components/Delivery-sections/WhyChooseUs";
import HowDeliveryWorks from "@/components/Delivery-sections/HowDeliveryWorks";
import OurServicesSection from "@/components/Delivery-sections/OurServicesSection";

export default function Delivery() {
  return (
    <div>
      <DeliveryHero />
      <DeliveryTreasureSection />
      {/* <WhyChooseUs /> */}
      <HowDeliveryWorks />
      <OurServicesSection />
    </div>
  );
}
