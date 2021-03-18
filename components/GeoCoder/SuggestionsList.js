import { useRouter } from "next/router";
import { useStore } from "../../hooks/useStore";

export default function SuggestionsList({ suggestions, setQuery }) {
  const { asPath, locale } = useRouter();
  const router = useRouter();

  const set = useStore((state) => state.set);

  const handlePlaceSelect = (e, place) => {
    e.preventDefault();

    const { center, labels, text, place_name, countryCode } = place;

    set((state) => {
      // Mapbox [Lng, Lat], FourSquare [Lat, Lng]
      state.fourSquare.reqParams.ll = [center.lat, center.lng];
      state.fourSquare.reqParams.near = `${labels?.en || text}${
        countryCode && `, ${countryCode}`
      }`;
      state.fourSquare.reqParams.offset = 0;
      state.fourSquare.nearLabels = labels;

      state.mapBox.center = [center.lng, center.lat];
      state.mapBox.zoom = 14;
    });

    setQuery(place_name);
    document.activeElement.blur();

    if (!asPath.includes("/explore") || asPath.includes("vid")) {
      router.push("/explore");
    }
  };

  return (
    <ol dir={locale === "ar" ? "rtl" : "ltr"} className="flex flex-col">
      {suggestions.map((place) => (
        <li
          key={place.id}
          className="flex flex-col px-2 py-1 mb-2 bg-white rounded-lg cursor-pointer shadow hover:shadow-md"
          onMouseDown={(e) => handlePlaceSelect(e, place)}
        >
          <h5 className="text-red-500 text-lg font-bold">{place.text}</h5>
          <span className="text-gray-400 text-sm">{place.place_name}</span>
        </li>
      ))}
    </ol>
  );
}
