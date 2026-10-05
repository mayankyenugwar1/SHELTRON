import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge, ProgressBar } from '../../components/ui';
import { Shelter3DViewer } from '../../components/Shelter3DViewer';
import { generateStructuredRecommendations } from '../../recommendation/designEngine';

export const DesignPage: React.FC = () => {
  const { site, climate, currentParams, simulation, updateParameters } = useShelterProject();
  const navigate = useNavigate();

  const [heatmapMode, setHeatmapMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [appliedFeedback, setAppliedFeedback] = useState<boolean>(false);

  // Generate deterministic design recommendations
  const dossier = generateStructuredRecommendations(climate, site);

  const categories = [
    { id: 'all', label: 'All Directives (9)' },
    { id: 'envelope', label: 'Envelope & Orientation' },
    { id: 'openings', label: 'Openings & Shading' },
    { id: 'ventilation', label: 'Ventilation & Mass' }
  ];

  const filteredItems = dossier.items.filter(item => {
    if (activeFilter === 'envelope') {
      return ['Orientation', 'Layout & Spatial Zoning', 'Roof Form & Assembly', 'Roof Slope'].includes(item.category);
    }
    if (activeFilter === 'openings') {
      return ['Window Placement', 'Window Size & WWR', 'External Shading'].includes(item.category);
    }
    if (activeFilter === 'ventilation') {
      return ['Cross Ventilation', 'Insulation & Thermal Mass'].includes(item.category);
    }
    return true;
  });

  const handleApplyRecommendedDesign = () => {
    updateParameters(dossier.recommendedParameters);
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 3500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <SectionHeader
        title={`Climate-Adaptive Architectural Directives: ${site.location_name}`}
        subtitle={`${site.shelter_type} • Budget: ₹${site.budget_inr.toLocaleString()} • Deterministic bioclimatic rules based on SP 41 standards.`}
        tag="SHELTRON Pipeline — Stage 4 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/app/design/studio')}
              icon="🎨"
            >
              Open 3D Studio
            </Button>
            <Button
              variant={appliedFeedback ? 'secondary' : 'accent'}
              onClick={handleApplyRecommendedDesign}
              icon="✨"
              className="shadow-sm cursor-pointer"
            >
              {appliedFeedback ? "Design Applied ✓" : "Apply Recommended Design"}
            </Button>
            <Button variant="primary" onClick={() => navigate('/app/simulation')} icon="→">
              Proceed to Thermal Simulation
            </Button>
          </div>
        }
      />

      {/* Applied Feedback Banner */}
      {appliedFeedback && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-base">✓</span>
            <span><b>Success:</b> Recommended orientation, roof slope, materials, WWR, and overhang parameters have been applied to your shelter digital twin!</span>
          </div>
          <span className="font-extrabold uppercase text-[10px] bg-emerald-100 px-2 py-0.5 rounded">Synchronized</span>
        </div>
      )}

      {/* 3D Visual Twin & Summary Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 3D Model with Real-time Parameter View */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">3D Interactive Spatial Twin</h3>
              <p className="text-xs text-slate-500">Live preview of solar orientation, shading overhangs, and ventilation stack</p>
            </div>
            <button
              onClick={() => setHeatmapMode(!heatmapMode)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                heatmapMode
                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {heatmapMode ? '🔥 Heatmap View Active' : '🎨 Architectural Colors'}
            </button>
          </div>

          <div className="h-[460px]">
            <Shelter3DViewer
              params={currentParams}
              simulation={simulation || undefined}
              showHeatmap={heatmapMode}
            />
          </div>
        </div>

        {/* Right: Recommended Design Configuration Summary Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card variant="default" padding="lg" className="border-sky-100 shadow-xs space-y-5 bg-gradient-to-b from-white to-sky-50/20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Synthesized Specification</span>
                <h3 className="text-base font-black text-slate-900">Recommended Design Configuration</h3>
              </div>
              <Badge variant="blue">{climate.climate_zone}</Badge>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-100">
              {dossier.bioclimaticRationale}
            </p>

            {/* Structured Summary Items */}
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">🧭</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">Orientation</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.orientation}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">🏠</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">Roof Assembly & Slope</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.roofForm} ({dossier.configurationSummary.roofSlope})</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">🪟</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">Fenestration & WWR</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.windowSizeWWR} • {dossier.configurationSummary.windowPlacement}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">☂️</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">External Shading</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.shading}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">💨</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">Natural Cross Ventilation</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.crossVentilation}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start gap-2.5">
                <span className="text-base">🛡️</span>
                <div className="flex-1">
                  <div className="font-bold text-slate-800">Insulation & Thermal Mass</div>
                  <div className="text-slate-600 text-[11px]">{dossier.configurationSummary.insulation}</div>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <Button
                variant="accent"
                size="md"
                onClick={handleApplyRecommendedDesign}
                className="w-full justify-center shadow-md py-2.5"
                icon="✨"
              >
                Apply Recommended Design
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Filter Tabs for Directives */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 overflow-x-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
          Filter Directives:
        </span>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveFilter(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === c.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid of Explainable Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            variant="default"
            padding="lg"
            className="border-slate-200/90 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
          >
            <div className="space-y-3">
              {/* Category & Confidence Score */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl p-1.5 bg-slate-50 rounded-xl border border-slate-100">{item.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.confidenceScore}% Suitability
                  </span>
                </div>
              </div>

              {/* Recommendation Title */}
              <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                {item.recommendation}
              </h4>

              {/* Why It Is Recommended (Explainable physics basis) */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Why It Is Recommended:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.whyRecommended}
                </p>
              </div>

              {/* Expected Thermal Effect */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Expected Thermal Effect:
                </span>
                <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
                  {item.expectedThermalEffect}
                </p>
              </div>
            </div>

            {/* Suitability Metric Bar */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>Deterministic Bioclimatic Confidence</span>
                <span className="text-slate-700">{item.confidenceScore} / 100</span>
              </div>
              <ProgressBar value={item.confidenceScore} color="emerald" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
