import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";
import { useStore } from "../hooks/useStore";
import GeoCoder from "./GeoCoder";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({ withGeoCoder = false }) {
  const { locale, pathname } = useRouter();
  const router = useRouter();

  const { markers, center, zoom, popUp } = useStore((state) => state.mapBox);
  const set = useStore((state) => state.set);
  const [map, setMap] = useState(null);
  const [markersOnMap, setMarkersOnMap] = useState([]);
  const [popUpOnMap, setPopUpOnMap] = useState(null);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: mapContainerRef.current,
        // style: "mapbox://styles/mapbox/light-v10",
        style: "mapbox://styles/fullstackamr/cklbcz9mj0ke417qlvx33xryl",
        center: center,
        zoom: zoom,
      })
    );

    if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
      mapboxgl.setRTLTextPlugin(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
        null,
        true // Lazy load the plugin
      );
    }
  }, []);

  useEffect(() => {
    if (map) {
      map.loaded()
        ? changeMapLocale()
        : map.on("load", () => changeMapLocale());
    }
  }, [map, locale]);

  useEffect(() => {
    if (map) {
      map.easeTo({
        center,
        zoom,
      });
    }
  }, [center, zoom]);

  useEffect(() => {
    if (map) {
      for (let markerOnMap of markersOnMap) {
        markerOnMap.remove();
      }

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

      setMarkersOnMap(tempMarkers);

      if (markers.length === 1) {
        map.easeTo({
          center: [markers[0].lng, markers[0].lat],
          zoom: 14,
        });
      } else
        map.fitBounds(getBoundsForPoints(markers), {
          padding: { top: 90, left: 20, right: 20, bottom: 20 },
          linear: true,
        });
    }
  }, [markers]);

  useEffect(() => {
    if (map) {
      map.loaded() ? showHidePopUps() : map.on("load", () => showHidePopUps());
    }
  }, [popUp]);

  const changeMapLocale = () => {
    const textField = map.getLayoutProperty("country-label", "text-field");

    if (
      textField[1].indexOf(locale) === -1 &&
      textField[1]?.[1].indexOf(locale) === -1
    ) {
      // // https://stackoverflow.com/questions/58605220/how-to-change-language-in-mapbox
      map.getStyle().layers.forEach(function (thisLayer) {
        if (thisLayer.id.indexOf("-label") > 0) {
          map.setLayoutProperty(thisLayer.id, "text-field", [
            "get",
            `name_${locale}`,
          ]);
        }
      });
    }
  };

  const showHidePopUps = () => {
    if (popUpOnMap) {
      popUpOnMap.remove();
      setPopUpOnMap(null);
    }

    if (popUp) {
      const tempPopUp = new mapboxgl.Popup({
        closeButton: false,
        offset: 5,
      })
        .setLngLat([popUp.lng, popUp.lat])
        .setHTML(
          `<h3 class='pop-up-link p-2 text-red-500 text-center cursor-pointer' data-popUp-id=${popUp.id}>${popUp.name}</h3>`
        );

      tempPopUp.addTo(map);

      setPopUpOnMap(tempPopUp);
    }
  };

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

    // Handle clicks on pop-ups
    if (e.target.classList.contains("pop-up-link")) {
      e.stopPropagation();
      set((state) => {
        state.mapBox.popUp = null;
      });
      router.push(`/venues/${e.target.dataset.popupId}`);
    }
  };

  return (
    <div className="w-full h-96 relative">
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      {withGeoCoder && (
        <div
          id="geocoder-overlay"
          className="absolute top-2 left-2 right-2 z-10"
        >
          <GeoCoder />
        </div>
      )}

      <div
        id="map"
        className="h-full w-full bg-gray-400 rounded-lg shadow"
        ref={mapContainerRef}
        onClick={handleClicks}
      />
    </div>
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
