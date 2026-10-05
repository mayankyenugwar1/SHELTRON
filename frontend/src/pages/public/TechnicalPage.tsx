import React, { useState } from 'react';
import { Card, SectionHeader, Badge, Button } from '../../components/ui';
import { 
  Database, 
  CloudSun, 
  Compass, 
  Layers, 
  Cpu, 
  BarChart3, 
  GitCompare, 
  Monitor, 
  ArrowDown, 
  ArrowRight, 
  Sparkles, 
  Server, 
  Code2, 
  Box, 
  MapPin, 
  BrainCircuit, 
  HardDrive, 
  Globe2, 
  Container, 
  Cloud,
  FileSpreadsheet,
  Thermometer
} from 'lucide-react';

interface ArchitectureLayer {
  id: number;
  name: string;
  tag: string;
  color: 'sky' | 'emerald' | 'amber' | 'purple' | 'rose' | 'indigo' | 'cyan' | 'teal';
  bgGradient: string;
  borderColor: string;
  icon: React.ReactNode;
  summary: string;
  inputs: string[];
  components: string[];
  outputs: string[];
  extensibility: string;
}

interface TechStackItem {
  name: string;
  category: 'Frontend' | 'Backend' | '3D & Spatial' | 'AI & Data' | 'Infrastructure';
  categoryColor: string;
  icon: React.ReactNode;
  description: string;
  role: string;
}

