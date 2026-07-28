"use client";

/**
 * Contact Us hero — 1:1 Figma match.
 * Same cream / glow / typography system as Taxi / Pool / Delivery / Logistics / Trip / About heroes.
 */

const CONTACT_EMAIL = "hello@traveling-partner.com";
const GMAIL_COMPOSE_HREF = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent("Inquiry from Traveling Partner website")}`;

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.6 3.8h2.2l1.4 3.3-1.7 1.2a11.5 11.5 0 005.6 5.6l1.2-1.7 3.3 1.4v2.2c0 .9-.7 1.6-1.6 1.7C10.9 18.1 5.9 13.1 5.1 5.6 5 4.7 5.7 3.9 6.6 3.8Z" />
    </svg>
  );
}

function PlusSep() {
  return (
    <span
      className="hidden shrink-0 select-none px-1 text-[15px] font-bold leading-none text-[#FCE001] sm:inline sm:px-2 md:px-3"
      aria-hidden="true"
    >
      +
    </span>
  );
}

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FEFBF6]">
      {/* Soft brand glows — Figma atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 50% 42% at 88% 28%, rgba(252,224,1,0.28), transparent 68%),
            radial-gradient(ellipse 45% 40% at 12% 72%, rgba(253,184,19,0.18), transparent 70%),
            radial-gradient(ellipse 35% 30% at 50% 100%, rgba(252,224,1,0.1), transparent 65%)
          `,
        }}
      />

      {/* Soft top vignette under overlay nav */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.03] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pb-14 pt-[110px] text-center sm:px-6 sm:pb-16 sm:pt-[128px] md:pb-20 md:pt-[140px] lg:px-8 lg:pb-24 lg:pt-[150px]">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0b0b0b] px-3.5 py-1.5 sm:mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FCE001]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FCE001] sm:text-[11px]">
            Get In Touch
          </span>
        </div>

        {/* Heading */}
        <h1 className="mb-5 font-poppins text-[42px] font-extrabold leading-[1.05] tracking-tight text-[#0b0b0b] sm:mb-6 sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[72px]">
          Contact{" "}
          <span className="relative inline-block origin-center rounded-[10px] border-b-[5px] border-r-[5px] border-black bg-[#FCE001] px-3 py-1 shadow-[0_8px_24px_rgba(253,184,19,0.35)] sm:rounded-[12px] sm:px-4 sm:py-1.5">
            <em className="font-medium italic text-black">Us.</em>
          </span>
        </h1>

        {/* Subtitle — line break matches Figma */}
        <p className="mb-8 max-w-[560px] text-[15px] leading-relaxed text-[#4a4a45] sm:mb-10 sm:text-base sm:leading-[1.7] md:mb-12">
          Have questions or need assistance? Our team is here to help you with
          <br className="hidden sm:inline" /> any inquiries about our services.
        </p>

        {/* Contact info bar */}
        <div className="inline-flex w-full max-w-[720px] flex-col items-stretch gap-3 rounded-[28px] border border-dashed border-[#d4d0c6] bg-white px-4 py-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.04)] sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:rounded-full sm:px-5 sm:py-2.5 md:px-6 md:py-3">
          <div className="inline-flex items-center justify-center gap-2 sm:justify-start">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[#e53935]" />
            <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
              Islamabad, PK
            </span>
          </div>

          <PlusSep />

          <a
            href={GMAIL_COMPOSE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center gap-2 transition-opacity hover:opacity-80 sm:justify-start"
          >
            <MailIcon className="h-4 w-4 shrink-0 text-[#8a8983]" />
            <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
              {CONTACT_EMAIL}
            </span>
          </a>

          <PlusSep />

          <a
            href="tel:+923252801261"
            className="inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-80 sm:justify-start"
          >
            <PhoneIcon className="h-4 w-4 shrink-0 text-[#8a8983]" />
            <span className="text-[13px] font-bold text-[#0b0b0b] sm:text-[14px]">
              +92 325 2801261
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
