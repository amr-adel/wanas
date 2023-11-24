import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";

import { useStore } from "../../hooks/useStore";
import VenuesContainer from "./VenuesContainer";
import VenueDetailed from "./VenueDetailed";

// Fetch venues through API route to protect client id & secret
const fetchVenues = (reqParams) => {
  return axios.post(`/api/exploreVenues`, reqParams);
};

export default function FourSquare() {
  const router = useRouter();

  const reqParams = useStore((state) => state.fourSquare.reqParams);
  const set = useStore((state) => state.set);

  const { data, error } = useSWR(
    reqParams.ll || reqParams.near
      ? { ...reqParams, locale: router.locale }
      : null,
    fetchVenues
  );

  const isLoading = !data && !error && reqParams.ll;

  // Handle known errors due to FourSquare API geocode failure, omit "near" parameter for SWR to retry with coords only
  if (
    ["failed_geocode", "geocode_too_big"].includes(data?.data?.meta?.errorType)
  ) {
    set((state) => {
      state.fourSquare.reqParams.near = null;
    });
  }

  const response = data?.data?.meta?.code === 200 ? data.data.response : null;

  // Selected venue ID
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
