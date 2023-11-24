import { useIntl } from "react-intl";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { LayoutWithMap } from "../../components/Layout";
import Map from "../../components/Map";
import VenueDetails from "../../components/FourSquare/VenueDetailed/VenueDetails";

// Fetching venue details server-side
export async function getServerSideProps({ params, locale }) {
  const res = await fetch(
    `https://api.foursquare.com/v2/venues/${params.vid}?client_id=${process.env.FS_ID}&client_secret=${process.env.FS_SECRET}&locale=${locale}&v=20210115`
  );

  const data = await res.json();

  if (!data || data?.meta?.errorDetail?.includes("invalid for venue id")) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: data,
  };
}

function Venue({ meta, response }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  // Handle errors
  if (meta.errorDetail) {
    console.error("Error", meta.errorDetail);

    return <div>Unexpected Error</div>;
  }

  return (
    <LayoutWithMap>
      <div className="h-96 md:h-full w-full relative">
        <Map />
      </div>

      <SimpleBar
        className={`md:w-2/5 md:max-w-sm md:flex-shrink-0 md:pb-2 md:h-full`}
      >
        <div className="flex flex-col space-y-4 md:pr-3">
          <div className="bg-gray-50 p-2 flex flex-col divide-y divide-gray-200 rounded-lg shadow">
            <VenueDetails venue={response.venue} />
          </div>

          <cite className="text-sm w-full block text-center not-italic text-gray-700 p-2">
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
        </div>
      </SimpleBar>
    </LayoutWithMap>
  );
}

export default Venue;
