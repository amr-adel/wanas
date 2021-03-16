import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import { useStore } from "../../../hooks/useStore";
import useRecentVenues from "../../../hooks/useRecentVenues";

import Tabs from "./Tabs";
import Pagination from "./Pagination";
import VenuesList from "./VenuesList";

export default function VenuesContainer({
  setSelectedVenue,
  isLoading,
  responseData,
}) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  const [activeTab, setActiveTab] = useState("info");
  const { recent, clearRecent } = useRecentVenues();

  const paginate = responseData?.totalResults > reqParams.limit;

  // Create content for head meta description
  const descriptionMsg = responseData?.totalResults
    ? `${responseData.totalResults} ${t("explore.info.venues")}${
        (reqParams.nearLabels?.[locale] || reqParams.near) &&
        t("explore.info.near") +
          " " +
          (reqParams.nearLabels?.[locale] || reqParams.near)
      }${
        reqParams.section !== "all" &&
        t("explore.info.section") + t(`home.fs-section.${reqParams.section}`)
      }`
    : "";

  return (
    <>
      <Head>
        <title key="title">
          {t("app.name")} | {t("menu.explore")}
        </title>
        <meta key="description" name="description" content={descriptionMsg} />
        <meta
          name="twitter:title"
          content={t("app.name") + " | " + t("menu.explore")}
          key="twitter-title"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={t("app.name") + " | " + t("menu.explore")}
          key="og-title"
        />
      </Head>

      <div className={`flex flex-col space-y-4 relative md:pr-3`}>
        <Tabs
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recent={recent}
          clearRecent={clearRecent}
          total={responseData?.totalResults}
        />

        {activeTab === "info" && responseData && (
          <>
            {paginate && <Pagination total={responseData.totalResults} />}

            <VenuesList venues={responseData.groups?.[0]?.items} />

            <cite className="text-sm text-center not-italic text-gray-700 p-2 mx-auto">
              {t("attr.foursquare")}
              <a
                href="https://foursquare.com/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-gray-500 hover:text-gray-700"
              >
                FourSquare
              </a>
            </cite>
          </>
        )}

        {activeTab === "history" && (
          <VenuesList venues={recent} clearRecent={clearRecent} />
        )}
      </div>
    </>
  );
}
