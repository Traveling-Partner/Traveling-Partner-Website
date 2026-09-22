"use client";

export default function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p
      className="mt-1.5 flex items-start gap-2 rounded-[10px] bg-[#FFF6D0] px-2.5 py-1.5 font-poppins text-[11px] font-medium leading-snug text-[#0b0b0b]"
      role="alert"
    >
      <span
        className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FCE001] to-[#FDB813] text-[10px] font-bold text-[#0b0b0b]"
        aria-hidden
      >
        !
      </span>
      <span>{message}</span>
    </p>
  );
}
