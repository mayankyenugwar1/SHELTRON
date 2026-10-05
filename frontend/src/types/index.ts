export interface SiteRequirements {
  location_name: string;
  latitude: number;
  longitude: number;
  length_m: number;
  width_m: number;
  height_m: number;
  site_shape?: string; // 'Rectangular' | 'Square' | 'Irregular'
  orientation_constraint?: string; // 'No Constraint' | 'North-South Axis Only' | 'East-West Axis Only'
  shelter_type: string; // 'Residential' | 'Community Shelter' | 'Classroom' | 'Rural Shelter' | 'Emergency Shelter'
  occupants: number;
  built_up_area_sqm?: number;
  budget_inr: number;
  comfort_preference: string; // Preferred comfort target or range
  preferred_temp_c?: number; // e.g. 24°C - 26°C
  sustainability_preference: string; // 'Standard' | 'High Eco-Friendly' | 'Net Zero Priority'
  natural_cooling_priority?: string; // 'Maximum' | 'Moderate' | 'Low'
  daylight_priority?: string; // 'High Diffuse Daylight' | 'Standard' | 'Controlled Low Solar'
  future_climate_scenario: boolean;
}

export interface ClimateData {
  location: string;
  latitude: number;
  longitude: number;
  climate_zone: string;
  avg_temperature_c: number;
  peak_summer_temp_c: number;
  winter_min_temp_c: number;
  relative_humidity_pct: number;
  wind_speed_ms: number;
  prevailing_wind_direction: string;
  solar_insolation_kwh_m2: number;
  annual_rainfall_mm: number;
  extreme_heatwave_risk: string;
  diurnal_temp_range_c: number;
}

export interface ShelterParameters {
  orientation_deg: number;
  roof_type: string;
  roof_slope_deg: number;
  roof_material: string;
  wall_material: string;
  flooring_material: string;
  paint_coating: string;
  window_glazing: string;
  window_to_wall_ratio_pct: number;
  shading_overhang_m: number;
  cross_ventilation_strategy: string;
  insulation_type: string;
  natural_cooling_buffer: boolean;
}

export interface HourlyTemperature {
  hour: string;
  outdoor: number;
  uninsulated_baseline: number;
  sheltron_indoor: number;
}

export interface Hotspot {
  zone: string;
  x: number;
  y: number;
  temp_c: number;
  risk: string;
}

export interface SimulationResults {
  indoor_temp_c: number;
  surface_temp_roof_c: number;
  surface_temp_walls_c: number;
  outdoor_temp_c: number;
  temp_reduction_c: number;
  heat_gain_w: number;
  heat_loss_w: number;
  cooling_energy_kwh_day: number;
  thermal_comfort_score: number;
  thermal_comfort_status: string;
  overheating_risk_pct: number;
  airflow_index_ms: number;
  daylight_factor_pct: number;
  embodied_carbon_kg: number;
  estimated_cost_inr: number;
  sustainability_score: number;
  hourly_temperatures: HourlyTemperature[];
  hotspots: Hotspot[];
}

export interface DesignRecommendation {
  orientation_recommendation: string;
  layout_zoning: string;
  roof_design: string;
  roof_slope: string;
  window_placement: string;
  window_size_wwr: string;
  shading_strategy: string;
  cross_ventilation: string;
  insulation_strategy: string;
  wall_material_recommendation: string;
  roof_material_recommendation: string;
  flooring_recommendation: string;
  paint_coating_recommendation: string;
  glazing_recommendation: string;
  natural_cooling_plants: string;
  daylight_and_lighting: string;
  climate_rationale: string;
}

export interface ComparisonMetric {
  metric: string;
  baseline: string | number;
  modified: string | number;
  delta: string | number;
  improved: boolean;
  unit: string;
}

export interface WhatIfResponse {
  baseline_simulation: SimulationResults;
  modified_simulation: SimulationResults;
  metrics: ComparisonMetric[];
  overall_improved: boolean;
  summary_verdict: string;
}

export interface ShelterProjectState {
  site: SiteRequirements;
  climate: ClimateData;
  baselineParams: ShelterParameters;
  currentParams: ShelterParameters;
  simulation: SimulationResults | null;
  recommendations: DesignRecommendation | null;
  comparison: WhatIfResponse | null;
  isOptimized: boolean;
}
