'use client';

import { useMemo } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const caliCoords: [number, number] = [3.4516, -76.532];

export default function ColombiaMap() {
  const markerIcon = useMemo(() => new L.DivIcon({
    className: "custom-marker",
    html: `<div style="
      width: 16px;
      height: 16px;
      background: #EC6620;
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  }), []);

  return (
    <div className="h-full w-full min-h-[200px] rounded-[10px] overflow-hidden">
      <MapContainer
        center={[4.5, -74]}
        zoom={6}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        className="h-full w-full"
        style={{ minHeight: "200px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={caliCoords} icon={markerIcon}>
          <Popup>
            <span className="font-semibold">Cali, Colombia</span>
            <br />
            <span className="text-xs text-zinc-500">Sede principal ASCEP</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
