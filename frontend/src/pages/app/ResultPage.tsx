import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge, MetricCard } from '../../components/ui';
import { Shelter3DViewer } from '../../components/Shelter3DViewer';
import { ThermalHeatmap2D } from '../../components/ThermalHeatmap2D';
import { ReportModal } from '../../components/ReportModal';
import { SupplierModal } from '../../components/SupplierModal';
import { runClientSimulation } from '../../simulation/simulationEngine';

export const ResultPage: React.FC = () => {
  const { site, climate, currentParams, baselineParams } = useShelterProject();
  const navigate = useNavigate();

  const [activeVisualMode, setActiveVisualMode] = useState<'3D' | 'HEATMAP'>('3D');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [supplierModalState, setSupplierModalState] = useState<{
    isOpen: boolean;
    materialName: string;
    categoryLabel?: string;
  }>({
    isOpen: false,
    materialName: 'Thermal Insulation',
    categoryLabel: 'Envelope Insulation'
  });

  const handleOpenSuppliers = (materialName: string, categoryLabel?: string) => {
    setSupplierModalState({
      isOpen: true,
      materialName,
      categoryLabel
    });
  };

  // Run simulations for baseline vs optimized
  const simBaseline = runClientSimulation(site, climate, baselineParams);
  const simOptimized = runClientSimulation(site, climate, currentParams);

  // Delta comparisons
  const tempReduction = +(simBaseline.indoor_temp_c - simOptimized.indoor_temp_c).toFixed(1);
  const comfortGain = +(simOptimized.thermal_comfort_score - simBaseline.thermal_comfort_score).toFixed(1);
  const energySavedPct = Math.round(((simBaseline.cooling_energy_kwh_day - simOptimized.cooling_energy_kwh_day) / Math.max(1, simBaseline.cooling_energy_kwh_day)) * 100);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <SectionHeader
        title="OPTIMIZED SHELTER DESIGN"
        subtitle={`Optimized Prototype Design for ${site.shelter_type} in ${site.location_name} (${climate.climate_zone}). Reference Basis: SP 41 / ECBC passive guidelines.`}
        tag="SHELTRON Pipeline — Stage 8 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/app/what-if')}
              icon="✏️"
              className="bg-[#fffdf7] text-[#123b2a] border-[#d8e6d4] hover:bg-[#eaf6e8] shadow-2xs font-bold"
            >
              Modify Design
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsReportOpen(true)}
              icon="📊"
              className="bg-[#087443] hover:bg-[#065f37] text-white font-black shadow-sm cursor-pointer"
            >
              Export Report
            </Button>
          </div>
        }
      />

      {/* Top Level 6 Primary Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Indoor Temperature */}
        <MetricCard
          label="Indoor Operative Temp"
          value={`${simOptimized.indoor_temp_c}°C`}
          subValue={`Baseline: ${simBaseline.indoor_temp_c}°C`}
          badge={{ text: `-${simOptimized.temp_reduction_c}°C vs Outdoor`, positive: true }}
          color="emerald"
          icon="🌡️"
        />

        {/* Comfort Score */}
        <MetricCard
          label="Thermal Comfort Score"
          value={simOptimized.thermal_comfort_score}
          unit="/ 100"
          subValue={simOptimized.thermal_comfort_status}
          badge={{
            text: simOptimized.thermal_comfort_score >= 82
              ? "Optimal"
              : simOptimized.thermal_comfort_score >= 70
              ? "Acceptable"
              : simOptimized.thermal_comfort_score >= 50
              ? "Moderate"
              : "Below Threshold",
            positive: simOptimized.thermal_comfort_score >= 70
          }}
          color="sky"
          icon="😊"
        />

        {/* Heat Gain */}
        <MetricCard
          label="Peak Total Heat Gain"
          value={`${Math.round(simOptimized.heat_gain_w)}`}
          unit="Watts"
          subValue={`Cut by ${Math.round(simBaseline.heat_gain_w - simOptimized.heat_gain_w)} W`}
          color="amber"
          icon="☀️"
        />

        {/* Energy Requirement */}
        <MetricCard
          label="Active Cooling Energy"
          value={simOptimized.cooling_energy_kwh_day}
          unit="kWh/d"
          subValue={`${energySavedPct >= 0 ? `${energySavedPct}% Energy Cut` : 'Balanced'}`}
          color="purple"
          icon="⚡"
        />

        {/* Estimated Cost */}
        <MetricCard
          label="Estimated Envelope Cost"
          value={`₹${Math.round(simOptimized.estimated_cost_inr).toLocaleString()}`}
          subValue={`Target: ₹${site.budget_inr.toLocaleString()}`}
          badge={{ text: simOptimized.estimated_cost_inr <= site.budget_inr ? "Within Budget" : "Exceeds Target", positive: simOptimized.estimated_cost_inr <= site.budget_inr }}
          color="sky"
          icon="💰"
        />

        {/* Sustainability Score */}
        <MetricCard
          label="Sustainability Score"
          value={simOptimized.sustainability_score}
          unit="/ 100"
          subValue={`Carbon: ${simOptimized.embodied_carbon_kg} kg`}
          color="emerald"
          icon="🌱"
        />
      </div>

      {/* Main Grid: Visual Twin (3D / Heatmap) on Left + Climate & Specifications on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D Shelter Model / Thermal Heatmap Switcher (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="default" padding="md" className="border-[#e4ede1] shadow-[0_4px_20px_-4px_rgba(18,59,42,0.06)] bg-[#fffdf7] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e4ede1]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🟩</span>
                <div>
                  <h3 className="font-black text-[#0d3824] text-base">
                    {activeVisualMode === '3D' ? 'Optimized 3D Digital Twin' : 'Spatial Thermal Heatmap'}
                  </h3>
                  <p className="text-xs text-[#3b6b52]">
                    {activeVisualMode === '3D' ? 'Interactive perspective rendering showing orientation, roof slope, and overhangs' : 'Top-view operative thermal radiation and ventilation streamline contours'}
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-[#f4faf0] p-1 rounded-xl border border-[#e4ede1]">
                <button
                  onClick={() => setActiveVisualMode('3D')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeVisualMode === '3D' ? 'bg-[#087443] text-white shadow-xs' : 'text-[#3b6b52] hover:text-[#0d3824]'
                  }`}
                >
                  3D Model
                </button>
                <button
                  onClick={() => setActiveVisualMode('HEATMAP')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeVisualMode === 'HEATMAP' ? 'bg-[#087443] text-white shadow-xs' : 'text-[#3b6b52] hover:text-[#0d3824]'
                  }`}
                >
                  Thermal Heatmap
                </button>
              </div>
            </div>

            <div className="h-[460px]">
              {activeVisualMode === '3D' ? (
                <Shelter3DViewer
                  params={currentParams}
                  simulation={simOptimized}
                  showHeatmap={false}
                />
              ) : (
                <ThermalHeatmap2D
                  params={currentParams}
                  simulation={simOptimized}
                  site={site}
                  climate={climate}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#3b6b52] pt-1">
              <span>Oriented long axis: <b className="text-[#0d3824]">{currentParams.orientation_deg}° azimuth</b></span>
              <span>WWR: <b className="text-[#0d3824]">{currentParams.window_to_wall_ratio_pct}%</b></span>
              <span>Shading Overhang: <b className="text-[#0d3824]">{currentParams.shading_overhang_m}m Chajja</b></span>
            </div>
          </Card>

          {/* Baseline vs Optimized Comparison Card */}
          <Card variant="default" padding="lg" className="border-[#e4ede1] shadow-[0_4px_16px_-3px_rgba(18,59,42,0.05)] bg-[#fffdf7] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e4ede1]">
              <h3 className="font-black text-[#0d3824] text-sm">
                Baseline vs Optimized Performance Comparison
              </h3>
              <Badge variant="green">Proven Passive Improvement</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Indoor Peak Temp</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-black text-[#087443]">{simOptimized.indoor_temp_c}°C</span>
                  <span className="text-xs text-[#82a88e] line-through">{simBaseline.indoor_temp_c}°C</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">-{tempReduction}°C Damped</span>
              </div>

              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Thermal Comfort</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-black text-[#087443]">{simOptimized.thermal_comfort_score}</span>
                  <span className="text-xs text-[#82a88e] line-through">{simBaseline.thermal_comfort_score}</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">+{comfortGain} pts gain</span>
              </div>

              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Heat Gain</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-black text-[#087443]">{Math.round(simOptimized.heat_gain_w)} W</span>
                  <span className="text-xs text-[#82a88e] line-through">{Math.round(simBaseline.heat_gain_w)} W</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">-{Math.round(simBaseline.heat_gain_w - simOptimized.heat_gain_w)} W Cut</span>
              </div>

              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Cooling Energy</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-black text-[#087443]">{simOptimized.cooling_energy_kwh_day}</span>
                  <span className="text-xs text-[#82a88e] line-through">{simBaseline.cooling_energy_kwh_day}</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">{energySavedPct}% Saved</span>
              </div>

              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Construction Cost</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-sm font-black text-[#087443]">₹{Math.round(simOptimized.estimated_cost_inr).toLocaleString()}</span>
                  <span className="text-[10px] text-[#82a88e] line-through">₹{Math.round(simBaseline.estimated_cost_inr).toLocaleString()}</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">₹{(Math.round(simBaseline.estimated_cost_inr - simOptimized.estimated_cost_inr)).toLocaleString()} Saved</span>
              </div>

              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1]">
                <span className="text-[#3b6b52] font-bold block text-[10px] uppercase">Sustainability</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-base font-black text-[#087443]">{simOptimized.sustainability_score}</span>
                  <span className="text-xs text-[#82a88e] line-through">{simBaseline.sustainability_score}</span>
                </div>
                <span className="text-[10px] font-bold text-[#087443] block mt-0.5">+{simOptimized.sustainability_score - simBaseline.sustainability_score} pts Eco</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: "Why This Design?" Panel & Specifications (5 cols) matching reference layout */}
        <div className="lg:col-span-5 space-y-4">
          {/* "Why This Design?" Panel */}
          <Card variant="default" padding="lg" className="border-[#e4ede1] bg-[#fffdf7] shadow-[0_4px_20px_-4px_rgba(18,59,42,0.06)] space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#e4ede1]">
              <div className="flex items-center gap-2">
                <span className="text-lg">💡</span>
                <h3 className="font-black text-[#0d3824] text-base">Why This Design?</h3>
              </div>
              <Badge variant="green">Bioclimatic Rationale</Badge>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Orientation Decision */}
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1] space-y-1">
                <div className="font-extrabold text-[#0d3824] flex items-center gap-2 text-xs">
                  <span>☀️</span> Orientation selected for solar exposure:
                </div>
                <p className="text-[11px] text-[#3b6b52] leading-snug pl-6">
                  Long axis aligned East-West ({currentParams.orientation_deg}° bias) to shield expansive facades from intense morning and afternoon solar penetration.
                </p>
              </div>

              {/* Roof Decision */}
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1] space-y-1">
                <div className="font-extrabold text-[#0d3824] flex items-center gap-2 text-xs">
                  <span>🏠</span> Roof selected to reduce heat gain:
                </div>
                <p className="text-[11px] text-[#3b6b52] leading-snug pl-6">
                  {currentParams.roof_material} ({currentParams.roof_slope_deg}° slope) vents buoyant cavity air and reduces heat transfer.
                </p>
              </div>

              {/* Cross Ventilation Decision */}
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1] space-y-1">
                <div className="font-extrabold text-[#0d3824] flex items-center gap-2 text-xs">
                  <span>💨</span> Cross-ventilation enabled:
                </div>
                <p className="text-[11px] text-[#3b6b52] leading-snug pl-6">
                  Window placement aligned with WNW winds ({climate.wind_speed_ms} m/s) for natural cooling.
                </p>
              </div>

              {/* Material Selection Decision */}
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1] space-y-1">
                <div className="font-extrabold text-[#0d3824] flex items-center gap-2 text-xs">
                  <span>🌱</span> Material selection optimized:
                </div>
                <p className="text-[11px] text-[#3b6b52] leading-snug pl-6">
                  Low U-value walls, reflective roof finish, and high thermal mass for hot-dry climate.
                </p>
              </div>

              {/* Cost & Sustainability Decision */}
              <div className="p-3 bg-[#f4faf0] rounded-xl border border-[#e4ede1] space-y-1">
                <div className="font-extrabold text-[#0d3824] flex items-center gap-2 text-xs">
                  <span>🎯</span> Balanced for cost and sustainability:
                </div>
                <p className="text-[11px] text-[#3b6b52] leading-snug pl-6">
                  Design achieves improved thermal comfort while staying within budget and reducing embodied carbon.
                </p>
              </div>
            </div>
          </Card>

          {/* Site Climate & Materials Used Card */}
          <Card variant="default" padding="lg" className="border-[#e4ede1] bg-[#fffdf7] shadow-[0_4px_20px_-4px_rgba(18,59,42,0.06)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e4ede1]">
              <div className="flex items-center gap-2">
                <span className="text-base">📋</span>
                <h3 className="font-extrabold text-[#0d3824] text-sm">Materials Used Summary</h3>
              </div>
              <span className="text-[10px] text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-full font-bold border border-[#cbe6c7] uppercase">
                {climate.climate_zone}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 bg-[#f4faf0] rounded-xl border border-[#e4ede1] flex justify-between items-center">
                <span className="text-[#3b6b52]">Outdoor Peak & Insolation:</span>
                <span className="font-bold text-[#0d3824]">{climate.peak_summer_temp_c}°C • {climate.solar_insolation_kwh_m2} kWh/m²</span>
              </div>

              <div className="space-y-2">
                {/* Thermal Insulation */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#e4ede1] gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Thermal Insulation:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.insulation_type || "Rigid Recycled Woodfiber (R-2.8)"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers("Thermal Insulation", "Envelope Insulation")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>

                {/* Wall Material */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#e4ede1] gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Wall Material:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.wall_material}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers(currentParams.wall_material, "Structural Walls")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>

                {/* Roof Assembly */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#e4ede1] gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Roof Assembly:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.roof_material}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers(currentParams.roof_material, "Roofing System")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>

                {/* Window Glazing */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#e4ede1] gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Window Glazing:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.window_glazing}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers(currentParams.window_glazing, "Fenestration")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>

                {/* Reflective Coating */}
                <div className="flex items-center justify-between py-1.5 border-b border-[#e4ede1] gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Reflective Coating:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.paint_coating}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers(currentParams.paint_coating, "Solar Reflective Coating")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>

                {/* Flooring */}
                <div className="flex items-center justify-between py-1.5 gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] text-[#3b6b52] block">Flooring / Plinth:</span>
                    <span className="font-bold text-[#0d3824] truncate block max-w-[155px]">
                      {currentParams.flooring_material}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenSuppliers(currentParams.flooring_material, "Plinth & Thermal Mass")}
                    className="px-2.5 py-1 rounded-lg bg-[#087443] hover:bg-[#065f37] text-white text-[11px] font-bold shrink-0 cursor-pointer shadow-2xs"
                  >
                    Find Suppliers
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ================================================================= */}
      {/* MATERIALS USED IN OPTIMIZED DESIGN — LOCAL PROCUREMENT & SUPPLIERS */}
      {/* ================================================================= */}
      <Card variant="default" padding="lg" className="border-[#cbe6c7] bg-[#fffdf7] shadow-[0_4px_20px_-4px_rgba(18,59,42,0.06)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e4ede1]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🧱</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#087443] bg-[#eaf6e8] px-2.5 py-0.5 rounded-full border border-[#cbe6c7]">
                Procurement & Supply Chain Feasibility
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0d3824]">
              Materials Used in Optimized Design
            </h3>
            <p className="text-xs text-[#3b6b52] mt-0.5">
              Verified specifications calibrated for <b>{site.location_name}</b> ({climate.climate_zone}). Connect directly with nearby verified manufacturers and authorized depots.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="green">Geo-Targeted to {site.location_name.split(',')[0]}</Badge>
          </div>
        </div>

        {/* 6 Recommended Material Cards with explicit "Find Suppliers" Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Thermal Insulation */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  ❄️ Envelope Insulation
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  R-2.8 Barrier
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Thermal Insulation
              </h4>
              <p className="text-xs text-[#087443] font-bold">
                {currentParams.insulation_type || "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)"}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                Vapor-permeable thermal decoupling barrier eliminating roof and wall thermal bridging.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers("Thermal Insulation", "Envelope Insulation")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>

          {/* 2. Wall Material */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  🧱 Structural Walls
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  High Thermal Mass
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Wall Material
              </h4>
              <p className="text-xs text-[#087443] font-bold truncate">
                {currentParams.wall_material}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                9.5-hour diurnal thermal lag delays solar heat ingress until cool nocturnal hours.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers(currentParams.wall_material, "Structural Walls")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>

          {/* 3. Roof Assembly */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  🏠 Roofing Assembly
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  {currentParams.roof_slope_deg}° Ventilated
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Roof Material
              </h4>
              <p className="text-xs text-[#087443] font-bold truncate">
                {currentParams.roof_material}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                Continuous double-skin convective air channel vents radiant attic heat to the sky.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers(currentParams.roof_material, "Roofing System")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>

          {/* 4. Window Glazing */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  🪟 Fenestration
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  SHGC 0.32
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Window Glazing
              </h4>
              <p className="text-xs text-[#087443] font-bold truncate">
                {currentParams.window_glazing}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                Low-E silver coating admits daylight while rejecting 68% of incident infrared solar heat.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers(currentParams.window_glazing, "Fenestration")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>

          {/* 5. Solar Reflective Coating */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  🎨 High-Albedo Coating
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  SRI 104
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Reflective Coating
              </h4>
              <p className="text-xs text-[#087443] font-bold truncate">
                {currentParams.paint_coating}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                Micro-ceramic reflective finish drops exterior envelope temperatures by up to 14°C.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers(currentParams.paint_coating, "Solar Reflective Coating")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>

          {/* 6. Flooring / Plinth */}
          <div className="p-4 bg-[#f8fbf7] rounded-2xl border border-[#e4ede1] hover:border-[#cbe6c7] shadow-2xs flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#087443] bg-[#eaf6e8] px-2 py-0.5 rounded-md border border-[#cbe6c7]">
                  🪵 Flooring / Plinth
                </span>
                <span className="text-[10px] font-extrabold text-[#3b6b52] bg-white px-2 py-0.5 rounded border border-[#e4ede1]">
                  Thermal Mass Buffer
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-[#0d3824]">
                Flooring Material
              </h4>
              <p className="text-xs text-[#087443] font-bold truncate">
                {currentParams.flooring_material}
              </p>
              <p className="text-[11px] text-[#3b6b52] leading-snug">
                Porous terracotta pavers coupling living volume to earth subgrade heat sinks.
              </p>
            </div>
            <button
              onClick={() => handleOpenSuppliers(currentParams.flooring_material, "Plinth & Thermal Mass")}
              className="w-full py-2 px-3 rounded-xl bg-[#087443] hover:bg-[#065f37] text-white text-xs font-bold shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>📍</span>
              <span>Find Suppliers</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Prominent Bottom Banner: "Design Before You Build" */}
      <section className="bg-gradient-to-br from-[#0e3b26] to-[#123b2a] text-white p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-xl border border-[#1d593d]">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#a8dfc1] bg-[#0d3824]/90 px-3 py-1 rounded-full border border-[#236848] inline-block">
            SHELTRON Core Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            "Design Before You Build"
          </h2>
          <p className="text-xs sm:text-sm text-[#c8e6d4] max-w-2xl mx-auto leading-relaxed">
            Virtually simulated, benchmarked, and optimized for {site.location_name}. Proceed to physical construction with verified thermal comfort and locked budget certainty.
          </p>
        </div>

        {/* Action Controls: Export Report, Modify Design, Start New Shelter */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={() => setIsReportOpen(true)}
            icon="📊"
            className="bg-[#087443] hover:bg-[#065f37] text-white font-bold shadow-md cursor-pointer"
          >
            Export Report
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/app/what-if')}
            icon="✏️"
            className="bg-[#fffdf7] text-[#123b2a] border border-[#d8e6d4] hover:bg-[#eaf6e8] font-bold cursor-pointer"
          >
            Modify Design
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/app/create')}
            icon="🌱"
            className="bg-[#fffdf7] text-[#123b2a] hover:text-[#087443] border border-[#2e7d58] hover:border-[#087443] hover:bg-[#eaf6e8] font-bold cursor-pointer shadow-xs"
          >
            Start New Shelter
          </Button>
        </div>
      </section>

      {/* PDF Export Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        site={site}
        climate={climate}
        params={currentParams}
        simulation={simOptimized}
        recommendations={{
          orientation_recommendation: `Aligned East-West with ${currentParams.orientation_deg}° bias`,
          layout_zoning: "Compact courtyard zoning with storage buffers on West",
          roof_design: currentParams.roof_material,
          roof_slope: `${currentParams.roof_slope_deg}° slope`,
          window_placement: "Openings primarily on North and shaded South facades",
          window_size_wwr: `${currentParams.window_to_wall_ratio_pct}% WWR`,
          shading_strategy: `${currentParams.shading_overhang_m}m cantilevered Chajjas`,
          cross_ventilation: currentParams.cross_ventilation_strategy,
          insulation_strategy: currentParams.insulation_type,
          wall_material_recommendation: currentParams.wall_material,
          roof_material_recommendation: currentParams.roof_material,
          flooring_recommendation: currentParams.flooring_material,
          paint_coating_recommendation: currentParams.paint_coating,
          glazing_recommendation: currentParams.window_glazing,
          natural_cooling_plants: "High-canopy deciduous trees on South-West perimeter",
          daylight_and_lighting: "High clerestory indirect illumination and 2700K warm LEDs",
          climate_rationale: `Tailored for ${climate.location} (${climate.climate_zone}) based on National Building Code (SP 41) standards.`
        }}
      />

      {/* Supplier Directory Modal */}
      <SupplierModal
        isOpen={supplierModalState.isOpen}
        onClose={() => setSupplierModalState(prev => ({ ...prev, isOpen: false }))}
        materialName={supplierModalState.materialName}
        materialCategoryLabel={supplierModalState.categoryLabel}
        locationName={site.location_name}
      />
    </div>
  );
};
