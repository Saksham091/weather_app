"use client";
import { Map as LeafletMap } from 'leaflet';  
import { useMap } from 'react-leaflet';
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { useGlobalContext } from "@/app/context/globalContext";
import { MapContainerProps } from "react-leaflet";

const MapContainer = dynamic<MapContainerProps>(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
function FlyToActiveCity({ activeCityCords }: { activeCityCords: any }) {
  const map = useMap() as LeafletMap;
  useEffect(() => {
    if (map && map.flyTo && activeCityCords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };

      map.flyTo([activeCityCords.lat, activeCityCords.lon], zoomLev, flyToOptions);
    }
  }, [activeCityCords, map]);

  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();
  const [isClient, setIsClient] = useState(false);

  const activeCityCords = forecast?.coord;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  if (!forecast || !forecast.coord || !activeCityCords) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCords.lat, activeCityCords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FlyToActiveCity activeCityCords={activeCityCords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;