import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import axios from "axios";

export default function FourSquare({ center }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const [venuesContainer, setVenuesContainer] = useState(null);

  useEffect(async () => {
    if (center[0] === 0 && center[1] === 0) return;

    const { data } = await axios.get(
      `/api/fs?locale=${locale === "ar" ? "en" : locale}&ll=${center}`
    );

    const TempVenues = data.response.groups[0].items.map((venue) => {
      const { id, name, location, categories } = venue.venue;
      return (
        <li key={id} className="bg-gray-50 p-2 mb-4 rounded-lg shadow">
          {/* <img
            id="category-icon"
            className="bg-brown-400 rounded-md"
            src={
              categories[0]
                ? `${categories[0].icon.prefix}32${categories[0].icon.suffix}`
                : "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            }
          /> */}

          {categories[0] ? (
            <span className="text-xs text-yellow-400 bg-yellow-50 py-1 px-2 rounded">
              {categories[0].name}
            </span>
          ) : null}

          <h6 className="text-xl text-red-500 border-b border-gray-200 mb-1 py-1">
            {name}
          </h6>
          <p className="text-sm text-gray-400">
            {location.formattedAddress[0]} <br />
            {location.formattedAddress[1]}
          </p>
        </li>
      );
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setVenuesContainer(TempVenues);

    console.log(data.meta.requestId);
  }, [center]);

  return (
    <div className="bg-gray-600 px-2 py-4 mt-72 z-10 relative rounded-t-xl">
      <div id="venues-container">
        <ol className="flex flex-col">{venuesContainer}</ol>
      </div>
    </div>
  );
}
