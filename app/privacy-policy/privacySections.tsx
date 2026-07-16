import React from "react";

export interface PrivacySection {
  id: number;
  slug: string;
  title: string;
  content: React.ReactNode;
}

const body = "text-[#5c5b55] text-[14px] sm:text-[15px] leading-[1.75]";

function CalloutCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-[#f5e9b8] border-l-[5px] border-l-[#FCE001] bg-[#FFFBEB] px-4 py-4 sm:rounded-[16px] sm:px-5 sm:py-5">
      <p className="mb-2 text-[14px] font-bold text-[#0b0b0b] sm:text-[15px]">{label}</p>
      <p className={body}>{children}</p>
    </div>
  );
}

export const privacySections: PrivacySection[] = [
  {
    id: 1,
    slug: "introduction",
    title: "Introduction",
    content: (
      <p className={body}>
        Welcome to Traveling Partner, where your privacy and security are central to
        our commitment. We are dedicated to safeguarding your personal information
        while providing you with a seamless experience using our diverse services.
        This Privacy Policy serves as a comprehensive guide for all types of users on
        how we collect, utilize, disclose, and protect your data. By utilizing our
        services, you explicitly agree to the principles outlined in this policy.
      </p>
    ),
  },
  {
    id: 2,
    slug: "information-we-collect",
    title: "Information We Collect",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <p className={body}>
          To deliver a personalized and efficient experience, we collect various types
          of information:
        </p>
        <CalloutCard label="Personal Information">
          This encompasses your name, contact details, and, if required, identification
          documents to comply with local regulations.
        </CalloutCard>
        <CalloutCard label="Location Data">
          We rely on your location to match you swiftly with nearby ride requests,
          facilitating convenience for Partners and helping Drivers optimize routes. You
          have the option to disable location tracking but bear in mind that this may
          affect certain functionalities.
        </CalloutCard>
      </div>
    ),
  },
  {
    id: 3,
    slug: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <p className={body}>
          Your data plays a pivotal role in enhancing your Traveling Partner
          experience:
        </p>
        <CalloutCard label="Connecting Individuals, Empowering Collaboration">
          Our aim is to gather people of the same destination, Therefore, they may lend
          a hand to each other. As the app is commission-free, users may operate with
          more courage, fostering collaboration and mutual support among our community
          of travelers.
        </CalloutCard>
      </div>
    ),
  },
  {
    id: 4,
    slug: "data-security",
    title: "Data Security",
    content: (
      <p className={body}>
        We take the security of your data seriously and employ industry-standard
        measures to protect it from unauthorized access, disclosure, alteration, or
        destruction. Our encryption protocols and rigorous security practices are in
        place to ensure your information remains safe.
      </p>
    ),
  },
  {
    id: 5,
    slug: "data-sharing",
    title: "Data Sharing",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <p className={body}>
          To provide you with a seamless experience, we may share your information with
          specific parties:
        </p>
        <CalloutCard label="Fostering Connectivity">
          Our platform encourages sharing information between users, fostering
          collaboration and support among the community, keeping in line with our aim to
          unite people of the same destination.
        </CalloutCard>
      </div>
    ),
  },
  {
    id: 6,
    slug: "your-choices",
    title: "Your Choices",
    content: (
      <div className="space-y-3 sm:space-y-4">
        <p className={body}>Your control is paramount:</p>
        <CalloutCard label="Empowering Decisions">
          Users have the power to manage their personal information and enable or
          disable location tracking as per their preferences, encouraging a
          collaborative and supportive environment among travelers.
        </CalloutCard>
      </div>
    ),
  },
  {
    id: 7,
    slug: "changes",
    title: "Changes to this Policy",
    content: (
      <p className={body}>
        To keep you informed and updated, we may periodically update this Privacy Policy
        to reflect changes in our practices, adhere to evolving legal requirements, or
        address operational needs. Rest assured, you will receive notifications of
        significant changes.
      </p>
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
  { slug: "how-we-use", label: "How We Use Your Information", id: 3 },
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
    description: "Personal details and location data used to power your trips.",
  },
  {
    icon: "/images/privacy/icon-overview-people.png",
    title: "How we use your data",
    description: "Connecting travelers and improving the Traveling Partner experience.",
  },
  {
    icon: "/images/privacy/icon-overview-security.png",
    title: "Data security",
    description: "Industry-standard measures to keep your information protected.",
  },
  {
    icon: "/images/privacy/icon-overview-mailbox.png",
    title: "Changes to this Policy",
    description: "We notify you when our privacy practices are updated.",
  },
] as const;

export const privacyClosingCard = {
  paragraph1: (
    <>
      At <strong className="font-bold text-[#0b0b0b]">Traveling Partner</strong>, we
      are dedicated to simplifying transportation, ensuring it is cost-effective,
      convenient, and secure for both Drivers and Partners. We appreciate your choice
      to make us your preferred travel companion.
    </>
  ),
  paragraph2: (
    <>
      <strong className="font-bold text-[#0b0b0b]">What sets us apart</strong> are two
      key features: our app operates on a{" "}
      <strong className="font-bold text-[#0b0b0b]">commission-free model</strong>,
      giving users more independence and courage in their engagements. And Traveling
      Partner aims to foster a{" "}
      <strong className="font-bold text-[#0b0b0b]">collaborative environment</strong>{" "}
      where individuals can support and collaborate for mutual benefit.
    </>
  ),
};
