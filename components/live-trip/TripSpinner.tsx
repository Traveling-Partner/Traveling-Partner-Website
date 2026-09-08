interface TripSpinnerProps {
  label?: string;
  className?: string;
}

/**
 * The one loading spinner used everywhere on the live-trip tracking page
 * (initial page load, map tiles loading) — a single consistent style so the
 * page never appears to use two different "loading" languages while it
 * settles in.
 */
export default function TripSpinner({ label, className = "" }: TripSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fce001]/30 border-t-[#fdb813]" />
      {label && <p className="text-sm font-medium text-[#6f6e68]">{label}</p>}
    </div>
  );
}
