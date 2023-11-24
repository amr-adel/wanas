import { useState } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";
import useThrottle from "../../hooks/useThrottle";

import getGeolocationSuggestions from "./getGeolocationSuggestions";

import Loader from "../../utils/Loader";
import Icon from "../../utils/Icon";
import SuggestionsList from "./SuggestionsList";
import UserLocation from "./UserLocation";

export default function GeoCoder() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { throttledQuery } = useThrottle(query);

  const { data: GeolocationSuggestions, error } = useSWR(
    throttledQuery.length > 2 ? { throttledQuery, locale } : null,
    getGeolocationSuggestions
  );

  const isLoading =
    !GeolocationSuggestions && !error && throttledQuery.length > 2;

  return (
    <div
      id="geo-coder"
      className={`p-2 relative transition-width rounded-lg shadow-md ${
        focused ? "bg-gray-200 shadow-lg w-full" : "w-11/12 bg-gray-700 mx-auto"
      }`}
    >
      <label
        className={`flex justify-center text-gray-400 ${
          locale === "ar" ? "flex-row-reverse" : ""
        }`}
      >
        <Icon
          name="location-arrow"
          className="w-6 h-6 flex-shrink-0 pr-2 border-r border-gray-400"
        />

        {/* Input */}
        <input
          type="text"
          placeholder={t("geocoder.placeholder")}
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
            <Icon name="close" className="w-6 h-6 flex-shrink-0" />
          </button>
        )}
      </label>

      {/* Suggestions */}
      {focused && (
        <div
          id="results"
          className="p-2 pb-0 my-2 border-t border-gray-300 divide-y divide-gray-300"
        >
          {isLoading && <Loader className="text-gray-400 h-8 py-2" />}

          {GeolocationSuggestions &&
            (GeolocationSuggestions?.length < 1 ? (
              <p className="p-2 text-sm text-center text-gray-700">
                {t("geocoder.geocode-fail")}
              </p>
            ) : (
              <SuggestionsList
                suggestions={GeolocationSuggestions}
                setQuery={setQuery}
              />
            ))}

          <UserLocation setQuery={setQuery} />
        </div>
      )}
    </div>
  );
}
