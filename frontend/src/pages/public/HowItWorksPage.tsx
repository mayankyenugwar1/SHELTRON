import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, SectionHeader, Button, Badge } from '../../components/ui';

interface ProcessStep {
  id: number;
  title: string;
  shortDesc: string;
  icon: string;
  tag: string;
  inputs: string[];
  outputs: string[];
  details: string;
  highlightStat: string;
}

export const HowItWorksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: "Location & Climate Analysis",
      shortDesc: "Ingests localized meteorological data across distinct regional bioclimatic zones.",
      icon: "🌐",
      tag: "Meteorology",
      inputs: [
        "Geographic coordinates (Latitude / Longitude)",
        "Ambient dry bulb temperature & diurnal swing",
        "Relative humidity & precipitation patterns",
        "Solar radiation (Global Horizontal Irradiance)",
        "Prevailing wind speed & direction vector",
        "IPCC future climate surge scenario (+2.5°C toggle)"
      ],
      outputs: [
        "Bioclimatic zone classification (Hot-Dry, Composite, Humid, etc.)",
        "Sol-air heating potential & radiation index",
        "Prevailing seasonal wind rose direction",
        "Extreme heatwave & overheating vulnerability score"
      ],
      details: "SHELTRON maps geographic coordinates against empirical meteorological datasets to construct a 24-hour diurnal ambient wave and solar radiation curve without requiring manual weather file formatting.",
      highlightStat: "6 Climatic Zones Modeled"
    },
    {
      id: 2,
      title: "User & Site Requirements",
      shortDesc: "Defines functional constraints, shelter typology, occupancy density, and financial parameters.",
      icon: "📐",
      tag: "Site Constraints",
      inputs: [
        "Shelter typology (Disaster relief center, clinic, school, housing)",
        "Floor dimensions: length, width & ceiling height (m)",
        "Occupant count & metabolic density (W/person)",
        "Envelope construction budget ceiling (INR)",
        "Thermal comfort target & preference",
        "Embodied carbon / sustainability priority"
      ],
      outputs: [
        "Total shelter floor area (m²) and internal volume (m³)",
        "Gross & net envelope surface area breakdowns",
        "Internal metabolic heat gain baseline (Watts)",
        "Target unit cost constraints per square meter"
      ],
      details: "Establishes physical boundaries, occupancy schedules, and economic caps that constrain all downstream architectural and simulation choices.",
      highlightStat: "100% Parameterized Boundaries"
    },
    {
      id: 3,
      title: "Climate-Adaptive Architecture",
      shortDesc: "Generates passive architectural directives adhering to National Building Code (SP 41) standards.",
      icon: "🏛️",
      tag: "Passive Design",
      inputs: [
        "Climate zone classification & solar azimuth angles",
        "Prevailing wind vector & breeze trajectory",
        "Site orientation constraints & daylight availability"
      ],
      outputs: [
        "Optimal solar orientation (e.g. East-West long axis with 10° North bias)",
        "Passive layout zoning & microclimate courtyard buffer",
        "Aerodynamic roof shape & optimal slope angle (15°-35°)",
        "Target Window-to-Wall Ratio (12%-28% WWR)",
        "Overhang (Chajja) projection depth & shading angle",
        "Daylight factor & glare-controlled lighting plan"
      ],
      details: "Employs deterministic bioclimatic architectural logic to block summer solar radiation while capturing cooling breezes, based strictly on empirical thermodynamics.",
      highlightStat: "Strict SP 41 Passive Standards"
    },
    {
      id: 4,
      title: "Smart Material Selection",
      shortDesc: "Selects envelope components balancing U-values, solar reflectance, thermal mass, and embodied carbon.",
      icon: "🧱",
      tag: "Material Physics",
      inputs: [
        "Wall assembly type (CSEB, AAC blocks, Rammed Earth, Bamboo)",
        "Roof system (Double-skin terracotta, green roof, cool membrane)",
        "Fenestration glazing (Double Low-E, Argon-filled, Clear)",
        "Exterior coating (High-albedo SRI 104 cool paint, lime wash)"
      ],
      outputs: [
        "Assembly overall heat transfer coefficient (U-value W/m²K)",
        "Solar Reflectance Index (SRI) & surface albedo (α)",
        "Thermal lag delay (hours) & damping decrement factor (µ)",
        "Embodied carbon footprint (kg CO₂e / m²)",
        "Bill of materials unit cost in INR"
      ],
      details: "Combines high thermal mass walls that delay daytime peak heat with highly reflective, ventilated roofs that re-radiate infrared energy back into the night sky.",
      highlightStat: "Up to 9.5 Hours Thermal Lag"
    },
    {
      id: 5,
      title: "Personalized Comfort Design",
      shortDesc: "Tailors the microclimate to human physiological comfort limits and natural convective ventilation.",
      icon: "💨",
      tag: "Adaptive Comfort",
      inputs: [
        "Occupant age & vulnerability profile",
        "Natural ventilation strategy (Cross, Louver, Stack, Night purge)",
        "Air change rate per hour (ACH) based on ambient wind speed",
        "Vegetative courtyard buffer & biophilic shading"
      ],
      outputs: [
        "Target indoor air velocity index (m/s)",
        "Effective operative temperature reduction (°C)",
        "Evaporative vegetative buffer attenuation (-1.8°C)",
        "PMV / PPD adaptive thermal comfort threshold index"
      ],
      details: "Calculates skin cooling airflow velocity and convective heat dissipation to maintain occupants within ASHRAE 55 adaptive comfort bands without mechanical air conditioning.",
      highlightStat: "ASHRAE 55 Adaptive Standard"
    },
    {
      id: 6,
      title: "Thermal Simulation & Analysis",
      shortDesc: "Simulates deterministic Fourier conduction, Sol-air temperatures, and 24-hr diurnal lag damping.",
      icon: "🌡️",
      tag: "Thermodynamics",
      inputs: [
        "Selected 3D shelter envelope geometry",
        "Multi-layer composite U-values and albedo coefficients",
        "Diurnal solar irradiance and ambient temperature wave",
        "Calculated ventilation air change rates (ACH)"
      ],
      outputs: [
        "Equilibrium indoor operative temperature (°C)",
        "Surface temperatures across roof and exterior walls (°C)",
        "Total envelope heat gain vs heat loss balance (Watts)",
        "24-Hour Diurnal Damping Curve (Ambient vs Baseline vs SHELTRON)",
        "9-Point Spatial Thermal Hotspot microclimate matrix",
        "Active cooling energy demand (kWh/day) & comfort score (/100)"
      ],
      details: "Solves steady-periodic heat transfer equations. Visualizes how phase lag damps the 44.8°C desert peak into a comfortable 26.8°C indoor microclimate.",
      highlightStat: "-18°C Passive Reduction"
    },
    {
      id: 7,
      title: "What-If Analysis & Optimization",
      shortDesc: "Real-time parametric sandbox and Pareto optimization to verify, compare, and lock the final design.",
      icon: "⚡",
      tag: "Pareto Optimizer",
      inputs: [
        "Alternative material combinations & glazing specs",
        "Adjustable slider overrides (WWR %, overhang depth, orientation)",
        "Target budget constraint ceiling (INR)"
      ],
      outputs: [
        "Side-by-side Before vs After delta performance table",
        "Net temperature, comfort score, cost, and carbon variances",
        "Multi-objective Pareto-optimized parameter specification",
        "Downloadable verified engineering dossier & PDF report"
      ],
      details: "Empowers designers to test design trade-offs virtually before construction. Evaluates permutations to maximize thermal comfort while strictly remaining within budget.",
      highlightStat: "Virtual Test Before Build"
    }
  ];

  const current = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <SectionHeader
        title="How SHELTRON Works: The 7-Step Closed Loop"
        subtitle="A deterministic engineering workflow from regional meteorological ingest to an optimized, construction-ready shelter."
        tag="Engineering Pipeline"
        actions={
          <Link to="/app/create">
            <Button variant="primary" icon="🚀">
              Launch Interactive Workflow
            </Button>
          </Link>
        }
      />

      {/* Interactive Horizontal Timeline Visualization */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Interactive Timeline • Click any step to inspect
          </span>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            Step {current.id} of 7: {current.title}
          </span>
        </div>

        {/* Horizontal Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((s) => {
            const isSelected = s.id === activeStep;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(s.id)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-sky-50/80 border-sky-400 shadow-xs ring-2 ring-sky-400/20'
                    : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{s.icon}</span>
                  <span className={`text-[10px] font-black font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    0{s.id}
                  </span>
                </div>
                <div>
                  <div className={`font-bold text-xs leading-tight line-clamp-2 ${
                    isSelected ? 'text-sky-950 font-extrabold' : 'text-slate-700'
                  }`}>
                    {s.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Step Detail Card */}
      <div key={current.id} className="animate-fadeIn">
        <Card variant="default" padding="lg" className="border-sky-200/80 shadow-xs space-y-6 bg-gradient-to-b from-white to-sky-50/20">
          {/* Step Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl shadow-2xs">
                {current.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-sky-600 font-mono">STEP 0{current.id}</span>
                  <Badge variant="blue" size="sm">{current.tag}</Badge>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{current.title}</h3>
              </div>
            </div>

            <div className="text-right sm:text-right bg-white px-3.5 py-1.5 rounded-xl border border-sky-100 shadow-2xs self-start sm:self-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Performance Benchmark</span>
              <span className="text-sm font-extrabold text-emerald-700">{current.highlightStat}</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white/80 p-4 rounded-2xl border border-slate-100">
            {current.details}
          </div>

          {/* Inputs & Outputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Key Inputs */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold">
                  ↓
                </span>
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                  Key Inputs
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {current.inputs.map((inp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold mt-0.5">•</span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Outputs */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                  ↑
                </span>
                <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                  Key Outputs
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {current.outputs.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next / Previous Step Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
            <button
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              <span>←</span> Previous Step
            </button>
            <button
              onClick={() => setActiveStep(Math.min(7, activeStep + 1))}
              disabled={activeStep === 7}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              Next Step <span>→</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Required Bottom Flow Visualization */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-md">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block">
          Complete Closed-Loop System Architecture
        </span>
        <div className="text-lg sm:text-2xl font-black tracking-tight text-white flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">Input</span>
          <span className="text-sky-400">→</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">Analyze</span>
          <span className="text-sky-400">→</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">Design</span>
          <span className="text-sky-400">→</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">Simulate</span>
          <span className="text-sky-400">→</span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700">Compare</span>
          <span className="text-sky-400">→</span>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-900/80 border border-emerald-600 text-emerald-300">Optimize</span>
        </div>
        <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed pt-1">
          Every cycle delivers verifiable passive temperature drops, lower lifecycle embodied carbon, and compliant thermal comfort scores before physical construction begins.
        </p>
      </section>
    </div>
  );
};
