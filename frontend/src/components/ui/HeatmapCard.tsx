import React from 'react';
import { Card } from './Card';
import { Hotspot } from '../../types';

export interface HeatmapCardProps {
  hotspots: Hotspot[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const HeatmapCard: React.FC<HeatmapCardProps> = ({
  hotspots,
  title = "Spatial Thermal Hotspot Analysis",
  subtitle = "Microclimate zoning & thermal gradients across the interior layout",
  className = ''
}) => {
  return (
    <Card variant="default" padding="md" className={`space-y-4 border border-slate-200 bg-white ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">{title}</h3>
          <p className="text-xs text-slate-600 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600 font-mono">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &lt;27°C (Comfortable)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 27-31°C (Warm)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &gt;31°C (Hotspot)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {hotspots.map((spot, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all duration-150 card-hover shadow-2xs"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-900 text-xs">{spot.zone}</span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                spot.temp_c > 31 ? 'bg-rose-50 text-rose-800 border-rose-200' :
                spot.temp_c > 27 ? 'bg-amber-50 text-amber-800 border-amber-200' :
                'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {spot.temp_c}°C
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{spot.risk}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
