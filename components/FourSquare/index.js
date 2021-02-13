import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import axios from "axios";
import useSWR from "swr";

import { useStore } from "../../hooks/useStore";
import useRecentVenues from "../../hooks/useRecentVenues";

import Tabs from "./Tabs";
import Pagination from "./Pagination";
import Icon from "../../utils/Icon";

const fetchVenues = (reqParams, locale) => {
  return axios.post(`/api/exploreVenues`, { ...reqParams, locale });
};

export default function FourSquare() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  const [activeTab, setActiveTab] = useState("info");
  const { recent, clearRecent } = useRecentVenues();

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near ? [reqParams, locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  if (data?.data?.meta?.errorType === "failed_geocode") {
    set((state) => {
      state.fourSquare.reqParams.near = null;
    });
  }

  const response = data?.data?.response;
  const paginate = response?.totalResults > reqParams.limit;

  return (
    <div id="venues-container">
      <Tabs
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recent={recent}
        clearRecent={clearRecent}
        total={response?.totalResults}
      />

      {activeTab === "info" && response && (
        <>
          {paginate && <Pagination total={response.totalResults} />}

          <FourSquareVenues venues={response.groups?.[0]?.items} />

          {paginate && <Pagination total={response.totalResults} />}
        </>
      )}

      {activeTab === "history" && recent?.length > 0 && (
        <FourSquareVenues venues={recent} clearRecent={clearRecent} removable />
      )}
    </div>
  );
}

export function FourSquareVenues({ venues, clearRecent, removable = false }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();

  const set = useStore((state) => state.set);

  useEffect(() => {
    if (venues?.length > 0) {
      const markers = venues.map((venue) => {
        return {
          id: venue.venue.id,
          lat: venue.venue.location.lat,
          lng: venue.venue.location.lng,
        };
      });

      set((state) => {
        state.mapBox.markers = markers;
      });
    }
  }, [venues]);

  return (
    <ol id="venues-container" className="flex flex-col">
      {venues?.map((venue) => {
        const { id, name, location, categories } = venue.venue;
        return (
          <li
            key={id}
            className="relative bg-gray-50 p-2 mb-4 last:mb-0 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => router.push(`/venues/${id}`)}
          >
            {(categories[0] || removable) && (
              <div className="flex">
                {categories[0] ? (
                  <span className="text-xs text-yellow-400 bg-yellow-50 py-1 px-2 rounded">
                    {categories[0].name}
                  </span>
                ) : null}

                {removable && (
                  <span
                    className={`text-xs ${
                      router.locale === "ar" ? "mr-auto" : "ml-auto"
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
              {location.formattedAddress[0]} <br />
              {location.formattedAddress[1]}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
