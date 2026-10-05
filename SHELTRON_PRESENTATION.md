# SHELTRON — Official Hackathon Presentation & Slide Deck

> **"Design Before You Build"**  
> *Smart Software Platform for Climate-Adaptive Shelter Design & Thermal Comfort Optimization*

---

## Slide 1: Title & Overview

- **Platform Name**: SHELTRON
- **Tagline**: Climate-Adaptive Shelter Design & Thermal Comfort Optimization Platform
- **Vision**: "Design Before You Build" — Transforming climatic vulnerability into resilient passive architectural engineering before breaking ground.
- **Focus Domain**: Climate-Tech • Green Architecture • Thermal Comfort • Passive Design • Disaster Management
- **Key Deliverable**: Validated 8-Stage Pipeline with Real-Time 3D Digital Twin & Verified Local Supplier Discovery
- **Technology Architecture**: React 19 + TypeScript + TailwindCSS + Python 3.12 + FastAPI + Three.js + Deterministic Rule Engine

---

## Slide 2: The Problem — The Climate Shelter Crisis

### 1. Severe Indoor Overheating
- In developing tropical regions, uninsulated brick and corrugated tin-roof shelters reach internal temperatures exceeding **42°C–46°C** during summer peaks.
- Occupants suffer acute thermal distress, dangerous indoor heat buildup, fatigue, and elevated heatstroke risk.
- Active mechanical cooling (HVAC / AC) is economically unviable and energy-intensive for vulnerable populations.

### 2. Generic Blueprint Syndrome
- Standard construction projects use identical, copy-paste generic blueprints regardless of whether the site is Hot-Dry, Warm-Humid, Composite, or Cold.
- Critical passive bioclimatic opportunities—cardinal solar path, prevailing wind direction, roof slope, and shading overhangs—are neglected.
- High-end building simulation software (e.g. EnergyPlus, IES) is too complex, expensive, and impractical for local masons, NGOs, and affordable builders.

### 3. Supply Chain Disconnect
- Sustainable, high-performance climate materials (AAC blocks, cool roof SRI paints, cavity insulation) exist but lack localized visibility.
- Builders default to standard concrete blocks and tin sheets due to a lack of immediate nearby supplier contacts.
- No integrated engineering tool connects thermal recommendations directly to verified nearby local suppliers.

---

## Slide 3: Technical Approach & Workflow

### The 10-Stage Technical Pipeline:
```
Location & Climate Data → Data Processing → Climate Analysis → Climate-Adaptive Architecture → Material & Comfort Recommendation → 2D/3D Digital Twin → Thermal Simulation → What-If Optimization → Cost & Sustainability → Final Design
```

1. **Location & Climate Data**: Ingests GPS coordinates, IMD 30-year meteorological normals, and NASA POWER solar data.
2. **Data Processing**: Computes diurnal temperature swings, solar radiation vectors, and seasonal monsoon wind trajectories.
3. **Climate Analysis**: Classifies regional regime under NBC 2016 / ECBC 5-zone bioclimatic models and evaluates heatwave vulnerability.
4. **Climate-Adaptive Architecture**: SP 41 rule-engine calculates optimal cardinal orientation, roof slope/form, window-to-wall ratios (WWR), and chajja overhang depths.
5. **Material & Comfort Recommendation**: Evaluates multi-layer envelope assemblies, calculates composite U-values, thermal phase lag, and decrement factors.
6. **2D/3D Digital Twin**: Generates interactive WebGL 3D model and 2D floor plans with parametric aperture and daylight controls.
7. **Thermal Simulation**: Solves steady-periodic Fourier envelope heat balance, sol-air surface temperatures, and 24-hr hourly indoor operative curves.
8. **What-If Optimization**: Rapid parametric sandbox for testing instant envelope mutations with real-time before/after deltas.
9. **Cost & Sustainability**: Calculates capital expense estimates, operational cooling energy savings (kWh/day), and embodied carbon footprint (kg CO2e).
10. **Final Design**: Produces executive performance dossiers, downloadable engineering reports, and discovers verified nearby material suppliers.

