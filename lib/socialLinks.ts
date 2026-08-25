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
  /** Official brand color for the glyph (light backgrounds) */
  color: string;
  /** Glyph color on dark surfaces — defaults to `color` when omitted */
  colorOnDark?: string;
};

/** Official Traveling Partner social profiles (content doc). */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/travelingpartnerofficial/",
    color: "#1877F2",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/travelingpartnerofficial/",
    color: "#E4405F",
  },
  {
    icon: FaThreads,
    label: "Threads",
    href: "https://www.threads.com/@travelingpartnerofficial",
    color: "#000000",
    colorOnDark: "#FFFFFF",
  },
  {
    icon: FaXTwitter,
    label: "X",
    href: "https://x.com/TravelPartnerHQ",
    color: "#000000",
    colorOnDark: "#FFFFFF",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/travelingpartnerofficial/",
    color: "#0A66C2",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "https://www.youtube.com/@travelingpartnerofficial",
    color: "#FF0000",
  },
  {
    icon: FaTiktok,
    label: "TikTok",
    href: "https://www.tiktok.com/@travelingpartnerofficial",
    color: "#000000",
    colorOnDark: "#FFFFFF",
  },
  {
    icon: FaPinterest,
    label: "Pinterest",
    href: "https://www.pinterest.com/travelingpartnerofficial/",
    color: "#E60023",
  },
  {
    icon: FaReddit,
    label: "Reddit",
    href: "https://www.reddit.com/user/partner_official/",
    color: "#FF4500",
  },
  {
    icon: FaDiscord,
    label: "Discord",
    href: "https://discord.gg/ZQKqpbRYV",
    color: "#5865F2",
  },
] as const;
