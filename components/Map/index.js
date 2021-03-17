import GeoCoder from "../GeoCoder";
import Mapbox from "./Mapbox";

export default function Map() {
  return (
    <div className="w-full h-full">
      <div
        id="geocoder-overlay"
        className="absolute top-3 left-1/2 transform -translate-x-1/2 w-11/12 max-w-lg z-10"
      >
        <GeoCoder />
      </div>

      <Mapbox />
    </div>
  );
}
