import { useState } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import useThrottle from "../hooks/useThrottle";
import { useStore } from "../hooks/useStore";

import axios from "axios";
import useSWR from "swr";

import Loader from "../utils/Loader";
import Icon from "../utils/Icon";

const fetchGeoCode = (throttledQuery, locale) => {
  return axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${throttledQuery}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=${locale}&types=region,district,place,postcode`
    )
    .then((res) => res.data);
};

export default function GeoCoder() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { throttledQuery } = useThrottle(query);

  const set = useStore((state) => state.set);

  const { pathname } = useRouter();
  const router = useRouter();

  const { data: geoSuggestions, error } = useSWR(
    throttledQuery.length <= 2 ? null : [throttledQuery, locale],
    fetchGeoCode
  );

  const isLoading = !geoSuggestions && !error && throttledQuery.length > 2;

  const handleSuggestion = (e, { center, text, place_name, context }) => {
    e.preventDefault();

    const countryCode = context.filter((con) => con.id.includes("country"))[0]
      .short_code;

    set((state) => {
      // Mapbox [Lon, Lat], FourSquare [Lat, Lon]
      state.fourSquare.reqParams.ll = [center[1], center[0]];
      state.fourSquare.reqParams.near = `${text}, ${countryCode}`;
      state.fourSquare.reqParams.offset = 0;
    });

    setQuery(place_name);
    document.activeElement.blur();

    if (pathname !== "/explore") {
      router.push("/explore");
    }
  };

  return (
    <div
      id="geo-coder"
      className={`p-2 relative transition-width rounded-lg ${
        focused ? "bg-gray-200 shadow-lg w-full" : "w-10/12 bg-gray-700"
      }`}
    >
      <label
        className={`flex justify-center text-gray-400 ${
          locale === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <Icon
          name="location-arrow"
          classes="w-6 h-6 flex-shrink-0 pr-2 border-r border-gray-400"
        />
        <input
          type="text"
          placeholder={t("geoCoderPlaceholder")}
          spellCheck="false"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`h-6 w-20 bg-transparent px-2 flex-1 focus:outline-none placeholder-gray-400 ${
            focused ? " text-gray-700" : " text-gray-400"
          } text-lg`}
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
        <div id="results" className="p-2 pb-0 mt-2 border-t border-gray-300">
          {isLoading && <Loader classes="text-gray-400 h-4 my-4" />}

          {geoSuggestions && (
            <ol dir={locale === "ar" ? "rtl" : "ltr"} className="flex flex-col">
              {geoSuggestions.features.map((place) => (
                <li
                  key={place.id}
                  className="flex flex-col px-2 py-1 mb-2 bg-white rounded-lg cursor-pointer shadow hover:shadow-md"
                  onMouseDown={(e) => handleSuggestion(e, place)}
                >
                  <h5 className="text-red-500 text-lg font-bold">
                    {place.text}
                  </h5>
                  <span className="text-gray-400 text-sm">
                    {place.place_name}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
