"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import NewsletterSection from "@/components/Footer-sections/NewsletterSection";

const FOOTER_LINKS = {
  /** Interleaved for 2-column mobile: col1 = even indices, col2 = odd */
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/contact" },
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

function getHrefPath(href: string): string {
  const path = href.split("#")[0] || "/";
  return path === "" ? "/" : path;
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function FooterNavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}): React.ReactElement {
  const pathname = usePathname();
  const targetPath = getHrefPath(href);
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const current = pathname || "/";
    const isSamePage =
      current === targetPath ||
      (targetPath === "/" && current === "/");

    if (!isSamePage) return;

    if (hash) {
      event.preventDefault();
      scrollToHash(hash);
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

function TrustAndAppsBlock({ mobile = false }: { mobile?: boolean }): React.ReactElement {
  if (mobile) {
    return (
      <div className="flex items-center gap-5 sm:gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOTER_IMAGES.duns}
          alt="Dun & Bradstreet D-U-N-S Registered"
          width={192}
          height={149}
          className="block h-auto w-[132px] shrink-0 sm:w-[148px]"
          decoding="async"
        />
        <div className="flex flex-col gap-2.5">
          <a
            href={PLAY_STORE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="block leading-none transition-opacity hover:opacity-90"
            aria-label="Get it on Google Play"
          >
            <Image
              src={FOOTER_IMAGES.googlePlay}
              alt=""
              width={120}
              height={36}
              unoptimized
              className="block h-[32px] w-auto sm:h-[34px]"
            />
          </a>
          <a
            href={APP_STORE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="block leading-none transition-opacity hover:opacity-90"
            aria-label="Download on the App Store"
          >
            <Image
              src={FOOTER_IMAGES.appStore}
              alt=""
              width={120}
              height={36}
              unoptimized
              className="block h-[32px] w-auto sm:h-[34px]"
            />
          </a>
        </div>
      </div>
    );
  }

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
  splitColumns = false,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  splitColumns?: boolean;
}): React.ReactElement {
  const colLeft = links.filter((_, index) => index % 2 === 0);
  const colRight = links.filter((_, index) => index % 2 === 1);

  const linkClass =
    "font-poppins text-[13px] font-normal leading-snug text-[#6f6e68] transition-colors hover:text-[#0b0b0b] sm:text-[14px]";

  return (
    <div className="min-w-0">
      <h3 className="font-poppins text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b0b0b] sm:text-[12px]">
        {title}
      </h3>
      <div className="mt-2.5 h-px w-full bg-[#ddd8cb]" aria-hidden />

      {splitColumns ? (
        <div className="mt-3 grid grid-cols-2 gap-x-6 sm:gap-x-10">
          <ul className="space-y-2.5">
            {colLeft.map((link) => (
              <li key={link.label}>
                <FooterNavLink href={link.href} className={linkClass}>
                  {link.label}
                </FooterNavLink>
              </li>
            ))}
          </ul>
          <ul className="space-y-2.5">
            {colRight.map((link) => (
              <li key={link.label}>
                <FooterNavLink href={link.href} className={linkClass}>
                  {link.label}
                </FooterNavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <FooterNavLink href={link.href} className={linkClass}>
                {link.label}
              </FooterNavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full overflow-hidden bg-[#fffcf2] text-[#0b0b0b]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-12 lg:px-8 lg:pb-7 lg:pt-14">
        <NewsletterSection />

        {/* Mobile — stacked sections like reference */}
        <div className="mt-10 lg:hidden">
          <FooterNavLink href="/" className="inline-block h-[52px] w-[95px] shrink-0">
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={110}
              height={65}
              className="h-full w-full object-contain object-left"
            />
          </FooterNavLink>
          <p className="mt-4 font-poppins text-[13px] font-normal leading-[1.65] text-[#6f6e68]">
            Revolutionizing urban mobility across Pakistan. Fast, safe, and reliable rides
            at your fingertips with zero commission.
          </p>

          <div className="mt-9 space-y-7">
            <FooterLinkColumn title="Company" links={FOOTER_LINKS.company} splitColumns />
            <FooterLinkColumn title="Services" links={FOOTER_LINKS.services} splitColumns />
            <FooterLinkColumn title="Support" links={FOOTER_LINKS.support} splitColumns />
          </div>

          <div className="mt-9">
            <TrustAndAppsBlock mobile />
          </div>
        </div>

        {/* Desktop */}
        <div className="mt-12 hidden gap-x-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] xl:gap-x-14">
          <div className="min-w-0 lg:col-span-1">
            <FooterNavLink href="/" className="inline-block h-[56px] w-[102px] shrink-0">
              <Image
                src="/images/traveling-partner-logo.png"
                alt="Traveling Partner"
                width={110}
                height={65}
                className="h-full w-full object-contain object-left"
              />
            </FooterNavLink>
            <p className="mt-5 max-w-[300px] font-poppins text-[14px] font-normal leading-[1.65] text-[#6f6e68]">
              Revolutionizing urban mobility across Pakistan. Fast, safe, and reliable rides
              at your fingertips with zero commission.
            </p>
          </div>

          <FooterLinkColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterLinkColumn title="Services" links={FOOTER_LINKS.services} />
          <FooterLinkColumn title="Support" links={FOOTER_LINKS.support} />

          <div className="w-fit shrink-0 overflow-visible">
            <TrustAndAppsBlock />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#ddd8cb] pt-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
          <p className="font-poppins text-[12px] font-normal text-[#8a877f] sm:text-[13px]">
            © {new Date().getFullYear()} Traveling Partner. All rights reserved.
          </p>

          <div className="flex items-center gap-3 sm:justify-end">
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
