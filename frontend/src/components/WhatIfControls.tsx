import React from 'react';
import { ShelterParameters } from '../types';

interface WhatIfControlsProps {
  params: ShelterParameters;
  onChange: (updated: ShelterParameters) => void;
  onReset: () => void;
}

export const WhatIfControls: React.FC<WhatIfControlsProps> = ({
  params,
  onChange,
  onReset
}) => {
  const handleUpdate = (field: keyof ShelterParameters, value: any) => {
    onChange({
      ...params,
      [field]: value
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <span className="p-1 rounded bg-amber-100 text-amber-700">⚡</span>
            What-If Parametric Sandbox
          </h3>
          <p className="text-xs text-slate-500">Modify envelope parameters to simulate live thermal and cost impacts</p>
        </div>
        <button
          onClick={onReset}
          className="text-xs px-2.5 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          Reset Recommended
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {/* Wall Material */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">Wall Assembly Material</label>
          <select
            value={params.wall_material}
            onChange={(e) => handleUpdate('wall_material', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="Compressed Stabilized Earth Blocks (CSEB)">CSEB (High Thermal Mass)</option>
            <option value="Autoclaved Aerated Concrete (AAC) Blocks">AAC Blocks (Lightweight Insulative)</option>
            <option value="Fired Clay Red Brick (Standard Mortar)">Standard Fired Clay Brick</option>
            <option value="Insulated Rammed Earth Wall (300mm)">Insulated Rammed Earth (300mm)</option>
            <option value="Treated Bamboo & Lime Plaster Composite">Treated Bamboo & Lime Composite</option>
          </select>
        </div>

        {/* Roof Material */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">Roof Assembly & Ventilation</label>
          <select
            value={params.roof_material}
            onChange={(e) => handleUpdate('roof_material', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="Sloped Double-Skin Terracotta Ventilated Roof">Sloped Double-Skin Terracotta</option>
            <option value="Reinforced Concrete Slab (Uninsulated)">Uninsulated RCC Concrete Slab</option>
            <option value="Cool-Roof Membrane over Extruded Polystyrene (XPS)">Cool-Roof Membrane + XPS</option>
            <option value="Lightweight Corrugated Metal Sheet (Uninsulated GI)">Corrugated Metal Sheet (GI)</option>
            <option value="Extensive Sedum Vegetated Green Roof">Sedum Vegetated Green Roof</option>
          </select>
        </div>

        {/* Glazing Specification */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700">Window Glazing Type</label>
          <select
            value={params.window_glazing}
            onChange={(e) => handleUpdate('window_glazing', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="Double Glazed Low-E Glass (Argon Filled)">Double Glazed Low-E (Argon)</option>
            <option value="Double Clear Glazing (6-12-6mm air gap)">Double Clear (Air Gap)</option>
            <option value="Single Clear Glass (4mm standard)">Single Clear Glass (Standard 4mm)</option>
            <option value="Triple Glazed Krypton (High Thermal Zone)">Triple Glazed Krypton Super-Insulated</option>
          </select>
        </div>

        {/* Window-to-Wall Ratio (WWR) */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>Window-to-Wall Ratio (WWR)</span>
            <span className="text-sky-600">{params.window_to_wall_ratio_pct}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="45"
            step="1"
            value={params.window_to_wall_ratio_pct}
            onChange={(e) => handleUpdate('window_to_wall_ratio_pct', parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>10% (Minimum)</span>
            <span>25% (Standard)</span>
            <span>45% (High Glazing)</span>
          </div>
        </div>

        {/* Shading Overhang (Chajja) */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>External Shading Overhang</span>
            <span className="text-sky-600">{params.shading_overhang_m}m</span>
          </div>
          <input
            type="range"
            min="0.0"
            max="1.5"
            step="0.1"
            value={params.shading_overhang_m}
            onChange={(e) => handleUpdate('shading_overhang_m', parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0m (None)</span>
            <span>0.8m (Chajja)</span>
            <span>1.5m (Deep Veranda)</span>
          </div>
        </div>

        {/* Orientation Deg */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-semibold text-slate-700">
            <span>Orientation Bias</span>
            <span className="text-sky-600">{params.orientation_deg}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={params.orientation_deg}
            onChange={(e) => handleUpdate('orientation_deg', parseFloat(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>0° (North)</span>
            <span>90° (East)</span>
            <span>180° (South)</span>
          </div>
        </div>
      </div>

      {/* Advanced Toggles */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-4 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-700">
          <input
            type="checkbox"
            checked={params.natural_cooling_buffer}
            onChange={(e) => handleUpdate('natural_cooling_buffer', e.target.checked)}
            className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
          />
          <span className="font-medium">Courtyard Vegetative Microclimate Buffer (-1.8°C attenuation)</span>
        </label>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-slate-500 font-medium">Exterior Coating:</span>
          <select
            value={params.paint_coating}
            onChange={(e) => handleUpdate('paint_coating', e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-800"
          >
            <option value="High-Albedo Cool Paint (SRI 104)">High-Albedo Cool Paint (SRI 104)</option>
            <option value="Standard Acrylic Weather Emulsion">Standard Acrylic Emulsion</option>
            <option value="Traditional Natural Slaked Lime Wash (Eco-cool)">Traditional Slaked Lime Wash</option>
          </select>
        </div>
      </div>
    </div>
  );
};
