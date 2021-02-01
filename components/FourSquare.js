import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import axios from "axios";
import useSWR from "swr";

import { useStore } from "../hooks/useStore";
import Loader from "../utils/Loader";
import Icon from "../utils/Icon";

const fetchVenues = (reqParams, locale) => {
  const { ll, limit, section, radius, offset } = reqParams;

  return axios.get(
    `/api/exploreVenues?locale=${
      locale === "ar" ? "en" : locale
    }&ll=${ll}&limit=${limit}&section=${section}`
  );
};

export default function FourSquare() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { venues, reqParams } = useStore((state) => state.fourSquare);

  const [activeTab, setActiveTab] = useState("info");

  const { data, error } = useSWR(
    reqParams.ll ? [reqParams, locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  // useEffect(() => {
  //   if (data) {
  //     console.log("data: ", data);
  //   }
  // }, [data]);

  const tabs = ["info", "settings", "history", "bookmark"];

  const tabBody = {
    info: isLoading ? (
      <Loader classes="text-gray-400 h-4 my-4" />
    ) : (
      "Response information"
    ),
    settings: "Request parameters",
    history: "Visited venues",
    bookmark: "Bokkmarked venues",
  };

  return (
    <div id="venues-container">
      <div
        id="tabs"
        className="bg-gray-50 pb-2 mb-4 rounded-lg shadow hover:shadow-md overflow-hidden"
      >
        <ul
          id="tab-switcher"
          className="flex w-full pattern-dark bg-yellow divide-x-2 divide-gray-600"
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

      {data && <FourSquareVenues venues={data.data.response.groups[0].items} />}
    </div>
  );
}

export function FourSquareVenues({ venues }) {
  return (
    <ol id="venues-container" className="flex flex-col">
      {venues.map((venue) => {
        const { id, name, location, categories } = venue.venue;
        return (
          <li
            key={id}
            className="bg-gray-50 p-2 mb-4 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
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
      })}
    </ol>
  );
}
