import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { DEMO_FLOW_STEPS } from '../../data/defaults';
import { Card, MetricCard, SectionHeader, Button, Badge } from '../../components/ui';
import { Sparkles, Play, Building2, MapPin, Users, Wallet } from 'lucide-react';

export const AppOverviewPage: React.FC = () => {
  const { site, climate, simulation, runAutoOptimization, isLoading, startDemoMode } = useShelterProject();
  const navigate = useNavigate();

  const handleStartDemo = () => {
    startDemoMode();
    navigate('/app/create');
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Demo Button */}
      <SectionHeader
        title={`Active Shelter Project: ${site.location_name}`}
        subtitle={`${site.shelter_type} • ${site.length_m}m × ${site.width_m}m (${site.length_m * site.width_m} m²) • Climate: ${climate.climate_zone}`}
        tag="Dashboard"
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={handleStartDemo}
              icon="⚡"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-2xs cursor-pointer"
            >
              Start Judge Demo (Nashik)
            </Button>
            <Button
              variant="outline"
              onClick={runAutoOptimization}
              disabled={isLoading}
              icon="✨"
            >
              {isLoading ? "Optimizing..." : "Auto-Optimize"}
            </Button>
            <Link to="/app/design/studio">
              <Button variant="primary" icon="📐">
                Open 3D Twin
              </Button>
            </Link>
          </div>
        }
      />

      {/* JUDGE DEMO MODE HERO BANNER */}
      <Card variant="pale-green" padding="lg" className="border-[#cbe6c7] bg-gradient-to-r from-[#eaf6e8] via-[#fffdf7] to-[#eaf6e8] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#087443] text-white font-mono flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3" />
                Smart India Hackathon • 3-Minute Fast Track
              </span>
              <Badge variant="green" size="sm" className="font-mono text-[10px]">
                No API Keys Needed
              </Badge>
              <Badge variant="green" size="sm" className="font-mono text-[10px]">
                3 Prebuilt Variations
              </Badge>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0d3824] tracking-tight">
              Experience the Full SHELTRON Pipeline in Under 3 Minutes
            </h2>

            <p className="text-xs sm:text-sm text-[#3b6b52] leading-relaxed">
              Loads a realistic sample shelter project for <span className="font-bold text-[#0d3824]">Nashik, Maharashtra</span> (Residential, 4 occupants, 63 m² footprint, medium budget). Automatically populates microclimate profiles, 9 bioclimatic recommendations, materials, thermal simulations, 2D heatmaps, What-If sensitivity tests, and the final Pareto-optimized dossier.
            </p>

            {/* Realistic Specs Pill Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#123b2a]">
              <span className="flex items-center gap-1 font-semibold bg-[#fffdf7] px-2.5 py-1 rounded-xl border border-[#cbe6c7]">
                <MapPin className="w-3.5 h-3.5 text-[#087443]" />
                Nashik, Maharashtra
              </span>
              <span className="flex items-center gap-1 font-semibold bg-[#fffdf7] px-2.5 py-1 rounded-xl border border-[#cbe6c7]">
                <Building2 className="w-3.5 h-3.5 text-[#087443]" />
                Residential (9m × 7m × 3.2m)
              </span>
              <span className="flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-sky-200">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                4 Occupants
              </span>
              <span className="flex items-center gap-1 font-medium bg-white px-2.5 py-1 rounded-lg border border-sky-200">
                <Wallet className="w-3.5 h-3.5 text-amber-600" />
                Medium Budget (₹3,80,000)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 shrink-0 w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              onClick={handleStartDemo}
              className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-6 py-3 shadow-md justify-center cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current mr-2 inline" />
              Start 3-Minute Demo
            </Button>
            <span className="text-[10px] text-slate-500 font-mono text-center">
              * Uses prototype simulation data & deterministic bioclimatic physics
            </span>
          </div>
        </div>

        {/* 7-Step Demo Flow Progression Timeline */}
        <div className="mt-5 pt-4 border-t border-sky-200/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
            Structured Demo Pathway:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {DEMO_FLOW_STEPS.map((step, idx) => (
              <div
                key={step.id}
                onClick={() => {
                  startDemoMode();
                  navigate(step.path);
                }}
                className="p-2 bg-white/90 hover:bg-white rounded-xl border border-sky-200/90 text-center cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="text-base mb-0.5">{step.icon}</div>
                <div className="text-[10px] font-mono text-sky-700 font-bold">Step {idx + 1}</div>
                <div className="text-[11px] font-bold text-slate-900 truncate group-hover:text-sky-600">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Indoor Temperature"
          value={`${simulation.indoor_temp_c}°C`}
          subValue={`Outdoor Peak: ${climate.peak_summer_temp_c}°C`}
          badge={{ text: `-${simulation.temp_reduction_c}°C Cooler`, positive: simulation.temp_reduction_c > 0 }}
          color="sky"
        />
        <MetricCard
          label="Thermal Comfort Score"
          value={simulation.thermal_comfort_score}
          unit="/ 100"
          subValue={simulation.thermal_comfort_status}
          badge={{ text: simulation.thermal_comfort_status, positive: simulation.thermal_comfort_score >= 75 }}
          color="emerald"
        />
        <MetricCard
          label="Cooling Demand"
          value={simulation.cooling_energy_kwh_day}
          unit="kWh/day"
          subValue={`Heat Gain: ${Math.round(simulation.heat_gain_w)} W`}
          color="amber"
        />
        <MetricCard
          label="Estimated Envelope Cost"
          value={`₹${Math.round(simulation.estimated_cost_inr).toLocaleString()}`}
          subValue={`Target Budget: ₹${site.budget_inr.toLocaleString()}`}
          badge={{ text: simulation.estimated_cost_inr <= site.budget_inr ? "Within Budget" : "Exceeds Target", positive: simulation.estimated_cost_inr <= site.budget_inr }}
          color="purple"
        />
      </div>

      {/* Action Shortcut Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="default" padding="md" className="space-y-2 hover:border-slate-300 card-hover bg-white border border-slate-200">
          <div className="text-xl">🗺️</div>
          <h3 className="font-bold text-slate-900 text-sm">Site & Climate Profile</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Inspect regional wind vectors, humidity, and solar radiation maps.</p>
          <Link to="/app/climate" className="inline-block pt-1 text-xs font-bold text-sky-600 hover:underline">
            View Climate Data →
          </Link>
        </Card>

        <Card variant="default" padding="md" className="space-y-2 hover:border-slate-300 card-hover bg-white border border-slate-200">
          <div className="text-xl">🌡️</div>
          <h3 className="font-bold text-slate-900 text-sm">Thermal & Hotspot Analysis</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Explore 24-hr diurnal damping charts and 9-point spatial temperature grids.</p>
          <Link to="/app/simulation" className="inline-block pt-1 text-xs font-bold text-sky-600 hover:underline">
            Inspect Simulation →
          </Link>
        </Card>

        <Card variant="default" padding="md" className="space-y-2 hover:border-slate-300 card-hover bg-white border border-slate-200">
          <div className="text-xl">⚡</div>
          <h3 className="font-bold text-slate-900 text-sm">Parametric What-If Sandbox</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Live modify WWR, overhangs, and assemblies with real-time delta tracking.</p>
          <Link to="/app/what-if" className="inline-block pt-1 text-xs font-bold text-sky-600 hover:underline">
            Open What-If Sandbox →
          </Link>
        </Card>
      </div>
    </div>
  );
};
