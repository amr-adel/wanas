import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

import { useStore } from "../../hooks/useStore";
import VenuesContainer from "./VenuesContainer";
import VenueDetailed from "./VenueDetailed";

const fetchVenues = (reqParams, locale) => {
  return axios.post(`/api/exploreVenues`, { ...reqParams, locale });
};

export default function FourSquare() {
  const router = useRouter();

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const selectedVenue = useStore((state) => state.fourSquare.selectedVenue);
  const set = useStore((state) => state.set);

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near ? [reqParams, router.locale] : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  if (
    ["failed_geocode", "geocode_too_big"].includes(data?.data?.meta?.errorType)
  ) {
    set((state) => {
      state.fourSquare.reqParams.near = null;
    });
  }

  const response = data?.data?.meta?.code === 200 ? data.data.response : null;

  const vid = router.query.vid || null;

  return (
    <>
      {!vid && (
        <VenuesContainer isLoading={isLoading} responseData={response} />
      )}

      {vid && <VenueDetailed vid={vid} />}
    </>
  );
}
