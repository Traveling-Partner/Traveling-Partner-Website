import React from "react";
import { emphasizePhrases } from "@/lib/emphasizePhrases";

export interface TermsSection {
  id: number;
  slug: string;
  title: string;
  /** Display title suffix e.g. "!" for section 6 */
  titleSuffix?: string;
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

function DefinitionCard({
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
      <p className={body}>{children}</p>
    </div>
  );
}

export const termsSections: TermsSection[] = [
  {
    id: 1,
    slug: "introduction",
    title: "Introduction",
    content: (
      <p className={body}>
        {emphasizePhrases(
          "Traveling Partner is a technology platform connecting riders, drivers, couriers and business partners. We make it easier to book rides, arrange deliveries and access logistics services through one application. Drivers and couriers using the platform work independently and are responsible for the services they provide.",
          [
            "technology platform",
            "one application",
            "work independently",
          ],
        )}
      </p>
    ),
  },
  {
    id: 2,
    slug: "definitions",
    title: "Definitions",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <DefinitionCard label="Traveling Partner">
          {emphasizePhrases(
            "Refers to the Traveling Partner website and mobile application that connects people with transportation, delivery, logistics and intercity travel services. The platform allows riders, drivers, couriers and businesses to access different services from one place.",
            ["website and mobile application", "from one place"],
          )}
        </DefinitionCard>
        <DefinitionCard label="Driver">
          {emphasizePhrases(
            "Refers to an independent driver who accepts ride or trip requests through the Traveling Partner platform. Traveling Partner does not hire or contract with drivers. Drivers are responsible for providing transportation services in accordance with all applicable laws and requirements of the platform.",
            [
              "independent driver",
              "does not hire or contract with drivers",
            ],
          )}
        </DefinitionCard>
        <DefinitionCard label="Partner">
          {emphasizePhrases(
            "Refers to anyone using Traveling Partner, including riders, customers, businesses or delivery clients who book rides, deliveries, logistics services or intercity trips through the platform.",
            ["riders, customers, businesses or delivery clients"],
          )}
        </DefinitionCard>
      </div>
    ),
  },
  {
    id: 3,
    slug: "registration-and-accounts",
    title: "Registration & Accounts",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "You must be 18 years or older to create a Traveling Partner account.",
            ["18 years or older"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Please register using your own information and keep your account details up to date. You are responsible for any activity carried out through your account, so keep your login information secure.",
            [
              "your own information",
              "login information secure",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 4,
    slug: "services",
    title: "Services",
    content: (
      <div className="rounded-[18px] border border-[#f5e9b8] bg-[#FFFDF0] px-4 py-5 sm:rounded-[20px] sm:px-6 sm:py-6">
        <p className={`${body} mb-4`}>
          {emphasizePhrases(
            "Traveling Partner brings several services together in one platform.",
            ["one platform"],
          )}
        </p>
        <div className="space-y-4">
          <p className={body}>
            <span className="font-semibold text-[#0b0b0b]">Taxi Stand:</span>{" "}
            {emphasizePhrases(
              "Book city rides with verified drivers for your everyday travel. Availability depends on nearby drivers and operating conditions.",
              ["verified drivers"],
            )}
          </p>
          <p className={body}>
            <span className="font-semibold text-[#0b0b0b]">Pool Ride:</span>{" "}
            {emphasizePhrases(
              "Share your journey with passengers travelling in the same direction. Pool Ride availability depends on matching routes and driver availability.",
              ["same direction"],
            )}
          </p>
          <p className={body}>
            <span className="font-semibold text-[#0b0b0b]">Delivery:</span>{" "}
            {emphasizePhrases(
              "Send parcels, documents and packages through verified delivery partners. Availability and delivery times are subject to service coverage and operating requirements.",
              ["verified delivery partners"],
            )}
          </p>
          <p className={body}>
            <span className="font-semibold text-[#0b0b0b]">Logistics:</span>{" "}
            {emphasizePhrases(
              "Traveling Partner provides logistical and transport support for businesses. Fleet availability depends on operational capacity and service requirements.",
              ["logistical and transport support"],
            )}
          </p>
          <p className={body}>
            <span className="font-semibold text-[#0b0b0b]">Trip:</span>{" "}
            {emphasizePhrases(
              "Book intercity travel with verified drivers. Trip availability depends on destination, scheduling and driver availability.",
              ["intercity travel", "verified drivers"],
            )}
          </p>
          <p className={body}>
            {emphasizePhrases(
              "Fares can change depending on how many drivers are around, how busy things are, the weather, and stuff like that.",
              ["Fares can change"],
            )}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    slug: "payments",
    title: "Payments",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "Payments can be completed using the payment methods available on the Traveling Partner platform.",
            ["payment methods available"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "By confirming a booking, you agree to pay the applicable fare, delivery charges, tolls, waiting charges or any other fees related to your booking.",
            [
              "confirming a booking",
              "fare, delivery charges, tolls, waiting charges",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 6,
    slug: "refund-policy",
    title: "Refund Policy",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "If you believe you have been charged incorrectly or experienced a problem with a booking, you may contact our support team to request a review.",
            ["charged incorrectly", "support team"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Where a refund is approved, it will be processed using the original payment method whenever possible. Refund eligibility depends on the circumstances of the booking.",
            ["refund is approved", "original payment method"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 7,
    slug: "restrictions-and-user-conduct",
    title: "Restrictions & User Conduct",
    content: (
      <div className="space-y-5">
        <div className="space-y-4">
          <p className={`${body} font-semibold text-[#0b0b0b]`}>
            Driver Conduct
          </p>
          <p className={body}>
            {emphasizePhrases(
              "Drivers and couriers using Traveling Partner are expected to provide a safe and professional experience.",
              ["safe and professional experience"],
            )}
          </p>
          <ul className={checkList}>
            <CheckItem>
              {emphasizePhrases("Follow local traffic laws.", [
                "local traffic laws",
              ])}
            </CheckItem>
            <CheckItem>Be nice to the customers on the ride.</CheckItem>
            <CheckItem>
              {emphasizePhrases(
                "Accept a booking only if you are able to complete it.",
                ["able to complete it"],
              )}
            </CheckItem>
            <CheckItem>
              {emphasizePhrases(
                "Keep vehicles in safe operating condition.",
                ["safe operating condition"],
              )}
            </CheckItem>
            <CheckItem>
              Make every reasonable effort to complete accepted bookings.
            </CheckItem>
          </ul>
        </div>
        <div className="space-y-4">
          <p className={`${body} font-semibold text-[#0b0b0b]`}>User Conduct</p>
          <p className={body}>
            {emphasizePhrases(
              "Everyone using Traveling Partner is expected to treat others respectfully.",
              ["treat others respectfully"],
            )}
          </p>
          <p className={body}>Please do not:</p>
          <ul className={checkList}>
            <CheckItem>
              {emphasizePhrases(
                "Create an account using false information.",
                ["false information"],
              )}
            </CheckItem>
            <CheckItem>
              Use the platform for anything other than its intended purpose.
            </CheckItem>
            <CheckItem>
              Intentionally damage vehicles, parcels or property connected with a
              booking.
            </CheckItem>
            <CheckItem>
              {emphasizePhrases(
                "Threaten, abuse or harass drivers, couriers, customers or our support team.",
                ["Threaten, abuse or harass"],
              )}
            </CheckItem>
            <CheckItem>
              {emphasizePhrases(
                "Engage in illegal activity through the platform.",
                ["illegal activity"],
              )}
            </CheckItem>
          </ul>
          <p className={body}>
            {emphasizePhrases(
              "Failure to follow these rules may result in suspension or permanent removal of your account.",
              ["suspension or permanent removal"],
            )}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    slug: "privacy",
    title: "Privacy",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases("We value your privacy.", ["value your privacy"])}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Our Privacy Policy explains what information we collect, how we use it and the steps we take to protect your personal information while you are using Traveling Partner.",
            ["Privacy Policy", "personal information"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 9,
    slug: "termination",
    title: "Termination",
    content: (
      <div className="space-y-4">
        <p className={`${body} font-semibold text-[#0b0b0b]`}>
          Platform Responsibility
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Traveling Partner is a technology platform that connects riders, drivers, couriers and business partners.",
            ["technology platform"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Drivers and couriers operate independently and remain responsible for the transportation or delivery services they provide. Traveling Partner does not own vehicles or employ drivers and couriers to provide transportation services.",
            [
              "operate independently",
              "does not own vehicles or employ drivers and couriers",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 10,
    slug: "disclaimer",
    title: "Disclaimer",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <DefinitionCard label="Intellectual Property">
          {emphasizePhrases(
            "The Traveling Partner name, logo, mobile application, website, designs, graphics and other platform content belong to Traveling Partner unless stated otherwise. They may not be copied, modified, reproduced or used without prior written permission.",
            [
              "belong to Traveling Partner",
              "prior written permission",
            ],
          )}
        </DefinitionCard>
        <DefinitionCard label="Third Party Services">
          {emphasizePhrases(
            "Some of the services offered on the Traveling Partner platform may be provided by independent businesses, payment providers or other third-party service providers. Their products and services are governed by their own policies and terms where applicable.",
            [
              "third-party service providers",
              "their own policies and terms",
            ],
          )}
        </DefinitionCard>
      </div>
    ),
  },
  {
    id: 11,
    slug: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "Traveling Partner works as a technology platform that connects users with independent service providers.",
            ["independent service providers"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Traveling Partner shall not be responsible for delays due to traffic, weather, vehicle breakdowns or other circumstances beyond our reasonable control, to the extent permitted by applicable law.",
            [
              "shall not be responsible",
              "beyond our reasonable control",
            ],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 12,
    slug: "unforeseen-events",
    title: "Unforeseen Events",
    content: (
      <div className="space-y-4">
        <p className={`${body} font-semibold text-[#0b0b0b]`}>Force Majeure</p>
        <p className={body}>
          {emphasizePhrases(
            "Sometimes things happen that are beyond anyone's control such as bad weather, natural disasters, government restrictions, internet outages or other unforeseen circumstances.",
            ["beyond anyone's control"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "If this occurs, some services may be delayed or temporarily unavailable.",
            ["delayed or temporarily unavailable"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 13,
    slug: "governing-law",
    title: "Governing Law",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "These Terms & Conditions shall be governed by the laws of the Islamic Republic of Pakistan.",
            ["laws of the Islamic Republic of Pakistan"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "Any dispute relating to these Terms or use of Traveling Partner shall be governed by the laws of Pakistan.",
            ["laws of Pakistan"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 14,
    slug: "dispute-resolution",
    title: "Dispute Resolution",
    content: (
      <p className={body}>
        {emphasizePhrases(
          "If you have a concern, tell us first. Our support team can sort out most problems without the need for anything else. If we can't fix it that way, either side can take further steps under the laws of Pakistan.",
          ["tell us first", "support team", "laws of Pakistan"],
        )}
      </p>
    ),
  },
  {
    id: 15,
    slug: "changes",
    title: "Changes to Terms",
    content: (
      <div className="space-y-4">
        <p className={body}>
          {emphasizePhrases(
            "We might update these Terms sometimes if our platform, services, or the law changes. You'll always find the newest version on our website and app.",
            ["newest version"],
          )}
        </p>
        <p className={body}>
          {emphasizePhrases(
            "The latest version will always be available on our website and mobile application. By continuing to use Traveling Partner after any update, you agree to the revised Terms.",
            ["latest version", "revised Terms"],
          )}
        </p>
      </div>
    ),
  },
  {
    id: 16,
    slug: "contact-us",
    title: "Contact Us",
    titleSuffix: ".",
    content: (
      <div className="space-y-3">
        <p className={body}>
          Questions about these Terms &amp; Conditions?
        </p>
        <p className={body}>
          {emphasizePhrases("Our support team is available to help.", [
            "support team",
          ], "onDark")}
        </p>
        <p className={body}>
          Email:{" "}
          <a
            href="mailto:support@traveling-partner.com"
            className="font-semibold text-[#FCE001] hover:underline"
          >
            support@traveling-partner.com
          </a>
        </p>
      </div>
    ),
  },
];

/** Closing paragraph shown below Contact Us. */
export const termsClosingMessage =
  "By creating an account, booking a ride, sending a parcel or using any service on the platform, you agree to these Terms.";

/** Nav labels for sidebar / index. */
export const termsNavItems = [
  { slug: "introduction", label: "Introduction", id: 1 },
  { slug: "definitions", label: "Definitions", id: 2 },
  { slug: "registration-and-accounts", label: "Registration & Accounts", id: 3 },
  { slug: "services", label: "Services", id: 4 },
  { slug: "payments", label: "Payments", id: 5 },
  { slug: "refund-policy", label: "Refund Policy", id: 6 },
  {
    slug: "restrictions-and-user-conduct",
    label: "Restrictions & Conduct",
    id: 7,
  },
  { slug: "privacy", label: "Privacy", id: 8 },
  { slug: "termination", label: "Termination", id: 9 },
  { slug: "disclaimer", label: "Disclaimer", id: 10 },
  { slug: "limitation-of-liability", label: "Limitation of Liability", id: 11 },
  { slug: "unforeseen-events", label: "Unforeseen Events", id: 12 },
  { slug: "governing-law", label: "Governing Law", id: 13 },
  { slug: "dispute-resolution", label: "Dispute Resolution", id: 14 },
  { slug: "changes", label: "Changes to Terms", id: 15 },
  { slug: "contact-us", label: "Contact Us", id: 16 },
] as const;
