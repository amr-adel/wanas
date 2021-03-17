import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";

import { useStore } from "../../hooks/useStore";
import changeMapLocale from "./changeMapLocale";
import PopUp from "./PopUp";
import Markers from "./Markers";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox() {
  const { locale } = useRouter();

  const zoom = useStore((state) => state.mapBox.zoom);
  const center = useStore((state) => state.mapBox.center);
  const [map, setMap] = useState(null);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapObj = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: "mapbox://styles/mapbox/light-v10",
      style: "mapbox://styles/fullstackamr/cklqhou8c3tw917t65vl2u50x",
      center: center,
      zoom: zoom,
    });

    // Save "map" to be used as a prop for children component
    setMap(mapObj);

    // To render labels in RTL languages properly
    if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
      mapboxgl.setRTLTextPlugin(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
        null,
        true // Lazy load the plugin
      );
    }

    return () => {
      // Clean up and release all internal resources associated with this map
      mapObj.remove();
    };
  }, []);

  // Sync map labels language with user's locale
  useEffect(() => {
    if (map) {
      map.loaded()
        ? changeMapLocale(map, locale)
        : map.on("load", () => changeMapLocale(map, locale));
    }
  }, [map, locale]);

  // Animate map pan on center or zoom change
  useEffect(() => {
    if (map) {
      map.easeTo({
        center,
        zoom,
      });
    }
  }, [center, zoom]);

  return (
    <>
      <PopUp map={map} />

      <Markers map={map} />

      <div
        id="map"
        dir="ltr"
        className="h-full w-full bg-gray-400 rounded-lg shadow border-2 border-gray-100"
        ref={mapContainerRef}
      />
    </>
  );
}
