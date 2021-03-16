import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import useSWR from "swr";

import { useStore } from "../../hooks/useStore";

import {
  reqParamsToQueryString,
  reqParamsFromQueryString,
} from "./syncReqParamasWithUrl";
import VenuesContainer from "./VenuesContainer";

const fetchVenues = (reqParams, locale) => {
  return axios.post(`/api/exploreVenues`, { ...reqParams, locale });
};

export default function FourSquare() {
  const router = useRouter();

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near ? [reqParams, router.locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  if (data?.data?.meta?.errorType === "failed_geocode") {
    set((state) => {
      state.fourSquare.reqParams.near = null;
    });
  }

  // Sync reqParams with URL
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
      router.push(
        {
          pathname: "/explore",
          query: reqParamsToQueryString(reqParams),
        },
        undefined,
        { shallow: true }
      );
    }
  }, [reqParams]);

  const response = data?.data?.response || null;

  return (
    <VenuesContainer
      setSelectedVenue={setSelectedVenue}
      isLoading={isLoading}
      responseData={response}
    />
  );
}
