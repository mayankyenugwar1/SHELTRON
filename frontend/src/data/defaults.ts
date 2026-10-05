import { SiteRequirements, ClimateData, ShelterParameters } from '../types';

// Primary Project: Nashik, Maharashtra (Composite / Semi-Arid)
export const DEFAULT_SITE: SiteRequirements = {
  location_name: "Nashik, Maharashtra",
  latitude: 19.9975,
  longitude: 73.7898,
  length_m: 9.0,
  width_m: 7.0,
  height_m: 3.2,
  shelter_type: "Residential",
  occupants: 4,
  budget_inr: 450000,
  comfort_preference: "Balanced",
  sustainability_preference: "High Eco-Friendly",
  future_climate_scenario: false
};

export const DEFAULT_CLIMATE: ClimateData = {
  location: "Nashik, Maharashtra",
  latitude: 19.9975,
  longitude: 73.7898,
  climate_zone: "Composite / Semi-Arid",
  avg_temperature_c: 27.5,
  peak_summer_temp_c: 39.5,
  winter_min_temp_c: 10.5,
  relative_humidity_pct: 48.0,
  wind_speed_ms: 3.6,
  prevailing_wind_direction: "WNW",
  solar_insolation_kwh_m2: 5.9,
  annual_rainfall_mm: 812.0,
  extreme_heatwave_risk: "Moderate to High",
  diurnal_temp_range_c: 13.5
};

// Conventional uninsulated baseline configuration
export const DEFAULT_BASELINE_PARAMS: ShelterParameters = {
  orientation_deg: 0.0,
  roof_type: "Flat Concrete Slab",
  roof_slope_deg: 0.0,
  roof_material: "Reinforced Concrete Slab (Uninsulated RCC)",
  wall_material: "Fired Clay Red Brick (Standard Mortar)",
  flooring_material: "Standard Vitrified Glossy Ceramic Tile",
  paint_coating: "Standard Commercial Exterior Acrylic",
  window_glazing: "Single Clear Glass (4mm standard)",
  window_to_wall_ratio_pct: 22.0,
  shading_overhang_m: 0.3,
  cross_ventilation_strategy: "Single-Sided Natural Draft",
  insulation_type: "None (Uninsulated envelope)",
  natural_cooling_buffer: false
};

export const DEFAULT_PARAMS: ShelterParameters = {
  orientation_deg: 15.0,
  roof_type: "Sloped Double-Skin Roof",
  roof_slope_deg: 15.0,
  roof_material: "Sloped Double-Skin Terracotta Ventilated Roof",
  wall_material: "Compressed Stabilized Earth Blocks (CSEB)",
  flooring_material: "High Thermal Mass Terracotta Paver",
  paint_coating: "High-Albedo Cool Paint (SRI 104)",
  window_glazing: "Double Glazed Low-E Glass (Argon Filled)",
  window_to_wall_ratio_pct: 14.0,
  shading_overhang_m: 1.0,
  cross_ventilation_strategy: "Night Purge Clerestory Convection",
  insulation_type: "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
  natural_cooling_buffer: true
};

// Realistic sample shelter project for Judge Demo Mode (Nashik, Maharashtra)
export const DEMO_SITE: SiteRequirements = {
  location_name: "Nashik, Maharashtra",
  latitude: 19.9975,
  longitude: 73.7898,
  length_m: 9.0,
  width_m: 7.0,
  height_m: 3.2,
  shelter_type: "Residential",
  occupants: 4,
  budget_inr: 450000, // Medium budget ₹4,50,000
  comfort_preference: "Balanced",
  sustainability_preference: "High Eco-Friendly",
  future_climate_scenario: false
};

export const DEMO_CLIMATE: ClimateData = {
  location: "Nashik, Maharashtra",
  latitude: 19.9975,
  longitude: 73.7898,
  climate_zone: "Composite / Semi-Arid",
  avg_temperature_c: 27.5,
  peak_summer_temp_c: 39.5,
  winter_min_temp_c: 10.5,
  relative_humidity_pct: 48.0,
  wind_speed_ms: 3.6,
  prevailing_wind_direction: "WNW",
  solar_insolation_kwh_m2: 5.9,
  annual_rainfall_mm: 812.0,
  extreme_heatwave_risk: "Moderate to High",
  diurnal_temp_range_c: 13.5
};

export const DEMO_PARAMS: ShelterParameters = {
  orientation_deg: 15.0,
  roof_type: "Sloped Double-Skin Roof",
  roof_slope_deg: 15.0,
  roof_material: "Sloped Double-Skin Terracotta Ventilated Roof",
  wall_material: "Compressed Stabilized Earth Blocks (CSEB)",
  flooring_material: "High Thermal Mass Terracotta Paver",
  paint_coating: "High-Albedo Cool Paint (SRI 104)",
  window_glazing: "Double Glazed Low-E Glass (Argon Filled)",
  window_to_wall_ratio_pct: 14.0,
  shading_overhang_m: 1.0,
  cross_ventilation_strategy: "Night Purge Clerestory Convection",
  insulation_type: "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
  natural_cooling_buffer: true
};

export const CITIES = [
  { name: "Nashik, Maharashtra", lat: 19.9975, lon: 73.7898, zone: "Composite / Semi-Arid" },
  { name: "Jodhpur, Rajasthan", lat: 26.2389, lon: 73.0243, zone: "Hot & Dry" },
  { name: "Chennai, Tamil Nadu", lat: 13.0827, lon: 80.2707, zone: "Warm & Humid" },
  { name: "New Delhi, Delhi NCR", lat: 28.6139, lon: 77.2090, zone: "Composite" },
  { name: "Bengaluru, Karnataka", lat: 12.9716, lon: 77.5946, zone: "Temperate" },
  { name: "Leh, Ladakh", lat: 34.1526, lon: 77.5771, zone: "Cold & Arid" },
  { name: "Guwahati, Assam", lat: 26.1445, lon: 91.7362, zone: "Warm & Humid / Subtropical" }
];

export interface DemoStepItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  desc: string;
}

export const DEMO_FLOW_STEPS: DemoStepItem[] = [
  { id: 'site', title: 'Site & Requirements', path: '/app/create', icon: '📐', desc: 'Define shelter typology, 4-occupant residential specs, dimensions and target budget (₹4,50,000) in Nashik.' },
  { id: 'climate', title: 'Climate Analysis', path: '/app/climate', icon: '🗺️', desc: 'Inspect Nashik regional microclimate, solar insolation, and diurnal swing.' },
  { id: 'materials', title: 'Materials & Comfort', path: '/app/materials', icon: '🧱', desc: 'Select climate-smart envelope materials, high thermal mass CSEB, and passive comfort controls.' },
  { id: 'studio', title: '3D Digital Twin', path: '/app/design/studio', icon: '🏛️', desc: 'Interactive parametric 3D shelter model with solar orientation and Chajja shading.' },
  { id: 'simulation', title: 'Thermal Simulation', path: '/app/simulation', icon: '🌡️', desc: 'Run deterministic thermal solver: envelope conduction, sol-air lag, and ventilation airflow.' },
  { id: 'what-if', title: 'What-If Analysis', path: '/app/what-if', icon: '⚡', desc: 'Core platform USP: live modify parameters and monitor instant before/after performance deltas.' },
  { id: 'compare', title: 'Design Comparison', path: '/app/compare', icon: '⚖️', desc: 'Benchmark 3 prebuilt design variations on thermal comfort, cost, and eco-score.' },
  { id: 'result', title: 'Optimized Design', path: '/app/result', icon: '📄', desc: 'Optimized prototype design with decision rationales, baseline comparison, and report export.' }
];

