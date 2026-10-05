import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge } from '../../components/ui';
import { ShelterStudio3D } from '../../components/ShelterStudio3D';
import { ShelterStudio2D } from '../../components/ShelterStudio2D';
import { COMPREHENSIVE_MATERIALS } from '../../data/materialData';

export const DesignStudioPage: React.FC = () => {
  const { site, climate, currentParams, simulation, updateParameters } = useShelterProject();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const orbitControlsRef = useRef<any>(null);

  // Camera reset handler
  const handleResetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset();
    }
  };

  // Rotate 45 deg handler
  const handleRotateStep = (deltaDeg: number) => {
    const nextDeg = (currentParams.orientation_deg + deltaDeg) % 360;
    updateParameters({ orientation_deg: nextDeg < 0 ? nextDeg + 360 : nextDeg });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <SectionHeader
        title={`3D Parametric Design Studio: ${site.location_name}`}
        subtitle={`Interactive spatial digital twin for ${site.shelter_type} (${site.length_m}m × ${site.width_m}m). Tweak envelope parameters and observe real-time geometric shifts.`}
        tag="SHELTRON Pipeline — Stage 4 of 8"
        actions={
          <div className="flex items-center gap-2">
            {/* 2D / 3D Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('3D')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === '3D' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                3D View
              </button>
              <button
                onClick={() => setViewMode('2D')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === '2D' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2D Plan
              </button>
            </div>

            <Button variant="primary" onClick={() => navigate('/app/simulation')} icon="→">
              Run Thermal Simulation
            </Button>
          </div>
        }
      />

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Design Parameters Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Interactive Controls</span>
                <h3 className="text-sm font-black text-slate-900">Design Parameters</h3>
              </div>
              <Badge variant="blue">{climate.climate_zone}</Badge>
            </div>

            <div className="space-y-4 text-xs max-h-[580px] overflow-y-auto pr-1">
              {/* Architectural Archetype Variety Presets */}
              <div className="space-y-2 pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#123b2a]">
                    Design Archetypes
                  </span>
                  <span className="text-[10px] font-bold text-[#3d7042] bg-[#eef6ec] px-1.5 py-0.5 rounded-md border border-[#cde0ca]">
                    Variety
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    {
                      name: 'Courtyard Villa',
                      icon: '🏡',
                      updates: {
                        roof_type: 'Sloped Double-Skin Roof',
                        roof_material: 'Sloped Double-Skin Terracotta Ventilated Roof',
                        wall_material: 'Compressed Stabilized Earth Blocks (CSEB)',
                        shading_overhang_m: 1.1,
                        window_to_wall_ratio_pct: 18,
                        natural_cooling_buffer: true
                      }
                    },
                    {
                      name: 'Solar Parasol',
                      icon: '☀️',
                      updates: {
                        roof_type: 'Flat with Solar Pergola',
                        roof_material: 'Cool-Roof Membrane over Extruded Polystyrene (XPS)',
                        wall_material: 'Autoclaved Aerated Concrete (AAC) Blocks',
                        shading_overhang_m: 0.9,
                        window_to_wall_ratio_pct: 22,
                        natural_cooling_buffer: true
                      }
                    },
                    {
                      name: 'Tropical Gable',
                      icon: '🏛️',
                      updates: {
                        roof_type: 'Sloped Double-Skin Roof',
                        roof_material: 'Sloped Double-Skin Terracotta Ventilated Roof',
                        wall_material: 'Insulated Rammed Earth Wall (300mm)',
                        shading_overhang_m: 1.4,
                        window_to_wall_ratio_pct: 15,
                        natural_cooling_buffer: true
                      }
                    },
                    {
                      name: 'Green Roof Deck',
                      icon: '🌿',
                      updates: {
                        roof_type: 'Flat Green Roof',
                        roof_material: 'Extensive Sedum Vegetated Green Roof',
                        wall_material: 'Treated Bamboo & Lime Plaster Composite',
                        shading_overhang_m: 1.2,
                        window_to_wall_ratio_pct: 20,
                        natural_cooling_buffer: true
                      }
                    }
                  ].map((arch) => (
                    <button
                      key={arch.name}
                      type="button"
                      onClick={() => updateParameters(arch.updates)}
                      className="p-2 rounded-xl text-left border border-slate-200/90 hover:border-[#709c53] bg-slate-50/80 hover:bg-[#eaf4e7] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold text-slate-800"
                    >
                      <span>{arch.icon}</span>
                      <span className="text-[11px] truncate">{arch.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Orientation Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><span>🧭</span> Orientation</span>
                  <span className="text-sky-600 font-extrabold">{currentParams.orientation_deg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={currentParams.orientation_deg}
                  onChange={(e) => updateParameters({ orientation_deg: parseFloat(e.target.value) })}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0° (North)</span>
                  <span>90° (East)</span>
                  <span>180° (South)</span>
                  <span>270° (West)</span>
                </div>
              </div>

              {/* 2. Roof Assembly Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🏠</span> Roof Assembly
                </label>
                <select
                  value={currentParams.roof_material}
                  onChange={(e) => updateParameters({ roof_material: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.roof.map(r => (
                    <option key={r.name} value={r.name}>{r.name} ({r.thermalProperty.split('•')[0].trim()})</option>
                  ))}
                </select>
              </div>

              {/* 3. Wall Assembly Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🧱</span> Wall Assembly
                </label>
                <select
                  value={currentParams.wall_material}
                  onChange={(e) => updateParameters({ wall_material: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.walls.map(w => (
                    <option key={w.name} value={w.name}>{w.name} ({w.thermalProperty.split('•')[0].trim()})</option>
                  ))}
                </select>
              </div>

              {/* 4. Windows (WWR %) */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><span>🪟</span> Window-to-Wall Ratio</span>
                  <span className="text-sky-600 font-extrabold">{currentParams.window_to_wall_ratio_pct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={currentParams.window_to_wall_ratio_pct}
                  onChange={(e) => updateParameters({ window_to_wall_ratio_pct: parseFloat(e.target.value) })}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>10% (Minimal)</span>
                  <span>18% (Recommended)</span>
                  <span>40% (High Solar)</span>
                </div>
              </div>

              {/* 5. Shading Overhang (Chajja) */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><span>☂️</span> Shading Overhang</span>
                  <span className="text-sky-600 font-extrabold">{currentParams.shading_overhang_m}m</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.6"
                  step="0.1"
                  value={currentParams.shading_overhang_m}
                  onChange={(e) => updateParameters({ shading_overhang_m: parseFloat(e.target.value) })}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0m (None)</span>
                  <span>0.9m (Standard Chajja)</span>
                  <span>1.6m (Deep Eaves)</span>
                </div>
              </div>

              {/* 6. Insulation Type */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🛡️</span> Insulation Layer
                </label>
                <select
                  value={currentParams.insulation_type}
                  onChange={(e) => updateParameters({ insulation_type: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.insulation.map(i => (
                    <option key={i.name} value={i.name}>{i.name}</option>
                  ))}
                </select>
              </div>

              {/* 7. Paint / Reflective Coating */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🎨</span> Exterior Paint & Coating
                </label>
                <select
                  value={currentParams.paint_coating}
                  onChange={(e) => updateParameters({ paint_coating: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.paint.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* 8. Glazing Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🔍</span> Window Glazing Type
                </label>
                <select
                  value={currentParams.window_glazing}
                  onChange={(e) => updateParameters({ window_glazing: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.glazing.map(g => (
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Interactive 3D / 2D Canvas Viewport (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative w-full h-[580px] rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-gradient-to-b from-sky-50/40 via-slate-50 to-white">
            {viewMode === '3D' ? (
              <ShelterStudio3D
                params={currentParams}
                simulation={simulation}
                showLabels={showLabels}
                orbitControlsRef={orbitControlsRef}
              />
            ) : (
              <ShelterStudio2D params={currentParams} site={site} />
            )}

            {/* 3D Viewport Heads-Up Floating Bar */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{viewMode === '3D' ? 'Interactive 3D Digital Twin' : '2D Schematic Floor Plan'}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex gap-2 font-semibold">
                <span>Orient: {currentParams.orientation_deg}°</span>
                <span>•</span>
                <span>WWR: {currentParams.window_to_wall_ratio_pct}%</span>
                <span>•</span>
                <span>Chajja: {currentParams.shading_overhang_m}m</span>
              </div>
            </div>

            {/* 3D View Controls Toolbar (Orbit, Zoom, Rotate, Reset, Labels) */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-xs">
              <button
                onClick={() => handleRotateStep(-15)}
                className="px-2.5 py-1.5 hover:bg-slate-100 rounded-xl text-slate-700 font-bold transition-all cursor-pointer"
                title="Rotate -15°"
              >
                ↺ -15°
              </button>
              <button
                onClick={() => handleRotateStep(15)}
                className="px-2.5 py-1.5 hover:bg-slate-100 rounded-xl text-slate-700 font-bold transition-all cursor-pointer"
                title="Rotate +15°"
              >
                ↻ +15°
              </button>
              <button
                onClick={handleResetCamera}
                className="px-2.5 py-1.5 hover:bg-slate-100 rounded-xl text-slate-700 font-bold transition-all cursor-pointer"
                title="Reset Camera"
              >
                ⟲ Reset Camera
              </button>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  showLabels ? 'bg-sky-100 text-sky-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
                title="Toggle Material Labels"
              >
                🏷️ Labels: {showLabels ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Bottom Interaction Guide */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-xl border border-slate-200/60 text-[11px] text-slate-400 pointer-events-none">
              {viewMode === '3D' ? '🖱️ Left click drag to Orbit • Right click drag to Pan • Scroll to Zoom' : '📐 Architectural plan view with orientation compass & dimension markers'}
            </div>
          </div>
        </div>
      </div>

      {/* Journey Progression Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Next Step in Bioclimatic Pipeline</span>
          <div className="font-extrabold text-slate-800 text-sm">Simulate Thermal Performance & Indoor Heat Balance</div>
        </div>
        <Button size="lg" variant="primary" onClick={() => navigate('/app/simulation')} icon="→">
          Run Thermal Simulation
        </Button>
      </div>
    </div>
  );
};
