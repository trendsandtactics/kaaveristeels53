"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";

type Dealer = {
  id: number;
  city: string;
  address: string;
  contact: string;
  lat: number;
  lng: number;
};

type LeafletMarker = {
  getLatLng: () => { lat: number; lng: number };
  openPopup: () => void;
  on: (event: string, cb: () => void) => void;
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => LeafletMarker;
};

type LeafletMap = {
  setView: (coords: [number, number], zoom: number) => LeafletMap;
  flyTo: (coords: [number, number], zoom: number, options?: { duration?: number }) => void;
  remove: () => void;
};

type LeafletFactory = {
  map: (container: HTMLDivElement, options?: { scrollWheelZoom?: boolean }) => LeafletMap;
  tileLayer: (url: string, options: { attribution: string }) => { addTo: (map: LeafletMap) => void };
  icon: (options: {
    iconUrl: string;
    iconRetinaUrl: string;
    shadowUrl: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
  }) => unknown;
  marker: (coords: [number, number], options: { icon: unknown }) => LeafletMarker;
};

declare global {
  interface Window {
    L?: LeafletFactory;
  }
}

const dealers: Dealer[] = [
  { id: 1, city: "Chennai", address: "Ambattur Industrial Estate", contact: "+91 98765 43210", lat: 13.0827, lng: 80.2707 },
  { id: 2, city: "Coimbatore", address: "Peelamedu Main Road", contact: "+91 98765 43211", lat: 11.0168, lng: 76.9558 },
  { id: 3, city: "Madurai", address: "Kappalur SIDCO Industrial Estate", contact: "+91 98765 43212", lat: 9.9252, lng: 78.1198 },
  { id: 4, city: "Trichy", address: "Thuvakudi Industrial Estate", contact: "+91 98765 43213", lat: 10.7905, lng: 78.7047 },
  { id: 5, city: "Salem", address: "Leigh Bazaar", contact: "+91 98765 43214", lat: 11.6643, lng: 78.1460 },
  { id: 6, city: "Puducherry", address: "Mettupalayam Industrial Estate", contact: "+91 98765 43215", lat: 11.9416, lng: 79.8083 },
  { id: 7, city: "Erode", address: "Perundurai SIPCOT", contact: "+91 98765 43216", lat: 11.3410, lng: 77.7172 },
  { id: 8, city: "Tirunelveli", address: "NGO Colony Main Road", contact: "+91 98765 43217", lat: 8.7139, lng: 77.7567 },
];

export default function DealersPage() {
  const [query, setQuery] = useState("");
  const [selectedDealerId, setSelectedDealerId] = useState<number>(dealers[0].id);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<number, LeafletMarker>>(new Map());

  const filteredDealers = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return dealers;
    }

    return dealers.filter((dealer) =>
      [dealer.city, dealer.address, dealer.contact].join(" ").toLowerCase().includes(normalized),
    );
  }, [query]);

  const getGoogleMapsLink = (dealer: Dealer) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${dealer.address}, ${dealer.city}`)}`;

  useEffect(() => {
    let cancelled = false;
    const markerMap = markersRef.current;

    const loadLeaflet = async () => {
      if (!document.querySelector('link[data-leaflet="css"]')) {
        const cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        cssLink.setAttribute("data-leaflet", "css");
        document.head.appendChild(cssLink);
      }

      if (!window.L) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Leaflet script."));
          document.body.appendChild(script);
        });
      }

      if (cancelled || !mapContainerRef.current || !window.L || mapInstanceRef.current) {
        return;
      }

      const L = window.L;
      const map = L.map(mapContainerRef.current, {
        scrollWheelZoom: true,
      }).setView([11.2, 78.1], 7);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const markerIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      dealers.forEach((dealer) => {
        const marker = L.marker([dealer.lat, dealer.lng], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<b>${dealer.city} Center</b><br/>${dealer.address}<br/>${dealer.contact}`);

        marker.on("click", () => setSelectedDealerId(dealer.id));
        markerMap.set(dealer.id, marker);
      });

      mapInstanceRef.current = map;
    };

    loadLeaflet().catch((error) => {
      console.error(error);
    });

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markerMap.clear();
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const marker = markersRef.current.get(selectedDealerId);

    if (!map || !marker) {
      return;
    }

    const latLng = marker.getLatLng();
    map.flyTo([latLng.lat, latLng.lng], 9, { duration: 0.7 });
    marker.openPopup();
  }, [selectedDealerId]);

  return (
    <GenericPlaceholderPage
      title="Partner Network"
      subtitle="Dealers & Distributors"
      description="Find authorized KAAVERI dealers near you, explore nearby branches, and open directions instantly in Google Maps."
      icon="📍"
      color="accent-yellow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20">
        <div className="mb-8 rounded-2xl border border-accent-yellow/40 bg-gradient-to-r from-accent-yellow/25 via-white to-white px-5 py-6 md:px-8 md:py-7 shadow-[0_10px_35px_rgba(0,0,0,0.07)]">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h3 className="font-heading text-3xl md:text-4xl text-black">Authorized Dealer Locations</h3>
              <p className="mt-2 text-sm md:text-base text-black/70">
                Select a dealer to zoom on the map and open turn-by-turn directions in Google Maps.
              </p>
            </div>
            <div className="rounded-xl border border-gray-300 bg-white/90 px-3 py-2">
              <p className="text-xs uppercase tracking-[0.18em] text-black/60 font-semibold">Network Size</p>
              <p className="text-2xl font-heading text-black leading-tight">{dealers.length} Cities</p>
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by city, address, phone"
            className="w-full md:max-w-sm border border-gray-300 bg-white px-4 py-3 text-sm rounded-xl shadow-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 border border-gray-200 bg-white overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div ref={mapContainerRef} className="h-[420px] md:h-[560px] w-full" />
          </div>

          <div className="lg:col-span-2 border border-gray-200 bg-white overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="max-h-[560px] overflow-y-auto">
              {filteredDealers.length > 0 ? (
                filteredDealers.map((dealer) => {
                  const isActive = dealer.id === selectedDealerId;
                  const googleMapsLink = getGoogleMapsLink(dealer);

                  return (
                    <div
                      key={dealer.id}
                      className={`px-5 py-4 border-b border-gray-100 transition-colors ${
                        isActive ? "bg-accent-yellow/25" : "hover:bg-gray-50"
                      }`}
                    >
                      <button onClick={() => setSelectedDealerId(dealer.id)} className="w-full text-left">
                        <h4 className="font-heading text-xl text-black">{dealer.city} Center</h4>
                        <p className="font-body text-sm text-black/70 mt-1">{dealer.address}</p>
                        <p className="font-body text-sm font-semibold text-black mt-2">📞 {dealer.contact}</p>
                      </button>

                      <a
                        href={googleMapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center rounded-lg border border-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black hover:bg-black hover:text-white transition-colors"
                      >
                        Open in Google Maps ↗
                      </a>
                    </div>
                  );
                })
              ) : (
                <div className="px-5 py-10 text-center text-black/60">No dealers found for “{query}”.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </GenericPlaceholderPage>
  );
}
