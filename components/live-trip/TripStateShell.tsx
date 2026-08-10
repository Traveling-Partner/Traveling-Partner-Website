import Link from "next/link";
import type { ReactNode } from "react";

interface TripStateShellProps {
  icon: ReactNode;
  iconTone?: "neutral" | "brand" | "success" | "danger";
  title: string;
  description: string;
  children?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
}

const TONE_CLASSES: Record<string, string> = {
  neutral: "bg-black/5 text-[#0b0b0b]",
  brand: "bg-[#fdb813]/15 text-[#8a5a00]",
  success: "bg-[#16a34a]/10 text-[#16a34a]",
  danger: "bg-[#b91c1c]/10 text-[#b91c1c]",
};

/** Shared full-page shell for every non-active tracking view state. */
export default function TripStateShell({
  icon,
  iconTone = "neutral",
  title,
  description,
  children,
  ctaHref = "/",
  ctaLabel = "Go to Traveling Partner",
}: TripStateShellProps) {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] w-full items-center justify-center bg-[#f7f6f1] px-6 py-12 sm:min-h-[calc(100dvh-64px)]">
      <div className="w-full max-w-sm rounded-[24px] border border-[#eceae4] bg-white p-8 text-center shadow-[0_20px_60px_rgba(11,11,11,0.06)]">
        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${TONE_CLASSES[iconTone]}`}
        >
          {icon}
        </div>
        <h1 className="font-poppins text-xl font-bold text-[#0b0b0b]">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#6f6e68]">{description}</p>

        {children && <div className="mt-5">{children}</div>}

        <Link
          href={ctaHref}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#0b0b0b] px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
