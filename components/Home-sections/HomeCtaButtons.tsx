import React from "react";
import Link from "next/link";

const primaryBase =
  "group relative inline-flex max-w-full items-center justify-between gap-2 overflow-hidden rounded-[100px] bg-gradient-to-b from-[#fce001] to-[#fdb813] font-poppins text-[14px] font-semibold leading-none text-[#0b0b0b] shadow-[0_5px_16px_rgba(252,224,1,0.2)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(252,224,1,0.28)] sm:text-[15px]";

const primaryPad = "px-5 py-3 pr-2 sm:px-6 sm:py-3.5 sm:pr-2.5";

const secondaryBase =
  "group relative z-10 inline-flex max-w-full items-center justify-between gap-2 overflow-hidden rounded-full bg-[#0b0b0b] font-poppins text-[13px] font-semibold leading-none text-white shadow-[0_8px_22px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:bg-[#1a1a1a] sm:text-[14px]";

const secondaryPad = "h-11 pl-4 pr-1.5 sm:h-10 sm:pl-4 sm:pr-1";

type CtaProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  external?: boolean;
};

function wrapClass(base: string, pad: string, fullWidth?: boolean, className?: string): string {
  return [
    base,
    pad,
    fullWidth ? "flex w-full sm:inline-flex sm:w-auto" : "inline-flex w-fit",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

function CtaEndIcon({ variant }: { variant: "primary" | "secondary" }): React.ReactElement {
  if (variant === "primary") {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-[14px] font-bold leading-none text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]">
        <span className="block translate-x-px leading-none transition-transform duration-300 group-hover:-rotate-45">
          →
        </span>
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fdb813] text-[12px] font-bold leading-none text-[#0b0b0b] transition-transform duration-300 group-hover:-rotate-45 sm:h-8 sm:w-8 sm:text-[13px]">
      →
    </span>
  );
}

function CtaLink({
  href,
  onClick,
  children,
  className,
  external,
  end,
}: CtaProps & { end: React.ReactNode }): React.ReactElement {
  const classes = className ?? "";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        <span className="min-w-0 truncate">{children}</span>
        {end}
      </button>
    );
  }

  if (!href) {
    throw new Error("Home CTA requires href or onClick");
  }

  const isExternal = external || href.startsWith("http") || href.startsWith("tel:");

  if (isExternal) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        <span className="min-w-0 truncate">{children}</span>
        {end}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span className="min-w-0 truncate">{children}</span>
      {end}
    </Link>
  );
}

/** Large yellow gradient CTA — Read our story, View More, Subscribe-style actions */
export function HomePrimaryButton({
  href,
  onClick,
  children,
  className,
  fullWidth,
  external,
  icon,
}: CtaProps & { icon?: React.ReactNode }): React.ReactElement {
  const end = icon ? (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b0b0b] text-white transition-colors duration-300 group-hover:bg-[#1a1a1a]">
      {icon}
    </span>
  ) : (
    <CtaEndIcon variant="primary" />
  );

  return (
    <CtaLink
      href={href}
      onClick={onClick}
      external={external}
      className={wrapClass(primaryBase, primaryPad, fullWidth, className)}
      end={end}
    >
      {children}
    </CtaLink>
  );
}

/** Compact dark CTA — Learn More, Watch Tutorial, ride CTAs */
export function HomeSecondaryButton({
  href,
  onClick,
  children,
  className,
  fullWidth,
  external,
}: CtaProps): React.ReactElement {
  return (
    <CtaLink
      href={href}
      onClick={onClick}
      external={external}
      className={wrapClass(secondaryBase, secondaryPad, fullWidth, className)}
      end={<CtaEndIcon variant="secondary" />}
    >
      {children}
    </CtaLink>
  );
}
