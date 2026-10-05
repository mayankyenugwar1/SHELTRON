import { SimulationResults } from '../types';

export const MATERIAL_DATA = {
  walls: [
    { name: "Compressed Stabilized Earth Blocks (CSEB)", uValue: 1.25, mass: "Very High", carbon: 22, cost: 850, rating: 95 },
    { name: "Autoclaved Aerated Concrete (AAC) Blocks", uValue: 0.82, mass: "Medium", carbon: 45, cost: 1100, rating: 82 },
    { name: "Fired Clay Red Brick (Standard Mortar)", uValue: 2.10, mass: "High", carbon: 85, cost: 1350, rating: 50 },
    { name: "Insulated Rammed Earth Wall (300mm)", uValue: 0.70, mass: "Extremely High", carbon: 18, cost: 1450, rating: 98 },
    { name: "Treated Bamboo & Lime Plaster Composite", uValue: 1.10, mass: "Low-Medium", carbon: 12, cost: 650, rating: 96 }
  ],
  roofs: [
    { name: "Sloped Double-Skin Terracotta Ventilated Roof", uValue: 0.55, albedo: 0.78, lag: 9.5, carbon: 28, cost: 1400, rating: 94 },
    { name: "Reinforced Concrete Slab (Uninsulated)", uValue: 3.20, albedo: 0.25, lag: 4.0, carbon: 135, cost: 1750, rating: 35 },
    { name: "Cool-Roof Membrane over Extruded Polystyrene (XPS)", uValue: 0.38, albedo: 0.88, lag: 8.0, carbon: 48, cost: 1650, rating: 80 },
    { name: "Lightweight Corrugated Metal Sheet (Uninsulated GI)", uValue: 5.80, albedo: 0.35, lag: 0.5, carbon: 62, cost: 550, rating: 40 },
    { name: "Extensive Sedum Vegetated Green Roof", uValue: 0.32, albedo: 0.82, lag: 12.0, carbon: 25, cost: 2300, rating: 97 }
  ],
  glazing: [
    { name: "Double Glazed Low-E Glass (Argon Filled)", uValue: 1.6, shgc: 0.32, cost: 3100 },
    { name: "Double Clear Glazing (6-12-6mm air gap)", uValue: 2.8, shgc: 0.68, cost: 1950 },
    { name: "Single Clear Glass (4mm standard)", uValue: 5.7, shgc: 0.82, cost: 850 },
    { name: "Triple Glazed Krypton (High Thermal Zone)", uValue: 0.9, shgc: 0.28, cost: 5400 }
  ]
};

export const SAMPLE_SIMULATION: SimulationResults = {
  indoor_temp_c: 26.8,
  surface_temp_roof_c: 34.2,
  surface_temp_walls_c: 29.5,
  outdoor_temp_c: 44.8,
  temp_reduction_c: 18.0,
  heat_gain_w: 1840.5,
  heat_loss_w: 1251.5,
  cooling_energy_kwh_day: 6.4,
  thermal_comfort_score: 92.4,
  thermal_comfort_status: "Optimal Thermal Comfort",
  overheating_risk_pct: 0.0,
  airflow_index_ms: 1.19,
  daylight_factor_pct: 3.0,
  embodied_carbon_kg: 5840.0,
  estimated_cost_inr: 412500.0,
  sustainability_score: 91.5,
  hourly_temperatures: [
    { hour: "00:00", outdoor: 30.2, uninsulated_baseline: 31.5, sheltron_indoor: 27.1 },
    { hour: "04:00", outdoor: 26.5, uninsulated_baseline: 27.2, sheltron_indoor: 25.4 },
    { hour: "08:00", outdoor: 34.1, uninsulated_baseline: 36.5, sheltron_indoor: 25.8 },
    { hour: "12:00", outdoor: 42.6, uninsulated_baseline: 46.2, sheltron_indoor: 26.4 },
    { hour: "14:00", outdoor: 44.8, uninsulated_baseline: 48.6, sheltron_indoor: 26.8 },
    { hour: "18:00", outdoor: 39.5, uninsulated_baseline: 42.1, sheltron_indoor: 27.2 },
    { hour: "22:00", outdoor: 33.4, uninsulated_baseline: 35.0, sheltron_indoor: 27.0 },
  ],
  hotspots: [
    { zone: "North-West Corner", x: -4, y: 2.6, temp_c: 28.0, risk: "Moderate solar radiation accumulation" },
    { zone: "West Wall Buffer", x: -4, y: 0, temp_c: 28.6, risk: "Afternoon direct exposure hotspot" },
    { zone: "South-West Glazing", x: -4, y: -2.6, temp_c: 28.4, risk: "Solar radiant ingress perimeter" },
    { zone: "North Entry Core", x: 0, y: 2.6, temp_c: 25.9, risk: "Cool shaded corridor" },
    { zone: "Central Living Zone", x: 0, y: 0, temp_c: 26.4, risk: "Optimal convective thermal balance" },
    { zone: "South Clerestory Vent", x: 0, y: -2.6, temp_c: 27.3, risk: "High stack exhaust plume" },
    { zone: "North-East Morning Zone", x: 4, y: 2.6, temp_c: 25.6, risk: "Coolest zone in afternoon" },
    { zone: "East Inflow", x: 4, y: 0, temp_c: 26.0, risk: "Fresh air windward intake" },
    { zone: "South-East Courtyard", x: 4, y: -2.6, temp_c: 26.6, risk: "Tempered transitional microclimate" }
  ]
};
