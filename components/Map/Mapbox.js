import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";

import { useStore } from "../../hooks/useStore";
import changeMapLocale from "./changeMapLocale";
import PopUp from "./PopUp";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox() {
  const { locale, pathname } = useRouter();

  const { markers, center, zoom, userLocation } = useStore(
    (state) => state.mapBox
  );
  const set = useStore((state) => state.set);
  const [map, setMap] = useState(null);
  const [markersOnMap, setMarkersOnMap] = useState([]);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapObj = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: "mapbox://styles/mapbox/light-v10",
      style: "mapbox://styles/fullstackamr/cklqhou8c3tw917t65vl2u50x",
      center: center,
      zoom: zoom,
    });

    setMap(mapObj);

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

  // To run operations on map object when loaded
  const opOnMap = (fn, args) => {
    map.loaded() ? fn(...args) : map.on("load", () => fn(...args));
  };

  // Sync map labels language with user locale
  useEffect(() => {
    if (map) {
      opOnMap(changeMapLocale, [map, locale]);
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

  useEffect(() => {
    if (map && userLocation & !document.querySelector("#user-location")) {
      map.loaded()
        ? addUserLocationMarker()
        : map.on("load", () => addUserLocationMarker());
    }
  }, [userLocation]);

  // Handle markers
  useEffect(() => {
    if (map) {
      if (userLocation && !document.querySelector("#user-location")) {
        addUserLocationMarker();
      }

      for (let markerOnMap of markersOnMap) {
        markerOnMap.remove();
      }

      if (markers.length > 0) {
        const tempMarkers = [];

        for (let marker of markers) {
          var el = document.createElement("div");
          el.dataset.markerId = marker.id;
          el.dataset.markerName = marker.name;
          el.dataset.markerLng = marker.lng;
          el.dataset.markerLat = marker.lat;
          el.className = `marker h-8 w-7 ${
            pathname === "/explore" ? "cursor-pointer" : ""
          }`;

          const tempMarker = new mapboxgl.Marker(el, {
            anchor: "bottom",
          }).setLngLat([marker.lng, marker.lat]);

          tempMarkers.push(tempMarker);

          tempMarker.addTo(map);
        }

        // Store marker objects to be removed upon update
        setMarkersOnMap(tempMarkers);

        if (markers.length === 1) {
          map.easeTo({
            center: [markers[0].lng, markers[0].lat],
            zoom: 14,
          });
        } else {
          map.fitBounds(getBoundsForPoints(markers), {
            padding: { top: 90, left: 20, right: 20, bottom: 20 },
            linear: true,
          });
        }
      }
    }
  }, [markers]);

  const handleClicks = (e) => {
    // Handle clicks on markers
    if (e.target.classList.contains("marker") && pathname === "/explore") {
      const { markerId, markerName, markerLng, markerLat } = e.target.dataset;

      set((state) => {
        state.mapBox.popUp = {
          id: markerId,
          name: markerName,
          lng: markerLng,
          lat: markerLat,
        };
      });
    }
  };

  const addUserLocationMarker = () => {
    var el = document.createElement("div");
    el.id = "user-location";
    el.className = `h-8 w-7`;

    new mapboxgl.Marker(el, {
      anchor: "bottom",
    })
      .setLngLat([userLocation[0], userLocation[1]])
      .addTo(map);
  };

  return (
    <>
      <PopUp map={map} />

      <div
        id="map"
        dir="ltr"
        className="h-full w-full bg-gray-400 rounded-lg shadow border-2 border-gray-100"
        ref={mapContainerRef}
        onClick={handleClicks}
      />
    </>
  );
}

// https://gist.github.com/tomsoderlund/a2040d659aafe4064e4060f561aca6d1
function applyToArray(func, array) {
  return func.apply(Math, array);
}

function getBoundsForPoints(points) {
  // Calculate corner values of bounds
  const pointsLong = points.map((point) => point.lng);
  const pointsLat = points.map((point) => point.lat);

  const cornersLongLat = [
    [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
    [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)],
  ];

  return cornersLongLat;
}
