import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";

import { useStore } from "../../hooks/useStore";

import Loader from "../../utils/Loader";
import Icon from "../../utils/Icon";

export default function UserLocation({ setQuery }) {
  const { formatMessage, locale } = useIntl();
  const t = (id) => formatMessage({ id });

  const { pathname } = useRouter();
  const router = useRouter();

  // currentLocation: null | ready | searching
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const set = useStore((state) => state.set);

  useEffect(() => {
    // Check to show option only when "geolocation" is available, and prevent errors on server side
    if (navigator.geolocation) {
      setCurrentLocation("ready");
    }
  }, []);

  const success = (position) => {
    const { latitude: lat, longitude: lng } = position.coords;

    setCurrentLocation("ready");

    set((state) => {
      // Mapbox [Lng, Lat], FourSquare [Lat, Lng]
      state.fourSquare.reqParams.ll = [lat, lng];
      state.fourSquare.reqParams.near = null;
      state.fourSquare.reqParams.offset = 0;
      state.fourSquare.nearLabels = null;

      state.mapBox.center = [lng, lat];
      state.mapBox.userLocation = [lng, lat];
      state.mapBox.zoom = 14;
    });

    setQuery("");
    document.activeElement.blur();

    if (pathname !== "/explore") {
      router.push("/explore");
    }
  };

  const error = (e) => {
    setCurrentLocation("ready");
    setErrorMsg(
      t(`geocoder.currentLocation.${e.code === 1 ? "error.1" : "error"}`)
    );
  };

  const options = {
    enableHighAccuracy: true,
    maximumAge: 180000,
    timeout: 45000,
  };

  const handleCurrentLocation = (e) => {
    e.preventDefault();

    setErrorMsg(null);

    setCurrentLocation("searching");

    return navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return !currentLocation ? null : (
    <div id="current-location" onMouseDown={handleCurrentLocation}>
      {currentLocation === "searching" ? (
        <Loader className="text-gray-400 h-8 py-2" />
      ) : (
        <div
          className={`flex items-center divide-x ${
            locale === "ar" ? "divide-x-reverse" : ""
          } divide-gray-300 p-2 my-2 text-gray-500 bg-white rounded-lg cursor-pointer shadow hover:shadow-md`}
        >
          <Icon
            name="my-location"
            className="w-6 h-6 mx-2 flex-shrink-0 text-yellow"
          />

          <span className="px-2 py-1">
            <h5>{t("geocoder.currentLocation")}</h5>
            {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
          </span>
        </div>
      )}
    </div>
  );
}
