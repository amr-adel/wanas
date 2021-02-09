import { useEffect, useState, useMemo, useRef } from "react";
import ReactMapGL, { Marker, LinearInterpolator } from "react-map-gl";
import { useStore } from "../hooks/useStore";

export default function Map() {
  const ll = useStore((state) => state.fourSquare.reqParams.ll);
  const markers = useStore((state) => state.markers);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 0,
  });

  useEffect(() => {
    if (ll?.length > 0) {
      setViewport({ ...viewport, latitude: ll[0], longitude: ll[1], zoom: 14 });
    }
  }, [ll]);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && markers.length) {
      const bbox = getBoundsForPoints(markers);
      const map = mapRef.current.getMap();

      const nextViewport = map.cameraForBounds(bbox, { padding: 20 });

      setViewport({
        ...viewport,
        zoom: nextViewport.zoom,
        latitude: nextViewport.center.lat,
        longitude: nextViewport.center.lng,
      });
    }
  }, [mapRef, markers]);

  const Markers = useMemo(
    () =>
      markers.map((venue) => (
        <Marker key={venue.id} longitude={venue.lng} latitude={venue.lat}>
          <div className="h-1 w-1 bg-red-500"></div>
        </Marker>
      )),
    [markers]
  );

  return (
    <div
      id="map"
      className="h-64 fixed top-14 flex items-center justify-center bg-yellow-100"
    >
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        // transitionDuration={500}
        // transitionInterpolator={new LinearInterpolator(["zoom"])}
      >
        {Markers}
      </ReactMapGL>
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
