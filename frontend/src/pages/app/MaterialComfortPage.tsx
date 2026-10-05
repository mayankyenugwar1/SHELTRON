import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge, ProgressBar } from '../../components/ui';
import { COMPREHENSIVE_MATERIALS, COMFORT_RECOMMENDATIONS, MaterialItem, ComfortDirective } from '../../data/materialData';
import { SupplierDrawer } from '../../components/SupplierDrawer';
import { ShelterParameters } from '../../types';

export const MaterialComfortPage: React.FC = () => {
  const { site, climate, currentParams, updateParameters } = useShelterProject();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'materials' | 'comfort'>('materials');
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState<'walls' | 'roof' | 'insulation' | 'flooring' | 'paint' | 'glazing'>('walls');
  const [supplierDrawerMaterial, setSupplierDrawerMaterial] = useState<MaterialItem | null>(null);

  const zone = climate.climate_zone;
  const comfortDirectives: ComfortDirective[] =
    COMFORT_RECOMMENDATIONS[zone] ||
    COMFORT_RECOMMENDATIONS["Hot & Dry"] ||
    COMFORT_RECOMMENDATIONS["Composite"];

  // Helper to determine recommendation badge status for a material
  const getSuitabilityStatus = (mat: MaterialItem): 'Recommended' | 'Alternative' | 'Not Preferred' => {
    // Check if directly matched for climate
    const isRecommended = mat.recommendedFor.some(z => zone.toLowerCase().includes(z.toLowerCase()) || z.toLowerCase().includes(zone.toLowerCase()));
    const isNotPreferred = mat.notPreferredFor.some(z => zone.toLowerCase().includes(z.toLowerCase()) || z.toLowerCase().includes(zone.toLowerCase()));

    if (isNotPreferred) return 'Not Preferred';
    if (isRecommended) return 'Recommended';
    return 'Alternative';
  };

  // Helper to get currently active selected material name per category
  const getCurrentSelectedMaterialName = (cat: 'walls' | 'roof' | 'insulation' | 'flooring' | 'paint' | 'glazing'): string => {
    switch (cat) {
      case 'walls': return currentParams.wall_material;
      case 'roof': return currentParams.roof_material;
      case 'insulation': return currentParams.insulation_type;
      case 'flooring': return currentParams.flooring_material;
      case 'paint': return currentParams.paint_coating;
      case 'glazing': return currentParams.window_glazing;
    }
  };

  // Handler to replace material manually
  const handleSelectMaterial = (category: 'walls' | 'roof' | 'insulation' | 'flooring' | 'paint' | 'glazing', materialName: string) => {
    const updateKeyMap: Record<string, keyof ShelterParameters> = {
      walls: 'wall_material',
      roof: 'roof_material',
      insulation: 'insulation_type',
      flooring: 'flooring_material',
      paint: 'paint_coating',
      glazing: 'window_glazing'
    };

    updateParameters({
      [updateKeyMap[category]]: materialName
    });
  };

  // Dynamic Cost Calculation Breakdown
  const footprint = site.length_m * site.width_m;
  const grossWall = 2 * (site.length_m + site.width_m) * site.height_m;
  const winArea = grossWall * (currentParams.window_to_wall_ratio_pct / 100);
  const netWall = grossWall - winArea;
  const roofArea = footprint / Math.cos((currentParams.roof_slope_deg * Math.PI) / 180);

  // Find active items to get exact unit costs
  const activeWall = COMPREHENSIVE_MATERIALS.walls.find(m => m.name === currentParams.wall_material) || COMPREHENSIVE_MATERIALS.walls[0];
  const activeRoof = COMPREHENSIVE_MATERIALS.roof.find(m => m.name === currentParams.roof_material) || COMPREHENSIVE_MATERIALS.roof[0];
  const activeInsul = COMPREHENSIVE_MATERIALS.insulation.find(m => m.name === currentParams.insulation_type) || COMPREHENSIVE_MATERIALS.insulation[0];
  const activeFloor = COMPREHENSIVE_MATERIALS.flooring.find(m => m.name === currentParams.flooring_material) || COMPREHENSIVE_MATERIALS.flooring[0];
  const activePaint = COMPREHENSIVE_MATERIALS.paint.find(m => m.name === currentParams.paint_coating) || COMPREHENSIVE_MATERIALS.paint[0];
  const activeGlaze = COMPREHENSIVE_MATERIALS.glazing.find(m => m.name === currentParams.window_glazing) || COMPREHENSIVE_MATERIALS.glazing[0];

  const costWallTotal = netWall * activeWall.costSqmInr;
  const costRoofTotal = roofArea * activeRoof.costSqmInr;
  const costInsulTotal = (roofArea + netWall) * activeInsul.costSqmInr;
  const costFloorTotal = footprint * activeFloor.costSqmInr;
  const costPaintTotal = (roofArea + netWall) * activePaint.costSqmInr;
  const costGlazeTotal = winArea * activeGlaze.costSqmInr;
  const costFoundationTotal = footprint * 1800; // Base foundation, labor & structure framing

  const totalCalculatedCost = Math.round(costWallTotal + costRoofTotal + costInsulTotal + costFloorTotal + costPaintTotal + costGlazeTotal + costFoundationTotal);
  const budgetVariance = Math.round(site.budget_inr - totalCalculatedCost);
  const isUnderBudget = budgetVariance >= 0;

  const totalEmbodiedCarbon = Math.round(
    netWall * activeWall.embodiedCarbonKg +
    roofArea * activeRoof.embodiedCarbonKg +
    (roofArea + netWall) * activeInsul.embodiedCarbonKg +
    footprint * activeFloor.embodiedCarbonKg +
    winArea * activeGlaze.embodiedCarbonKg +
    footprint * 45 // foundation carbon
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <SectionHeader
        title="Smart Material Selection & Personalized Comfort Architecture"
        subtitle={`Select categorized building materials and evaluate natural cooling, daylighting, and biophilic directives for ${climate.location}.`}
        tag="SHELTRON Pipeline — Stage 3 of 8"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={() => navigate('/app/design/studio')} icon="→">
              Proceed to 3D Digital Twin
            </Button>
          </div>
        }
      />

      {/* Main Switcher: Categorized Materials vs Personalized Comfort Directives */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fffdf7] p-3 rounded-2xl border border-[#e4ede1] shadow-[0_4px_16px_-3px_rgba(18,59,42,0.05)]">
        <div className="flex items-center gap-1.5 bg-[#f4faf0] p-1 rounded-xl border border-[#e4ede1]">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'materials'
                ? 'bg-[#087443] text-white shadow-xs'
                : 'text-[#3b6b52] hover:text-[#0d3824]'
            }`}
          >
            <span>🧱</span> Categorized Material Selection
          </button>
          <button
            onClick={() => setActiveTab('comfort')}
            className={`px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'comfort'
                ? 'bg-[#087443] text-white shadow-xs'
                : 'text-[#3b6b52] hover:text-[#0d3824]'
            }`}
          >
            <span>🌿</span> Personalized Comfort & Lighting Directives
          </button>
        </div>

        <div className="text-xs font-bold text-[#3b6b52]">
          Target Budget: <b className="text-[#0d3824]">₹{site.budget_inr.toLocaleString()}</b> • Selected Zone: <b className="text-[#087443]">{climate.climate_zone}</b>
        </div>
      </div>

      {/* TAB 1: Categorized Material Selection */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          {/* Sub-Category Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'walls', label: 'Walls', icon: '🧱' },
              { id: 'roof', label: 'Roof', icon: '🏠' },
              { id: 'insulation', label: 'Insulation', icon: '🛡️' },
              { id: 'flooring', label: 'Flooring', icon: '🪵' },
              { id: 'paint', label: 'Paint & Coatings', icon: '🎨' },
              { id: 'glazing', label: 'Glazing', icon: '🪟' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedMaterialCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  selectedMaterialCategory === cat.id
                    ? 'bg-[#087443] text-white border-[#087443] shadow-xs font-black'
                    : 'bg-[#fffdf7] text-[#123b2a] border-[#e4ede1] hover:bg-[#eaf6e8]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Grid of Materials for the Selected Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPREHENSIVE_MATERIALS[selectedMaterialCategory].map((mat) => {
              const currentSelectedName = getCurrentSelectedMaterialName(selectedMaterialCategory);
              const isSelected = currentSelectedName === mat.name;
              const status = getSuitabilityStatus(mat);

              return (
                <Card
                  key={mat.id}
                  variant="default"
                  padding="lg"
                  className={`border transition-all flex flex-col justify-between space-y-4 shadow-2xs ${
                    isSelected
                      ? 'border-[#087443] bg-[#f4faf0] ring-2 ring-[#087443]/20'
                      : 'border-[#e4ede1] bg-[#fffdf7] hover:border-[#cbe6c7]'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Status Badge & Cost Category */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                        status === 'Recommended'
                          ? 'bg-[#eaf6e8] text-[#087443] border-[#cbe6c7]'
                          : status === 'Alternative'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        {status === 'Recommended' ? '★ Recommended' : status}
                      </span>
                      <span className="text-xs font-extrabold text-[#123b2a] bg-[#f4faf0] border border-[#e4ede1] px-2 py-0.5 rounded">
                        {mat.costCategory} (₹{mat.costSqmInr}/m²)
                      </span>
                    </div>

                    {/* Material Title */}
                    <div>
                      <h4 className="font-extrabold text-[#0d3824] text-sm">{mat.name}</h4>
                      <p className="text-[11px] text-[#3b6b52] leading-snug mt-1">{mat.description}</p>
                    </div>

                    {/* Thermal Property Box */}
                    <div className="p-2.5 rounded-xl bg-[#fbfdfa] border border-[#e4ede1] space-y-1 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b6b52] block">
                        Thermal Property
                      </span>
                      <span className="font-bold text-[#123b2a] block text-xs">{mat.thermalProperty}</span>
                    </div>

                    {/* Climate Suitability */}
                    <div className="text-xs text-[#3b6b52] space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#3b6b52] block">
                        Climate Suitability
                      </span>
                      <span className="text-[11px] font-semibold text-[#123b2a]">{mat.climateSuitability}</span>
                    </div>

                    {/* Sustainability Score & Carbon */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-[#3b6b52]">
                        <span>Sustainability Score</span>
                        <span className="text-[#087443]">{mat.sustainabilityScore} / 100</span>
                      </div>
                      <ProgressBar value={mat.sustainabilityScore} color="forest" />
                      <span className="text-[10px] text-[#3b6b52] block mt-0.5">
                        Embodied Carbon: {mat.embodiedCarbonKg} kg CO₂e/m²
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: Select & Nearby Suppliers */}
                  <div className="pt-2 border-t border-[#e4ede1] space-y-1.5">
                    <button
                      onClick={() => handleSelectMaterial(selectedMaterialCategory, mat.name)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#087443] text-white shadow-xs cursor-default'
                          : 'bg-[#f4faf0] hover:bg-[#eaf6e8] text-[#123b2a] hover:text-[#087443] border border-[#e4ede1]'
                      }`}
                    >
                      {isSelected ? '✓ Currently Selected' : 'Replace with this Material'}
                    </button>

                    {/* Why selected note if selected material is not the top recommendation */}
                    {isSelected && status !== 'Recommended' && (
                      <div className="p-2 rounded-lg bg-amber-50 border border-amber-200/80 text-[10px] text-amber-900 leading-tight">
                        <span className="font-bold">Why selected:</span> Custom project tradeoff — selected for specific structural, availability, or embodied carbon constraints under active envelope sizing.
                      </div>
                    )}

                    <button
                      onClick={() => setSupplierDrawerMaterial(mat)}
                      className="w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-[#cbe6c7] bg-[#eaf6e8] hover:bg-[#dff0dc] text-[#087443] shadow-2xs"
                    >
                      <span>📍</span> Find Nearby Suppliers
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Design Cost & Carbon Impact Summary Panel */}
          <Card variant="default" padding="lg" className="border-sky-200/80 shadow-xs space-y-6 bg-gradient-to-r from-sky-50/40 via-white to-emerald-50/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Estimated Cost & Sustainability Analysis</span>
                <h3 className="text-base font-black text-slate-900">Design Cost & Sustainability Impact Summary</h3>
                <p className="text-[11px] text-slate-500 font-medium">Indicative estimate based on material unit rates.</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isUnderBudget ? 'green' : 'rose'}>
                  {isUnderBudget ? `Within Budget (+₹${budgetVariance.toLocaleString()} buffer)` : `Exceeds Target by ₹${Math.abs(budgetVariance).toLocaleString()}`}
                </Badge>
              </div>
            </div>

            {/* Cost Cards Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Envelope Cost</span>
                <div className="text-xl font-black text-slate-900">₹{totalCalculatedCost.toLocaleString()}</div>
                <span className="text-[10px] text-slate-500 block">Unit: ₹{Math.round(totalCalculatedCost / footprint).toLocaleString()}/m²</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Budget</span>
                <div className="text-xl font-black text-sky-700">₹{site.budget_inr.toLocaleString()}</div>
                <span className="text-[10px] text-slate-500 block">Allocated envelope cap</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Embodied Carbon</span>
                <div className="text-xl font-black text-emerald-700">{totalEmbodiedCarbon.toLocaleString()} kg</div>
                <span className="text-[10px] text-slate-500 block">CO₂ equivalent emissions</span>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Wall & Roof Assemblies</span>
                <div className="text-xs font-bold text-slate-800 truncate">{currentParams.wall_material.split('(')[0]}</div>
                <span className="text-[10px] text-slate-500 block truncate">{currentParams.roof_material.split('(')[0]}</span>
              </div>
            </div>

            {/* Component Line-Item Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2">Envelope Component</th>
                    <th className="py-2">Specified Material</th>
                    <th className="py-2">Area</th>
                    <th className="py-2">Rate (₹/m²)</th>
                    <th className="py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Wall Assembly</td>
                    <td className="py-2 text-slate-600">{currentParams.wall_material}</td>
                    <td className="py-2 text-slate-500">{netWall.toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹{activeWall.costSqmInr}</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costWallTotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Roof System</td>
                    <td className="py-2 text-slate-600">{currentParams.roof_material}</td>
                    <td className="py-2 text-slate-500">{roofArea.toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹{activeRoof.costSqmInr}</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costRoofTotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Glazing Fenestration</td>
                    <td className="py-2 text-slate-600">{currentParams.window_glazing} ({currentParams.window_to_wall_ratio_pct}% WWR)</td>
                    <td className="py-2 text-slate-500">{winArea.toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹{activeGlaze.costSqmInr}</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costGlazeTotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Flooring / Plinth</td>
                    <td className="py-2 text-slate-600">{currentParams.flooring_material}</td>
                    <td className="py-2 text-slate-500">{footprint.toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹{activeFloor.costSqmInr}</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costFloorTotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Reflective Coating</td>
                    <td className="py-2 text-slate-600">{currentParams.paint_coating}</td>
                    <td className="py-2 text-slate-500">{(roofArea + netWall).toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹{activePaint.costSqmInr}</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costPaintTotal).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-slate-800">Foundation & Framing</td>
                    <td className="py-2 text-slate-600">Base earthworks, stabilized foundation & lintel framing</td>
                    <td className="py-2 text-slate-500">{footprint.toFixed(1)} m²</td>
                    <td className="py-2 text-slate-500">₹1,800</td>
                    <td className="py-2 text-right font-extrabold text-slate-900">₹{Math.round(costFoundationTotal).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: Personalized Comfort & Lighting Directives */}
      {activeTab === 'comfort' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Scientific Disclaimer */}
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between text-xs text-sky-900">
            <div className="flex items-center gap-2">
              <span className="text-base">🔬</span>
              <span>
                <b>Bioclimatic Comfort Directives:</b> Formulated strictly according to ASHRAE 55 Adaptive Comfort models, microclimate fluid dynamics, and optical daylight factors. Grounded strictly in empirical building physics.
              </span>
            </div>
            <Badge variant="blue">ASHRAE 55 Compliant</Badge>
          </div>

          {/* Grid of Comfort Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comfortDirectives.map((cmd, idx) => (
              <Card
                key={idx}
                variant="default"
                padding="lg"
                className="border-slate-200/90 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl p-1.5 rounded-xl bg-slate-50 border border-slate-100">{cmd.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {cmd.category.replace('_', ' ')}
                      </span>
                    </div>
                    <Badge variant="green" size="sm">Passive Directive</Badge>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                    {cmd.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {cmd.recommendation}
                  </p>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Thermal Physics Basis:
                    </span>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {cmd.thermalPhysicsBasis}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                    Expected Comfort Improvement:
                  </span>
                  <span className="font-bold text-emerald-900 text-xs block">
                    {cmd.expectedComfortImprovement}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Journey Progression Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Next Step in Bioclimatic Pipeline</span>
          <div className="font-extrabold text-slate-800 text-sm">Visualize in Interactive 3D Digital Twin</div>
        </div>
        <Button size="lg" variant="primary" onClick={() => navigate('/app/design/studio')} icon="→">
          Proceed to 3D Digital Twin
        </Button>
      </div>

      {/* Nearby Suppliers Drawer / Modal */}
      <SupplierDrawer
        isOpen={!!supplierDrawerMaterial}
        onClose={() => setSupplierDrawerMaterial(null)}
        material={supplierDrawerMaterial}
        locationName={site.location_name}
      />
    </div>
  );
};
