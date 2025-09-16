
'use client';
import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { config } from "../config";
const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Page() {
  const [points, setPoints] = useState([]);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [result, setResult] = useState(null);

  const addPoint = () => {
    const la = parseFloat(lat);
    const lo = parseFloat(lng);
    if (isNaN(la) || isNaN(lo)) return alert("lat and lng must be numbers");
    setPoints([...points, { lat: la, lng: lo }]);
    setLat(''); setLng('');
  };

  const process = async () => {
    try {
      const res = await axios.post(`${config.apiBase}/process-points`, { points });
      setResult(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Geo Processor - Frontend</h1>
      <div>
        <input placeholder="lat" value={lat} onChange={(e) => setLat(e.target.value)} />
        <input placeholder="lng" value={lng} onChange={(e) => setLng(e.target.value)} />
        <button onClick={addPoint}>Add point</button>
        <button onClick={() => setPoints([])}>Clear</button>
        <button onClick={process} disabled={points.length === 0}>Process</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Points:</strong>
        <ul>
          {points.map((p, i) => <li key={i}>{p.lat}, {p.lng}</li>)}
        </ul>
      </div>

      <div style={{ height: 500, marginTop: 12 }}>
        <MapView points={points} result={result} />
      </div>
    </div>
  );
}
