import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge, ProgressBar } from '../../components/ui';
import { ShelterParameters, SimulationResults } from '../../types';
import { runClientSimulation } from '../../simulation/simulationEngine';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

export interface SavedDesignVariant {
  id: string;
  name: string;
  badgeTag: string;
  description: string;
  params: ShelterParameters;
  simulation: SimulationResults;
  scores: {
    thermal: number; // 0-100
    cost: number; // 0-100 (higher means more cost-effective/cheaper)
    sustainability: number; // 0-100
    combined: number; // weighted composite
  };
}

export const ComparePage: React.FC = () => {
  const { site, climate, baselineParams, currentParams, updateParameters, isDemoMode } = useShelterProject();
  const navigate = useNavigate();

  // Helper to calculate score breakdowns
  const evaluateVariant = (name: string, badgeTag: string, desc: string, p: ShelterParameters, sim: SimulationResults): SavedDesignVariant => {
    // Thermal score: comfort score + temperature reduction bonus
    const thermal = Math.min(100, Math.max(10, Math.round(sim.thermal_comfort_score * 0.9 + (sim.temp_reduction_c > 0 ? sim.temp_reduction_c * 0.8 : 0))));

    // Cost efficiency score: ratio of target budget to actual cost (100 = under budget, degrades if over budget)
    const costRatio = site.budget_inr / Math.max(1, sim.estimated_cost_inr);
    const cost = Math.min(100, Math.max(15, Math.round(costRatio * 75)));

    // Sustainability score: based on embodied carbon and material ratings
    const sustainability = Math.round(sim.sustainability_score);

    // Weighted combined recommendation score (Thermal 45%, Cost 30%, Sustainability 25%)
    const combined = +((thermal * 0.45) + (cost * 0.30) + (sustainability * 0.25)).toFixed(1);

    return {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name,
      badgeTag,
      description: desc,
      params: p,
      simulation: sim,
      scores: {
        thermal,
        cost,
        sustainability,
        combined
      }
    };
  };

  // Generate benchmark variants based on project site
  // Variation 1: Conventional Baseline (GI Sheet / uninsulated)
  const paramsConv: ShelterParameters = {
    ...baselineParams,
    roof_material: "Corrugated Galvanized Iron (GI) Sheet / Single-Layer RCC",
    wall_material: "Fired Clay Baked Brick (230mm Standard)",
    shading_overhang_m: 0.3,
    window_to_wall_ratio_pct: 20.0,
    window_glazing: "Single Glazed Clear Glass (4mm)",
    paint_coating: "Standard Weather Paint (SRI 32)",
    insulation_type: "None (Uninsulated)",
    natural_cooling_buffer: false
  };
  const simConv = runClientSimulation(site, climate, paramsConv);
  const varA = evaluateVariant("Design A — Conventional Baseline", "Uninsulated Build", "Corrugated GI sheet roof, uninsulated brick walls, minimal 0.3m overhang", paramsConv, simConv);

  // Variation 2: Insulated Roof & Shading
  const paramsB: ShelterParameters = {
    ...baselineParams,
    roof_material: "Cool-Roof Membrane over Extruded Polystyrene (XPS)",
    insulation_type: "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
    shading_overhang_m: 0.9,
    window_to_wall_ratio_pct: 16.0
  };
  const simB = runClientSimulation(site, climate, paramsB);
  const varB = evaluateVariant("Design B — Insulated Roof & Shading", "Thermal Barrier", "Cool roof membrane over XPS insulation with 0.9m cantilevered Chajjas", paramsB, simB);

  // Variation 3: SHELTRON Balanced Bioclimatic (Optimized)
  const paramsC: ShelterParameters = {
    ...baselineParams,
    orientation_deg: 15.0,
    roof_material: "Sloped Double-Skin Terracotta Ventilated Roof",
    wall_material: "Compressed Stabilized Earth Blocks (CSEB)",
    shading_overhang_m: 1.1,
    window_to_wall_ratio_pct: 14.0,
    cross_ventilation_strategy: "Night Purge Clerestory Convection",
    natural_cooling_buffer: true
  };
  const simC = runClientSimulation(site, climate, paramsC);
  const varC = evaluateVariant("Design C — SHELTRON Balanced Bioclimatic", "Recommended Optimal", "Double-skin terracotta roof, CSEB earth blocks, 1.1m Chajjas, night purge convection", paramsC, simC);

  // State of saved variants (preloaded with 3 prebuilt design variations)
  const [variants, setVariants] = useState<SavedDesignVariant[]>([varA, varB, varC]);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(varC.id);
  const [feedbackApplied, setFeedbackApplied] = useState<boolean>(false);

  // Identify Best Performing Design in Each Category
  // 1. Lowest Indoor Temperature
  const bestTempVariant = variants.reduce((prev, curr) => curr.simulation.indoor_temp_c < prev.simulation.indoor_temp_c ? curr : prev, variants[0]);

  // 2. Highest Thermal Comfort Score
  const bestComfortVariant = variants.reduce((prev, curr) => curr.simulation.thermal_comfort_score > prev.simulation.thermal_comfort_score ? curr : prev, variants[0]);

  // 3. Lowest Heat Gain
  const bestHeatGainVariant = variants.reduce((prev, curr) => curr.simulation.heat_gain_w < prev.simulation.heat_gain_w ? curr : prev, variants[0]);

  // 4. Lowest Energy Requirement
  const bestEnergyVariant = variants.reduce((prev, curr) => curr.simulation.cooling_energy_kwh_day < prev.simulation.cooling_energy_kwh_day ? curr : prev, variants[0]);

  // 5. Lowest Estimated Cost
  const bestCostVariant = variants.reduce((prev, curr) => curr.simulation.estimated_cost_inr < prev.simulation.estimated_cost_inr ? curr : prev, variants[0]);

  // 6. Highest Sustainability Score
  const bestSustVariant = variants.reduce((prev, curr) => curr.simulation.sustainability_score > prev.simulation.sustainability_score ? curr : prev, variants[0]);

  // 7. Highest Combined Overall Score
  const bestOverallVariant = variants.reduce((prev, curr) => curr.scores.combined > prev.scores.combined ? curr : prev, variants[0]);

  // Handle saving the user's active custom modified configuration as Design E
  const handleSaveActiveAsNewVariant = () => {
    const simCurr = runClientSimulation(site, climate, currentParams);
    const varE = evaluateVariant(
      `Design ${String.fromCharCode(65 + variants.length)} — Custom Variant`,
      "User Sandbox",
      `Custom configuration saved from active parameter settings`,
      currentParams,
      simCurr
    );
    setVariants([...variants, varE]);
    setSelectedVariantId(varE.id);
  };

  // Handler for "Select Best Design"
  const handleSelectBestDesign = (variantToApply: SavedDesignVariant) => {
    updateParameters(variantToApply.params);
    setSelectedVariantId(variantToApply.id);
    setFeedbackApplied(true);
    setTimeout(() => {
      setFeedbackApplied(false);
      navigate('/app/result');
    }, 1200);
  };

  // Format Radar Chart Data across all 4-5 variants
  const radarMetrics = [
    { subject: 'Thermal Comfort', fullMark: 100 },
    { subject: 'Passive Cooling', fullMark: 100 },
    { subject: 'Cost Efficiency', fullMark: 100 },
    { subject: 'Sustainability', fullMark: 100 },
    { subject: 'Carbon Reduction', fullMark: 100 }
  ];

  const radarData = radarMetrics.map(m => {
    const row: any = { subject: m.subject };
    variants.forEach(v => {
      if (m.subject === 'Thermal Comfort') row[v.name.split('—')[0].trim()] = v.simulation.thermal_comfort_score;
      if (m.subject === 'Passive Cooling') row[v.name.split('—')[0].trim()] = Math.min(100, v.simulation.temp_reduction_c * 5.2);
      if (m.subject === 'Cost Efficiency') row[v.name.split('—')[0].trim()] = v.scores.cost;
      if (m.subject === 'Sustainability') row[v.name.split('—')[0].trim()] = v.scores.sustainability;
      if (m.subject === 'Carbon Reduction') row[v.name.split('—')[0].trim()] = Math.max(20, 100 - (v.simulation.embodied_carbon_kg / 120));
    });
    return row;
  });

  const radarColors = ['#0284C7', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <SectionHeader
        title={`Multi-Variant Design Comparison: ${site.location_name}`}
        subtitle={`Side-by-side performance benchmarking across baseline and custom variants for ${site.shelter_type}. Highlight the optimal Pareto trade-off.`}
        tag="SHELTRON Pipeline — Stage 7 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSaveActiveAsNewVariant}
              icon="➕"
            >
              Save Current Sandbox as Variant
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/app/result')}
              icon="📄"
            >
              Proceed to Result
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSelectBestDesign(bestOverallVariant)}
              icon="★"
              className="cursor-pointer shadow-sm"
            >
              Select Best Design ({bestOverallVariant.name.split('—')[0].trim()})
            </Button>
          </div>
        }
      />

      {/* Prototype Simulation Data Notice */}
      <div className="p-3.5 bg-[#f4faf0] border border-[#cbe6c7] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#123b2a] font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#087443] font-bold">ℹ️</span>
          <span>
            <b>{isDemoMode ? "Judge Evaluation Demo:" : "Evaluation Matrix:"}</b> 3 prebuilt design variations ({site.location_name}) benchmarked on comfort, heat gain, cost, and eco-score.
          </span>
        </div>
        <span className="text-[10px] text-[#3b6b52]">
          * Demo uses prototype simulation data & deterministic physics
        </span>
      </div>

      {/* Applied Feedback Banner */}
      {feedbackApplied && (
        <div className="p-3.5 bg-[#eaf6e8] border border-[#cbe6c7] rounded-2xl flex items-center justify-between text-xs text-[#087443] animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <span>✓</span>
            <span>Successfully locked and selected <b>{variants.find(v => v.id === selectedVariantId)?.name}</b> as your primary project design!</span>
          </div>
          <Badge variant="green">Active Project Locked</Badge>
        </div>
      )}

      {/* Top Banner: Best Overall Recommended Winner Card */}
      <Card variant="default" padding="lg" className="border-[#cbe6c7] bg-gradient-to-r from-[#eaf6e8]/80 via-[#f4faf0] to-[#fffdf7] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#087443] animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#087443]">
              Pareto Recommended Champion
            </span>
            <Badge variant="green">Highest Combined Score: {bestOverallVariant.scores.combined}/100</Badge>
          </div>
          <h3 className="text-xl font-black text-[#0d3824]">{bestOverallVariant.name}</h3>
          <p className="text-xs text-[#3b6b52] max-w-2xl">{bestOverallVariant.description}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-[#3b6b52] block">Indoor Operative Temp</span>
            <span className="text-2xl font-black text-[#087443]">{bestOverallVariant.simulation.indoor_temp_c}°C</span>
          </div>
          <Button
            size="md"
            variant="primary"
            onClick={() => handleSelectBestDesign(bestOverallVariant)}
            icon="★"
          >
            Select Best Design
          </Button>
        </div>
      </Card>

      {/* Primary Side-by-Side Comparison Table with Highlighted Winners */}
      <Card variant="default" padding="none" className="border-[#e4ede1] shadow-2xs overflow-hidden bg-[#fffdf7]">
        <div className="p-4 border-b border-[#e4ede1] flex items-center justify-between bg-[#f7faf5]">
          <div>
            <h3 className="text-sm font-black text-[#0d3824]">Side-by-Side Performance Matrix</h3>
            <p className="text-xs text-[#3b6b52]">Green highlight (★) indicates top-performing configuration in each metric</p>
          </div>
          <Badge variant="green">{variants.length} Variants Compared</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] bg-white">
                <th className="py-3 px-4">Evaluation Metric</th>
                {variants.map(v => (
                  <th key={v.id} className="py-3 px-4 min-w-[170px]">
                    <div className="font-extrabold text-slate-800 text-xs">{v.name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{v.badgeTag}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {/* Indoor Temperature */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Indoor Temperature</td>
                {variants.map(v => {
                  const isBest = v.id === bestTempVariant.id;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{v.simulation.indoor_temp_c}°C</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ BEST</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 block">-{v.simulation.temp_reduction_c}°C vs outdoor</span>
                    </td>
                  );
                })}
              </tr>

              {/* Thermal Comfort */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Thermal Comfort Score</td>
                {variants.map(v => {
                  const isBest = v.id === bestComfortVariant.id;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{v.simulation.thermal_comfort_score} / 100</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ BEST</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">{v.simulation.thermal_comfort_status}</span>
                    </td>
                  );
                })}
              </tr>

              {/* Heat Gain */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Peak Heat Gain</td>
                {variants.map(v => {
                  const isBest = v.id === bestHeatGainVariant.id;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{Math.round(v.simulation.heat_gain_w)} W</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ LOWEST</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 block">Loss: {Math.round(v.simulation.heat_loss_w)} W</span>
                    </td>
                  );
                })}
              </tr>

              {/* Energy Requirement */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Active Energy Requirement</td>
                {variants.map(v => {
                  const isBest = v.id === bestEnergyVariant.id;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{v.simulation.cooling_energy_kwh_day} kWh/d</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ BEST</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{(v.simulation.cooling_energy_kwh_day * 30).toFixed(0)} kWh / month</span>
                    </td>
                  );
                })}
              </tr>

              {/* Estimated Cost */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Estimated Envelope Cost</td>
                {variants.map(v => {
                  const isBest = v.id === bestCostVariant.id;
                  const isWithin = v.simulation.estimated_cost_inr <= site.budget_inr;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">₹{Math.round(v.simulation.estimated_cost_inr).toLocaleString()}</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ LOWEST</span>}
                      </div>
                      <span className={`text-[10px] block ${isWithin ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {isWithin ? 'Within Budget Cap' : 'Exceeds Budget'}
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Sustainability Score */}
              <tr className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-800">Sustainability Score</td>
                {variants.map(v => {
                  const isBest = v.id === bestSustVariant.id;
                  return (
                    <td key={v.id} className={`py-3.5 px-4 ${isBest ? 'bg-emerald-50/80 font-black text-emerald-800' : 'text-slate-700'}`}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{v.simulation.sustainability_score} / 100</span>
                        {isBest && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded font-extrabold">★ BEST</span>}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{v.simulation.embodied_carbon_kg} kg CO₂e</span>
                    </td>
                  );
                })}
              </tr>

              {/* Action Row */}
              <tr className="bg-slate-50/50">
                <td className="py-3.5 px-4 font-extrabold text-slate-800">Apply Configuration</td>
                {variants.map(v => (
                  <td key={v.id} className="py-3.5 px-4">
                    <button
                      onClick={() => handleSelectBestDesign(v)}
                      className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedVariantId === v.id
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {selectedVariantId === v.id ? '✓ Selected' : 'Select This Design'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Multi-Dimensional Score Visualization & Radar Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Score Breakdown: Thermal, Cost, Sustainability & Combined (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tri-Factor Analytics</span>
                <h3 className="text-base font-black text-slate-900">Overall Score Breakdown</h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">Weighted: 45% Thermal • 30% Cost • 25% Eco</span>
            </div>

            <div className="space-y-4">
              {variants.map((v) => (
                <div key={v.id} className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs">{v.name}</div>
                      <div className="text-[10px] text-slate-400">{v.badgeTag}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Combined Score</span>
                      <span className="text-lg font-black text-sky-800">{v.scores.combined} / 100</span>
                    </div>
                  </div>

                  {/* 3 Progress Bars: Thermal, Cost, Sustainability */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-emerald-700">Thermal Comfort ({v.scores.thermal}/100)</span>
                      <span className="text-sky-700">Cost Efficiency ({v.scores.cost}/100)</span>
                      <span className="text-purple-700">Sustainability ({v.scores.sustainability}/100)</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <ProgressBar value={v.scores.thermal} color="emerald" />
                      <ProgressBar value={v.scores.cost} color="sky" />
                      <ProgressBar value={v.scores.sustainability} color="purple" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Radar Chart Visualization (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card variant="default" padding="lg" className="border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Multi-Attribute Polygon</span>
                <h3 className="text-base font-black text-slate-900">Radar Performance Envelope</h3>
              </div>
              <Badge variant="blue">5 Axes</Badge>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94A3B8' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                  />
                  {variants.slice(0, 4).map((v, i) => (
                    <Radar
                      key={v.id}
                      name={v.name.split('—')[0].trim()}
                      dataKey={v.name.split('—')[0].trim()}
                      stroke={radarColors[i]}
                      fill={radarColors[i]}
                      fillOpacity={0.15}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Journey Progression Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Final Step in Bioclimatic Pipeline</span>
          <div className="font-extrabold text-slate-800 text-sm">Review Complete Optimized Architectural Deliverable</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSelectBestDesign(bestOverallVariant)}
            icon="★"
          >
            Apply Best ({bestOverallVariant.name.split('—')[0].trim()})
          </Button>
          <Button size="lg" variant="primary" onClick={() => navigate('/app/result')} icon="→">
            Proceed to Final Optimized Design
          </Button>
        </div>
      </div>
    </div>
  );
};
