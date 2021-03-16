import { useEffect, useState } from "react";
import { useStore } from "../../../hooks/useStore";

import VenueCard from "./VenueCard";

export default function VenuesList({ venues, clearRecent = null }) {
  const set = useStore((state) => state.set);

  useEffect(() => {
    if (venues.length === 0) {
      set((state) => {
        state.mapBox.markers = [];
      });
    } else {
      const markers = venues.map((venue) => {
        const { id, name, location } = venue.venue;

        return {
          id,
          name,
          lat: location.lat,
          lng: location.lng,
        };
      });

      set((state) => {
        state.mapBox.markers = markers;
      });
    }
  }, [venues]);

  return (
    <ol id="venues-container" className="flex flex-col space-y-4">
      {venues?.map((venue) => (
        <VenueCard
          key={`card-${venue.venue.id}`}
          venue={venue}
          clearRecent={clearRecent}
        />
      ))}
    </ol>
  );
}
