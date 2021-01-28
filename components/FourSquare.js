import { useIntl } from "react-intl";

import axios from "axios";
import useSWR from "swr";

import Loader from "../utils/Loader";
import FourSquareVenues from "./FourSquareVenues";

const fetchVenues = (center, locale) => {
  return axios.get(
    `/api/fs?locale=${locale === "ar" ? "en" : locale}&ll=${center}`
  );
};

export default function FourSquare({ center }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { data, error } = useSWR(
    center[0] === 0 && center[1] === 0 ? null : [center, locale],
    fetchVenues
  );

  const isLoading = !data && !error && !(center[0] === 0 && center[1] === 0);

  return (
    <div className="bg-gray-200 px-2 py-4 mt-72 z-10 relative rounded-t-lg">
      <div id="venues-container">
        {isLoading && <Loader classes="text-gray-400 h-4 my-4" />}

        {data && (
          <FourSquareVenues venues={data.data.response.groups[0].items} />
        )}
      </div>
    </div>
  );
}
