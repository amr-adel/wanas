import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import { useStore } from "../../../hooks/useStore";

export default function VenueCard({ venue, clearRecent }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const set = useStore((state) => state.set);

  const router = useRouter();

  const { id, name, location, categories } = venue.venue;

  const setPopUp = (id, name, location) =>
    set((state) => {
      state.mapBox.popUp = {
        id,
        name,
        lat: location.lat,
        lng: location.lng,
      };
    });

  const removePopUp = () => {
    set((state) => {
      state.mapBox.popUp = null;
    });
  };

  // Convert explore page to single venue mode
  const handleCardClick = () => {
    set((state) => {
      state.mapBox.popUp = null;
      state.mapBox.markers = [
        {
          id,
          name,
          lat: location.lat,
          lng: location.lng,
        },
      ];
    });

    router.push({
      pathname: router.pathname,
      query: { vid: id },
    });
  };

  return (
    <li
      className="relative bg-gray-50 p-2 rounded-lg shadow hover:shadow-md cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setPopUp(id, name, location)}
      onMouseLeave={removePopUp}
      data-testid="VenueCard"
    >
      {(categories[0] || clearRecent) && (
        <div className="flex">
          {categories[0] ? (
            <span className="text-xs text-yellow-400 bg-yellow-50 py-1 px-2 rounded">
              {categories[0].name}
            </span>
          ) : null}

          {clearRecent && (
            <span
              role="button"
              className={`text-xs ${
                locale === "ar" ? "mr-auto" : "ml-auto"
              } text-red-400 bg-red-50 py-1 px-2 rounded`}
              onClick={(e) => {
                e.stopPropagation();
                clearRecent(id);
              }}
            >
              {t("explore.history.clear.single")}
            </span>
          )}
        </div>
      )}

      <h3 className="text-xl text-red-500 border-b border-gray-200 mb-1 py-1">
        {name}
      </h3>
      <p className="text-sm text-gray-400">
        <span className="block">{location.formattedAddress[0]}</span>
        <span className="block">{location.formattedAddress[1]}</span>
      </p>
    </li>
  );
}
