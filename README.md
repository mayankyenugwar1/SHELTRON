# SHELTRON
### Smart Software Platform for Climate-Adaptive Shelter Design & Thermal Comfort Optimization

> **"Design Before You Build"**

SHELTRON is an interactive climate-tech web engineering platform developed for the **Smart India Hackathon**. It empowers architects, disaster relief organizations, and builders to simulate, test, and optimize shelter envelopes before construction to minimize overheating, lower embodied carbon, and maximize occupant comfort without reliance on mechanical HVAC.

---

## 🌟 Core Features & Modules

1. **Location & Climate Intelligence (`/api/climate`):**
   - Interactive Leaflet geocoding across Indian & global climate zones (Hot & Dry, Warm & Humid, Composite, Temperate, Cold & Arid).
   - Diurnal cycle modeling, peak solar radiation, wind speed/direction vectors, and extreme future climate surge (+2.5°C) stress testing.

2. **Climate-Adaptive Architectural Rules Engine (`/api/recommendations`):**
   - Generates passive architectural directives (orientation, spatial zoning, roof slope, overhang depths, WWR, and cross-ventilation).
   - Strict adherence to bioclimatic engineering principles without superstition or pseudoscience.

3. **Smart Material Library & Catalog (`/api/materials`):**
   - Physical thermal constants: U-values, solar reflectance (albedo), thermal inertia/lag hours, embodied carbon ($kg CO_2e/m^2$), and unit costs in INR.
   - Materials include Compressed Stabilized Earth Blocks (CSEB), AAC blocks, double-skin terracotta roofs, sedum green roofs, cool paints (SRI 104), and low-E glazing.

4. **Deterministic Thermal Physics Simulation Engine (`/api/simulate`):**
   - Calculates Fourier envelope conduction, solar radiation gains (Sol-air temperature), natural ventilation airflow rates, internal loads, and thermal phase lag damping.
   - 24-Hour Diurnal Ambient vs. Uninsulated Baseline vs. SHELTRON comparison curve.
   - 9-Point Spatial Thermal Hotspot microclimate matrix.

5. **Parametric What-If Analysis Sandbox (`/api/what-if`):**
   - Real-time adjustment of orientation, wall/roof materials, window-to-wall ratios (WWR), shading overhangs, and vegetative buffers.
   - Live delta reporting: temperature, comfort score, heat gain, cooling kWh, cost, and eco-score.

6. **Interactive 3D Digital Twin (Three.js / React Three Fiber):**
   - Orbit, zoom, and inspect shelter structures.
   - Toggle live thermal heatmaps displaying color-coded surface heat distributions.

7. **Multi-Objective Pareto Design Optimizer (`/api/optimize`):**
   - Explores design permutations to maximize comfort and sustainability within target budget thresholds.

8. **Automated Dossier & PDF Export:**
   - One-click executive engineering report download for stakeholder reviews.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Three.js, React Three Fiber, Leaflet, Recharts, jsPDF, Lucide Icons.
- **Backend:** Python 3.12, FastAPI, Pydantic v2, NumPy, Pandas, Uvicorn.
- **Containerization:** Docker & Docker Compose.

---

## 🚀 Getting Started

### 1. Run Backend Server
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Or `source venv/bin/activate` on Linux/macOS
pip install fastapi uvicorn pydantic numpy pandas
uvicorn app.main:app --reload --port 8000
```
Backend API will be accessible at: `http://localhost:8000/docs`

### 2. Run Frontend Application
```bash
cd frontend
npm install
npm run dev
```
Frontend Web App will run at: `http://localhost:5173`

---

## 📜 SIH Compliance & Design Guidelines
- Modern, clean, climate-tech UI with pale blue, pale green, and pale orange accents.
- Responsive, modular, physics-backed, and presentation-ready.
