from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class SiteRequirements(BaseModel):
    location_name: str = "Nashik, Maharashtra"
    latitude: float = 19.9975
    longitude: float = 73.7898
    length_m: float = 9.0
    width_m: float = 7.0
    height_m: float = 3.2
    shelter_type: str = "Residential" # Residential, Medical Shelter, Community Center, School
    occupants: int = 4
    budget_inr: float = 450000.0 # INR target budget ₹4,50,000
    comfort_preference: str = "Balanced" # "Max Cooling", "Balanced", "Minimum Energy"
    sustainability_preference: str = "High Eco-Friendly" # "Standard", "High Eco-Friendly", "Net Zero Priority"
    future_climate_scenario: bool = False # +2°C extreme climate surge

class ClimateData(BaseModel):
    location: Optional[str] = None
    location_name: Optional[str] = "Nashik, Maharashtra"
    latitude: Optional[float] = 19.9975
    longitude: Optional[float] = 73.7898
    climate_zone: str = "Composite"
    avg_temperature_c: float = 30.0
    peak_summer_temp_c: float = 40.0
    winter_min_temp_c: float = 12.0
    relative_humidity_pct: float = 50.0
    wind_speed_ms: float = 3.0
    prevailing_wind_direction: str = "SW"
    solar_insolation_kwh_m2: float = 6.0
    annual_rainfall_mm: float = 750.0
    extreme_heatwave_risk: str = "Moderate"
    diurnal_temp_range_c: float = 12.0

class ShelterParameters(BaseModel):
    orientation_deg: float = 0.0 # 0 = North, 90 = East, 180 = South, etc.
    roof_type: str = "Sloped Double-Skin Roof" # Flat Concrete, Sloped Double-Skin Roof, Vaulted Bamboo/Terra-cotta, Green Roof
    roof_slope_deg: float = 15.0
    roof_material: str = "White Coated Terracotta Tile with Reflective Barrier"
    wall_material: str = "Compressed Stabilized Earth Blocks (CSEB)"
    flooring_material: str = "High Thermal Mass Terracotta Paver"
    paint_coating: str = "High-Albedo Cool Paint (Solar Reflectance Index 104)"
    window_glazing: str = "Double Glazed Low-E Glass"
    window_to_wall_ratio_pct: float = 18.0
    shading_overhang_m: float = 0.9
    cross_ventilation_strategy: str = "Cross Ventilation with Clerestory Louvers"
    insulation_type: str = "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)"
    natural_cooling_buffer: bool = True # courtyard/vegetative buffer

class SimulationResults(BaseModel):
    indoor_temp_c: float
    surface_temp_roof_c: float
    surface_temp_walls_c: float
    outdoor_temp_c: float
    temp_reduction_c: float
    heat_gain_w: float
    heat_loss_w: float
    cooling_energy_kwh_day: float
    thermal_comfort_score: float # 0 to 100 (PMV/PPD derived)
    thermal_comfort_status: str # "Optimal Thermal Comfort", "Slightly Warm", "Overheating Warning"
    overheating_risk_pct: float
    airflow_index_ms: float
    daylight_factor_pct: float
    embodied_carbon_kg: float
    estimated_cost_inr: float
    sustainability_score: float # 0 to 100
    hourly_temperatures: List[Dict[str, Any]] # 24 hr profile: hour, outdoor, indoor_baseline, indoor_sheltron
    hotspots: List[Dict[str, Any]] # spatial points with localized temperatures

class DesignRecommendation(BaseModel):
    orientation_recommendation: str
    layout_zoning: str
    roof_design: str
    roof_slope: str
    window_placement: str
    window_size_wwr: str
    shading_strategy: str
    cross_ventilation: str
    insulation_strategy: str
    wall_material_recommendation: str
    roof_material_recommendation: str
    flooring_recommendation: str
    paint_coating_recommendation: str
    glazing_recommendation: str
    natural_cooling_plants: str
    daylight_and_lighting: str
    climate_rationale: str

class WhatIfComparisonRequest(BaseModel):
    site: SiteRequirements
    baseline_params: ShelterParameters
    modified_params: ShelterParameters

class ComparisonMetric(BaseModel):
    metric: str
    baseline: float | str
    modified: float | str
    delta: float | str
    improved: bool
    unit: str
