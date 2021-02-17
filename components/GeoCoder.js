import { useEffect, useState } from "react";
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

  const handleSuggestion = async (
    e,
    { center, text, place_name, context, properties: { wikidata } }
  ) => {
    e.preventDefault();

    const wikidataRes = await axios.get(
      `https://www.wikidata.org/w/api.php?format=json&languages=en%7Car%7Ces&ids=${wikidata}&props=labels&action=wbgetentities&origin=*`
    );

    const placeLabels = wikidataRes?.data?.entities?.[wikidata]?.labels;

    const countryCode =
      context?.filter((con) => con.id.includes("country"))[0].short_code ||
      null;

    set((state) => {
      // Mapbox [Lng, Lat], FourSquare [Lat, Lng]
      state.fourSquare.reqParams.ll = [center[1], center[0]];
      state.fourSquare.reqParams.near = `${placeLabels?.en?.value || text}${
        countryCode ? `, ${countryCode}` : ""
      }`;
      state.fourSquare.localeNear = placeLabels?.[locale].value || text;
      state.fourSquare.reqParams.offset = 0;

      state.mapBox.center = center;
      state.mapBox.zoom = 14;
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

        {/* Input */}
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

        {/* Clear search input */}
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

      {/* Suggestions */}
      {focused && (
        <div
          id="results"
          className="p-2 pb-0 my-2 border-t border-gray-300 divide-y divide-gray-300"
        >
          {isLoading && <Loader classes="text-gray-400 h-8 py-2" />}

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

          <CurrentLocation setQuery={setQuery} />
        </div>
      )}
    </div>
  );
}

function CurrentLocation({ setQuery }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { pathname } = useRouter();
  const router = useRouter();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const set = useStore((state) => state.set);

  useEffect(() => {
    if (navigator.geolocation) {
      setCurrentLocation("ready");
    }
  }, []);

  const success = (position) => {
    const { latitude: lat, longitude: lng } = position.coords;

    setCurrentLocation("ready");

    set((state) => {
      // Mapbox [Lng, Lat], FourSquare [Lat, Lng]
      state.fourSquare.reqParams.ll = [lat, lng];
      state.fourSquare.reqParams.near = null;
      state.fourSquare.reqParams.offset = 0;

      state.mapBox.center = [lng, lat];
      state.mapBox.zoom = 14;
    });

    setQuery("");
    document.activeElement.blur();

    if (pathname !== "/explore") {
      router.push("/explore");
    }
  };

  const error = (e) => {
    setCurrentLocation("ready");
    setErrorMsg(t(`currentLocation.${e.code === 1 ? "error.1" : "error"}`));
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 180000,
    timeout: 45000,
  };

  const handleCurrentLocation = (e) => {
    e.preventDefault();

    setErrorMsg(null);

    setCurrentLocation("searching");

    return navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return !currentLocation ? null : (
    <div id="current-location" onMouseDown={handleCurrentLocation}>
      {currentLocation === "searching" ? (
        <Loader classes="text-gray-400 h-8 py-2" />
      ) : (
        <div
          className={`flex items-center divide-x ${
            locale === "ar" ? "divide-x-reverse" : ""
          } divide-gray-300 p-2 my-2 text-gray-500 bg-white rounded-lg cursor-pointer shadow hover:shadow-md`}
        >
          <Icon
            name="my-location"
            classes="w-6 h-6 mx-2 flex-shrink-0 text-yellow"
          />

          <span className="px-2 py-1">
            <h5>{t("currentLocation")}</h5>
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          </span>
        </div>
      )}
    </div>
  );
}
