import { useEffect } from "react";
import { useIntl } from "react-intl";

import { useStore } from "../../../hooks/useStore";
import Pagination from "./Pagination";
import VenueCard from "./VenueCard";

export default function VenuesList({
  venues,
  clearRecent = null,
  total = null,
}) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

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
    <>
      <Pagination total={total} />

      <ol id="venues-container" className="flex flex-col space-y-4">
        {venues?.map((venue) => (
          <VenueCard
            key={`card-${venue.venue.id}`}
            venue={venue}
            clearRecent={clearRecent}
          />
        ))}
      </ol>

      <cite className="text-sm text-center not-italic text-gray-700 p-2 mx-auto">
        {t("attr.foursquare")}
        <a
          href="https://foursquare.com/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-gray-500 hover:text-gray-700"
        >
          FourSquare
        </a>
      </cite>
    </>
  );
}
