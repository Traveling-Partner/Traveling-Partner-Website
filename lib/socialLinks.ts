import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { FaThreads, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialLink = {
  icon: IconType;
  label: string;
  href: string;
};

/** Official Traveling Partner social profiles (content doc). */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/travelingpartnerofficial/",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/travelingpartnerofficial/",
  },
  {
    icon: FaThreads,
    label: "Threads",
    href: "https://www.threads.com/@travelingpartnerofficial",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/TravelPartnerHQ",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/travelingpartnerofficial/",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@travelingpartnerofficial",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@travelingpartnerr_",
  },
  {
    icon: FaPinterest,
    label: "Pinterest",
    href: "https://www.pinterest.com/travelingpartnerofficial/",
  },
  {
    icon: FaReddit,
    label: "Reddit",
    href: "https://www.reddit.com/user/partner_official/",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    href: "https://discord.gg/ZQKqpbRYV",
  },
] as const;
