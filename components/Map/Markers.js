import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";

import { useStore } from "../../hooks/useStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Markers({ map }) {
  const [currentMarkers, setCurrentMarkers] = useState([]);

  const { asPath } = useRouter();

  const markers = useStore((state) => state.mapBox.markers);
  const userLocation = useStore((state) => state.mapBox.userLocation);
  const set = useStore((state) => state.set);

  useEffect(() => {
    // Add marker on user's location if found
    if (map && userLocation && !document.querySelector("#user-location")) {
      const el = document.createElement("div");
      el.id = "user-location";
      el.className = `h-8 w-7`;

      new mapboxgl.Marker(el, {
        anchor: "bottom",
      })
        .setLngLat([userLocation[0], userLocation[1]])
        .addTo(map);
    }

    // Clean current markers if any, before adding new ones
    for (let marker of currentMarkers) {
      marker.remove();
    }

    // Remove popUp on update
    set((state) => {
      state.mapBox.popUp = null;
    });

    // Add markers to the map
    if (map && markers.length > 0) {
      const tempMarkers = [];

      for (let marker of markers) {
        const el = document.createElement("div");
        el.dataset.markerId = marker.id;
        el.className = `marker h-8 w-7 ${
          !asPath.includes("vid") && "cursor-pointer"
        }`;
        el.addEventListener("click", () => handleClick(marker));

        const tempMarker = new mapboxgl.Marker(el, {
          anchor: "bottom",
        }).setLngLat([marker.lng, marker.lat]);

        tempMarkers.push(tempMarker);

        tempMarker.addTo(map);
      }

      // Store markers objects to be removed on next update
      setCurrentMarkers(tempMarkers);

      // Fit map to show all markers
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
  }, [markers, userLocation]);

  const handleClick = ({ id, name, lng, lat }) => {
    if (!asPath.includes("vid")) {
      set((state) => {
        state.mapBox.popUp = {
          id,
          name,
          lng,
          lat,
        };
      });
    }
  };

  return null;
}

// Get bounds from an array of coords
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
