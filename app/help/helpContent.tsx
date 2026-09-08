import React from "react";
import { HELP_ICONS } from "@/lib/helpAssets";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

export interface HelpItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

export interface HelpCategory {
  id: string;
  title: string;
  iconSrc: string;
  browseDescription: string;
  items: HelpItem[];
}

const body = "text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";

function Answer({
  text,
  bold = [],
}: {
  text: string;
  bold?: readonly string[];
}) {
  return <p className={body}>{emphasizePhrases(text, bold)}</p>;
}

export const helpCategories: HelpCategory[] = [
  {
    id: "vehicle",
    title: "Vehicle",
    iconSrc: HELP_ICONS.vehicle,
    browseDescription:
      "Questions about rides, drivers, bookings and intercity travel.",
    items: [
      {
        id: 1,
        question: "What do I need to register as a driver?",
        answer: (
          <Answer
            text="To register, you'll need a valid CNIC, driving licence, vehicle registration and the documents requested during sign-up."
            bold={["valid CNIC", "driving licence", "vehicle registration"]}
          />
        ),
      },
      {
        id: 2,
        question: "How do I book a ride?",
        answer: (
          <Answer
            text="Enter your pickup location, choose where you're going, check the fare and confirm your booking."
            bold={["pickup location", "confirm your booking"]}
          />
        ),
      },
      {
        id: 3,
        question: "Can I book a ride for another time?",
        answer: (
          <Answer
            text="Yes. If scheduled bookings are available in your area, simply choose the date and time that suits you."
            bold={["scheduled bookings"]}
          />
        ),
      },
      {
        id: 4,
        question: "My driver cancelled the booking.",
        answer: (
          <Answer
            text="No problem. Open the app and request another ride. We'll match you with another available driver."
            bold={["request another ride", "available driver"]}
          />
        ),
      },
      {
        id: 5,
        question: "Can I contact my driver?",
        answer: (
          <Answer
            text="Yes. Driver contact options become available after your booking has been confirmed."
            bold={["after your booking has been confirmed"]}
          />
        ),
      },
      {
        id: 6,
        question: "I forgot something in the vehicle.",
        answer: (
          <Answer
            text="Report the item through the app or contact our support team. We'll help you get in touch with the driver."
            bold={["support team", "get in touch with the driver"]}
          />
        ),
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    iconSrc: HELP_ICONS.delivery,
    browseDescription:
      "Everything related to parcels, couriers and delivery tracking.",
    items: [
      {
        id: 7,
        question: "Can I send documents and parcels?",
        answer: (
          <Answer
            text="Yes. Traveling Partner can be used for documents, parcels, gifts, customer orders and other approved deliveries."
            bold={["documents, parcels, gifts, customer orders"]}
          />
        ),
      },
      {
        id: 8,
        question: "How do I track my parcel?",
        answer: (
          <Answer
            text="Open your delivery booking to see where your parcel is from pickup until it reaches its destination."
            bold={["from pickup until it reaches its destination"]}
          />
        ),
      },
      {
        id: 9,
        question: "What if no one is available to receive the parcel?",
        answer: (
          <Answer
            text="If delivery cannot be completed, the courier will follow the delivery instructions linked to your booking. If needed, our support team will contact you."
            bold={["delivery instructions", "support team"]}
          />
        ),
      },
      {
        id: 10,
        question: "What items can I send?",
        answer: (
          <Answer
            text="You can send everyday parcels, important documents, gifts and business deliveries. Certain items may be restricted for safety or legal reasons."
            bold={[
              "everyday parcels, important documents, gifts and business deliveries",
              "restricted for safety or legal reasons",
            ]}
          />
        ),
      },
      {
        id: 11,
        question: "Do you offer same-day delivery?",
        answer: (
          <Answer
            text="Same day delivery available in certain areas. Available at selected locations and on courier availability at time of booking."
            bold={["certain areas", "courier availability"]}
          />
        ),
      },
      {
        id: 12,
        question: "Can I schedule a delivery in advance?",
        answer: (
          <Answer
            text="Yes. Advance delivery bookings are available where the service is supported."
            bold={["Advance delivery bookings"]}
          />
        ),
      },
    ],
  },
  {
    id: "payment-processing",
    title: "Payment Processing",
    iconSrc: HELP_ICONS.payment,
    browseDescription:
      "Information about fares, payment methods, refunds and charges.",
    items: [
      {
        id: 13,
        question: "Which payment methods are accepted?",
        answer: (
          <Answer
            text="The app shows all payment methods available for your booking before you confirm it."
            bold={["payment methods available", "before you confirm it"]}
          />
        ),
      },
      {
        id: 14,
        question: "How long does a refund take?",
        answer: (
          <Answer
            text="After a refund is approved, it is processed using the original payment method whenever possible. It depends on your bank or payment provider."
            bold={["refund is approved", "original payment method"]}
          />
        ),
      },
      {
        id: 15,
        question: "Why does my final fare differ?",
        answer: (
          <Answer
            text="Your route may change, waiting time added or additional charges may apply during booking."
            bold={["route may change", "waiting time", "additional charges"]}
          />
        ),
      },
    ],
  },
  {
    id: "safety-and-security",
    title: "Safety & Security",
    iconSrc: HELP_ICONS.safety,
    browseDescription:
      "Help with account security, reporting issues and safe travel.",
    items: [
      {
        id: 16,
        question: "How does a Traveling Partner help keep rides safe?",
        answer: (
          <Answer
            text="Every driver completes our verification process before joining the platform. Trip information is also available in the app while your booking is active."
            bold={["verification process", "Trip information"]}
          />
        ),
      },
      {
        id: 17,
        question: "What about in the case of an emergency?",
        answer: (
          <Answer
            text="First, call your local emergency services. Then let our support team know what happened so we can review the booking."
            bold={["local emergency services", "support team"]}
          />
        ),
      },
      {
        id: 18,
        question: "How can I report unsafe behaviour?",
        answer: (
          <Answer
            text="Open the completed booking in the app and submit a report, or contact support with your booking details."
            bold={["submit a report", "booking details"]}
          />
        ),
      },
    ],
  },
];

export const allHelpItems = helpCategories.flatMap((c) => c.items);
