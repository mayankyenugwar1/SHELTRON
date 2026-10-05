import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SiteRequirements } from '../types';
import { CITIES } from '../data/defaults';

interface ClimateMapProps {
  site: SiteRequirements;
  onSelectCity: (city: typeof CITIES[0]) => void;
}

export const ClimateMap: React.FC<ClimateMapProps> = ({ site, onSelectCity }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapError, setMapError] = React.useState<boolean>(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [site.latitude, site.longitude],
          zoom: 5,
          zoomControl: true,
          scrollWheelZoom: false
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18
        }).addTo(map);

        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Add city markers
      CITIES.forEach(city => {
        const isSelected = city.name.toLowerCase() === site.location_name.toLowerCase();
        
        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="
              background: ${isSelected ? '#0284c7' : '#0f766e'};
              color: white;
              padding: 4px 10px;
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              white-space: nowrap;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.25);
              border: 2px solid white;
              transform: translate(-50%, -50%);
              display: flex;
              align-items: center;
              gap: 5px;
            ">
              <span style="width: 7px; height: 7px; background: ${isSelected ? '#38bdf8' : '#34d399'}; border-radius: 50%;"></span>
              ${city.name.split(',')[0]}
              ${isSelected ? '★' : ''}
            </div>
          `,
          iconSize: [85, 26],
          iconAnchor: [42, 13]
        });

        const marker = L.marker([city.lat, city.lon], { icon: customIcon })
          .addTo(map)
          .on('click', () => {
            onSelectCity(city);
            map.flyTo([city.lat, city.lon], 6, { duration: 1.2 });
          });

        markersRef.current.push(marker);
      });

      map.flyTo([site.latitude, site.longitude], map.getZoom(), { duration: 0.8 });
    } catch (err) {
      console.warn("Map rendering fallback activated:", err);
      setMapError(true);
    }
  }, [site.latitude, site.longitude, site.location_name, onSelectCity]);

  if (mapError) {
    return (
      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span className="font-extrabold text-slate-800 text-sm">{site.location_name}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">Offline Location Fallback Card</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Coordinates</span>
            <span className="font-mono font-bold text-slate-700">{site.latitude.toFixed(4)}°N, {site.longitude.toFixed(4)}°E</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Preset Region</span>
            <span className="font-bold text-slate-700">{site.location_name.split(',')[1]?.trim() || 'Western Ghats'}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Click any preset button to switch active design microclimate</span>
          <button
            onClick={() => setMapError(false)}
            className="text-sky-600 hover:text-sky-700 font-bold cursor-pointer"
          >
            Retry Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* Top Left: Active Site Coordinates */}
      <div className="absolute top-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-medium shadow-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-400"></span>
        <span className="font-bold">{site.location_name}</span>
        <span className="text-slate-400 font-mono text-[11px]">({site.latitude.toFixed(4)}°N, {site.longitude.toFixed(4)}°E)</span>
      </div>

      {/* Top Right: Helper */}
      <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs pointer-events-none">
        Click any regional marker to inspect
      </div>

      {/* Bottom Left: No API Key Notice */}
      <div className="absolute bottom-2 left-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-slate-200 text-[10px] font-mono text-slate-600 shadow-2xs pointer-events-none">
        OpenStreetMap • Zero API Key Required
      </div>
    </div>
  );
};
