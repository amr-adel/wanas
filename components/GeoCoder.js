import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import useThrottle from "../hooks/useThrottle";
import Icon from "./Icon";

export default function GeoCoder({ setCenter }) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [geoSuggestions, setGeoSuggestions] = useState(null);
  const { throttledQuery } = useThrottle(query);

  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  useEffect(async () => {
    if (focused && throttledQuery.length > 2) {
      setGeoSuggestions(<div>Loading....</div>);

      console.log("API call!");

      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${throttledQuery}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=${locale}&types=region,district,place`;

      const res = await fetch(url);
      const data = await res.json();

      const suggestions = (
        <ol dir={locale === "ar" ? "rtl" : "ltr"} className="flex flex-col">
          {data.features.map((place) => (
            <li
              key={place.id}
              className="flex flex-col px-2 py-1 mb-2 bg-white rounded-lg cursor-pointer"
              onMouseDown={(e) => handleSuggestion(e, place)}
            >
              <h5 className="text-brown text-lg font-bold">{place.text}</h5>
              <span className="text-brown-300 text-sm">{place.place_name}</span>
            </li>
          ))}
        </ol>
      );
      setGeoSuggestions(suggestions);
    } else {
      setGeoSuggestions(null);
    }
  }, [throttledQuery]);

  const handleSuggestion = (e, { center, place_name }) => {
    e.preventDefault();
    // Mapbox [Lon, Lat], FourSquare [Lat, Lon]
    setCenter([center[1], center[0]]);
    setQuery(place_name);
    // setFocused(false);
    document.activeElement.blur();
  };

  return (
    <div
      id="geo-coder"
      className={`p-2 relative transition-width mr-auto rounded-lg ${
        focused
          ? "bg-brown-50 shadow-lg w-full rounded-b-none"
          : "w-9/12 bg-brown-100"
      }`}
    >
      <label className="flex justify-center text-brown-200">
        <Icon name="location-arrow" classes="w-4 h-6 flex-shrink-0" />
        <input
          type="text"
          dir={locale === "ar" ? "rtl" : "ltr"}
          placeholder={t("geoCoderPlaceholder")}
          spellCheck="false"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-full w-20 leading-6 bg-transparent ml-2 px-2 flex-1 focus:outline-none placeholder-brown-300 text-brown text-lg border-l border-brown-100"
        />
        {query && focused && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setQuery("");
            }}
          >
            <Icon name="close" classes="w-6 h-6 flex-shrink-0" />
          </button>
        )}
      </label>

      {focused && (
        <div
          id="results"
          className="absolute top-10 left-0 right-0 p-2 bg-brown-50 border-t border-brown-100 rounded-b-lg shadow-lg"
        >
          {geoSuggestions}
        </div>
      )}
    </div>
  );
}
