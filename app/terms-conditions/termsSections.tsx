import React from "react";
import LegalContactInfo from "@/components/legal/LegalContactInfo";

export interface TermsSection {
  id: number;
  slug: string;
  title: string;
  /** Display title suffix e.g. "!" for section 6 */
  titleSuffix?: string;
  content: React.ReactNode;
}

const body = "text-gray-600 text-sm sm:text-base leading-relaxed";

export const termsSections: TermsSection[] = [
  {
    id: 1,
    slug: "introduction",
    title: "Introduction",
    content: (
      <p className={body}>
        Welcome to Travelling Partner! These Terms and Conditions govern your use of
        our services as a Driver or a Partner. Please read this document carefully as
        it outlines the terms under which you may access and utilize our platform. By
        using our services, you agree to comply with and be bound by these Terms and
        Conditions.
      </p>
    ),
  },
  {
    id: 2,
    slug: "definitions",
    title: "Definitions",
    content: (
      <div className="space-y-4">
        <p className={body}>
          &quot;Traveling Partner&quot; refers to our platform and mobile application
          that empowers Drivers to provide Transportation, Delivery Services, logistics
          services, and Trip planning services to Partners within and between cities.
          Notably, Traveling Partner is distinctive for being a commission-free
          platform, offering users greater autonomy and decision-making freedom in their
          transactions.
        </p>
        <p className={body}>
          &quot;Driver&quot; refers to individuals who leverage the Traveling Partner
          platform to offer transportation, delivery, logistics, or trip-planning
          services to Partners, benefiting from the platform&apos;s commission-free
          approach, fostering greater independence and confidence in their service
          provisions.
        </p>
        <p className={body}>
          &quot;Partner&quot; refers to individuals who utilize the Traveling Partner
          platform to book rides, deliveries, logistics services, or plan trips,
          appreciating the commission-free nature of the platform, and allowing for more
          flexible and collaborative engagements between users.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    slug: "registration-and-accounts",
    title: "Registration and Accounts",
    content: (
      <p className={body}>
        To access and use our services, you must create an account and provide
        accurate, current, and complete information. You are responsible for
        maintaining the confidentiality of your account information and for all
        activities that occur under your account.
      </p>
    ),
  },
  {
    id: 4,
    slug: "services",
    title: "Services",
    content: (
      <div className="space-y-4">
        <p className={body}>Pooling People, Uniting Journeys:</p>
        <p className={body}>
          Ride Bookings: Travelling Partner connects Partners with Drivers for
          transportation services within and between cities. Please note that
          Travelling Partner will not provide an Estimated Fare nor any formula to
          calculate the Fare. Driver and Partner will be independent to negotiate and
          finalize this at their end.
        </p>
        <p className={body}>
          Delivery Services: Drivers can offer delivery services to Partners for the
          transportation of goods and packages.
        </p>
        <p className={body}>
          Logistics: We facilitate logistics services, connecting businesses and
          individuals with reliable transport solutions.
        </p>
        <p className={body}>
          Pool Rides: Users can share rides with other travelers for a more economical
          and eco-friendly experience.
        </p>
        <p className={body}>
          Trip Planning: Travelling Partner also offers a feature for planning trips for
          family, friends, or group outings. Users can easily choose their trip driver,
          companions, and itinerary through the app, simplifying the trip planning
          process.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    slug: "payment",
    title: "Payment",
    content: (
      <div className="space-y-4">
        <p className={body}>Freedom to Choose, Commission-Free:</p>
        <p className={body}>
          Traveling Partner does not have a payment processing system, as the Traveling
          Partner is not a commission-based App. Therefore, users may finalize the
          method of payment at their discretion
        </p>
      </div>
    ),
  },
  {
    id: 6,
    slug: "features",
    title: "Features That Set Travelling Partner Apart",
    titleSuffix: "!",
    content: (
      <div className="space-y-4">
        <p className={body}>Empowering Independence, Anywhere in Pakistan:</p>
        <p className={body}>
          The following two salient features make Travelling Partner stand out from the
          rest:
        </p>
        <p className={body}>
          i. This App is commission-free, therefore, Users may operate the app with more
          freedom and confidence.
        </p>
        <p className={body}>
          ii. This App may be used anywhere in Pakistan, where an internet facility is
          available.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    slug: "user-conduct",
    title: "User Conduct",
    content: (
      <div className="space-y-4">
        <p className={body}>You agree not to:</p>
        <ul className={`${body} list-disc pl-6 space-y-2`}>
          <li>Violate any local, state, or national laws.</li>
          <li>
            Use the Travelling Partner platform for any illegal, harmful, or unauthorized
            activities.
          </li>
          <li>Harass, threaten, or harm other users or Travelling Partner employees.</li>
          <li>
            Interfere with or disrupt the Travelling Partner platform or its
            functionality.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 8,
    slug: "privacy",
    title: "Privacy",
    content: (
      <p className={body}>
        Your use of Travelling Partner is also governed by our Privacy Policy, which
        outlines how we collect, use, and protect your data. You consent to the
        practices outlined in the Privacy Policy by using our services.
      </p>
    ),
  },
  {
    id: 9,
    slug: "termination",
    title: "Termination",
    content: (
      <p className={body}>
        We reserve the right to terminate or suspend your account and access to our
        services at our discretion, without notice, for any violation of these Terms and
        Conditions.
      </p>
    ),
  },
  {
    id: 10,
    slug: "disclaimers",
    title: "Disclaimers",
    content: (
      <ul className={`${body} list-disc pl-6 space-y-3`}>
        <li>
          Traveling Partner does not guarantee the availability of Drivers, trip planning
          services, or the accuracy of ride or delivery times due to the varied nature of
          user engagement.
        </li>
        <li>
          Traveling Partner is not responsible for any goods or packages transported
          through our platform, as the platform operates on a commission-free basis,
          granting users the autonomy to make independent arrangements.
        </li>
      </ul>
    ),
  },
  {
    id: 11,
    slug: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <p className={body}>
        Traveling Partner and its affiliates are not liable for any indirect, incidental,
        special, consequential, or punitive damages, any loss of profits or revenues,
        whether incurred directly or indirectly, or any loss of data, use, goodwill, or
        any other tangible or intangible losses. This limitation is in place due to the
        nature of Traveling Partner being a commission-free app, fostering user
        independence and decision-making in various aspects of the offered services.
      </p>
    ),
  },
  {
    id: 12,
    slug: "changes",
    title: "Changes to Terms and Conditions",
    content: (
      <p className={body}>
        We may update these Terms and Conditions from time to time to reflect changes in
        our practices, legal requirements, or operational needs. Continued use of our
        services after such changes implies your consent to the revised Terms and
        Conditions.
      </p>
    ),
  },
  {
    id: 13,
    slug: "contact-us",
    title: "Contact Us",
    titleSuffix: ".",
    content: (
      <div className="space-y-4">
        <p className={body}>
          For questions, concerns, or inquiries related to these Terms and Conditions,
          please contact us:
        </p>
        <LegalContactInfo />
        <p className={body}>
          Thank you for choosing Travelling Partner. We are dedicated to streamlining
          transportation, logistics, and trip planning while ensuring a secure and
          efficient experience for the users.
        </p>
      </div>
    ),
  },
];
