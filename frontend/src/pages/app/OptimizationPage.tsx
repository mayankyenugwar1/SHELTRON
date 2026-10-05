import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge } from '../../components/ui';
import { runParametricOptimization, ScoredCandidateDesign } from '../../optimization/optimizationEngine';

export const OptimizationPage: React.FC = () => {
  const { site, climate, currentParams, updateParameters } = useShelterProject();
  const navigate = useNavigate();

  const [appliedDesignId, setAppliedDesignId] = useState<string>('');

  // Run multi-objective optimization
  const resultDossier = runParametricOptimization(site, climate, currentParams);
  const { candidates, bestThermal, lowestCost, bestSustainability, recommendedBalanced } = resultDossier;

  const handleApplyDesign = (design: ScoredCandidateDesign) => {
    updateParameters(design.params);
    setAppliedDesignId(design.id);
    setTimeout(() => setAppliedDesignId(''), 3500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <SectionHeader
        title={`Multi-Objective Design Optimization: ${site.location_name}`}
        subtitle={`Deterministic Pareto search evaluating 5 optimization objectives across candidate permutations for ${site.shelter_type}.`}
        tag="SHELTRON Pipeline — Stage 8 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="accent"
              onClick={() => handleApplyDesign(recommendedBalanced)}
              icon="★"
              className="cursor-pointer shadow-sm"
            >
              Apply Recommended Balanced Design
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/app/result')}
              icon="📄"
            >
              Proceed to Final Dossier
            </Button>
          </div>
        }
      />

      {/* Applied Feedback Banner */}
      {appliedDesignId && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center justify-between text-xs text-emerald-900 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <span>✓</span>
            <span>Optimized configuration applied! Active 3D model, materials, and thermal simulations have been updated.</span>
          </div>
          <Badge variant="green">Synchronized</Badge>
        </div>
      )}

      {/* Methodology & AI Claims Disclaimer Notice */}
      <div className="p-3.5 bg-[#f4faf0] border border-[#cbe6c7] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#123b2a]">
        <div className="flex items-center gap-2.5">
          <span className="text-base">🔬</span>
          <span>
            <b>Search Methodology & Transparency:</b> Evaluated using deterministic multi-objective Pareto search across 5 physical objectives. No unverified black-box AI claims are made.
          </span>
        </div>
        <div className="text-[11px] font-extrabold text-[#087443] bg-[#eaf6e8] border border-[#cbe6c7] px-3 py-1 rounded-xl shrink-0 font-mono">
          Scored {resultDossier.totalPermutationsExplored} Envelope Permutations
        </div>
      </div>

      {/* Recommended Balanced Design Hero Callout Card */}
      <Card variant="default" padding="lg" className="border-[#cbe6c7] bg-gradient-to-r from-[#eaf6e8]/80 via-[#f4faf0] to-[#fffdf7] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#cbe6c7]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#087443] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#087443]">
                Primary Optimization Output
              </span>
              <Badge variant="green">Rank #1 • Score: {recommendedBalanced.compositeScore}/100</Badge>
            </div>
            <h3 className="text-2xl font-black text-[#0d3824]">
              {recommendedBalanced.name}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#3b6b52] block">Indoor Operative Temp</span>
              <span className="text-2xl font-black text-[#087443]">{recommendedBalanced.simulation.indoor_temp_c}°C</span>
              <span className="text-[10px] font-bold text-[#087443] block">(-{recommendedBalanced.simulation.temp_reduction_c}°C Passive Drop)</span>
            </div>
            <Button
              size="md"
              variant="primary"
              onClick={() => handleApplyDesign(recommendedBalanced)}
              icon="★"
            >
              Apply Recommended Design
            </Button>
          </div>
        </div>

        {/* Why it was selected explanation panel */}
        <div className="p-4 bg-[#fffdf7] rounded-2xl border border-[#e4ede1] space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#087443] flex items-center gap-1.5">
            <span>💡</span> Why {recommendedBalanced.name.split('—')[0].trim()} was selected:
          </span>
          <p className="text-xs text-[#123b2a] leading-relaxed font-medium">
            {recommendedBalanced.selectionRationale}
          </p>
        </div>

        {/* 5-Objective KPI Breakdown for Recommended Design */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
          <div className="p-3 bg-[#fffdf7] rounded-xl border border-[#e4ede1] text-center">
            <span className="text-[10px] font-bold text-[#3b6b52] uppercase block">1. Thermal Comfort</span>
            <div className="text-lg font-black text-[#087443]">{recommendedBalanced.objectiveScores.thermalComfort}/100</div>
            <span className="text-[10px] text-[#3b6b52]">{recommendedBalanced.simulation.thermal_comfort_status.split('/')[0]}</span>
          </div>
          <div className="p-3 bg-[#fffdf7] rounded-xl border border-[#e4ede1] text-center">
            <span className="text-[10px] font-bold text-[#3b6b52] uppercase block">2. Heat Gain Cut</span>
            <div className="text-lg font-black text-[#087443]">{recommendedBalanced.objectiveScores.heatGainReduction}%</div>
            <span className="text-[10px] text-[#3b6b52]">{Math.round(recommendedBalanced.simulation.heat_gain_w)} W Total</span>
          </div>
          <div className="p-3 bg-[#fffdf7] rounded-xl border border-[#e4ede1] text-center">
            <span className="text-[10px] font-bold text-[#3b6b52] uppercase block">3. Energy Reduction</span>
            <div className="text-lg font-black text-[#087443]">{recommendedBalanced.objectiveScores.energyReduction}%</div>
            <span className="text-[10px] text-[#3b6b52]">{recommendedBalanced.simulation.cooling_energy_kwh_day} kWh/day</span>
          </div>
          <div className="p-3 bg-[#fffdf7] rounded-xl border border-[#e4ede1] text-center">
            <span className="text-[10px] font-bold text-[#3b6b52] uppercase block">4. Cost Control</span>
            <div className="text-lg font-black text-[#087443]">{recommendedBalanced.objectiveScores.costControl}/100</div>
            <span className="text-[10px] text-[#3b6b52]">₹{Math.round(recommendedBalanced.simulation.estimated_cost_inr).toLocaleString()}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">5. Sustainability</span>
            <div className="text-lg font-black text-purple-700">{recommendedBalanced.objectiveScores.sustainability}/100</div>
            <span className="text-[10px] text-slate-500">{recommendedBalanced.simulation.embodied_carbon_kg} kg CO₂</span>
          </div>
        </div>
      </Card>

      {/* Four Category Winner Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Best Thermal Comfort */}
        <Card variant="default" padding="md" className="border-sky-200 bg-sky-50/20 space-y-2 hover:border-sky-400 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase text-sky-800">Category Leader</span>
              <Badge variant="blue">Best Thermal Comfort</Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">{bestThermal.name}</h4>
            <div className="text-2xl font-black text-sky-700 mt-1">{bestThermal.simulation.indoor_temp_c}°C</div>
            <p className="text-[11px] text-slate-500 mt-1">{bestThermal.selectionRationale}</p>
          </div>
          <button
            onClick={() => handleApplyDesign(bestThermal)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors cursor-pointer"
          >
            Apply This Variant
          </button>
        </Card>

        {/* 2. Lowest Cost */}
        <Card variant="default" padding="md" className="border-amber-200 bg-amber-50/20 space-y-2 hover:border-amber-400 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase text-amber-800">Category Leader</span>
              <Badge variant="amber">Lowest Cost</Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">{lowestCost.name}</h4>
            <div className="text-2xl font-black text-amber-700 mt-1">₹{Math.round(lowestCost.simulation.estimated_cost_inr).toLocaleString()}</div>
            <p className="text-[11px] text-slate-500 mt-1">{lowestCost.selectionRationale}</p>
          </div>
          <button
            onClick={() => handleApplyDesign(lowestCost)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
          >
            Apply This Variant
          </button>
        </Card>

        {/* 3. Best Sustainability */}
        <Card variant="default" padding="md" className="border-purple-200 bg-purple-50/20 space-y-2 hover:border-purple-400 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase text-purple-800">Category Leader</span>
              <Badge variant="purple">Best Sustainability</Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">{bestSustainability.name}</h4>
            <div className="text-2xl font-black text-purple-700 mt-1">{bestSustainability.simulation.sustainability_score} / 100</div>
            <p className="text-[11px] text-slate-500 mt-1">{bestSustainability.selectionRationale}</p>
          </div>
          <button
            onClick={() => handleApplyDesign(bestSustainability)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-purple-100 hover:bg-purple-200 text-purple-800 transition-colors cursor-pointer"
          >
            Apply This Variant
          </button>
        </Card>

        {/* 4. Best Balanced Design */}
        <Card variant="default" padding="md" className="border-emerald-300 bg-emerald-50/30 space-y-2 hover:border-emerald-500 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold uppercase text-emerald-800">Overall Winner</span>
              <Badge variant="green">Best Balanced Design</Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-sm">{recommendedBalanced.name}</h4>
            <div className="text-2xl font-black text-emerald-700 mt-1">{recommendedBalanced.compositeScore} Score</div>
            <p className="text-[11px] text-slate-500 mt-1">{recommendedBalanced.selectionRationale}</p>
          </div>
          <button
            onClick={() => handleApplyDesign(recommendedBalanced)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            Apply Recommended
          </button>
        </Card>
      </div>

      {/* Ranked Candidate Designs Table (Design A, B, C, D) */}
      <Card variant="default" padding="none" className="border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-sm font-black text-slate-900">Candidate Design Rankings (Pareto Evaluation)</h3>
            <p className="text-xs text-slate-500">Ordered by composite multi-objective score across the 5 optimization criteria</p>
          </div>
          <Badge variant="blue">Ranked 1 to {candidates.length}</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold bg-white">
                <th className="py-3 px-4">Rank & Design Name</th>
                <th className="py-3 px-3">Thermal Comfort</th>
                <th className="py-3 px-3">Heat Gain Cut</th>
                <th className="py-3 px-3">Energy Saved</th>
                <th className="py-3 px-3">Cost Rating</th>
                <th className="py-3 px-3">Sustainability</th>
                <th className="py-3 px-3">Composite Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {candidates.map((c) => {
                const isSelected = appliedDesignId === c.id;
                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                          c.rank === 1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                        }`}>
                          #{c.rank}
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-xs">{c.name}</div>
                          <span className="text-[10px] text-slate-400 font-normal">{c.badgeTag}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{c.objectiveScores.thermalComfort}/100</span>
                      <span className="text-[10px] text-slate-400 block">{c.simulation.indoor_temp_c}°C</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{c.objectiveScores.heatGainReduction}%</span>
                      <span className="text-[10px] text-slate-400 block">{Math.round(c.simulation.heat_gain_w)} W</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{c.objectiveScores.energyReduction}%</span>
                      <span className="text-[10px] text-slate-400 block">{c.simulation.cooling_energy_kwh_day} kWh</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{c.objectiveScores.costControl}/100</span>
                      <span className="text-[10px] text-slate-400 block">₹{Math.round(c.simulation.estimated_cost_inr).toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-800">{c.objectiveScores.sustainability}/100</span>
                      <span className="text-[10px] text-slate-400 block">{c.simulation.embodied_carbon_kg} kg CO₂</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-sm font-black ${c.rank === 1 ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {c.compositeScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleApplyDesign(c)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          c.rank === 1
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Applied' : 'Apply'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
