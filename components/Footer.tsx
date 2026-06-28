"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const CONTAINER_MAX = 1730.909;

const FOOTER_LINKS = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  services: [
    { label: "Taxi Stand", href: "/taxi-stand" },
    { label: "Pool Ride", href: "/pool-ride" },
    { label: "Delivery", href: "/delivery" },
    { label: "Logistics", href: "/logistic" },
    { label: "Trip", href: "/trip" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety Guidelines", href: "/help#safety-and-security" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-conditions" },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61556082625668",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/travellpartnerr/",
  },
  { icon: FaXTwitter, label: "X", href: "https://x.com/PartnerP2D" },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/traveling-partner",
  },
] as const;

const PLAY_STORE_HREF = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_HREF = "https://www.apple.com/app-store/";

const FOOTER_IMAGES = {
  duns: "/images/footer/duns-badge.png",
  googlePlay: "/images/footer/google-play-badge.png",
  appStore: "/images/footer/app-store-badge.png",
} as const;

function TrustAndAppsColumn(): React.ReactElement {
  return (
    <div className="w-fit max-w-none shrink-0 overflow-visible">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FOOTER_IMAGES.duns}
        alt="Dun & Bradstreet D-U-N-S Registered"
        width={192}
        height={149}
        className="block h-auto w-[192px] max-w-none"
        decoding="async"
      />

      <div className="mt-3 flex flex-row flex-nowrap items-center gap-2">
        <a
          href={PLAY_STORE_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="block shrink-0 leading-none transition-opacity hover:opacity-90"
          aria-label="Get it on Google Play"
        >
          <Image
            src={FOOTER_IMAGES.googlePlay}
            alt=""
            width={92}
            height={31}
            unoptimized
            className="block h-[34px] w-auto"
          />
        </a>
        <a
          href={APP_STORE_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="block shrink-0 leading-none transition-opacity hover:opacity-90"
          aria-label="Download on the App Store"
        >
          <Image
            src={FOOTER_IMAGES.appStore}
            alt=""
            width={92}
            height={31}
            unoptimized
            className="block h-[34px] w-auto"
          />
        </a>
      </div>
    </div>
  );
}

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}): React.ReactElement {
  return (
    <div className="min-w-0">
      <h3 className="font-poppins text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[12px]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-poppins text-[13px] font-normal leading-snug text-[#6f6e68] transition-colors hover:text-[#0b0b0b] sm:text-[14px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterBanner(): React.ReactElement {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <div className="rounded-[24px] bg-gradient-to-r from-[#fce001] to-[#fdb813] px-5 py-6 sm:rounded-[28px] sm:px-8 sm:py-7 lg:px-10 lg:py-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="min-w-0 shrink-0">
          <h2 className="font-poppins text-[22px] font-bold leading-tight text-[#0b0b0b] sm:text-[26px] lg:text-[28px]">
            Stay in the loop
          </h2>
          <p className="mt-1.5 font-poppins text-[13px] font-normal leading-snug text-[#0b0b0b]/85 sm:text-[14px] lg:text-[15px]">
            Get travel tips, safety updates, and exclusive offers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 max-w-[560px] items-center rounded-full bg-white p-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] lg:shrink-0"
        >
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            required
            className="min-w-0 flex-1 bg-transparent px-4 py-2.5 font-poppins text-[13px] text-[#0b0b0b] outline-none placeholder:text-[#a8a59d] sm:px-5 sm:text-[14px]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#0b0b0b] px-5 py-2.5 font-poppins text-[13px] font-semibold text-white transition-colors hover:bg-[#1a1a1a] sm:px-6 sm:py-3 sm:text-[14px]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full overflow-hidden bg-[#fffcf2] text-[#0b0b0b]">
      <div
        className="mx-auto w-full px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 md:px-8 lg:px-[95px] lg:pb-12 lg:pt-14"
        style={{ maxWidth: CONTAINER_MAX }}
      >
        <NewsletterBanner />

        <div className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-16 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-x-10 xl:gap-x-14">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/images/traveling-partner-logo.png"
                alt="Traveling Partner"
                width={220}
                height={52}
                className="h-[42px] w-auto sm:h-[48px]"
              />
            </Link>
            <p className="mt-4 max-w-[300px] font-poppins text-[13px] font-normal leading-[1.65] text-[#6f6e68] sm:mt-5 sm:text-[14px]">
              Your ultimate travel companion. Commission-free rides, logistics, and trip
              planning across Pakistan.
            </p>
          </div>

          <FooterLinkColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterLinkColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterLinkColumn title="Support" links={FOOTER_LINKS.support} />

          <div className="w-fit shrink-0 overflow-visible">
            <TrustAndAppsColumn />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-[#ddd8cb] pt-6 sm:mt-14 sm:flex-row sm:pt-7">
          <p className="font-poppins text-[12px] font-normal text-[#8a877f] sm:text-[13px]">
            © {new Date().getFullYear()} Traveling Partner. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8e4d9] text-[#6f6e68] transition-colors hover:bg-[#ddd8cb] hover:text-[#0b0b0b]"
              >
                <social.icon className="h-3.5 w-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