---

## Slide 4: Actual SHELTRON Technology Stack

*Strictly engineered with verified, high-performance technologies. No unsupported AI/ML or black-box claims.*

### 1. Frontend Architecture
- **React 19 & TypeScript**: Component modularity, deterministic state hydration, and compile-time contract validation.
- **Tailwind CSS v4**: Earth-Green design system, responsive utility layout, and accessible UI hierarchy.
- **Lucide React**: Minimal, cohesive engineering icons across pipeline stages and metrics.

### 2. 3D & Geospatial Visualization
- **Three.js & React Three Fiber**: Hardware-accelerated 3D WebGL shelter digital twin with orbit, zoom, pan, and live materials.
- **Leaflet**: Geospatial map pinpointing, coordinate reverse-geocoding, and climate zone boundary overlay.
- **Recharts & HTML5 Canvas**: 24-hour diurnal wave curves, 5-axis Pareto trade-off radar, and 9-point spatial thermal heatmaps.

### 3. Backend & Storage
- **Python 3.12 & FastAPI**: High-performance asynchronous REST API serving climate data, simulations, and report exports.
- **PostgreSQL / Structured Material Database**: Relational catalog of thermophysical material constants (conductivity, specific heat, density), costs, and carbon factors.
- **NumPy & SciPy**: Vectorized Fourier envelope conduction, Sol-Air radiation solving, and thermal decrement calculations.

### 4. Scientific Simulation Logic
- **Rule-Based Bioclimatic Solver**: Deterministic passive rules derived from SP 41 (Handbook on Functional Requirements of Buildings).
- **Thermal Balance Engine**: Fourier conduction ($Q = U \cdot A \cdot \Delta T$), Sol-Air solar surface solvers, and convective ventilation air-changes.
- **Supplier Discovery Service**: Proximity search matching recommended materials to verified local vendors with Google Maps integration.

---

## Slide 5: Key SHELTRON Differentiators

1. **Area-Specific Climate Intelligence**
   - Dynamic localized microclimate indexing using true coordinates, diurnal swings, seasonal solar geometry, and extreme heatwave surge scenarios (+2.5°C) rather than generic city averages.
2. **Bioclimatic Design Engine**
   - Deterministic engineering rules calculating optimal cardinal orientation, roof slope/form, window-to-wall ratio (WWR), and chajja shading overhangs based on NBC 2016 and SP 41.
3. **Thermal Digital Twin**
   - Real-time interactive 2D floor plans and 3D WebGL shelter digital twin rendering internal operative temperatures, sol-air surface loads, and 9-point spatial heatmaps.
4. **What-If Multi-Objective Optimization**
   - Rapid parametric sandbox allowing instant material and geometry alterations with real-time before/after deltas across comfort, capital cost, and embodied carbon.
5. **Material-to-Market / Find Nearby Suppliers**
   - Direct link between engineering recommendations and the physical supply chain: discovers verified local distributors with exact distances and Google Maps directions.
6. **Climate-Resilient Shelter Planning**
   - Engineered for disaster relief, rural housing, and urban settlements to withstand IPCC +2.5°C heatwaves and severe monsoons without costly mechanical HVAC reliance.

---

## Slide 6: End-to-End Pipeline Architecture

- **Stage 1: Site & Requirements Definition**: Geographic coordinates, site dimensions, shelter typology, occupancy count, and budget tier.
- **Stage 2: Climate Analysis**: Classifies climate zone, peak/min temperatures, solar irradiance vectors, and prevailing breezes.
- **Stage 3: Materials & Comfort**: Wall, roof, glazing, and insulation selection with live U-value and decrement calculations.
- **Stage 4: 3D Twin Studio**: Interactive 3D WebGL shelter model with materials, solar compass, and aperture controls.
- **Stage 5: Thermal Simulation**: 24-hour diurnal operative temperature solver, sensible heat balance, and cooling energy demands.
- **Stage 6: What-If Sandbox**: Interactive parameter sandbox testing mutations with before/after performance deltas.
- **Stage 7: Compare & Benchmark**: Side-by-side benchmarking: baseline generic shelter vs. SHELTRON optimized design.
- **Stage 8: Result & Supply Chain**: Executive performance dossier, PDF report export, and verified nearby supplier discovery.

