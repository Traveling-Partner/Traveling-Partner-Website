"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import type { ShareRole, TripShareData } from "@/lib/liveTrip/types";
import { getTripTrackingUrl } from "@/lib/liveTrip/shareTripLink";
import ShareOptions from "./ShareOptions";

type ShareableTrip = Pick<
  TripShareData,
  "token" | "pickup" | "destination" | "driver" | "passenger"
>;

interface ShareTripModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trip: ShareableTrip;
  /** Who is doing the sharing — decides who the recipient will track. */
  sharedBy?: ShareRole;
}

export default function ShareTripModal({
  open,
  onOpenChange,
  trip,
  sharedBy = "passenger",
}: ShareTripModalProps) {
  const url = getTripTrackingUrl(trip.token, sharedBy);
  const trackedName = sharedBy === "driver" ? trip.driver.name : trip.passenger.name;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto w-full max-w-lg border-[#eceae4]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-poppins text-lg font-bold text-[#0b0b0b]">
            Share Live Trip
          </DrawerTitle>
          <DrawerDescription>
            Anyone with this link can watch {trackedName}&apos;s live location until the trip
            ends. No account needed.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-8">
          <div className="mb-5 flex items-center gap-2 rounded-xl bg-[#f7f6f1] px-4 py-3 text-xs font-semibold text-[#0b0b0b] sm:text-sm">
            <span className="min-w-0 flex-1 truncate">{trip.pickup.label}</span>
            <span className="shrink-0 text-[#6f6e68]">→</span>
            <span className="min-w-0 flex-1 truncate text-right">{trip.destination.label}</span>
          </div>

          <ShareOptions url={url} sharedBy={sharedBy} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
