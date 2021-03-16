import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import { useStore } from "../../../hooks/useStore";
import useRecentVenues from "../../../hooks/useRecentVenues";
import {
  reqParamsToQueryString,
  reqParamsFromQueryString,
} from "./syncReqParamasWithUrl";
import Tabs from "./Tabs";
import VenuesList from "./VenuesList";

export default function VenuesContainer({ isLoading, responseData }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  const [activeTab, setActiveTab] = useState("info");
  const { recent, clearRecent } = useRecentVenues();

  // Sync reqParams with URL (sharable link)
  useEffect(() => {
    if (
      reqParams.ll === null &&
      reqParams.near === null &&
      router.asPath !== "/explore"
    ) {
      // Get reqParams from URL
      const paramsFromUrl = reqParamsFromQueryString(router.asPath);

      set((state) => {
        state.fourSquare.reqParams = { ...reqParams, ...paramsFromUrl };
      });
    } else {
      // Shallow update URL
      router.replace({
        pathname: "/explore",
        query: reqParamsToQueryString(reqParams),
      });
    }
  }, [reqParams]);

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
          recentLength={recent.length}
          clearRecent={clearRecent}
          total={responseData?.totalResults}
        />

        {activeTab === "info" && responseData && (
          <VenuesList
            venues={responseData.groups[0].items}
            total={responseData.totalResults}
          />
        )}

        {activeTab === "history" && (
          <VenuesList venues={recent} clearRecent={clearRecent} />
        )}
      </div>
    </>
  );
}