export const TechnicalPage: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'architecture' | 'dataflow' | 'math'>('architecture');

  const architectureLayers: ArchitectureLayer[] = [
    {
      id: 1,
      name: "Input & Data Layer",
      tag: "Data Ingestion",
      color: "sky",
      bgGradient: "from-sky-50 to-blue-50/50",
      borderColor: "border-sky-200",
      icon: <Database className="w-5 h-5 text-sky-600" />,
      summary: "Ingests multidimensional site geometry, occupant load, budget limits, and 4 foundational climatic datasets.",
      inputs: [
        "Site dimensions (Length, Width, Ceiling Height in meters)",
        "Occupant count & metabolic rate (100W/person)",
        "Construction budget ceiling & tier (Low, Moderate, Premium)",
        "Typology (Disaster relief, rural housing, healthcare, school)"
      ],
      components: [
        "Site Requirement Parser & Validator",
        "Geocoding & Spatial Ingestion Service",
        "Material Database Loader",
        "Local Storage / State Hydrator"
      ],
      outputs: [
        "Validated SiteRequirements object",
        "Internal shelter volume & gross envelope boundary areas",
        "Target indoor comfort threshold preferences"
      ],
      extensibility: "Can connect to BIM / IFC file parsers, AutoCAD DXF floorplans, or GIS parcel databases."
    },
    {
      id: 2,
      name: "Climate Processing",
      tag: "Meteorology & Solar",
      color: "amber",
      bgGradient: "from-amber-50 to-orange-50/50",
      borderColor: "border-amber-200",
      icon: <CloudSun className="w-5 h-5 text-amber-600" />,
      summary: "Synthesizes geographic coordinates into localized microclimatic profiles, solar radiation vectors, and diurnal curves.",
      inputs: [
        "Latitude & Longitude coordinates",
        "IMD historical climatic zone datasets",
        "IPCC RCP climate risk projection toggles (+2.5°C surge)"
      ],
      components: [
        "Bioclimatic Zone Classifier (ECBC / NBC 2016 5-Zone Model)",
        "Diurnal Sinusoidal Temperature Wave Generator",
        "Sol-Air Solar Irradiance Integration Engine",
        "Prevailing Wind Vector & Monsoon Azimuth Analyzer"
      ],
      outputs: [
        "Normalized ClimateProfile (Peak/Avg T, Diurnal Swing, Humidity)",
        "Solar insolation intensity (W/m²) per surface orientation",
        "Prevailing breeze orientation & heatwave vulnerability index"
      ],
      extensibility: "Plugs into ERA5 reanalysis datasets, NASA POWER API, or EPW hourly weather files."
    },
    {
      id: 3,
      name: "Design Recommendation Engine",
      tag: "Bioclimatic Rules",
      color: "emerald",
      bgGradient: "from-emerald-50 to-teal-50/50",
      borderColor: "border-emerald-200",
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
      summary: "Calculates deterministic, rule-based architectural parameters based on Bureau of Indian Standards SP 41 guidelines.",
      inputs: [
        "Climate zone classification & solar path vector",
        "Site boundary dimensions & orientation",
        "Budget ceiling tier & shelter typology"
      ],
      components: [
        "Solar Azimuth Optimization Rule Engine",
        "Roof Geometry & Double-Skin Slope Calculator",
        "Window-to-Wall Ratio (WWR) & Chajja Overhang Sizing",
        "Stack Effect & Cross-Ventilation Path Synthesizer"
      ],
      outputs: [
        "Optimal orientation azimuth (degrees from North)",
        "Roof form, slope (deg), and overhang depth (m)",
        "Window placement coordinates & cross-ventilation aperture ratio",
        "Transparent engineering rationale for each recommendation"
      ],
      extensibility: "Can ingest complex generative building topology and multi-room bioclimatic zoning rules."
    },
    {
      id: 4,
      name: "Material & Comfort Engine",
      tag: "Thermophysical & Biophilia",
      color: "teal",
      bgGradient: "from-teal-50 to-emerald-50/50",
      borderColor: "border-teal-200",
      icon: <Layers className="w-5 h-5 text-teal-600" />,
      summary: "Evaluates multi-layer envelope assemblies, calculates composite U-values, and configures biophilic passive cooling.",
      inputs: [
        "Regional material catalog (Walls, Roof, Insulation, Glazing, Paint)",
        "User material substitutions & budget parameters",
        "Climate thermal damping demand"
      ],
      components: [
        "Multi-Layer Assembly U-Value Calculator (Fourier Conduction)",
        "Thermal Phase Lag & Decrement Damping Matrix",
        "Albedo / Solar Reflectance Index (SRI) Model",
        "Biophilic Passive Comfort Directives (Courtyards, Daylighting, Night Flushes)"
      ],
      outputs: [
        "Composite envelope thermal resistance (R_total) & U-values",
        "Embodied carbon footprint (kg CO2e)",
        "Material suitability badges (Recommended / Alternative / Not Preferred)",
        "Real-time construction cost impact delta"
      ],
      extensibility: "Upgradable with dynamic hygroscopic moisture buffering and Phase Change Material (PCM) modeling."
    },
    {
      id: 5,
      name: "Thermal Simulation Engine",
      tag: "Deterministic Physics",
      color: "purple",
      bgGradient: "from-purple-50 to-indigo-50/50",
      borderColor: "border-purple-200",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      summary: "Executes steady-periodic heat balance, sol-air surface temperatures, convective ventilation, and thermal phase lag damping.",
      inputs: [
        "Envelope U-values, surface areas, and orientations",
        "Hourly sol-air temperatures & external diurnal swing",
        "Window solar heat gain coefficient (SHGC) & shading coefficient",
        "Internal occupancy sensible heat loads (100W/person)"
      ],
      components: [
        "Sol-Air Temperature Solver (T_sol = T_out + (α·I - ε·ΔR)/h_o)",
        "Conduction Heat Balance Calculator (Q = U·A·ΔT)",
        "Convective Stack & Cross-Ventilation ACH Engine",
        "Diurnal Sinusoidal Thermal Wave Damper with Phase Lag"
      ],
      outputs: [
        "Peak and average indoor operative temperatures (°C)",
        "Sensible envelope heat gain (W) & convective heat loss (W)",
        "Estimated daily cooling energy requirement (kWh/day)",
        "24-hour hourly indoor temperature diurnal damping trajectory"
      ],
      extensibility: "Modular architecture designed for plug-and-play replacement with EnergyPlus / OpenStudio co-simulation."
    },
    {
      id: 6,
      name: "Evaluation & Analysis",
      tag: "KPIs & Spatial Hotspots",
      color: "rose",
      bgGradient: "from-rose-50 to-pink-50/50",
      borderColor: "border-rose-200",
      icon: <BarChart3 className="w-5 h-5 text-rose-600" />,
      summary: "Translates thermodynamic simulation results into standardized ASHRAE 55 comfort indices, spatial heatmaps, and financial metrics.",
      inputs: [
        "Simulated indoor operative temperature profile",
        "Material assembly costs & embodied carbon intensities",
        "Solar radiation exposure per facade"
      ],
      components: [
        "PMV / PPD Thermal Comfort Scoring Model (0-100 index)",
        "Overheating Vulnerability & Degree-Hour Risk Evaluator",
        "Spatial Hotspot Grid Estimator (9-point plan matrix)",
        "Embodied Carbon & Capital Cost Aggregator"
      ],
      outputs: [
        "Thermal Comfort Score (0-100) & Status Classification",
        "Highest / Lowest heat gain zones with spatial coordinates",
        "Baseline vs. Sheltron performance improvement deltas",
        "Comprehensive Project KPI scorecard"
      ],
      extensibility: "Can incorporate full 3D Computational Fluid Dynamics (CFD) airflow plumes and daylight illuminance lux contours."
    },
    {
      id: 7,
      name: "What-If Optimization",
      tag: "Multi-Objective Pareto",
      color: "indigo",
      bgGradient: "from-indigo-50 to-purple-50/50",
      borderColor: "border-indigo-200",
      icon: <GitCompare className="w-5 h-5 text-indigo-600" />,
      summary: "Executes rapid design iterations, multi-objective Pareto trade-off analysis, and automated candidate design ranking.",
      inputs: [
        "User design parameter adjustments (roof, wall, insulation, WWR, orientation)",
        "Multi-objective criteria: Comfort, Heat Gain, Energy, Cost, Carbon",
        "Saved design variants (A, B, C, D)"
      ],
      components: [
        "Parametric Mutation & Variation Pipeline",
        "5-Objective Pareto Fitness Function Evaluator",
        "Design Variant Delta Comparator (Before vs. After)",
        "Automated 'Recommended Balanced Design' Selector"
      ],
      outputs: [
        "Real-time comparative performance deltas across 6 metrics",
        "Variant rank score matrix (Thermal, Cost, Sustainability)",
        "Multi-axis 5-dimension radar chart dataset",
        "Optimal compromise design configuration"
      ],
      extensibility: "Multi-objective Pareto heuristic solver for real-time trade-off evaluation between comfort, cost, and carbon."
    },
    {
      id: 8,
      name: "Visualization & Decision Layer",
      tag: "Interactive Digital Twin",
      color: "cyan",
      bgGradient: "from-cyan-50 to-sky-50/50",
      borderColor: "border-cyan-200",
      icon: <Monitor className="w-5 h-5 text-cyan-600" />,
      summary: "Delivers presentation-grade 3D WebGL models, top-view heatmaps, comparative charts, and automated engineering reports.",
      inputs: [
        "Optimized shelter geometry & material texture bindings",
        "Spatial thermal hotspot grid & 24-hr temperature series",
        "Variant comparison scores & engineering rationales"
      ],
      components: [
        "Three.js / React Three Fiber WebGL Shelter Canvas",
        "2D Spatial Plan Heatmap Renderer with 4-Tier Color Legend",
        "Recharts Interactive Diurnal Wave & Radar Graphs",
        "Client-side jsPDF Engineering Report Generator"
      ],
      outputs: [
        "Orbit/zoom 3D shelter model with material annotations",
        "2D technical floor plan toggle with aperture dimensions",
        "Interactive Before vs. After comparison sliders",
        "SIH-grade downloadable PDF design documentation"
      ],
      extensibility: "WebXR / VR walkthroughs, glTF CAD export, and 3D IFC model downloads."
    }
  ];

  const techStack: TechStackItem[] = [
    {
      name: "React 19",
      category: "Frontend",
      categoryColor: "bg-sky-100 text-sky-800 border-sky-200",
      icon: <Code2 className="w-5 h-5 text-sky-600" />,
      role: "Component Architecture & State Engine",
      description: "Drives reactive rendering, context providers, and instant UI updates across the entire shelter design workflow."
    },
    {
      name: "TypeScript",
      category: "Frontend",
      categoryColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Code2 className="w-5 h-5 text-blue-600" />,
      role: "Type-Safe Domain Modeling",
      description: "Guarantees compile-time validation for shelter parameters, simulation outputs, and API response contracts."
    },
    {
      name: "Tailwind CSS v4",
      category: "Frontend",
      categoryColor: "bg-teal-100 text-teal-800 border-teal-200",
      icon: <Layers className="w-5 h-5 text-teal-600" />,
      role: "Design System & Responsive Layout",
      description: "Implements SHELTRON's clean pastel aesthetic, rounded cards, subtle shadows, and responsive UI components."
    },
    {
      name: "Python 3.12",
      category: "Backend",
      categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <Server className="w-5 h-5 text-emerald-600" />,
      role: "Scientific Computing & Simulation",
      description: "Executes thermodynamic differential models, Fourier heat balance, and multi-objective optimization algorithms."
    },
    {
      name: "FastAPI",
      category: "Backend",
      categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <Server className="w-5 h-5 text-emerald-600" />,
      role: "High-Performance REST API",
      description: "Asynchronous microservice layer serving climate analytics, simulation runs, and design recommendations with OpenAPI documentation."
    },
    {
      name: "Three.js & R3F",
      category: "3D & Spatial",
      categoryColor: "bg-purple-100 text-purple-800 border-purple-200",
      icon: <Box className="w-5 h-5 text-purple-600" />,
      role: "Interactive 3D Digital Twin",
      description: "Renders real-time parameterized 3D shelter models, solar orientation lighting, overhang shading, and material textures."
    },
    {
      name: "Leaflet",
      category: "3D & Spatial",
      categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <MapPin className="w-5 h-5 text-amber-600" />,
      role: "Geospatial & Bioclimatic Mapping",
      description: "Interactive location selection, coordinates reverse-geocoding, and climate zone boundary visualization."
    },
    {
      name: "Rule-Based Bioclimatic Engine",
      category: "AI & Data",
      categoryColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: <BrainCircuit className="w-5 h-5 text-emerald-600" />,
      role: "Deterministic Design & Comfort Logic",
      description: "Calculates optimal cardinal orientation, overhang dimensions, envelope U-values, and passive ventilation rules based on SP 41 and NBC 2016."
    },
    {
      name: "PostgreSQL",
      category: "AI & Data",
      categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: <HardDrive className="w-5 h-5 text-indigo-600" />,
      role: "Relational Project & Material Store",
      description: "Stores user shelter designs, historical simulation variants, regional construction cost tables, and material catalogs."
    },
    {
      name: "PostGIS",
      category: "AI & Data",
      categoryColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
      icon: <Globe2 className="w-5 h-5 text-indigo-600" />,
      role: "Spatial Geospatial Database",
      description: "Executes spatial indexing for meteorological rasters, elevation topography, and regional solar insolation boundaries."
    },
    {
      name: "Docker",
      category: "Infrastructure",
      categoryColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
      icon: <Container className="w-5 h-5 text-cyan-600" />,
      role: "Containerized Microservices",
      description: "Packages backend simulation engines, API services, and frontend assets into reproducible, isolated production containers."
    },
    {
      name: "AWS",
      category: "Infrastructure",
      categoryColor: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Cloud className="w-5 h-5 text-amber-600" />,
      role: "Cloud Infrastructure & CDN",
      description: "Scalable hosting on AWS ECS / Fargate with S3 report storage, CloudFront edge caching, and Route 53 DNS routing."
    }
  ];

  const dataSources = [
    {
      title: "Climate Data",
      badge: "Meteorological Normals",
      color: "sky",
      icon: <CloudSun className="w-5 h-5 text-sky-600" />,
      items: [
        "IMD (India Meteorological Department) 30-year climate baselines",
        "National Building Code 2016 5 distinct bioclimatic zones",
        "Solar radiation maps: Global Horizontal & Direct Normal Irradiance",
        "IPCC AR6 temperature rise and extreme heatwave surge scenarios"
      ],
      usage: "Drives bioclimatic recommendations, solar gain loads, and cooling degree-day baselines."
    },
    {
      title: "Weather Data",
      badge: "Hourly & Seasonal",
      color: "emerald",
      icon: <Thermometer className="w-5 h-5 text-emerald-600" />,
      items: [
        "Dry-bulb ambient temperature ranges & peak summer maximums",
        "Diurnal temperature range (ΔT diurnal swing in °C)",
        "Relative humidity percentages & wet-bulb comfort limits",
        "Prevailing wind velocities & seasonal monsoon azimuth vectors"
      ],
      usage: "Powers the 24-hour diurnal sinusoidal ambient wave and natural cross-ventilation ACH."
    },
    {
      title: "Geospatial Data",
      badge: "Coordinates & Terrain",
      color: "purple",
      icon: <MapPin className="w-5 h-5 text-purple-600" />,
      items: [
        "Latitude & Longitude decimal coordinates via Leaflet geocoder",
        "Elevation above sea level for air density & barometric correction",
        "Solar azimuth & solar altitude angle calculations per hour",
        "Urban heat island (UHI) density factors and vegetative shading"
      ],
      usage: "Calculates precise sun angles for Chajja window overhangs and shelter orientation azimuth."
    },
    {
      title: "Material Data",
      badge: "Thermophysics & LCA",
      color: "amber",
      icon: <FileSpreadsheet className="w-5 h-5 text-amber-600" />,
      items: [
        "Thermal conductivity (k in W/m·K), density (ρ), and specific heat (Cp)",
        "Composite U-values & R-values across wall and roof assemblies",
        "Solar Reflectance Index (SRI) & thermal emittance for paints and tiles",
        "Embodied carbon footprint (kg CO2e/m²) & regional construction cost tiers"
      ],
      usage: "Enables multi-layer envelope conduction solving, thermal lag damping, and cost budgeting."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="space-y-4">
        <SectionHeader
          title="SHELTRON Technical Architecture"
          subtitle="A modular, physics-driven engineering pipeline translating climatic and geospatial data into high-performance shelter designs."
          tag="System Architecture & Data Flow"
        />

        {/* Required Extensibility Callout Note */}
        <div className="p-4 sm:p-5 bg-sky-50/80 border border-sky-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-xs">
          <div className="p-2.5 bg-sky-600 text-white rounded-xl shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-sky-950 block sm:inline mr-1">
              Modular Architectural Design:
            </span>
            <span>
              "The prototype uses modular simulation and recommendation components that can be upgraded to higher-fidelity thermal engines."
            </span>
            <span className="text-slate-500 block sm:inline sm:ml-1 mt-1 sm:mt-0 text-xs">
              (Designed with standardized REST interfaces ready to plug into EnergyPlus, OpenStudio, Radiance, or OpenFOAM CFD).
            </span>
          </div>
          <div className="shrink-0">
            <Badge variant="blue" size="sm" className="bg-white/80 text-sky-800 border-sky-300 font-mono">
              Version 1.0.0 Pro
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'architecture'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          8-Layer Architectural Pipeline
        </button>
        <button
          onClick={() => setActiveTab('dataflow')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'dataflow'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Module Data Flow & Contracts
        </button>
        <button
          onClick={() => setActiveTab('math')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'math'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Physics Math & Governing Equations
        </button>
      </div>

      {/* TAB 1: 8-LAYER ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8-layer visual stack */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  SHELTRON Modular Execution Pipeline
                </span>
                <span className="text-xs text-slate-400">Click any layer to inspect</span>
              </div>

              <div className="space-y-2.5">
                {architectureLayers.map((layer, idx) => {
                  const isSelected = selectedLayer === layer.id;
                  return (
                    <div key={layer.id} className="relative">
                      {/* Connector Arrow between layers */}
                      {idx > 0 && (
                        <div className="flex justify-center -my-1 relative z-10">
                          <div className="w-5 h-3 bg-white border-x border-slate-200 flex items-center justify-center">
                            <ArrowDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </div>
                      )}

                      <div
                        onClick={() => setSelectedLayer(layer.id)}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? `bg-white ${layer.borderColor} ring-2 ring-sky-400/30 shadow-md`
                            : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                              isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                            }`}>
                              0{layer.id}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                                  {layer.name}
                                </h3>
                                <Badge variant="neutral" size="sm" className="hidden sm:inline-flex text-[10px] py-0 px-2">
                                  {layer.tag}
                                </Badge>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {layer.summary}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-600 group-hover:bg-slate-100">
                              {layer.icon}
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-600 translate-x-0.5' : 'text-slate-300'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Layer Inspector Panel */}
            <div className="lg:col-span-5 sticky top-24">
              {(() => {
                const current = architectureLayers.find(l => l.id === selectedLayer) || architectureLayers[0];
                return (
                  <Card variant="elevated" padding="lg" className="border border-sky-100 space-y-6 bg-white/95 shadow-md">
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="blue" size="sm" className="font-mono">
                            Layer {current.id} of 8
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            {current.tag}
                          </Badge>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mt-2">
                          {current.name}
                        </h2>
                      </div>
                      <div className="p-2.5 bg-sky-50 text-sky-700 rounded-xl">
                        {current.icon}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {current.summary}
                    </p>

                    {/* Sub-components */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Active Sub-Services & Modules
                      </div>
                      <div className="space-y-1.5">
                        {current.components.map((comp, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700 p-2 bg-slate-50 rounded-lg border border-slate-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                            <span className="font-mono text-[11px] text-slate-900">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Inputs & Outputs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 font-mono">
                          Primary Inputs
                        </div>
                        <ul className="space-y-1">
                          {current.inputs.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                              <span className="text-amber-500 font-bold">•</span>
                              <span className="line-clamp-2">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1.5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                          Computed Outputs
                        </div>
                        <ul className="space-y-1">
                          {current.outputs.slice(0, 3).map((item, i) => (
                            <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">✓</span>
                              <span className="line-clamp-2">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Upgradable Extensibility */}
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        Production Extensibility Path
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {current.extensibility}
                      </p>
                    </div>
                  </Card>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DATA FLOW & MODULE BUS */}
      {activeTab === 'dataflow' && (
        <div className="space-y-8">
          <div className="p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-lg border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Module Inter-Process Communication
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Closed-Loop Bioclimatic Data Bus
                </h3>
              </div>
              <Badge variant="neutral" size="sm" className="bg-slate-800 text-emerald-400 border-slate-700 font-mono">
                Pydantic v2 Serialization
              </Badge>
            </div>

            {/* Visual SVG Data Flow Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-sky-400">STAGE 1</span>
                  <Database className="w-4 h-4 text-sky-400" />
                </div>
                <div className="font-semibold text-white text-sm">Site & Climate Ingestion</div>
                <div className="text-xs text-slate-400 space-y-1 font-mono">
                  <div>→ SiteRequirements</div>
                  <div>→ ClimateProfile</div>
                  <div>→ GeoJSON Coordinates</div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400">STAGE 2</span>
                  <Compass className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="font-semibold text-white text-sm">Bioclimatic Synthesis</div>
                <div className="text-xs text-slate-400 space-y-1 font-mono">
                  <div>→ DesignRecommendations</div>
                  <div>→ MaterialAssemblies (U-vals)</div>
                  <div>→ Solar Azimuth & Overhang</div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-purple-400">STAGE 3</span>
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <div className="font-semibold text-white text-sm">Thermodynamic Simulation</div>
                <div className="text-xs text-slate-400 space-y-1 font-mono">
                  <div>→ Fourier Heat Balance</div>
                  <div>→ 24hr Diurnal Wave Array</div>
                  <div>→ 9-Point Hotspot Matrix</div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-amber-400">STAGE 4</span>
                  <Monitor className="w-4 h-4 text-amber-400" />
                </div>
                <div className="font-semibold text-white text-sm">What-If & Presentation</div>
                <div className="text-xs text-slate-400 space-y-1 font-mono">
                  <div>→ Pareto Multi-Obj Weights</div>
                  <div>→ Three.js WebGL Meshes</div>
                  <div>→ Client-Side PDF Report</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 leading-relaxed">
              <span className="text-sky-400 font-bold">Feedback Loop Contract: </span>
              Modifying any parameter in the What-If Engine emits a delta event triggering a synchronous re-computation of Layer 5 (Thermal Simulation) without incurring a full database re-fetch, guaranteeing sub-50ms reactive UI performance.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PHYSICS MATH & GOVERNING EQUATIONS */}
      {activeTab === 'math' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" padding="lg" className="space-y-3 font-mono text-xs border border-slate-200">
              <div className="font-bold text-sky-700 uppercase tracking-wider font-sans text-sm flex items-center justify-between">
                <span>1. Sol-Air Temperature Formulation</span>
                <Badge variant="blue" size="sm" className="font-mono text-[10px]">ASHRAE Fundamentals</Badge>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl leading-relaxed">
                <code>T_sol = T_out + (α · I / h_o) - (ε · ΔR / h_o)</code>
              </div>
              <p className="text-slate-600 font-sans leading-relaxed text-xs">
                Where <code>α</code> is surface absorptance (1 - Albedo), <code>I</code> is global horizontal irradiance (W/m²), <code>h_o</code> is outer convection coefficient (17.0 W/m²K), and <code>ε·ΔR</code> is long-wave thermal radiation exchange with the clear sky.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3 font-mono text-xs border border-slate-200">
              <div className="font-bold text-emerald-700 uppercase tracking-wider font-sans text-sm flex items-center justify-between">
                <span>2. Multi-Layer Envelope Conduction</span>
                <Badge variant="green" size="sm" className="font-mono text-[10px]">Fourier Law</Badge>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl leading-relaxed">
                <code>Q_envelope = ∑ [ U_i · A_i · (T_sol_i - T_indoor) ]</code>
              </div>
              <p className="text-slate-600 font-sans leading-relaxed text-xs">
                Calculates steady-periodic heat transfer across walls, double-skin terracotta roofs, and glazing where composite thermal resistance is derived from material layer thicknesses and thermal conductivities: <code>R_total = ∑ (d_j / k_j)</code>.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3 font-mono text-xs border border-slate-200">
              <div className="font-bold text-purple-700 uppercase tracking-wider font-sans text-sm flex items-center justify-between">
                <span>3. Diurnal Thermal Phase Lag Damping</span>
                <Badge variant="purple" size="sm" className="font-mono text-[10px]">Mackey & Wright</Badge>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl leading-relaxed">
                <code>T(t) = T_avg + (ΔT_diurnal / 2) · µ · sin((t - φ - 8) · π / 12)</code>
              </div>
              <p className="text-slate-600 font-sans leading-relaxed text-xs">
                Where <code>µ</code> is the decrement factor (thermal damping ratio: 0.28 for high-mass earth blocks) and <code>φ</code> is thermal phase lag in hours, shifting peak indoor thermal arrival away from extreme afternoon outdoor heatwaves.
              </p>
            </Card>

            <Card variant="default" padding="lg" className="space-y-3 font-mono text-xs border border-slate-200">
              <div className="font-bold text-amber-700 uppercase tracking-wider font-sans text-sm flex items-center justify-between">
                <span>4. Convective Air Exchange & Stack Effect</span>
                <Badge variant="amber" size="sm" className="font-mono text-[10px]">Airflow Network</Badge>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl leading-relaxed">
                <code>Q_vent = 0.33 · ACH · Volume · (T_indoor - T_outdoor)</code>
              </div>
              <p className="text-slate-600 font-sans leading-relaxed text-xs">
                Quantifies convective heat removal via natural cross-ventilation and buoyancy stack effect through clerestory louvers, converting wind velocity and aperture area into air changes per hour (ACH).
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* 4 CORE DATA FOUNDATION CARDS */}
      <div className="space-y-6 pt-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Foundation Feeds
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            4 Core Ingested Data Streams
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Deterministic models require structured meteorological, spatial, and material parameters rather than speculative assumptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dataSources.map((source, i) => (
            <Card key={i} variant="default" padding="md" className="space-y-3 border border-slate-200 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-slate-50">
                  {source.icon}
                </div>
                <Badge variant="neutral" size="sm" className="text-[10px] font-mono">
                  {source.badge}
                </Badge>
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                {source.title}
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {source.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-sky-500 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                {source.usage}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 12 TECHNICAL STACK CARDS */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Production Technologies
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Engineered Technology Stack
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Built on battle-tested open-source libraries across frontend presentation, scientific computing, and spatial databases.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-600 font-medium">12 Integrated Technologies</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {techStack.map((tech, idx) => (
            <Card
              key={idx}
              variant="default"
              padding="md"
              className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group bg-white"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors">
                  {tech.icon}
                </div>
                <Badge variant="neutral" size="sm" className={`text-[10px] font-mono border ${tech.categoryColor}`}>
                  {tech.category}
                </Badge>
              </div>

              <div className="mt-3 space-y-1">
                <h4 className="font-bold text-slate-900 text-base">
                  {tech.name}
                </h4>
                <div className="text-[11px] font-mono font-semibold text-sky-700">
                  {tech.role}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {tech.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* BOTTOM ACTION / EXPLORE */}
      <div className="p-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
            Open & Deterministic
          </span>
          <h3 className="text-2xl font-bold">
            Experience the Engine in Action
          </h3>
          <p className="text-sm text-slate-400 max-w-xl">
            Run the 8-layer pipeline on a custom shelter site or explore real-time What-If sensitivity analysis.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="md"
            className="border-slate-700 text-slate-200 hover:bg-slate-800"
            onClick={() => window.location.href = '/research'}
          >
            Research Citations
          </Button>
          <Button
            variant="primary"
            size="md"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
            onClick={() => window.location.href = '/app/simulation'}
          >
            Launch Simulation Engine
          </Button>
        </div>
      </div>
    </div>
  );
};