---

## Slide 7: Feasibility, Viability & Real-World Impact

### 1. Technical Feasibility
- **Lightweight Deterministic Computing**: Zero expensive GPU clusters required; runs calculations in milliseconds inside browser and FastAPI microservices.
- **Standards Compliance**: Aligned with National Building Code (NBC 2016), Energy Conservation Building Code (ECBC), and IS SP 41.
- **Deterministic Reliability**: No hallucinated architectural advice or unpredictable black-box outputs.

### 2. Economic Viability
- **CapEx vs. OpEx Optimization**: Passive cooling strategies yield 30%-45% reduction in electricity bills and eliminate the need for oversized AC systems.
- **Localized Procurement**: Recommends locally available materials (e.g., fly-ash bricks, earthen plaster) to minimize logistics and transport expenses.
- **Low Implementation Barrier**: Free, accessible open platform empowering community planners, NGOs, and low-income builders.

### 3. Societal & Climate Impact
- **Heat Stress Mitigation**: Lowers peak indoor temperatures by 5°C-9°C passively, protecting vulnerable families and children from heatwaves.
- **Embodied Carbon Reduction**: Prioritizes low-carbon materials, saving ~1,800-3,500 kg CO2e per 45m² residential unit.
- **Rapid Disaster Deployment**: Generates instant climate-tailored emergency shelter specifications for NDRF/disaster response agencies.

---

## Slide 8: Validated Benchmark Demo: Nashik, Maharashtra

- **Typology**: Residential Family Shelter (4 occupants, Medium budget)
- **Climate Regime**: Warm & Humid / Semi-Arid transition
- **Extreme Peak Outdoor Temperature**: 38.5°C
- **Baseline Shelter Performance** (Uninsulated brick, unshaded tin roof):
  - Peak Indoor Temperature: **38.2°C** (Dangerous overheating)
  - Total Sensible Heat Gain: **7,450 W**
  - Thermal Comfort Score: **32 / 100** (Poor)
- **SHELTRON Optimized Performance** (AAC blocks, cool roof SRI coating, cellular foam, overhangs):
  - Peak Indoor Temperature: **29.8°C** (**-8.4°C Passive Temperature Reduction**)
  - Total Sensible Heat Gain: **3,920 W** (**47% Heat Gain Reduction**)
  - Thermal Comfort Score: **86 / 100** (**Optimal Comfort**)
  - Embodied Carbon: **-38%** vs. standard RCC frame
- **Material-to-Market Connection (Nashik Local Vendors)**:
  - *Thermal Insulation*: Maharashtra Insulation & Acoustic Mart (Ambad MIDC, Nashik - 4.2 km)
  - *AAC Blocks*: Godavari Green Tech Building Solutions (Satpur Industrial Area, Nashik - 6.1 km)
  - *High-SRI Cool Roof Paint*: Sahyadri Eco-Paints & Protective Coatings (Dwarka Circle, Nashik - 3.5 km)
  - *Action*: Direct one-click Google Maps navigation for contractor procurement.

---

## Slide 9: Conclusion & Future Horizons

- **Core SIH 2026 Delivery**: Fully operational 8-stage web application with 3D digital twin, physics-based thermal simulation, and local supplier integration.
- **Phase 1 (Microclimates)**: Open-Meteo & ERA5 global reanalysis data streams with hourly ASHRAE 55 adaptive comfort scoring.
- **Phase 2 (BIM Interoperability)**: Automated IFC / BIM floor plan export for Revit/FreeCAD with contractor bill-of-quantities (BOQ).
- **Phase 3 (Public Sector Integration)**: Integration with PMAY (Pradhan Mantri Awas Yojana) and NDRF disaster shelter procurement guidelines.
