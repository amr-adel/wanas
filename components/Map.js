import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";
import { useStore } from "../hooks/useStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map() {
  const { locale } = useRouter();

  const { markers, center, zoom } = useStore((state) => state.mapBox);
  const [map, setMap] = useState(null);
  const [markersOnMap, setMarkersOnMap] = useState([]);

  const mapContainerRef = useRef(null);

  useEffect(() => {
    setMap(
      new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v10",
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
        el.id = "marker-" + marker.id;
        el.className = "marker h-8 w-7";

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
          padding: { top: 40, left: 20, right: 20, bottom: 30 },
          linear: true,
        });
    }
  }, [markers]);

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

  return (
    <>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <div
        id="map"
        className="h-64 w-full fixed top-14"
        ref={mapContainerRef}
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
