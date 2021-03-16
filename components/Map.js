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

  const { markers, center, zoom, popUp, userLocation } = useStore(
    (state) => state.mapBox
  );
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
        style: "mapbox://styles/fullstackamr/cklqhou8c3tw917t65vl2u50x",
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

  // Sync map labels language with user locale
  useEffect(() => {
    if (map) {
      map.loaded()
        ? changeMapLocale()
        : map.on("load", () => changeMapLocale());
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

      if (popUpOnMap) {
        popUpOnMap.remove();
        setPopUpOnMap(null);
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

  // Handle pop-up state
  useEffect(() => {
    if (map) {
      map.loaded() ? showHidePopUps() : map.on("load", () => showHidePopUps());
    }
  }, [popUp]);

  const changeMapLocale = () => {
    const textField = map.getLayoutProperty("country-label", "text-field");

    if (textField[1]?.[1].indexOf(locale) === -1) {
      // https://stackoverflow.com/questions/58605220/how-to-change-language-in-mapbox
      map.getStyle().layers.forEach(function (thisLayer) {
        if (thisLayer.id.indexOf("-label") > 0) {
          map.setLayoutProperty(thisLayer.id, "text-field", [
            "coalesce",

            ["get", `name_${locale}`],
            ["get", `name_en`],
            ["get", `name`],
          ]);
        }
      });
    }

    map.resize();
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
          `<h3 class='pop-up-link p-2 bg-gray-700 text-yellow rounded shadow text-center cursor-pointer' data-popUp-id=${popUp.id}>${popUp.name}</h3>`
        );

      tempPopUp.addTo(map);

      // Store pop-up object to be removed upon update
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
        state.mapBox.markers = [
          {
            id: e.target.dataset.popupId,
            name: e.target.innerText,
            lat: popUpOnMap._lngLat.lat,
            lng: popUpOnMap._lngLat.lng,
          },
        ];
        state.mapBox.popUp = null;
      });

      router.push({
        pathname: "/explore",
        query: { vid: e.target.dataset.popupId },
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
    <div className="w-full h-full">
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      {withGeoCoder && (
        <div
          id="geocoder-overlay"
          className="absolute top-3 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg z-10"
        >
          <GeoCoder />
        </div>
      )}

      <div
        id="map"
        dir="ltr"
        className="h-full w-full bg-gray-400 rounded-lg shadow border-2 border-gray-100"
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
