import React from 'react';
import { ShelterParameters, SiteRequirements } from '../types';

interface ShelterStudio2DProps {
  params: ShelterParameters;
  site: SiteRequirements;
}

export const ShelterStudio2D: React.FC<ShelterStudio2DProps> = ({ params, site }) => {
  const L = site.length_m;
  const W = site.width_m;

  // Scale dimensions to fit 500x380 SVG
  const maxDim = Math.max(L, W);
  const scale = 240 / maxDim;
  const planWidth = L * scale;
  const planHeight = W * scale;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-6 rounded-3xl relative overflow-hidden select-none">
      {/* Background Architectural Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        <defs>
          <pattern id="archGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archGrid)" />
      </svg>

      {/* 2D Architectural Plan View */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
          <span>📐</span> 2D Architectural Floor Plan & Solar Alignment (Level 0.00m)
        </div>

        <svg
          width="420"
          height="320"
          viewBox="-210 -160 420 320"
          className="border border-slate-700/60 rounded-2xl bg-slate-950/70 shadow-inner"
        >
          {/* Compass Rose */}
          <g transform="translate(160, -110)">
            <circle r="22" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="-26" x2="0" y2="26" stroke="#0284C7" strokeWidth="1.5" />
            <line x1="-26" y1="0" x2="26" y2="0" stroke="#475569" strokeWidth="1" />
            <polygon points="0,-26 -4,-16 4,-16" fill="#0284C7" />
            <text x="0" y="-30" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
            <text x="32" y="3" fill="#94A3B8" fontSize="8" textAnchor="start">E</text>
          </g>

          {/* Oriented Plan Container */}
          <g transform={`rotate(${params.orientation_deg})`}>
            {/* Foundation Plinth Outer Line */}
            <rect
              x={-planWidth / 2 - 12}
              y={-planHeight / 2 - 12}
              width={planWidth + 24}
              height={planHeight + 24}
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              rx="4"
            />

            {/* Main Exterior High-Mass Walls */}
            <rect
              x={-planWidth / 2}
              y={-planHeight / 2}
              width={planWidth}
              height={planHeight}
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="3.5"
              rx="2"
            />

            {/* Shading Overhang (Chajja) Projection (South side) */}
            <line
              x1={-planWidth / 2 + 10}
              y1={planHeight / 2 + (params.shading_overhang_m * 18)}
              x2={planWidth / 2 - 10}
              y2={planHeight / 2 + (params.shading_overhang_m * 18)}
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeDasharray="5 3"
            />
            <text
              x="0"
              y={planHeight / 2 + (params.shading_overhang_m * 18) + 12}
              fill="#F59E0B"
              fontSize="8"
              fontWeight="bold"
              textAnchor="middle"
            >
              Chajja Overhang ({params.shading_overhang_m}m)
            </text>

            {/* Window Fenestration on South */}
            <rect
              x={planWidth / 6}
              y={planHeight / 2 - 4}
              width={planWidth / 3}
              height="8"
              fill="#0284C7"
              stroke="#BAE6FD"
              strokeWidth="1.5"
            />
            <text
              x={planWidth / 6 + planWidth / 6}
              y={planHeight / 2 - 8}
              fill="#38BDF8"
              fontSize="7"
              fontWeight="bold"
              textAnchor="middle"
            >
              WWR {params.window_to_wall_ratio_pct}% Glazing
            </text>

            {/* Door Opening on South */}
            <rect
              x={-planWidth / 3}
              y={planHeight / 2 - 4}
              width="24"
              height="8"
              fill="#D97706"
              stroke="#FDE68A"
              strokeWidth="1.2"
            />
            {/* Door Swing Arc */}
            <path
              d={`M ${-planWidth / 3 + 24} ${planHeight / 2} A 24 24 0 0 1 ${-planWidth / 3} ${planHeight / 2 - 24}`}
              fill="none"
              stroke="#D97706"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Interior Activity Zones */}
            <circle cx="0" cy="0" r="16" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
            <text x="0" y="3" fill="#10B981" fontSize="8" fontWeight="bold" textAnchor="middle">
              Core Living Zone
            </text>

            {/* Internal Airflow Streamline Arrows */}
            <path d="M 0 35 L 0 -35" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow)" />
          </g>

          {/* Dimension Labels */}
          <text x="0" y="145" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">
            {L}m Length × {W}m Width (Floor Area: {L * W} m²)
          </text>
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-sky-400 rounded" /> Exterior Wall ({params.wall_material.split('(')[0]})</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-amber-400 rounded" /> Solar Shading Overhang</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-emerald-400 rounded" /> Convective Cross Airflow</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-amber-600 rounded" /> Entry Doorway</span>
        </div>
      </div>
    </div>
  );
};
