import TripSpinner from "./TripSpinner";

export default function TripLoadingState() {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] w-full items-center justify-center bg-[#f7f6f1] px-6 sm:min-h-[calc(100dvh-64px)]">
      <TripSpinner label="Loading live trip…" />
    </div>
  );
}
