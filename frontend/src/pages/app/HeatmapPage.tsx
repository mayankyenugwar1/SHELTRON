import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge } from '../../components/ui';
import { ThermalHeatmap2D } from '../../components/ThermalHeatmap2D';
import { Shelter3DViewer } from '../../components/Shelter3DViewer';
import { WhatIfControls } from '../../components/WhatIfControls';

export const HeatmapPage: React.FC = () => {
  const { site, climate, currentParams, simulation, updateParameters, resetToRecommended } = useShelterProject();
  const navigate = useNavigate();

  // Mode: 2D Top-View vs 3D Heat Visualization
  const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');

  // Compute hotspot cards metrics
  const highestHotspot = {
    name: "West Facade & Unshaded Roof Ridge",
    temp_c: simulation.surface_temp_roof_c,
    cause: "Peak afternoon beam solar radiation (14:00 - 17:00) with zenith insolation."
  };

  const lowestHotspot = {
    name: "North Entry & East Breeze Inflow Corridor",
    temp_c: +(simulation.indoor_temp_c - 1.4).toFixed(1),
    cause: "Permanently shaded facade coupled with fresh convective air exchange."
  };

  const averageTemp = simulation.indoor_temp_c;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <SectionHeader
        title={`Spatial Thermal Heatmap & Hotspot Analysis: ${site.location_name}`}
        subtitle={`Top-view spatial temperature gradients, thermal radiation contours, and ventilation dissipation paths for ${site.shelter_type}.`}
        tag="Thermal Heatmap Visualization"
        actions={
          <div className="flex items-center gap-2">
            {/* 2D / 3D Toggle */}
            <div className="flex items-center bg-[#f4faf0] p-1 rounded-xl border border-[#e4ede1]">
              <button
                onClick={() => setViewMode('2D')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === '2D' ? 'bg-[#087443] text-white shadow-xs' : 'text-[#3b6b52] hover:text-[#123b2a]'
                }`}
              >
                2D Top-View Heatmap
              </button>
              <button
                onClick={() => setViewMode('3D')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === '3D' ? 'bg-[#087443] text-white shadow-xs' : 'text-[#3b6b52] hover:text-[#123b2a]'
                }`}
              >
                3D Heat Visualization
              </button>
            </div>

            <Button variant="primary" onClick={() => navigate('/app/what-if')} icon="→">
              Proceed to What-If Sandbox
            </Button>
          </div>
        }
      />

      {/* 3 Hotspot Cards Required */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Highest Heat Gain Zone */}
        <Card variant="default" padding="lg" className="border-rose-200/80 bg-rose-50/20 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700">Highest Heat Gain Zone</span>
            <Badge variant="rose">Peak Hotspot</Badge>
          </div>
          <div className="text-3xl font-black text-rose-600 tracking-tight">
            {highestHotspot.temp_c}°C
          </div>
          <div className="font-bold text-slate-800 text-xs">{highestHotspot.name}</div>
          <p className="text-[11px] text-slate-500 leading-snug">{highestHotspot.cause}</p>
        </Card>

        {/* Lowest Heat Gain Zone */}
        <Card variant="default" padding="lg" className="border-emerald-200/80 bg-emerald-50/20 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087443]">Lowest Heat Gain Zone</span>
            <Badge variant="green">Cool Sink</Badge>
          </div>
          <div className="text-3xl font-black text-[#087443] tracking-tight">
            {lowestHotspot.temp_c}°C
          </div>
          <div className="font-bold text-slate-800 text-xs">{lowestHotspot.name}</div>
          <p className="text-[11px] text-slate-500 leading-snug">{lowestHotspot.cause}</p>
        </Card>

        {/* Average Indoor Temperature */}
        <Card variant="default" padding="lg" className="border-[#cbe6c7] bg-[#f4faf0] space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#087443]">Average Indoor Temperature</span>
            <Badge variant="green">Living Core</Badge>
          </div>
          <div className="text-3xl font-black text-[#087443] tracking-tight">
            {averageTemp}°C
          </div>
          <div className="font-bold text-[#123b2a] text-xs">Central Living & Activity Microclimate</div>
          <p className="text-[11px] text-[#3b6b52] leading-snug">
            {simulation.thermal_comfort_status} with {simulation.airflow_index_ms} m/s natural air velocity.
          </p>
        </Card>
      </div>

      {/* Main Heatmap Visualization Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Heatmap Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {viewMode === '2D' ? (
            <ThermalHeatmap2D
              params={currentParams}
              simulation={simulation}
              site={site}
              climate={climate}
            />
          ) : (
            <div className="h-[480px]">
              <Shelter3DViewer
                params={currentParams}
                simulation={simulation}
                showHeatmap={true}
              />
            </div>
          )}

          {/* Thermal Heatmap Gradient Legend: Cool, Comfortable, Warm, Hot */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Thermal Heatmap Color Calibration Legend</span>
              <span className="text-[11px] text-slate-400 font-normal">Derived from localized operative surface equilibrium</span>
            </div>

            {/* Gradient Bar */}
            <div className="h-4 w-full rounded-xl bg-gradient-to-r from-blue-600 via-teal-400 via-emerald-400 via-amber-400 to-rose-600 shadow-inner" />

            {/* Labels: Cool, Comfortable, Warm, Hot */}
            <div className="flex justify-between items-center text-xs font-extrabold pt-0.5">
              <div className="flex items-center gap-1.5 text-blue-700">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Cool (&lt;24°C)</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Comfortable (24°C - 27°C)</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-700">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Warm (27°C - 32°C)</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span>Hot (&gt;32°C)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time What-If Controls linked directly to Heatmap (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 text-xs text-sky-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span>⚡</span> Dynamic Heatmap Synchronization
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Adjust overhang depth, WWR, or materials below. The spatial thermal heatmap recalculates and updates instantly.
            </p>
          </div>

          <WhatIfControls
            params={currentParams}
            onChange={(updated) => updateParameters(updated)}
            onReset={resetToRecommended}
          />
        </div>
      </div>
    </div>
  );
};
