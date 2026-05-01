"use client";

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet with Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMapInner() {
  const center: [number, number] = [20.5937, 78.9629]; // Center of India
  
  const mockHotspots = [
    { pos: [28.6139, 77.2090] as [number, number], name: "Delhi Heatmap Node", risk: "High" },
    { pos: [19.0760, 72.8777] as [number, number], name: "Mumbai Inspection Unit", risk: "Moderate" },
    { pos: [13.0827, 80.2707] as [number, number], name: "Chennai Safety Hub", risk: "Low" },
  ];

  return (
    <MapContainer 
      center={center} 
      zoom={5} 
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', background: '#0b0f19' }}
      zoomControl={false}
    >
      {/* 
        OpenStreetMap Standard Tiles (100% Free)
        Alternatively, for a dark theme that matches the app, use CartoDB Dark Matter (also free)
      */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {mockHotspots.map((spot, i) => (
        <CircleMarker 
          key={i} 
          center={spot.pos} 
          pathOptions={{ 
            color: spot.risk === 'High' ? '#f43f5e' : spot.risk === 'Moderate' ? '#f59e0b' : '#10b981',
            fillColor: spot.risk === 'High' ? '#f43f5e' : spot.risk === 'Moderate' ? '#f59e0b' : '#10b981',
            fillOpacity: 0.4
          }} 
          radius={20}
        >
          <Popup>
            <div className="text-black font-sans">
              <p className="font-bold">{spot.name}</p>
              <p className="text-xs">Risk Level: {spot.risk}</p>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      <Marker position={[28.6139, 77.2090]}>
        <Popup>
          <span className="text-black font-bold font-sans">National Safety HQ (Delhi)</span>
        </Popup>
      </Marker>

    </MapContainer>
  );
}
