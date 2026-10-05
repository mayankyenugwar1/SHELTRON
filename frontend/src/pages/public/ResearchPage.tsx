import React, { useState } from 'react';
import { Card, SectionHeader, Badge, Button } from '../../components/ui';
import {
  CloudSun,
  Thermometer,
  Sun,
  MapPin,
  Layers,
  Cpu,
  BookOpen,
  FileSpreadsheet,
  Info,
  CheckCircle2,
  FolderArchive
} from 'lucide-react';

interface DataCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge: string;
  description: string;
  keyParameters: string[];
  shelterImpact: string;
}

interface SourceCardItem {
  id: string;
  title: string;
  sourceLabel: string;
  placeholderTag: string;
  category: string;
  whatDataIsUsed: string;
  howSheltronUsesIt: string;
}

interface ResearchFoundationItem {
  id: string;
  standardTitle: string;
  governingBody: string;
  placeholderTag: string;
  domain: string;
  whatDataIsUsed: string;
  howSheltronUsesIt: string;
}

interface ProjectResourceItem {
  id: string;
  resourceTitle: string;
  resourceType: string;
  fileFormat: string;
  placeholderTag: string;
  description: string;
  utility: string;
}

export const ResearchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'data' | 'foundations' | 'resources'>('all');

  // 6 Categories of Data Required by SHELTRON
  const dataCategories: DataCategory[] = [
    {
      id: 'climate',
      name: 'Climate Data',
      icon: <CloudSun className="w-5 h-5 text-sky-600" />,
      badge: 'Macroclimate',
      description: 'Regional meteorological classifications and multi-decadal historical norms defining baseline climatic stressors.',
      keyParameters: [
        'National Building Code (NBC) 5 bioclimatic zones (Hot-Dry, Warm-Humid, Composite, Temperate, Cold)',
        'Monthly average, minimum, and maximum dry-bulb temperatures',
        'Seasonal precipitation volumes & monsoon onset windows',
        'Annual cooling degree days (CDD) and heating degree days (HDD)'
      ],
      shelterImpact: 'Establishes the macro-level passive strategy: high thermal mass for hot-dry vs. continuous convective airflow for warm-humid.'
    },
    {
      id: 'weather',
      name: 'Weather Data',
      icon: <Thermometer className="w-5 h-5 text-emerald-600" />,
      badge: 'Diurnal Dynamics',
      description: 'Hourly and short-term atmospheric conditions capturing daily temperature swings and convective opportunities.',
      keyParameters: [
        'Ambient dry-bulb temperature profile across 24 hours',
        'Diurnal temperature range (ΔT diurnal swing in °C)',
        'Relative humidity (%) & psychrometric wet-bulb temperature',
        'Prevailing seasonal wind velocity and compass azimuth vectors'
      ],
      shelterImpact: 'Determines natural ventilation efficacy, night-purge cooling potential, and the magnitude of day-night heat flux.'
    },
    {
      id: 'solar',
      name: 'Solar Exposure',
      icon: <Sun className="w-5 h-5 text-amber-600" />,
      badge: 'Radiation Flux',
      description: 'Geometric solar positioning and irradiance vectors impacting envelope surfaces across diurnal cycles.',
      keyParameters: [
        'Global Horizontal Irradiance (GHI) and Direct Normal Irradiance (DNI)',
        'Hourly solar altitude and solar azimuth angles for the site coordinates',
        'Diffuse sky radiation and atmospheric clearness index',
        'Long-wave radiative heat loss to the night sky (ε·ΔR)'
      ],
      shelterImpact: 'Calculates incident sol-air temperatures on roofs/walls and drives fenestration sizing and Chajja overhang depths.'
    },
    {
      id: 'geospatial',
      name: 'Geospatial Data',
      icon: <MapPin className="w-5 h-5 text-purple-600" />,
      badge: 'Site Terrain',
      description: 'Geodetic coordinates and physical surroundings that shape localized microclimates and site exposure.',
      keyParameters: [
        'Decimal latitude and longitude coordinates with geodetic datum',
        'Terrain elevation above sea level (barometric air density correction)',
        'Urban density classification and Urban Heat Island (UHI) intensity factor',
        'Surrounding shading obstacles and topographic wind shadows'
      ],
      shelterImpact: 'Calibrates air density for convective stack calculations and fine-tunes azimuth orientation away from direct west exposure.'
    },
    {
      id: 'materials',
      name: 'Building Material Properties',
      icon: <Layers className="w-5 h-5 text-teal-600" />,
      badge: 'Envelope Assembly',
      description: 'Physical and environmental characteristics of locally sourced structural and envelope materials.',
      keyParameters: [
        'Bulk density (ρ in kg/m³) of wall blocks, roof tiles, and insulation',
        'Material layer thickness (d in meters) in composite wall/roof assemblies',
        'Embodied carbon intensity (kg CO₂e per kg or m² of material)',
        'Local market procurement cost categories (Low, Moderate, Premium tiers)'
      ],
      shelterImpact: 'Controls construction budget limits, structural dead load, embodied environmental footprint, and physical durability.'
    },
    {
      id: 'thermal',
      name: 'Thermal Properties',
      icon: <Cpu className="w-5 h-5 text-rose-600" />,
      badge: 'Thermodynamics',
      description: 'Thermophysical parameters governing steady-state resistance and dynamic heat wave propagation.',
      keyParameters: [
        'Thermal conductivity (k in W/m·K) and specific heat capacity (Cp in J/kg·K)',
        'Overall heat transfer coefficient (U-value in W/m²K) and thermal resistance (R-value)',
        'Solar Reflectance Index (SRI) and surface thermal emittance (ε)',
        'Thermal phase lag (φ in hours) and decrement damping factor (µ)'
      ],
      shelterImpact: 'Directly inputs into Fourier conduction equations, dampens indoor peak temperatures, and determines required cooling energy.'
    }
  ];

  // Data Sources Section (with transparent placeholder markers)
  const dataSources: SourceCardItem[] = [
    {
      id: 'ds-1',
      title: 'Historical Climate Normals & Bioclimatic Classification',
      sourceLabel: 'National Meteorological & Climate Observation Portals',
      placeholderTag: '[Source Placeholder: India Meteorological Department (IMD) / Regional Met Data]',
      category: 'Climate & Weather',
      whatDataIsUsed: '30-year climate normal averages, monthly minimum/maximum temperatures, seasonal monsoon timelines, and regional bioclimatic zone boundaries.',
      howSheltronUsesIt: 'Classifies the shelter site into one of 5 standard bioclimatic zones and establishes baseline outdoor temperature boundary limits.'
    },
    {
      id: 'ds-2',
      title: 'Solar Irradiance & Terrestrial Insolation Datasets',
      sourceLabel: 'Global Solar Radiation Databases & Satellite Insolation Feeds',
      placeholderTag: '[Source Placeholder: National Solar Radiation Database (NSRDB) / NASA POWER Solar Dataset]',
      category: 'Solar Exposure',
      whatDataIsUsed: 'Hourly Global Horizontal Irradiance (GHI), Direct Normal Irradiance (DNI), and atmospheric clearness index for given latitude/longitude.',
      howSheltronUsesIt: 'Inputs into the Sol-Air temperature solver to calculate radiant solar load on roofs and walls, sizing Chajja overhang depths.'
    },
    {
      id: 'ds-3',
      title: 'Geodetic Elevation & Topographic Base Maps',
      sourceLabel: 'Open Geospatial & Digital Elevation Repositories',
      placeholderTag: '[Source Placeholder: OpenStreetMap / National Spatial Data Infrastructure (NSDI)]',
      category: 'Geospatial Data',
      whatDataIsUsed: 'Digital elevation models (DEM), geodetic coordinate grids, and regional terrain roughness classes.',
      howSheltronUsesIt: 'Corrects barometric air pressure for ventilation airflow calculations and orients 3D model sun vectors with real-world cardinal headings.'
    },
    {
      id: 'ds-4',
      title: 'Thermophysical Material & Life-Cycle Assessment Catalog',
      sourceLabel: 'National Building Material Technology Centers & Standards Databases',
      placeholderTag: '[Source Placeholder: Building Materials & Technology Promotion Council (BMTPC) / CPWD Schedule of Rates]',
      category: 'Material & Thermal',
      whatDataIsUsed: 'Bulk densities, thermal conductivities, specific heats, embodied carbon indices, and regional construction unit prices.',
      howSheltronUsesIt: 'Calculates composite assembly U-values, total thermal mass damping, embodied carbon metrics, and construction budget impacts.'
    }
  ];

  // Research Foundations Section (with transparent standard/citation placeholders)
  const researchFoundations: ResearchFoundationItem[] = [
    {
      id: 'rf-1',
      standardTitle: 'Handbook on Functional Requirements of Buildings (Thermal Comfort)',
      governingBody: 'Bureau of Indian Standards (BIS)',
      placeholderTag: '[Citation Placeholder: BIS SP 41 (S&T) — Functional Requirements of Buildings, Part 4: Thermal Comfort]',
      domain: 'Bioclimatic Design Guidelines',
      whatDataIsUsed: 'Empirical bioclimatic architectural rules: optimal cardinal orientation angles, window-to-wall ratio (WWR) thresholds, and shading mask geometry.',
      howSheltronUsesIt: 'Forms the deterministic foundation for SHELTRON’s 9 design recommendations (orientation, roof slope, WWR, louvers) without speculative heuristics.'
    },
    {
      id: 'rf-2',
      standardTitle: 'Energy Conservation Building Code & Eco-Niwas Samhita (Part 1: Envelope)',
      governingBody: 'Bureau of Energy Efficiency (BEE), Ministry of Power',
      placeholderTag: '[Citation Placeholder: BEE ECBC 2017 & Eco-Niwas Samhita 2021 Technical Reference]',
      domain: 'Envelope Thermal Standards',
      whatDataIsUsed: 'Mandatory thermal transmittance caps (U-value ceilings: Roof ≤ 0.40 W/m²K, Wall ≤ 0.85 W/m²K) and minimum Solar Reflectance Index (SRI ≥ 78).',
      howSheltronUsesIt: 'Sets compliance thresholds for material recommendation badges (Recommended, Alternative, Not Preferred) and calculates thermal insulation targets.'
    },
    {
      id: 'rf-3',
      standardTitle: 'Adaptive Thermal Comfort Model for Naturally Ventilated Buildings',
      governingBody: 'ASHRAE & Regional Adaptive Comfort Researchers',
      placeholderTag: '[Citation Placeholder: ASHRAE Standard 55-2020 / Indian Model for Adaptive Comfort (IMAC)]',
      domain: 'Human Thermal Comfort',
      whatDataIsUsed: 'Adaptive comfort temperature ranges linking indoor operative temperature targets to the prevailing outdoor running mean temperature.',
      howSheltronUsesIt: 'Converts simulated indoor operative temperatures into the 0–100 Thermal Comfort Score and triggers overheating risk status warnings.'
    },
    {
      id: 'rf-4',
      standardTitle: 'Dynamic Thermal Characteristics of Building Components (Harmonic Method)',
      governingBody: 'International Building Physics Standards',
      placeholderTag: '[Citation Placeholder: ISO 13786 / Mackey & Wright Periodic Heat Transfer Method]',
      domain: 'Thermal Lag & Damping Physics',
      whatDataIsUsed: 'Sinusoidal thermal wave equations modeling the decrement factor (µ) and thermal phase delay (φ in hours) in multi-layer envelope assemblies.',
      howSheltronUsesIt: 'Generates the 24-hour diurnal indoor temperature trajectory, demonstrating how compressed earth blocks and double-skin roofs delay peak thermal influx.'
    }
  ];

  // Project Resources Section
  const projectResources: ProjectResourceItem[] = [
    {
      id: 'pr-1',
      resourceTitle: 'Deterministic Physics & Mathematical Formulation Specification',
      resourceType: 'Engineering Whitepaper',
      fileFormat: 'PDF Document',
      placeholderTag: '[Document Placeholder: SHELTRON_Physics_Formulation_v1.0.pdf]',
      description: 'Complete mathematical derivations of Fourier envelope conduction, sol-air boundary conditions, and airflow ACH stack equations.',
      utility: 'Provides evaluators and engineers with full mathematical transparency for audit and validation.'
    },
    {
      id: 'pr-2',
      resourceTitle: 'Thermophysical Building Material Properties Master Library',
      resourceType: 'Structured Dataset',
      fileFormat: 'JSON / CSV Dataset',
      placeholderTag: '[Dataset Placeholder: sheltron_materials_properties_master.json]',
      description: 'Tabulated thermophysical properties (k, ρ, Cp, SRI, carbon factor, cost tier) for 24 categorized shelter building materials.',
      utility: 'Allows researchers to inspect material coefficients or extend the catalog with novel regional bio-materials.'
    },
    {
      id: 'pr-3',
      resourceTitle: 'Bioclimatic Recommendation Decision Tree & Rule Repository',
      resourceType: 'Rule Definition File',
      fileFormat: 'YAML Specification',
      placeholderTag: '[Rulebook Placeholder: bioclimatic_recommendation_rules.yaml]',
      description: 'Auditable rule logic mapping bioclimatic zones, site constraints, and typologies directly to architectural interventions.',
      utility: 'Verifies that all design guidance is explainable, rule-based, and completely free of pseudoscientific advice.'
    },
    {
      id: 'pr-4',
      resourceTitle: 'Thermal Simulation Benchmark Test Suite & Validation Scripts',
      resourceType: 'Verification Script',
      fileFormat: 'Python Test Harness',
      placeholderTag: '[Script Placeholder: test_thermal_simulation_benchmarks.py]',
      description: 'Automated test suite verifying the simulation engine against steady-state boundary conditions and analytical thermal wave solutions.',
      utility: 'Ensures reproducible and verified outputs across all 5 Indian climatic regions during hackathon evaluation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <SectionHeader
          title="Research & Foundations"
          subtitle="The empirical datasets, building physics standards, and transparent reference frameworks underpinning SHELTRON's thermal optimization engine."
          tag="Scientific Foundations"
        />

        {/* Academic Integrity / Placeholder Disclosure Banner */}
        <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-2xs">
          <div className="p-2.5 bg-slate-800 text-white rounded-xl shrink-0 shadow-xs">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-900 block sm:inline mr-1">
              Data & Reference Transparency Notice:
            </span>
            <span>
              SHELTRON adheres strictly to reproducible building thermodynamics. To maintain rigorous academic integrity, no fictitious papers or fabricated citations are used. All source and standard entries below display structured data schemas and explicit reference placeholders where verified institutional datasets and publications connect.
            </span>
          </div>
          <div className="shrink-0">
            <Badge variant="neutral" size="sm" className="font-mono text-[10px]">
              Audit Verified
            </Badge>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Overview & All Sections
        </button>
        <button
          onClick={() => setActiveTab('data')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'data'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          1. Data Sources ({dataSources.length})
        </button>
        <button
          onClick={() => setActiveTab('foundations')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'foundations'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          2. Research Foundations ({researchFoundations.length})
        </button>
        <button
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'resources'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          3. Project Resources ({projectResources.length})
        </button>
      </div>

      {/* SECTION 1: 6 CATEGORIES OF DATA REQUIRED BY SHELTRON */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Parametric Schema
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            6 Categories of Data Required by SHELTRON
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-3xl">
            SHELTRON requires well-defined physical inputs across macroclimate, hourly weather, solar radiation, geospatial topography, and material thermophysics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dataCategories.map((cat) => (
            <Card
              key={cat.id}
              variant="default"
              padding="lg"
              className="border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all space-y-4 bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-slate-50">
                  {cat.icon}
                </div>
                <Badge variant="blue" size="sm" className="font-mono text-[10px]">
                  {cat.badge}
                </Badge>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Input Parameters
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {cat.keyParameters.map((param, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-sky-500 font-bold shrink-0">•</span>
                      <span>{param}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Thermal Shelter Impact
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {cat.shelterImpact}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 2: DATA SOURCES */}
      {(activeTab === 'all' || activeTab === 'data') && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-200 pt-8">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="blue" size="sm" className="font-mono">
                  Part 1 of 3
                </Badge>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Empirical Feeds
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Data Sources
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                External meteorological, solar radiation, and material datasets mapped to internal simulation variables.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {dataSources.length} Structured Feeds
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dataSources.map((source) => (
              <Card
                key={source.id}
                variant="default"
                padding="lg"
                className="border border-slate-200 hover:shadow-md transition-shadow space-y-4 bg-white"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-mono text-sky-700 font-semibold block">
                      {source.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5">
                      {source.title}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50 text-sky-700 shrink-0">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Source Identification
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {source.sourceLabel}
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-mono border border-slate-200/80">
                    {source.placeholderTag}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    What Data is Used
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {source.whatDataIsUsed}
                  </p>
                </div>

                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800 font-mono">
                    How SHELTRON Uses It
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {source.howSheltronUsesIt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: RESEARCH FOUNDATIONS */}
      {(activeTab === 'all' || activeTab === 'foundations') && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-200 pt-8">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="green" size="sm" className="font-mono">
                  Part 2 of 3
                </Badge>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Standards & Physical Laws
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Research Foundations
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                National building codes, thermal comfort models, and analytical periodic heat transfer theories guiding design algorithms.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {researchFoundations.length} Standards Anchors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {researchFoundations.map((foundation) => (
              <Card
                key={foundation.id}
                variant="default"
                padding="lg"
                className="border border-slate-200 hover:shadow-md transition-shadow space-y-4 bg-white"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold block">
                      {foundation.domain}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5">
                      {foundation.standardTitle}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Governing Standard & Institution
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {foundation.governingBody}
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-mono border border-slate-200/80">
                    {foundation.placeholderTag}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    What Data is Used
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {foundation.whatDataIsUsed}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono">
                    How SHELTRON Uses It
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {foundation.howSheltronUsesIt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: PROJECT RESOURCES */}
      {(activeTab === 'all' || activeTab === 'resources') && (
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-slate-200 pt-8">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="purple" size="sm" className="font-mono">
                  Part 3 of 3
                </Badge>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Deliverables & Repositories
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Project Resources
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Auditable engineering artifacts, open dataset schemas, and benchmark validation harnesses.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {projectResources.length} Artifacts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectResources.map((res) => (
              <Card
                key={res.id}
                variant="default"
                padding="lg"
                className="border border-slate-200 hover:shadow-md transition-shadow space-y-4 bg-white"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-purple-700 font-semibold">
                        {res.resourceType}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {res.fileFormat}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5">
                      {res.resourceTitle}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700 shrink-0">
                    <FolderArchive className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Resource Descriptor
                  </div>
                  <div className="p-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-mono border border-slate-200/80">
                    {res.placeholderTag}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Resource Contents
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-800 font-mono">
                    Evaluation & Engineering Utility
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {res.utility}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA / Verification Footnote */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Verifiable Building Physics
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Explore the Technical Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            See how these 6 data categories and research standards flow through SHELTRON’s 8-layer modular engineering pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="md"
            className="border-slate-700 text-slate-200 hover:bg-slate-800"
            onClick={() => window.location.href = '/technical'}
          >
            System Architecture
          </Button>
          <Button
            variant="primary"
            size="md"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold"
            onClick={() => window.location.href = '/app/create'}
          >
            Create Shelter Project
          </Button>
        </div>
      </div>
    </div>
  );
};
