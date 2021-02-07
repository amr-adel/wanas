import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import axios from "axios";
import useSWR from "swr";

import { useStore } from "../hooks/useStore";
import Loader from "../utils/Loader";
import Icon from "../utils/Icon";
import useRecentVenues from "../hooks/useRecentVenues";

const fetchVenues = (reqParams, locale) => {
  return axios.post(`/api/exploreVenues`, { ...reqParams, locale });
};

export default function FourSquare() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { sections, reqParams } = useStore((state) => state.fourSquare);

  const [activeTab, setActiveTab] = useState("info");

  const { recent, clearRecent } = useRecentVenues();

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near ? [reqParams, locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  const pagination = data?.data?.response?.totalResults > reqParams.limit && (
    <Paginate total={data.data.response.totalResults} />
  );

  const tabs = ["info", "settings", "history", "bookmark"];

  const tabBody = {
    info: isLoading ? (
      <Loader classes="text-gray-400 h-4 my-4" />
    ) : (
      <InfoTab total={data?.data?.response?.totalResults} />
    ),
    settings: <SettingsTab setActiveTab={setActiveTab} />,
    history: (
      <div className="flex flex-col py-4">
        <div>
          {t("explore.history.msg")}(
          <span className="text-red-500 tracking-wider font-bold">
            {recent?.length}
          </span>
          )
        </div>

        {recent?.length > 0 && (
          <div id="clear-recent" className="text-center pt-4">
            <button
              className="btn-outlined text-gray-700"
              onClick={clearRecent}
            >
              {t("explore.history.clear")}
            </button>
          </div>
        )}
      </div>
    ),
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
            locale === "ar" ? "divide-x-reverse" : ""
          } w-full pattern-dark divide-x-2 divide-gray-600`}
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
        <div className="min-h-16 flex justify-center items-center">
          {tabBody[activeTab]}
        </div>
      </div>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {/* {data && console.log(data)} */}

      {activeTab === "info" && (
        <>
          {pagination}

          {data && (
            <FourSquareVenues venues={data?.data?.response?.groups[0]?.items} />
          )}

          {pagination}
        </>
      )}

      {activeTab === "history" && recent?.length > 0 && (
        <FourSquareVenues venues={recent} />
      )}
      {/* {activeTab === "history" && console.log(recent)} */}
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
            className="bg-gray-50 p-2 mb-4 last:mb-0 rounded-lg shadow hover:shadow-md cursor-pointer"
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

function InfoTab({ total }) {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const {
    sections,
    reqParams: { section, near, radius },
  } = useStore((state) => state.fourSquare);

  let msg = "";

  if (total === undefined) {
    msg = t("explore.info.start");
  } else if (total === 0) {
    msg = t("explore.info.zero");
  } else {
    msg = (
      <h1>
        <span className="text-red-500">{total}</span>
        {t("explore.info.venues")}
        {near ? t("explore.info.near") : ""}
        {near ? <span className="text-red-500">{near}</span> : ""}
        {section !== "all" ? t("explore.info.section") : ""}
        {section !== "all" ? (
          <span className="text-red-500">
            {t(`home.fs-section.${section}`)}
          </span>
        ) : (
          ""
        )}
        .
      </h1>
    );
  }

  return (
    <div id="info-containe4" className="p-4 text-gray-700 text-center">
      {msg}
    </div>
  );
}

function SettingsTab({ setActiveTab }) {
  const { formatMessage } = useIntl();
  const t = (id) => formatMessage({ id });

  const { sections, reqParams } = useStore((state) => state.fourSquare);
  const set = useStore((state) => state.set);

  const [settings, setSettings] = useState(reqParams);

  const handleChange = (param, value) => {
    setSettings({ ...settings, [param]: value });
  };

  const updateSearchParams = () => {
    setActiveTab("info");
    set((state) => {
      state.fourSquare.reqParams = { ...settings, offset: 0 };
    });
  };

  return (
    <div
      id="settings-body"
      className="flex flex-col p-4 divide-y divide-gray-200"
    >
      {/* Select section */}
      <div id="select-section" className="py-2 mb-2">
        <h6 className="text-gray-500 mb-2">{t("explore.settings.sections")}</h6>
        <ul className="flex flex-wrap justify-center">
          {sections.map((sec) => (
            <li key={sec}>
              <button
                onClick={() => handleChange("section", sec)}
                className={`btn my-1 mx-2 text-sm ${
                  sec === settings.section ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {t(`home.fs-section.${sec}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select radius */}
      <div id="select-radius" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.radius")}</h6>
        <ul className="flex flex-wrap justify-center">
          {["auto", 5, 10, 20].map((rad) => (
            <li key={rad}>
              <button
                onClick={() => handleChange("radius", rad)}
                className={`btn my-1 mx-2 text-sm ${
                  rad === settings.radius ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {rad === "auto"
                  ? t("explore.settings.auto")
                  : `${rad + t("explore.settings.radius.unit")}`}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select limit */}
      <div id="select-limit" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.limit")}</h6>
        <ul className="flex flex-wrap justify-center">
          {[15, 30, 50].map((limit) => (
            <li key={limit}>
              <button
                onClick={() => handleChange("limit", limit)}
                className={`btn my-1 mx-2 text-sm ${
                  limit === settings.limit ? "bg-red-500" : "bg-gray-700"
                } text-gray-200`}
              >
                {limit}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Select sort */}
      <div id="select-sort" className="py-2 mb-2">
        <h6 className="text-gray-500  mb-2">{t("explore.settings.sort")}</h6>
        <ul className="flex flex-wrap justify-center">
          {["auto", "popularity", "distance"].map((sortBy) => (
            <li key={`sort-${sortBy}`}>
              <button
                onClick={() => handleChange("sort", sortBy)}
                className={`btn my-1 mx-2 text-sm ${
                  sortBy === settings.sort ? "bg-red-500" : "bg-gray-700"
                } text-gray-200 capitalize`}
              >
                {t(
                  `explore.settings.${
                    sortBy === "auto" ? "auto" : `sort.${sortBy}`
                  }`
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div id="confirm-change" className="text-center pt-4">
        <button
          className="btn-outlined text-gray-700"
          onClick={updateSearchParams}
        >
          {t("explore.settings.confirm")}
        </button>
      </div>
    </div>
  );
}

function Paginate({ total }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { limit, offset } = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  return (
    <div
      id="pagination"
      className={`h-12 flex items-center bg-gray-50 m-4 rounded-lg overflow-hidden shadow`}
    >
      <button
        id="prev"
        disabled={!offset}
        className="disabled:text-gray-500 text-yellow focus:outline-none"
        onClick={() =>
          set((state) => {
            state.fourSquare.reqParams.offset -= limit;
          })
        }
      >
        <Icon
          name={locale === "ar" ? "right" : "left"}
          classes="h-12 w-12 p-2 pattern-dark"
        />
      </button>

      <span className="flex-1 text-center text-gray-700 font-bold tracking-widest">
        {offset + 1} : {limit + offset > total ? total : limit + offset} (
        <span className="text-gray-400">{total}</span>)
      </span>

      <button
        id="next"
        disabled={offset + limit >= total}
        className="disabled:text-gray-500 text-yellow focus:outline-none"
        onClick={() =>
          set((state) => {
            state.fourSquare.reqParams.offset += limit;
          })
        }
      >
        <Icon
          name={locale !== "ar" ? "right" : "left"}
          classes="h-12 w-12 p-2 pattern-dark"
        />
      </button>
    </div>
  );
}
