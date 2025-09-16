
'use client';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Rectangle, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ points, result }) {
  const center = points.length ? [points[0].lat, points[0].lng] : [0,0];
  const bounds = result?.bounds ? [[result.bounds.south, result.bounds.west], [result.bounds.north, result.bounds.east]] : null;
  const centroid = result?.centroid ? [result.centroid.lat, result.centroid.lng] : null;

  return (
    <MapContainer center={center} zoom={points.length ? 5 : 2} style={{ height: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {points.map((p, i) => (
        <Marker key={i} position={[p.lat, p.lng]}>
          <Popup>{p.lat}, {p.lng}</Popup>
        </Marker>
      ))}
      {bounds && <Rectangle bounds={bounds} />}
      {centroid && <Circle center={centroid} radius={50000} />}
    </MapContainer>
  );
}
