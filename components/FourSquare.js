import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import axios from "axios";
import useSWR from "swr";

import { useStore } from "../hooks/useStore";
import Loader from "../utils/Loader";
import Icon from "../utils/Icon";

const fetchVenues = (reqParams, locale) => {
  return axios.post(`/api/exploreVenues`, { ...reqParams, locale });
};

export default function FourSquare() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { venues, reqParams } = useStore((state) => state.fourSquare);

  const [activeTab, setActiveTab] = useState("info");

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near ? [reqParams, locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  const tabs = ["info", "settings", "history", "bookmark"];

  const tabBody = {
    info: isLoading ? (
      <Loader classes="text-gray-400 h-4 my-4" />
    ) : (
      "Response information"
    ),
    settings: "Request parameters",
    history: "Visited venues",
    bookmark: "Bookmarked venues",
  };

  return (
    <div id="venues-container">
      <div
        id="tabs"
        className="bg-gray-50 pb-2 mb-4 rounded-lg shadow hover:shadow-md overflow-hidden"
      >
        <ul
          id="tab-switcher"
          className={`flex ${
            locale === "ar" ? "flex-row-reverse" : ""
          } w-full pattern-dark bg-yellow divide-x-2 divide-gray-600`}
        >
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 h-10 flex justify-center items-center cursor-pointer"
            >
              <Icon
                name={tab}
                classes={`h-5 w-5 ${
                  tab === activeTab ? "text-yellow" : "text-gray-500"
                }`}
              />
            </li>
          ))}
        </ul>
        <div className="h-16 flex justify-center items-center">
          {tabBody[activeTab]}
        </div>
      </div>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {/* {data && console.log(data)} */}
      {data && (
        <FourSquareVenues venues={data?.data?.response?.groups[0]?.items} />
      )}
    </div>
  );
}

export function FourSquareVenues({ venues }) {
  const router = useRouter();

  return (
    <ol id="venues-container" className="flex flex-col">
      {venues.map((venue) => {
        const { id, name, location, categories } = venue.venue;
        return (
          <li
            key={id}
            className="bg-gray-50 p-2 mb-4 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => router.push(`/venues/${id}`)}
          >
            {categories[0] ? (
              <span className="text-xs text-yellow-400 bg-yellow-50 py-1 px-2 rounded">
                {categories[0].name}
              </span>
            ) : null}

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
