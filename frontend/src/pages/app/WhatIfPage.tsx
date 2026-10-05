import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge } from '../../components/ui';
import { COMPREHENSIVE_MATERIALS } from '../../data/materialData';
import { runClientSimulation } from '../../simulation/simulationEngine';
import { ShelterParameters } from '../../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const WhatIfPage: React.FC = () => {
  const { site, climate, baselineParams, currentParams, updateParameters } = useShelterProject();
  const navigate = useNavigate();

  // Local modified parameters for interactive comparison
  const [modifiedParams, setModifiedParams] = useState<ShelterParameters>(currentParams);
  const [savedFeedback, setSavedFeedback] = useState<boolean>(false);

  // Run simulations for baseline vs modified
  const baselineSim = runClientSimulation(site, climate, baselineParams);
  const modifiedSim = runClientSimulation(site, climate, modifiedParams);

  // Delta calculations
  const tempDelta = +(modifiedSim.indoor_temp_c - baselineSim.indoor_temp_c).toFixed(1);
  const comfortDelta = +(modifiedSim.thermal_comfort_score - baselineSim.thermal_comfort_score).toFixed(1);
  const heatGainDelta = Math.round(modifiedSim.heat_gain_w - baselineSim.heat_gain_w);
  const energyDelta = +(modifiedSim.cooling_energy_kwh_day - baselineSim.cooling_energy_kwh_day).toFixed(2);
  const costDelta = Math.round(modifiedSim.estimated_cost_inr - baselineSim.estimated_cost_inr);
  const sustDelta = +(modifiedSim.sustainability_score - baselineSim.sustainability_score).toFixed(1);

  // Improved flags
  const isTempBetter = tempDelta <= 0;
  const isComfortBetter = comfortDelta >= 0;
  const isHeatBetter = heatGainDelta <= 0;
  const isEnergyBetter = energyDelta <= 0;
  const isCostBetter = costDelta <= 0;
  const isSustBetter = sustDelta >= 0;

  const isOverallImproved = (comfortDelta >= 0 || tempDelta <= 0) && (isEnergyBetter || isSustBetter);

  const handleParamChange = (field: keyof ShelterParameters, value: any) => {
    const updated = {
      ...modifiedParams,
      [field]: value
    };
    setModifiedParams(updated);
  };

  const handleSaveThisDesign = () => {
    updateParameters(modifiedParams);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleResetToBaseline = () => {
    setModifiedParams(baselineParams);
  };

  // Comparative Chart Dataset
  const comparisonChartData = [
    {
      metric: 'Indoor Temp (°C)',
      Baseline: baselineSim.indoor_temp_c,
      Modified: modifiedSim.indoor_temp_c
    },
    {
      metric: 'Comfort (/100)',
      Baseline: baselineSim.thermal_comfort_score,
      Modified: modifiedSim.thermal_comfort_score
    },
    {
      metric: 'Heat Gain (kW)',
      Baseline: +(baselineSim.heat_gain_w / 1000).toFixed(2),
      Modified: +(modifiedSim.heat_gain_w / 1000).toFixed(2)
    },
    {
      metric: 'Cooling kWh/d',
      Baseline: baselineSim.cooling_energy_kwh_day,
      Modified: modifiedSim.cooling_energy_kwh_day
    },
    {
      metric: 'Eco-Score (/100)',
      Baseline: baselineSim.sustainability_score,
      Modified: modifiedSim.sustainability_score
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Subtitle */}
      <SectionHeader
        title="What-If Analysis"
        subtitle="Change the design. Simulate the impact. Compare the result."
        tag="SHELTRON Pipeline — Stage 6 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleResetToBaseline}
              icon="↺"
            >
              Reset to Baseline
            </Button>
            <Button
              variant="accent"
              onClick={handleSaveThisDesign}
              icon="💾"
              className="cursor-pointer"
            >
              {savedFeedback ? "Saved to Project ✓" : "Save This Design"}
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/app/compare')}
              icon="⚖️"
            >
              View Full Comparison
            </Button>
          </div>
        }
      />

      {/* Visible Feedback Loop Workflow: 1 MODIFY -> 2 SIMULATE -> 3 COMPARE -> 4 OPTIMIZE */}
      <div className="p-4 bg-[#0d3824] text-white rounded-3xl shadow-[0_4px_16px_-3px_rgba(18,59,42,0.12)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#087443] flex items-center justify-center font-black text-xs text-white">
            USP
          </span>
          <div>
            <div className="font-black text-sm tracking-tight text-[#fffdf7]">SHELTRON Iterative Feedback Loop</div>
            <div className="text-[11px] text-[#a4cca0]">Continuous parametric simulation before construction</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-xs font-black">
          <span className="px-2.5 py-1 rounded-lg bg-[#123b2a] text-[#82e0aa] border border-[#2e8b57]">1. MODIFY</span>
          <span className="text-[#a4cca0]">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#123b2a] text-[#82e0aa] border border-[#2e8b57]">2. SIMULATE</span>
          <span className="text-[#a4cca0]">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#123b2a] text-[#82e0aa] border border-[#2e8b57]">3. COMPARE</span>
          <span className="text-[#a4cca0]">→</span>
          <span className="px-2.5 py-1 rounded-lg bg-[#087443] text-white border border-[#2e8b57]">4. OPTIMIZE</span>
        </div>
      </div>

      {/* Saved Feedback Alert */}
      {savedFeedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <span>✓</span>
            <span>Modified design parameters successfully saved and synchronized across all project modules!</span>
          </div>
          <Badge variant="green">Synchronized</Badge>
        </div>
      )}

      {/* Primary 6 Delta Difference KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temperature Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isTempBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Temperature Diff</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isTempBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
              {tempDelta > 0 ? `+${tempDelta}` : tempDelta}°C
            </span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isTempBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isTempBetter ? "✓ Cooler Indoor" : "⚠ Warmer Indoor"}
          </span>
        </div>

        {/* Comfort Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isComfortBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Comfort Diff</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isComfortBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
              {comfortDelta > 0 ? `+${comfortDelta}` : comfortDelta}
            </span>
            <span className="text-xs text-slate-400">pts</span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isComfortBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isComfortBetter ? "✓ Comfort Improved" : "⚠ Discomfort Rise"}
          </span>
        </div>

        {/* Heat Gain Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isHeatBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Heat Gain Diff</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isHeatBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
              {heatGainDelta > 0 ? `+${heatGainDelta}` : heatGainDelta}
            </span>
            <span className="text-xs text-slate-400">W</span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isHeatBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isHeatBetter ? "✓ Heat Ingress Cut" : "⚠ Higher Heat Ingress"}
          </span>
        </div>

        {/* Energy Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isEnergyBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Energy Diff</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isEnergyBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
              {energyDelta > 0 ? `+${energyDelta}` : energyDelta}
            </span>
            <span className="text-xs text-slate-400">kWh</span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isEnergyBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isEnergyBetter ? "✓ Cooling Saved" : "⚠ Energy Increased"}
          </span>
        </div>

        {/* Cost Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isCostBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-amber-50/40 border-amber-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Cost Diff</span>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-black ${isCostBetter ? 'text-emerald-700' : 'text-amber-700'}`}>
              {costDelta > 0 ? `+₹${costDelta.toLocaleString()}` : `-₹${Math.abs(costDelta).toLocaleString()}`}
            </span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isCostBetter ? 'text-emerald-700' : 'text-amber-700'}`}>
            {isCostBetter ? "✓ Budget Savings" : "Additional Capital"}
          </span>
        </div>

        {/* Sustainability Difference */}
        <div className={`p-4 rounded-2xl border transition-all ${isSustBetter ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'}`}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Eco-Score Diff</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${isSustBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
              {sustDelta > 0 ? `+${sustDelta}` : sustDelta}
            </span>
            <span className="text-xs text-slate-400">pts</span>
          </div>
          <span className={`text-[10px] font-bold block mt-1 ${isSustBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
            {isSustBetter ? "✓ Carbon Lowered" : "⚠ Carbon Footprint Rise"}
          </span>
        </div>
      </div>

      {/* Main Grid: Parametric Modifier Sandbox (Left 6 cols) vs Before/After Side-by-Side Comparison (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: What-If Parameter Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Parametric Overrides</span>
                <h3 className="text-base font-black text-slate-900">Modify Design Parameters</h3>
              </div>
              <Badge variant="blue">Real-Time Simulation</Badge>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Roof Material */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>🏠 Roof Assembly</span>
                  <span className="text-[10px] text-slate-400">Albedo & U-Value Impact</span>
                </label>
                <select
                  value={modifiedParams.roof_material}
                  onChange={(e) => handleParamChange('roof_material', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.roof.map(r => (
                    <option key={r.name} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* 2. Wall Material */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>🧱 Wall Assembly</span>
                  <span className="text-[10px] text-slate-400">Thermal Lag & Mass</span>
                </label>
                <select
                  value={modifiedParams.wall_material}
                  onChange={(e) => handleParamChange('wall_material', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  {COMPREHENSIVE_MATERIALS.walls.map(w => (
                    <option key={w.name} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>

              {/* 3. Window Size (WWR %) */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#123b2a]">
                  <span>🪟 Window Size (WWR %)</span>
                  <span className="text-[#087443] font-extrabold">{modifiedParams.window_to_wall_ratio_pct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={modifiedParams.window_to_wall_ratio_pct}
                  onChange={(e) => handleParamChange('window_to_wall_ratio_pct', parseFloat(e.target.value))}
                  className="w-full accent-[#087443] cursor-pointer"
                />
              </div>

              {/* 4. Insulation */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#123b2a]">🛡️ Insulation Strategy</label>
                <select
                  value={modifiedParams.insulation_type}
                  onChange={(e) => handleParamChange('insulation_type', e.target.value)}
                  className="w-full bg-[#fbfdfa] border border-[#e4ede1] rounded-xl p-2.5 text-xs text-[#123b2a] focus:outline-none focus:ring-2 focus:ring-[#087443]/20"
                >
                  {COMPREHENSIVE_MATERIALS.insulation.map(i => (
                    <option key={i.name} value={i.name}>{i.name}</option>
                  ))}
                </select>
              </div>

              {/* 5. Paint / Reflective Coating */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#123b2a]">🎨 Exterior Paint / Coating</label>
                <select
                  value={modifiedParams.paint_coating}
                  onChange={(e) => handleParamChange('paint_coating', e.target.value)}
                  className="w-full bg-[#fbfdfa] border border-[#e4ede1] rounded-xl p-2.5 text-xs text-[#123b2a] focus:outline-none focus:ring-2 focus:ring-[#087443]/20"
                >
                  {COMPREHENSIVE_MATERIALS.paint.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              {/* 6. Glazing Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#123b2a]">🔍 Window Glazing Specification</label>
                <select
                  value={modifiedParams.window_glazing}
                  onChange={(e) => handleParamChange('window_glazing', e.target.value)}
                  className="w-full bg-[#fbfdfa] border border-[#e4ede1] rounded-xl p-2.5 text-xs text-[#123b2a] focus:outline-none focus:ring-2 focus:ring-[#087443]/20"
                >
                  {COMPREHENSIVE_MATERIALS.glazing.map(g => (
                    <option key={g.name} value={g.name}>{g.name}</option>
                  ))}
                </select>
              </div>

              {/* 7. Orientation Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#123b2a]">
                  <span>🧭 Orientation Bias</span>
                  <span className="text-[#087443] font-extrabold">{modifiedParams.orientation_deg}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={modifiedParams.orientation_deg}
                  onChange={(e) => handleParamChange('orientation_deg', parseFloat(e.target.value))}
                  className="w-full accent-[#087443] cursor-pointer"
                />
              </div>

              {/* Shading Overhang Depth */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#123b2a]">
                  <span>☂️ Shading Overhang (Chajja Depth)</span>
                  <span className="text-[#087443] font-extrabold">{modifiedParams.shading_overhang_m?.toFixed(2) || '0.90'} m</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.8"
                  step="0.1"
                  value={modifiedParams.shading_overhang_m || 0.9}
                  onChange={(e) => handleParamChange('shading_overhang_m', parseFloat(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              {/* 8. Ventilation Strategy */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">💨 Ventilation & Purge Mode</label>
                <select
                  value={modifiedParams.cross_ventilation_strategy}
                  onChange={(e) => handleParamChange('cross_ventilation_strategy', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                >
                  <option value="Night Purge Clerestory Convection">Night Purge Clerestory Convection (Hot-Dry)</option>
                  <option value="Continuous Louver Cross Ventilation">Continuous Louver Cross Ventilation (Humid)</option>
                  <option value="Cross Ventilation with Clerestory Louvers">Balanced Cross Ventilation (Composite)</option>
                  <option value="Airtight Envelope with Controlled Trickle Vents">Airtight Envelope with Trickle Vents (Cold)</option>
                </select>
              </div>
            </div>

            {/* Sandbox Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <Button
                variant="accent"
                onClick={handleSaveThisDesign}
                className="flex-1 justify-center"
                icon="💾"
              >
                Save This Design
              </Button>
              <Button
                variant="outline"
                onClick={handleResetToBaseline}
                className="flex-1 justify-center"
                icon="🔄"
              >
                Try Another Variation
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Before vs After vs Difference Benchmarking Table & Comparative Chart (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Comparison Table: Before | After | Difference */}
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Performance Matrix</span>
                <h3 className="text-base font-black text-slate-900">Before vs After vs Difference</h3>
              </div>
              <Badge variant={isOverallImproved ? 'green' : 'amber'}>
                {isOverallImproved ? "Design Improved Overall ✓" : "Trade-Offs Incurred"}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-semibold">
                    <th className="py-2.5">Key Metric</th>
                    <th className="py-2.5">Before (Baseline)</th>
                    <th className="py-2.5">After (Modified)</th>
                    <th className="py-2.5 text-right">Difference (Δ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Indoor Temp</td>
                    <td className="py-2.5 text-slate-500">{baselineSim.indoor_temp_c}°C</td>
                    <td className="py-2.5 font-extrabold text-slate-900">{modifiedSim.indoor_temp_c}°C</td>
                    <td className={`py-2.5 text-right font-extrabold ${isTempBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {tempDelta > 0 ? `+${tempDelta}` : tempDelta}°C {isTempBetter ? '✓' : '▲'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Thermal Comfort</td>
                    <td className="py-2.5 text-slate-500">{baselineSim.thermal_comfort_score} / 100</td>
                    <td className="py-2.5 font-extrabold text-slate-900">{modifiedSim.thermal_comfort_score} / 100</td>
                    <td className={`py-2.5 text-right font-extrabold ${isComfortBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {comfortDelta > 0 ? `+${comfortDelta}` : comfortDelta} pts {isComfortBetter ? '✓' : '▼'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Peak Heat Gain</td>
                    <td className="py-2.5 text-slate-500">{Math.round(baselineSim.heat_gain_w)} W</td>
                    <td className="py-2.5 font-extrabold text-slate-900">{Math.round(modifiedSim.heat_gain_w)} W</td>
                    <td className={`py-2.5 text-right font-extrabold ${isHeatBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {heatGainDelta > 0 ? `+${heatGainDelta}` : heatGainDelta} W {isHeatBetter ? '✓' : '▲'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Cooling Energy</td>
                    <td className="py-2.5 text-slate-500">{baselineSim.cooling_energy_kwh_day} kWh/d</td>
                    <td className="py-2.5 font-extrabold text-slate-900">{modifiedSim.cooling_energy_kwh_day} kWh/d</td>
                    <td className={`py-2.5 text-right font-extrabold ${isEnergyBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {energyDelta > 0 ? `+${energyDelta}` : energyDelta} kWh {isEnergyBetter ? '✓' : '▲'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Envelope Cost</td>
                    <td className="py-2.5 text-slate-500">₹{Math.round(baselineSim.estimated_cost_inr).toLocaleString()}</td>
                    <td className="py-2.5 font-extrabold text-slate-900">₹{Math.round(modifiedSim.estimated_cost_inr).toLocaleString()}</td>
                    <td className={`py-2.5 text-right font-extrabold ${isCostBetter ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {costDelta > 0 ? `+₹${costDelta.toLocaleString()}` : `-₹${Math.abs(costDelta).toLocaleString()}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-800">Sustainability</td>
                    <td className="py-2.5 text-slate-500">{baselineSim.sustainability_score} / 100</td>
                    <td className="py-2.5 font-extrabold text-slate-900">{modifiedSim.sustainability_score} / 100</td>
                    <td className={`py-2.5 text-right font-extrabold ${isSustBetter ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {sustDelta > 0 ? `+${sustDelta}` : sustDelta} pts {isSustBetter ? '✓' : '▼'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Comparative Bar Chart Visualization */}
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm">
                Visual Delta Comparison Chart
              </h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                  <span className="w-3 h-3 rounded bg-slate-300" /> Before (Baseline)
                </span>
                <span className="flex items-center gap-1.5 text-sky-700 font-bold">
                  <span className="w-3 h-3 rounded bg-sky-600" /> After (Modified)
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Bar dataKey="Baseline" fill="#94A3B8" radius={[4, 4, 0, 0]} name="Baseline" />
                  <Bar dataKey="Modified" fill="#0284C7" radius={[4, 4, 0, 0]} name="Modified" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Journey Progression Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Next Step in Bioclimatic Pipeline</span>
          <div className="font-extrabold text-slate-800 text-sm">Benchmark Against Prebuilt Design Variations</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleSaveThisDesign}
            icon="💾"
          >
            {savedFeedback ? "Saved ✓" : "Save Design"}
          </Button>
          <Button size="lg" variant="primary" onClick={() => navigate('/app/compare')} icon="→">
            Proceed to Design Comparison
          </Button>
        </div>
      </div>
    </div>
  );
};
