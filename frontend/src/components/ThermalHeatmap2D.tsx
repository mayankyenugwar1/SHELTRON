import React from 'react';
import { ShelterParameters, SimulationResults, SiteRequirements, ClimateData } from '../types';

interface ThermalHeatmap2DProps {
  params: ShelterParameters;
  simulation: SimulationResults;
  site: SiteRequirements;
  climate: ClimateData;
}

export const ThermalHeatmap2D: React.FC<ThermalHeatmap2DProps> = ({
  params,
  simulation,
  site,
  climate
}) => {
  const L = site.length_m;
  const W = site.width_m;
  const tIndoor = simulation.indoor_temp_c;
  const outdoorPeak = climate.peak_summer_temp_c;

  // Temperature calculations based on parameters
  // Sun-facing West & South facades
  const hasGoodShading = params.shading_overhang_m >= 0.8;
  const isHighMassWall = params.wall_material.includes("Earth") || params.wall_material.includes("CSEB") || params.wall_material.includes("AAC");
  const isLowEGlazing = params.window_glazing.includes("Low-E") || params.window_glazing.includes("Double");

  // Localized micro-temperatures
  const tempRoofSurface = simulation.surface_temp_roof_c;
  const tempWestWall = +(outdoorPeak - (isHighMassWall ? 12.5 : 4.0)).toFixed(1);
  const tempSouthGlazing = +(tIndoor + (isLowEGlazing ? (hasGoodShading ? 1.4 : 3.2) : 6.5)).toFixed(1);
  const tempNorthBuffer = +(tIndoor - 1.4).toFixed(1);
  const tempEastInflow = +(tIndoor - 0.9).toFixed(1);
  const tempCenterCore = +(tIndoor - 0.3).toFixed(1);

  // Scaled dimensions
  const scale = 240 / Math.max(L, W);
  const planW = L * scale;
  const planH = W * scale;

  return (
    <div className="relative w-full h-[480px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-xl flex flex-col items-center justify-center p-4 select-none">
      {/* Dynamic Heatmap SVG with Gaussian Radial Gradients */}
      <svg
        width="540"
        height="380"
        viewBox="-270 -190 540 380"
        className="relative z-10"
      >
        <defs>
          {/* Radial Thermal Gradient: West Hotspot */}
          <radialGradient id="westHotspot" cx="20%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
            <stop offset="40%" stopColor="#F97316" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#EAB308" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </radialGradient>

          {/* Radial Thermal Gradient: South Window Glazing */}
          <radialGradient id="windowHotspot" cx="50%" cy="80%" r="55%">
            <stop offset="0%" stopColor={isLowEGlazing && hasGoodShading ? "#F59E0B" : "#DC2626"} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </radialGradient>

          {/* Radial Cool Gradient: East Breeze Intake */}
          <radialGradient id="breezeCooling" cx="80%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </radialGradient>

          {/* Radial Cool Gradient: North Shaded Corridor */}
          <radialGradient id="northCoolZone" cx="50%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#0D9488" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
          </radialGradient>

          {/* Arrow Marker for Breeze */}
          <marker id="arrowBreeze" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#38BDF8" />
          </marker>
        </defs>

        {/* Ambient Spatial Heatmap Base Field */}
        <g transform={`rotate(${params.orientation_deg})`}>
          {/* Base Plinth Shadow */}
          <rect
            x={-planW / 2 - 25}
            y={-planH / 2 - 25}
            width={planW + 50}
            height={planH + 50}
            fill="#030712"
            rx="16"
          />

          {/* Underlying Ambient Temperature Zone */}
          <rect
            x={-planW / 2 - 8}
            y={-planH / 2 - 8}
            width={planW + 16}
            height={planH + 16}
            fill="#064E3B"
            opacity="0.45"
            rx="8"
          />

          {/* Layer 1: Cool North Zone */}
          <rect
            x={-planW / 2}
            y={-planH / 2}
            width={planW}
            height={planH / 2}
            fill="url(#northCoolZone)"
          />

          {/* Layer 2: Cool East Windward Inflow */}
          <rect
            x={0}
            y={-planH / 2}
            width={planW / 2}
            height={planH}
            fill="url(#breezeCooling)"
          />

          {/* Layer 3: Hot West Facade Radiation */}
          <rect
            x={-planW / 2 - 15}
            y={-planH / 2}
            width={planW / 2 + 15}
            height={planH}
            fill="url(#westHotspot)"
          />

          {/* Layer 4: South Glazed Aperture Hotspot */}
          <rect
            x={-planW / 4}
            y={0}
            width={planW / 2}
            height={planH / 2 + 15}
            fill="url(#windowHotspot)"
          />

          {/* Structural Wall Outlines (Thick Architectural Thermal Mass) */}
          <rect
            x={-planW / 2}
            y={-planH / 2}
            width={planW}
            height={planH}
            fill="none"
            stroke="#1E293B"
            strokeWidth="5"
            rx="4"
          />

          {/* Shaded Overhang Chajja Indicator */}
          <line
            x1={-planW / 2 + 10}
            y1={planH / 2 + (params.shading_overhang_m * 16)}
            x2={planW / 2 - 10}
            y2={planH / 2 + (params.shading_overhang_m * 16)}
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />

          {/* Airflow Convection Streamlines */}
          <path
            d={`M ${planW / 2 - 10} 0 Q 0 ${planH / 4} ${-planW / 2 + 15} 0`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            markerEnd="url(#arrowBreeze)"
          />

          {/* Temperature Node Pins / Spatial Spot Values */}
          {/* West Wall Pin */}
          <g transform={`translate(${-planW / 2 + 18}, 0)`}>
            <circle r="12" fill="#EF4444" stroke="#FFF" strokeWidth="1.5" />
            <text y="3" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">{tempWestWall}°</text>
            <text y="20" fill="#FCA5A5" fontSize="7" fontWeight="bold" textAnchor="middle">West Hotspot</text>
          </g>

          {/* South Glazing Pin */}
          <g transform={`translate(${planW / 5}, ${planH / 2 - 12})`}>
            <circle r="12" fill={isLowEGlazing && hasGoodShading ? "#F59E0B" : "#DC2626"} stroke="#FFF" strokeWidth="1.5" />
            <text y="3" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">{tempSouthGlazing}°</text>
            <text y="-18" fill="#FDE68A" fontSize="7" fontWeight="bold" textAnchor="middle">Window Glazing</text>
          </g>

          {/* North Shaded Pin */}
          <g transform={`translate(0, ${-planH / 2 + 16})`}>
            <circle r="12" fill="#0D9488" stroke="#FFF" strokeWidth="1.5" />
            <text y="3" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">{tempNorthBuffer}°</text>
            <text y="20" fill="#5EEAD4" fontSize="7" fontWeight="bold" textAnchor="middle">North Shaded</text>
          </g>

          {/* East Breeze Pin */}
          <g transform={`translate(${planW / 2 - 18}, 0)`}>
            <circle r="12" fill="#0284C7" stroke="#FFF" strokeWidth="1.5" />
            <text y="3" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">{tempEastInflow}°</text>
            <text y="20" fill="#7DD3FC" fontSize="7" fontWeight="bold" textAnchor="middle">Breeze Intake</text>
          </g>

          {/* Center Living Zone Pin */}
          <g transform="translate(0, 0)">
            <circle r="14" fill="#059669" stroke="#FFF" strokeWidth="2" />
            <text y="3.5" fill="#FFF" fontSize="9" fontWeight="extrabold" textAnchor="middle">{tempCenterCore}°</text>
            <text y="-18" fill="#6EE7B7" fontSize="7.5" fontWeight="bold" textAnchor="middle">Living Core</text>
          </g>
        </g>

        {/* Compass Rose */}
        <g transform="translate(210, -135)">
          <circle r="20" fill="#0F172A" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="-18" x2="0" y2="18" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="-18" y1="0" x2="18" y2="0" stroke="#475569" strokeWidth="1" />
          <polygon points="0,-18 -3,-10 3,-10" fill="#0284C7" />
          <text x="0" y="-22" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
          <text x="24" y="2.5" fill="#94A3B8" fontSize="7" textAnchor="start">E</text>
        </g>

        {/* Title Tag */}
        <text x="0" y="165" fill="#94A3B8" fontSize="9" fontWeight="bold" textAnchor="middle">
          Plan Level: Top-View Thermal Contour Projection ({L}m × {W}m)
        </text>
      </svg>

      {/* Floating Thermal Calibration HUD */}
      <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800 text-xs space-y-1 text-slate-200">
        <div className="flex items-center gap-2 font-bold text-sky-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          2D Spatial Thermal Heatmap
        </div>
        <div className="text-[11px] text-slate-400 flex gap-2">
          <span>Roof Temp: <b className="text-white">{tempRoofSurface}°C</b></span>
          <span>•</span>
          <span>Core Temp: <b className="text-emerald-400">{tempCenterCore}°C</b></span>
        </div>
      </div>
    </div>
  );
};
