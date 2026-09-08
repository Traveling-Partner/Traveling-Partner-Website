"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NewsletterSection from "@/components/Footer-sections/NewsletterSection";
import { SOCIAL_LINKS } from "@/lib/socialLinks";

const FOOTER_LINKS = {
  /** Interleaved for 2-column mobile: col1 = even indices, col2 = odd */
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  services: [
    { label: "Taxi Ride", href: "/taxi-ride" },
    { label: "Pool Ride", href: "/pool-ride" },
    { label: "Delivery", href: "/delivery" },
    { label: "Logistics", href: "/logistic" },
    { label: "Tourism", href: "/tourism" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-conditions" },
  ],
} as const;

const PLAY_STORE_HREF = "https://play.google.com/store/apps?hl=en&gl=US";
const APP_STORE_HREF = "https://www.apple.com/app-store/";

const FOOTER_IMAGES = {
  duns: "/images/footer/duns-badge.png",
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

function PlayStoreIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.6 2.2c-.3.2-.5.5-.5.9v17.8c0 .4.2.7.5.9l9.3-9.8L3.6 2.2z"
        fill="#00D7FF"
      />
      <path
        d="M13.2 12.2l2.4 2.5 3.8-2.2c.7-.4.7-1.1 0-1.5l-3.8-2.2-2.4 2.5.1.9-.1.5z"
        fill="#FFD400"
      />
      <path
        d="M13.2 11.8L3.6 2.2c.2-.1.4-.2.7-.1l11.3 6.5-2.4 2.2z"
        fill="#FF3A44"
      />
      <path
        d="M13.2 12.2l2.4 2.5L4.3 21.9c-.3.1-.5 0-.7-.1l9.6-9.6z"
        fill="#00F076"
      />
    </svg>
  );
}

function AppleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.24.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function FooterStoreButton({
  href,
  label,
  title,
  icon,
  ariaLabel,
}: {
  href: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex h-[40px] w-full min-w-0 max-w-[150px] items-center gap-1.5 rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] py-1.5 pl-1.5 pr-2.5 shadow-[0_6px_18px_rgba(253,184,19,0.28)] transition-opacity hover:opacity-90 sm:h-[42px] sm:gap-2 sm:py-2 sm:pl-2 sm:pr-3"
    >
      <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-white text-black sm:h-[30px] sm:w-[30px]">
        {icon}
      </span>
      <span className="min-w-0 flex-1 py-0.5 text-left leading-[1.15]">
        <span className="block truncate text-[7px] font-bold uppercase tracking-[0.12em] text-black/75 sm:text-[8px]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[11px] font-bold text-black sm:text-[12px]">
          {title}
        </span>
      </span>
    </a>
  );
}

function TrustAndAppsBlock({ mobile = false }: { mobile?: boolean }): React.ReactElement {
  const storeButtons = (
    <div className="mx-auto flex w-full min-w-0 max-w-[150px] flex-col gap-2.5">
      <FooterStoreButton
        href={PLAY_STORE_HREF}
        label="Get it on"
        title="Google Play"
        ariaLabel="Get it on Google Play"
        icon={<PlayStoreIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
      />
      <FooterStoreButton
        href={APP_STORE_HREF}
        label="Download on"
        title="App Store"
        ariaLabel="Download on the App Store"
        icon={<AppleIcon className="h-4 w-4 sm:h-5 sm:w-5" />}
      />
    </div>
  );

  if (mobile) {
    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOTER_IMAGES.duns}
          alt="Dun & Bradstreet D-U-N-S Registered"
          width={192}
          height={149}
          className="block h-auto w-[132px] shrink-0 sm:w-[148px]"
          decoding="async"
        />
        <div className="flex w-full min-w-0 max-w-[150px] justify-center sm:justify-start">
          {storeButtons}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 max-w-[192px] flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FOOTER_IMAGES.duns}
        alt="Dun & Bradstreet D-U-N-S Registered"
        width={192}
        height={149}
        className="block h-auto w-[180px] max-w-full"
        decoding="async"
      />
      <div className="mt-2 flex w-full min-w-0 justify-center">{storeButtons}</div>
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

export default function Footer(): React.ReactElement | null {
  const pathname = usePathname();
  // The public live-trip tracking experience is a focused, distraction-free
  // screen - skip the full marketing footer entirely on these routes.
  const isLiveTripRoute = pathname === "/trip/track";
  if (isLiveTripRoute) return null;

  return (
    <footer className="w-full overflow-x-clip bg-[#fffcf2] text-[#0b0b0b]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-5 pt-10 sm:px-6 sm:pb-6 sm:pt-12 lg:px-8 lg:pb-7 lg:pt-14">
        <NewsletterSection />

        {/* Mobile - stacked sections like reference */}
        <div className="mt-10 lg:hidden">
          <FooterNavLink href="/" className="inline-flex h-[60px] w-[102px] shrink-0 items-center leading-none">
            <Image
              src="/images/traveling-partner-logo.png"
              alt="Traveling Partner"
              width={440}
              height={260}
              className="h-[60px] w-auto max-w-full object-contain object-left"
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
        <div className="mt-12 hidden items-start gap-x-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] xl:gap-x-14">
          <div className="min-w-0 lg:col-span-1">
            <FooterNavLink href="/" className="inline-flex h-[60px] w-[102px] shrink-0 items-center leading-none">
              <Image
                src="/images/traveling-partner-logo.png"
                alt="Traveling Partner"
                width={440}
                height={260}
                className="h-[60px] w-auto max-w-full object-contain object-left"
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

          <div className="min-w-0">
            <TrustAndAppsBlock />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[#ddd8cb] pt-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
          <p className="font-poppins text-[12px] font-normal text-[#8a877f] sm:text-[13px]">
            {"\u00A9"} {new Date().getFullYear()} Traveling Partner. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:justify-end sm:gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.label}`}
                className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#e8e4d9] transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_6px_16px_rgba(253,184,19,0.45)]"
                style={{ ["--social-color" as string]: social.color }}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-b from-[#FCE001] to-[#FDB813] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <social.icon
                  className="relative z-[1] h-[18px] w-[18px] text-[var(--social-color)] transition-colors duration-300 group-hover:text-[#0b0b0b]"
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
