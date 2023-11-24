import { useEffect } from "react";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import axios from "axios";
import useSWR from "swr";

import VenueDetails from "./VenueDetails";
import Icon from "../../../utils/Icon";
import Loader from "../../../utils/Loader";

// Fetch venue details through API route to protect client id & secret
const fetchVenue = ({ vid, locale }) => {
  return axios.get(`/api/getVenue?vid=${vid}&locale=${locale}`);
};

export default function VenueDetailed({ vid }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();

  const { data, error } = useSWR({ vid, locale }, fetchVenue);

  const isLoding = !data && !error && vid;

  useEffect(() => {
    // Update URL without rerender
    if (window) {
      history.replaceState(null, "", `venues/${vid}`);
    }
  }, []);

  return (
    <div className="flex flex-col space-y-4 relative md:pr-3">
      <button
        onClick={() => router.back()}
        className="h-12 w-full flex items-center bg-gray-100 text-gray-500 hover:text-gray-600 rounded-lg overflow-hidden shadow hover:shadow-md focus:outline-none"
      >
        <Icon
          name={locale === "ar" ? "right" : "left"}
          className="h-12 w-12 p-2 pattern-dark text-yellow flex-shrink-0"
        />
        <h6 className="h-full w-full flex-grow flex items-center justify-center text-lg">
          {t("explore.venue.back")}
        </h6>
      </button>

      <div className="min-h-16 bg-gray-50 p-2 flex flex-col divide-y divide-gray-200 rounded-lg shadow">
        {isLoding && <Loader className="text-gray-400 h-12 my-4 py-4" />}

        {data && <VenueDetails venue={data.data.response.venue} />}
      </div>
      {/* FourSquare attribution */}
      {data && (
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
      )}
    </div>
  );
}
