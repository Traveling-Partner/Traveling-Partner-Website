import React from "react";
import {
  BookOpen,
  Database,
  Sparkles,
  Lock,
  Share2,
  Settings,
  FileText,
  HelpCircle,
} from "lucide-react";
import LegalContactInfo from "@/components/legal/LegalContactInfo";

export interface PrivacySection {
  id: number;
  slug: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

const body = "text-gray-600 text-sm sm:text-base leading-relaxed";

export const privacySections: PrivacySection[] = [
  {
    id: 1,
    slug: "introduction",
    icon: BookOpen,
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
    icon: Database,
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p className={body}>
          To deliver a personalized and efficient experience, we collect various types
          of information:
        </p>
        <p className={body}>
          Personal Information: This encompasses your name, contact details, and, if
          required, identification documents to comply with local regulations.
        </p>
        <p className={body}>
          Location Data: We rely on your location to match you swiftly with nearby ride
          requests, facilitating convenience for Partners and helping Drivers optimize
          routes. You have the option to disable location tracking but bear in mind
          that this may affect certain functionalities.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    slug: "how-we-use",
    icon: Sparkles,
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p className={body}>
          Your data plays a pivotal role in enhancing your Traveling Partner
          experience:
        </p>
        <p className={body}>
          Connecting Individuals, Empowering Collaboration: Our aim is to gather people
          of the same destination, Therefore, they may lend a hand to each other. As
          the app is commission-free, users may operate with more courage, fostering
          collaboration and mutual support among our community of travelers.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    slug: "data-security",
    icon: Lock,
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
    icon: Share2,
    title: "Data Sharing",
    content: (
      <div className="space-y-4">
        <p className={body}>
          To provide you with a seamless experience, we may share your information with
          specific parties:
        </p>
        <p className={body}>
          Fostering Connectivity: Our platform encourages sharing information between
          users, fostering collaboration and support among the community, keeping in
          line with our aim to unite people of the same destination.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    slug: "your-choices",
    icon: Settings,
    title: "Your Choices",
    content: (
      <div className="space-y-4">
        <p className={body}>Your control is paramount:</p>
        <p className={body}>
          Empowering Decisions: Users have the power to manage their personal
          information and enable or disable location tracking as per their
          preferences, encouraging a collaborative and supportive environment among
          travelers.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    slug: "changes",
    icon: FileText,
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
    icon: HelpCircle,
    title: "Contact Us",
    content: (
      <div className="space-y-4">
        <p className={body}>Your feedback and questions are invaluable:</p>
        <p className={body}>
          If you have any concerns or inquiries regarding our Privacy Policy or data
          practices, don&apos;t hesitate to reach out to us:
        </p>
        <LegalContactInfo />
        <p className={body}>
          At Traveling Partner, we are dedicated to simplifying transportation, ensuring
          it is cost-effective, convenient, and secure for both Drivers and Partners.
          We appreciate your choice to make us your preferred travel companion. What
          sets us apart are two key features: First, our app operates on a
          commission-free model, giving users more independence and courage in their
          engagements. Second, Traveling Partner aims to foster a collaborative
          environment where individuals can support and collaborate for mutual
          benefit.
        </p>
      </div>
    ),
  },
];
