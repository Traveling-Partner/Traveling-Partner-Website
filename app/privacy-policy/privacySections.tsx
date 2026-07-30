import React from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

export interface PrivacySection {
  id: number;
  slug: string;
  title: string;
  content: React.ReactNode;
}

const body = "text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";
const checkList =
  "list-none space-y-3 text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-7">
      <span
        className="absolute left-0 top-[0.35em] flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-[#0b0b0b]"
        style={{
          backgroundImage: "linear-gradient(135deg, #FCE001 0%, #FDB813 100%)",
        }}
        aria-hidden="true"
      >
        ✓
      </span>
      {children}
    </li>
  );
}

function CalloutCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-[#f5e9b8] border-l-[5px] border-l-[#FCE001] bg-[#FFFBEB] px-4 py-4 sm:rounded-[16px] sm:px-5 sm:py-5">
      <p className="mb-2 text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">
        {label}
      </p>
      <div className={body}>{children}</div>
    </div>
  );
}

export const privacySections: PrivacySection[] = [
  {
    id: 1,
    slug: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "Traveling Partner provides transportation, ride booking, parcel delivery, logistics services, and intercity travel through one platform. We need some information to provide these services so that we can complete bookings, process payments and help with customer support whenever it is needed.",
            ["one platform", "complete bookings", "process payments"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "We collect only the information needed to operate our services and work to protect it using reasonable security measures.",
            [
              "information needed to operate our services",
              "reasonable security measures",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 2,
    slug: "information-we-collect",
    title: "Information We Collect",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "The information we collect depends on how you use Traveling Partner.",
            ["depends on how you use"],
          )}
        </p>
        <CalloutCard label="Personal Data">
          <p className="mb-3">
            We may collect the following when you sign up or book a service:
          </p>
          <ul className={checkList}>
            <CheckItem>Full Name</CheckItem>
            <CheckItem>Mobile Number</CheckItem>
            <CheckItem>Email Address</CheckItem>
            <CheckItem>Profile Info</CheckItem>
            <CheckItem>Payment Data (if applicable)</CheckItem>
          </ul>
        </CalloutCard>
        <CalloutCard label="Booking Data">
          <p className="mb-3">
            When you use our services, we may collect the following:
          </p>
          <ul className={checkList}>
            <CheckItem>Pickup Location</CheckItem>
            <CheckItem>Destination</CheckItem>
            <CheckItem>Delivery Address</CheckItem>
            <CheckItem>Booking History</CheckItem>
            <CheckItem>Trip Details</CheckItem>
            <CheckItem>Parcel Info</CheckItem>
            <CheckItem>Logistics Requests</CheckItem>
          </ul>
        </CalloutCard>
        <CalloutCard label="Device Data">
          <p className="mb-3">
            To improve the performance of the platform, we may collect:
          </p>
          <ul className={checkList}>
            <CheckItem>Device Type</CheckItem>
            <CheckItem>Operating System</CheckItem>
            <CheckItem>IP Address</CheckItem>
            <CheckItem>App Version</CheckItem>
            <CheckItem>Location Data (if permission is granted)</CheckItem>
          </ul>
        </CalloutCard>
      </div>
    ),
  },
  {
    id: 3,
    slug: "how-we-use",
    title: "Use of Your Data",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "Your data helps us to manage the Traveling Partner platform and to improve your experience.",
            ["improve your experience"],
          )}
        </p>
        <p className={`${body} font-semibold text-[#0b0b0b]`}>
          We may use it for:
        </p>
        <ul className={checkList}>
          <CheckItem>
            Processing ride, delivery and logistics reservations.
          </CheckItem>
          <CheckItem>Connect riders, drivers and couriers.</CheckItem>
          <CheckItem>Provide customer support.</CheckItem>
        </ul>
        <p className={body}>
          {emphasizePhrases(
            "We use your info to take payments, send refunds, let you know when a booking's confirmed, keep things running safe and smooth on our end, and stay on the right side of the law.",
            [
              "take payments",
              "send refunds",
              "booking's confirmed",
              "right side of the law",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 4,
    slug: "data-security",
    title: "Data Security",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "We take reasonable steps to protect information we hold about you against misuse, loss and unauthorised access.",
            ["misuse, loss and unauthorised access"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "While no online system can guarantee complete security, Traveling Partner regularly reviews its security practices to help protect customer information and platform data.",
            [
              "no online system can guarantee complete security",
              "security practices",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 5,
    slug: "data-sharing",
    title: "Data Sharing",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "We do not sell your personal information.",
            ["do not sell your personal information"],
          )}
        </p>
        <p className={body}>
          Information may be shared only when it is necessary to provide our
          services, including:
        </p>
        <ul className={checkList}>
          <CheckItem>
            Verified drivers and couriers completing your booking.
          </CheckItem>
          <CheckItem>
            Processing of transactions by payment providers.
          </CheckItem>
          <CheckItem>
            Service providers supporting platform operations.
          </CheckItem>
          <CheckItem>
            Government authorities where required by law.
          </CheckItem>
        </ul>
        <p className={body}>
          {emphasizePhrases(
            "Only the information needed for a particular purpose is shared.",
            ["information needed for a particular purpose"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 6,
    slug: "your-choices",
    title: "Your Choices",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "You remain in control of your account information.",
            ["in control of your account information"],
          )}
        </p>
        <p className={body}>
          Depending on your use of the platform, you may:
        </p>
        <ul className={checkList}>
          <CheckItem>Update your profile information.</CheckItem>
          <CheckItem>Change your contact details.</CheckItem>
          <CheckItem>Manage location permissions.</CheckItem>
          <CheckItem>Contact us to request account assistance.</CheckItem>
          <CheckItem>Stop using the platform whenever you choose.</CheckItem>
        </ul>
        <p className={body}>
          {emphasizePhrases(
            "Some information may still be retained where required by law or for legitimate business purposes.",
            ["required by law", "legitimate business purposes"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 7,
    slug: "changes",
    title: "Changes to this Policy",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "As Traveling Partner grows and new services are introduced, this Privacy Policy may be updated from time to time.",
            ["updated from time to time"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "The latest version will always be available on our website and mobile application. Continued use of the platform after an update means the revised Privacy Policy will apply.",
            [
              "latest version",
              "revised Privacy Policy will apply",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 8,
    slug: "contact-us",
    title: "Contact Us",
    content: null,
  },
];

export const privacyNavItems = [
  { slug: "introduction", label: "Introduction", id: 1 },
  { slug: "information-we-collect", label: "Information We Collect", id: 2 },
  { slug: "how-we-use", label: "Use of Your Data", id: 3 },
  { slug: "data-security", label: "Data Security", id: 4 },
  { slug: "data-sharing", label: "Data Sharing", id: 5 },
  { slug: "your-choices", label: "Your Choices", id: 6 },
  { slug: "changes", label: "Changes to this Policy", id: 7 },
  { slug: "contact-us", label: "Contact Us", id: 8 },
] as const;

export const privacyOverviewCards = [
  {
    icon: "/images/privacy/icon-overview-data.png",
    title: "Data we collect",
    description:
      "Personal, booking, and device data used to run our services.",
  },
  {
    icon: "/images/privacy/icon-overview-people.png",
    title: "How we use your data",
    description:
      "To complete bookings, process payments, and improve your experience.",
  },
  {
    icon: "/images/privacy/icon-overview-security.png",
    title: "Data security",
    description:
      "Reasonable steps to protect your information from misuse and loss.",
  },
  {
    icon: "/images/privacy/icon-overview-mailbox.png",
    title: "Changes to this Policy",
    description:
      "The latest version is always available on our website and app.",
  },
] as const;

export const privacyClosingCard = {
  paragraph1: (
    <>
      {emphasizePhrases(
        "Your privacy matters to us. This Privacy Policy explains what information Traveling Partner collects, how it is used, and the choices you have while using our ride booking app in Pakistan, parcel delivery service, logistics platform, and intercity travel services.",
        [
          "Your privacy matters to us",
          "ride booking app in Pakistan",
        ],
      )}
    </>
  ),
  paragraph2: (
    <>
      {emphasizePhrases(
        "By using Traveling Partner, you agree to the practices described below. Have questions about this Privacy Policy or how your information is handled? Our support team is here to help.",
        [
          "you agree to the practices described below",
          "support team is here to help",
        ],
      )}
    </>
  ),
};

export const privacyContactIntro =
  "Have questions about this Privacy Policy or how your information is handled? Our support team is here to help.";
