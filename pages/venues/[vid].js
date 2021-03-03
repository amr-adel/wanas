import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useIntl } from "react-intl";
import axios from "axios";
import useSWR from "swr";
import { useStore } from "../../hooks/useStore";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Loader from "../../utils/Loader";
import Icon from "../../utils/Icon";
import useRecentVenues from "../../hooks/useRecentVenues";
import Map from "../../components/Map";
import { LayoutWithMap } from "../../components/Layout";

const fetchVenue = (vid, locale) => {
  return axios.get(`/api/getVenue?vid=${vid}&locale=${locale}`);
};

function Venue() {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const router = useRouter();
  const { vid, ll } = router.query;

  const set = useStore((state) => state.set);

  const { data, error } = useSWR(vid ? [vid, locale] : null, fetchVenue);

  const isLoding = !data && !error && vid;

  const { addToRecent } = useRecentVenues();

  let venueDetails = null;

  useEffect(() => {
    if (data?.data?.response?.venue) {
      const { id, name, location, categories } = data.data.response.venue;

      set((state) => {
        state.mapBox.center = [location.lng, location.lat];
        state.mapBox.zoom = 16;
        state.mapBox.markers = [
          {
            id,
            lat: location.lat,
            lng: location.lng,
          },
        ];
      });

      addToRecent({ venue: { id, name, location, categories } });
    }
  }, [data]);

  if (isLoding) {
    venueDetails = <Loader className="text-gray-400 h-14 py-5" />;
  } else if (data?.data?.meta?.errorDetail?.includes("invalid for venue id")) {
    venueDetails = (
      <p className="my-2 mx-auto p-2 bg-red-50 text-red-500 text-center rounded-lg shadow">
        {t("venue.invalid-id")}
      </p>
    );
  } else if (data?.data?.response?.venue) {
    const {
      id,
      name,
      location,
      contact,
      categories,
      verified,
      price,
      likes,
      rating,
      ratingColor,
      ratingSignals,
      tips,
      bestPhoto,
    } = data.data.response.venue;

    const photoUrl = bestPhoto
      ? `${bestPhoto.prefix}500x300${bestPhoto.suffix}`
      : `/images/venue-fallback-${router.locale === "ar" ? "ar" : "en"}.jpg`;

    venueDetails = (
      <>
        <header>
          {/* Venue name ========================================== */}
          <h1 className="p-2 text-2xl text-center text-red-500">{name}</h1>

          {categories?.length > 0 && (
            <div
              id="categories"
              className="pb-2 flex flex-wrap items-center justify-center"
            >
              {/* Categories ========================================== */}
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-sm text-yellow-400 bg-yellow-50 py-1 px-2 rounded m-1"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Best photo ========================================== */}
        <div className="w-full relative py-4">
          <div
            id="background-img"
            style={{
              paddingBottom: "60%",
              backgroundImage: `url(${photoUrl})`,
              backgroundSize: "cover",
            }}
            className="w-full h-0 bg-gray-300 rounded-lg border border-gray-200 shadow-sm"
          />

          <div
            dir="ltr"
            id="overlay"
            className={`absolute top-6 ${
              router.locale === "ar" ? "left-2" : "right-2"
            } w-20`}
          >
            {/* Rating ========================================== */}
            {rating && (
              <div id="rating" className="flex flex-col rounded-lg shadow">
                <div
                  id="score"
                  className="py-1 px-2 flex bg-gray-50 rounded-t-lg"
                >
                  <span
                    className="text-xl flex-1 flex justify-center font-bold"
                    style={{ color: `#${ratingColor}` }}
                  >
                    {rating}
                  </span>

                  <span className="text-sm text-gray-300 leading-5 tracking-wide">
                    /10
                  </span>
                </div>
                <span
                  id="signals"
                  className="p-1 text-gray-200 tracking-wider text-sm text-center font-bold bg-gray-800 rounded-b-lg"
                >
                  {ratingSignals}
                </span>
              </div>
            )}

            {/* Likes ========================================== */}
            {likes?.count !== 0 && (
              <div
                id="likes"
                className="p-1 mt-2 flex justify-center items-center tracking-widest text-center text-lg bg-gray-800 rounded-lg shadow"
              >
                <Icon name="heart" className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-gray-200 tracking-wider text-sm text-center font-bold">
                  {likes.count}
                </span>
              </div>
            )}

            {/* Price ========================================== */}
            {price && (
              <div
                id="price"
                className="p-1 mt-2 tracking-widest text-center text-lg bg-gray-800 rounded-lg shadow"
              >
                {["", "", "", ""].map((char, i) => (
                  <span
                    className={`${
                      i < price.tier ? "text-yellow" : "text-gray-600"
                    }`}
                    key={i}
                  >
                    $
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Address ========================================== */}
        {location.formattedAddress && (
          <div id="address" className="flex">
            <Icon name="pin" className="w-4 h-4 text-gray-200 mt-3 mx-1" />
            <p className="text-gray-700 py-2">
              {location.formattedAddress[0]} <br />
              {location.formattedAddress[1]}
            </p>
          </div>
        )}

        {/* Tips ========================================== */}
        {tips?.groups[0]?.items?.length > 0 && (
          <div id="tips" className="py-4 px-2 flex flex-col">
            {tips.groups[0].items.map((tip) => (
              <blockquote
                dir="auto"
                key={tip.id}
                className="text-sm text-gray-500 mb-2"
              >
                <p className="bg-gray-100 p-2 shadow-sm rounded-lg">{`" ${tip.text} "`}</p>
                <cite className="mt-1 block text-red-500 text-right mx-4">{`- ${tip.user.firstName}`}</cite>
              </blockquote>
            ))}
          </div>
        )}

        {/* External links ========================================== */}
        <div id="external-links" className="flex flex-col pt-4 pb-2">
          <a
            href={`https://foursquare.com/v/${id}`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-200 mb-2 flex shadow rounded-lg overflow-hidden"
          >
            <span className="h-10 p-2 flex-1 flex justify-center items-center text-center text-gray-300 bg-gray-700">
              {t("venue.moreInfo")}
            </span>
            <Icon
              name="external"
              className="h-10 w-10 p-3 text-yellow-500 bg-yellow"
            />
          </a>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
            target="_blank"
            rel="noreferrer noopener"
            className="text-gray-200 flex shadow rounded-lg overflow-hidden"
          >
            <span className="h-10 p-2 flex-1 flex justify-center items-center text-center text-gray-300 bg-gray-700">
              {t("venue.gmaps")}
            </span>
            <Icon
              name="pin"
              className="h-10 w-10 p-3 text-yellow-500 bg-yellow"
            />
          </a>
        </div>
      </>
    );
  }

  return (
    <LayoutWithMap>
      <Head>
        <title>{t("app.name")}</title>
      </Head>

      <div className="h-96 md:h-full w-full relative">
        <Map />
      </div>

      <SimpleBar
        className={`md:w-2/5 md:max-w-sm md:flex-shrink-0 md:pb-2 md:h-full`}
      >
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-50 p-2 flex flex-col divide-y divide-gray-200 rounded-lg shadow">
            {venueDetails}
          </div>

          {data && (
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
          )}
        </div>
      </SimpleBar>
    </LayoutWithMap>
  );
}

export default Venue;
