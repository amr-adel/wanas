import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { LayoutWithMap } from "../components/Layout";
import Map from "../components/Map";
import FourSquare from "../components/FourSquare";

export default function Explore() {
  return (
    <LayoutWithMap>
      <div className="h-96 md:h-full w-full relative">
        <Map />
      </div>

      <SimpleBar
        className={`md:w-2/5 md:max-w-sm md:flex-shrink-0 md:pb-2 md:h-full`}
      >
        <FourSquare />
      </SimpleBar>
    </LayoutWithMap>
  );
}
