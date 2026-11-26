// Delivery.jsx (Main parent component)
import DeliveryHero from "@/components/Delivery-sections/DeliveryHero";
import DeliveryTreasureSection from "@/components/Delivery-sections/DeliveryTreasureSection";
import WhyChooseUs from "@/components/Delivery-sections/WhyChooseUs";
import HowDeliveryWorks from "@/components/Delivery-sections/HowDeliveryWorks";
import OurServicesSection from "@/components/Delivery-sections/OurServicesSection";
import ReadyToSendSection from "@/components/Delivery-sections/ReadyToSendSection";
import AdSlot from "@/components/ads/AdSlot";

export default function Delivery() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <DeliveryHero />
      <DeliveryTreasureSection />
      <AdSlot placement="service1" />
      <HowDeliveryWorks />
      <WhyChooseUs />
      <OurServicesSection />
      <ReadyToSendSection />
      <AdSlot placement="service2" />
    </div>
  );
}
