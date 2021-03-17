import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import mapboxgl from "mapbox-gl";

import { useStore } from "../../hooks/useStore";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PopUp({ map }) {
  const [currentPopUp, setCurrentPopUp] = useState(null);

  const popUp = useStore((state) => state.mapBox.popUp);
  const set = useStore((state) => state.set);

  const router = useRouter();

  useEffect(() => {
    // Remove popUp if exists
    if (currentPopUp) {
      currentPopUp.remove();
      setCurrentPopUp(null);
    }

    if (popUp && map) {
      const h3 = window.document.createElement("h3");
      h3.className =
        "pop-up-link p-2 bg-gray-700 text-yellow rounded shadow text-center cursor-pointer";
      h3.dataset.popupId = popUp.id;
      h3.innerText = popUp.name;
      h3.addEventListener("click", handleClick);

      const tempPopUp = new mapboxgl.Popup({
        closeButton: false,
        offset: 5,
      })
        .setLngLat([popUp.lng, popUp.lat])
        .setDOMContent(h3);

      tempPopUp.addTo(map);

      // Store pop-up object to be removed on next update
      setCurrentPopUp(tempPopUp);
    }
  }, [popUp]);

  const handleClick = () => {
    if (popUp) {
      // Set marker
      set((state) => {
        state.mapBox.markers = [
          {
            id: popUp.id,
            name: popUp.name,
            lat: popUp.lat,
            lng: popUp.lng,
          },
        ];
        state.mapBox.popUp = null;
      });

      // Navigate to explore in single venue layout
      router.push({
        pathname: "/explore",
        query: { vid: popUp.id },
      });
    }
  };

  return null;
}
