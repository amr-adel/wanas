import { useEffect } from "react";
import Head from "next/head";
import { useIntl } from "react-intl";
import { useStore } from "../../hooks/useStore";

import Icon from "../../utils/Icon";
import useRecentVenues from "../../hooks/useRecentVenues";

export default function VenueDetails({ venue }) {
  const { formatMessage, locale } = useIntl();
  const t = (id, values) => formatMessage({ id }, values);
  const set = useStore((state) => state.set);

  const { addToRecent } = useRecentVenues();

  const {
    id,
    name,
    location,
    categories,
    price,
    likes,
    rating,
    ratingColor,
    ratingSignals,
    tips,
    bestPhoto,
  } = venue;

  useEffect(() => {
    // Update map global state to modify center, zoom, and add marker at venue location
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

    // Add current venue to recent history
    addToRecent({ venue: { id, name, location, categories } });
  }, []);

  // Create venue photo url
  const photoUrl = bestPhoto
    ? `${bestPhoto.prefix}500x300${bestPhoto.suffix}`
    : `/images/venue-fallback-${locale === "ar" ? "ar" : "en"}.jpg`;

  // Title and description for better SEO
  const headTitle = `${t("app.name")} | ${name}`;
  const headDescription = t("meta.description.venue", { name });

  return (
    <>
      <Head>
        <title key="title">{headTitle}</title>
        <meta key="description" name="description" content={headDescription} />

        <meta name="twitter:title" content={headTitle} key="twitter-title" />
        <meta
          name="twitter:description"
          content={headDescription}
          key="twitter-description"
        />

        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:title"
          content={headTitle}
          key="og-title"
        />
        <meta
          prefix="og: http://ogp.me/ns#"
          property="og:description"
          content={headDescription}
          key="og-description"
        />
      </Head>

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
            locale === "ar" ? "left-2" : "right-2"
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
