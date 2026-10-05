import { SiteRequirements, ClimateData, ShelterParameters, SimulationResults, Hotspot } from '../types';
import { COMPREHENSIVE_MATERIALS } from '../data/materialData';

/**
 * Client-side deterministic physics simulation engine.
 * Solves multi-layer thermal conduction, sol-air lag, fenestration solar radiation,
 * and convective ventilation cooling for passive shelters.
 */
export function runClientSimulation(
  site: SiteRequirements,
  climate: ClimateData,
  params: ShelterParameters
): SimulationResults {
  const L = site.length_m;
  const W = site.width_m;
  const H = site.height_m;
  const footprint = L * W;
  const perimeter = 2 * (L + W);
  const grossWall = perimeter * H;
  const volume = footprint * H;

  const wwr = params.window_to_wall_ratio_pct / 100.0;
  const winArea = grossWall * wwr;
  const netWall = grossWall - winArea;
  const roofSlopeRad = (params.roof_slope_deg * Math.PI) / 180.0;
  const roofArea = footprint / Math.cos(roofSlopeRad);

  // Material Lookups from COMPREHENSIVE_MATERIALS with robust fallback
  const wallItem = COMPREHENSIVE_MATERIALS.walls.find(w => w.name === params.wall_material || params.wall_material.includes(w.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.walls[0];
  const roofItem = COMPREHENSIVE_MATERIALS.roof.find(r => r.name === params.roof_material || params.roof_material.includes(r.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.roof[0];
  const glazeItem = COMPREHENSIVE_MATERIALS.glazing.find(g => g.name === params.window_glazing || params.window_glazing.includes(g.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.glazing[0];
  const insulItem = COMPREHENSIVE_MATERIALS.insulation.find(i => i.name === params.insulation_type || params.insulation_type.includes(i.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.insulation[0];
  const paintItem = COMPREHENSIVE_MATERIALS.paint.find(p => p.name === params.paint_coating || params.paint_coating.includes(p.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.paint[0];
  const floorItem = COMPREHENSIVE_MATERIALS.flooring.find(f => f.name === params.flooring_material || params.flooring_material.includes(f.name.split('(')[0].trim())) || COMPREHENSIVE_MATERIALS.flooring[0];

  // Insulation R-value contribution
  let rInsul = 0.0;
  if (params.insulation_type.includes("Woodfiber") || params.insulation_type.includes("Mineral Wool")) {
    rInsul = 2.8;
  } else if (params.insulation_type.includes("EPS")) {
    rInsul = 1.4;
  }

  // Base U-Values and effective envelope resistance
  const baseUWall = wallItem.uValue || (params.wall_material.includes("AAC") ? 0.82 : (params.wall_material.includes("Brick") ? 2.10 : (params.wall_material.includes("Rammed") ? 0.70 : 1.25)));
  const uWall = rInsul > 0 ? 1.0 / ((1.0 / baseUWall) + (rInsul * 0.65)) : baseUWall;

  const baseURoof = roofItem.uValue || (params.roof_material.includes("Green") || params.roof_material.includes("Sedum") ? 0.32 : (params.roof_material.includes("XPS") ? 0.38 : (params.roof_material.includes("Concrete") ? 3.20 : (params.roof_material.includes("Metal") || params.roof_material.includes("GI") ? 5.80 : 0.55))));
  const uRoof = rInsul > 0 ? 1.0 / ((1.0 / baseURoof) + rInsul) : baseURoof;

  // Roof Albedo & Solar Absorptance
  let albedo = 0.40;
  if (params.roof_material.includes("Sedum") || params.roof_material.includes("Green")) {
    albedo = 0.82;
  } else if (params.roof_material.includes("Concrete")) {
    albedo = 0.25;
  } else if (params.roof_material.includes("Metal") || params.roof_material.includes("GI")) {
    albedo = 0.35;
  } else if (params.roof_material.includes("Terracotta")) {
    albedo = 0.78;
  }

  // Paint coating overlay effect
  if (params.paint_coating.includes("SRI 104") || params.paint_coating.includes("High-Albedo")) {
    albedo = Math.max(albedo, 0.88);
  } else if (params.paint_coating.includes("Lime")) {
    albedo = Math.max(albedo, 0.82);
  } else if (params.paint_coating.includes("Standard")) {
    albedo = Math.min(albedo, 0.35);
  }
  const solarAbs = Math.max(0.10, 1.0 - albedo);

  const peakOutdoor = climate.peak_summer_temp_c;
  const avgOutdoor = climate.avg_temperature_c;
  const solarFlux = (climate.solar_insolation_kwh_m2 * 1000.0) / 10.0; // W/m² peak beam vector

  // Solar Orientation Sensitivity
  // In northern hemisphere, 15 deg azimuth minimizes east-west peak solar incidence
  const orientRad = ((params.orientation_deg - 15.0) * Math.PI) / 180.0;
  const orientationFactor = 1.0 + 0.18 * Math.pow(Math.sin(orientRad), 2);

  const tSolRoof = peakOutdoor + (solarAbs * solarFlux / 17.0);
  const tSolWall = peakOutdoor + (0.55 * solarFlux * orientationFactor * 0.65 / 17.0);

  // Fenestration: Shading Overhang (Chajja) & Glazing properties
  const uGlaze = glazeItem.uValue || (params.window_glazing.includes("Low-E") ? 1.6 : (params.window_glazing.includes("Single") ? 5.7 : 2.8));
  const shgc = (glazeItem as any).shgc || (params.window_glazing.includes("Low-E") ? 0.32 : (params.window_glazing.includes("Single") ? 0.82 : 0.68));

  // Shading factor: 1.0m overhang cuts solar radiation by ~62%; 0.3m cuts ~18%
  const shadingRatio = Math.max(0.18, 1.0 - (params.shading_overhang_m * 0.62)) * (params.natural_cooling_buffer ? 0.88 : 1.0);

  // Sloped Double-Skin Roof Convective Attic Ventilated Bonus
  const slopeVentBonus = params.roof_slope_deg > 10 && params.roof_material.includes("Ventilated") ? 0.78 : (params.roof_slope_deg > 5 ? 0.90 : 1.0);

  // Steady-periodic heat gain breakdown
  const qRoof = uRoof * roofArea * Math.max(0, tSolRoof - 24.0) * slopeVentBonus;
  const qWall = uWall * netWall * Math.max(0, tSolWall - 24.0);
  const qGlassSolar = winArea * solarFlux * shgc * shadingRatio;
  const qGlassCond = uGlaze * winArea * Math.max(0, peakOutdoor - 24.0);
  const qInt = site.occupants * 110.0 + (footprint * 5.0);

  const totalHeatGain = Math.max(0, qRoof + qWall + qGlassSolar + qGlassCond + qInt);

  // Ventilation strategy ACH & Convective Cooling
  let ach = 2.0;
  let airflow = 0.15;
  let ventDelta = 0.3;

  if (params.cross_ventilation_strategy.includes("Purge")) {
    ach = 6.5 * (climate.wind_speed_ms / 3.0);
    airflow = Math.min(1.4, +(climate.wind_speed_ms * 0.30).toFixed(2));
    ventDelta = 1.6;
  } else if (params.cross_ventilation_strategy.includes("Continuous") || params.cross_ventilation_strategy.includes("Louver")) {
    ach = 8.5 * (climate.wind_speed_ms / 3.0);
    airflow = Math.min(1.8, +(climate.wind_speed_ms * 0.40).toFixed(2));
    ventDelta = 2.2;
  } else if (params.cross_ventilation_strategy.includes("Balanced") || params.cross_ventilation_strategy.includes("Clerestory")) {
    ach = 5.5 * (climate.wind_speed_ms / 3.0);
    airflow = Math.min(1.2, +(climate.wind_speed_ms * 0.25).toFixed(2));
    ventDelta = 1.3;
  } else if (params.cross_ventilation_strategy.includes("Airtight")) {
    ach = 1.2;
    airflow = 0.08;
    ventDelta = 0.0;
  }

  // Thermal Lag & Dynamic Damping
  const lagHours = roofItem.name.includes("Sedum") ? 12.0 : (roofItem.name.includes("Terracotta") ? 9.5 : (wallItem.name.includes("Rammed") ? 12.0 : (wallItem.name.includes("CSEB") ? 9.0 : 4.0)));
  const damping = lagHours > 8 ? 0.52 : (lagHours > 4 ? 0.72 : 0.92);
  const heatRise = (totalHeatGain / (volume * 1.2 * 1005.0 / 3600.0 * Math.max(1.5, ach) + 1100.0));
  let tIndoor = avgOutdoor + (peakOutdoor - avgOutdoor) * (1.0 - (1.0 - damping) * 0.7) + Math.min(6.5, heatRise * 0.85);

  if (params.natural_cooling_buffer && climate.relative_humidity_pct < 65) {
    tIndoor -= 1.4;
  }
  tIndoor = Math.max(18.0, Math.min(peakOutdoor + 5.0, +tIndoor.toFixed(1)));
  const tempReduction = +(peakOutdoor - tIndoor).toFixed(1);

  const surfRoof = +(peakOutdoor + (tSolRoof - peakOutdoor) * 0.35).toFixed(1);
  const surfWall = +((tIndoor + peakOutdoor) / 2.0).toFixed(1);

  // Cooling energy demand (kWh/day equivalent to maintain comfort)
  const deltaComfort = Math.max(0, tIndoor - 24.5);
  const coolingKwh = +((totalHeatGain * deltaComfort / 1000.0) * (8.0 / 3.6)).toFixed(1);

  // Adaptive Thermal Comfort (IMAC / NBC 2016 model for naturally ventilated buildings)
  const neutralTemp = Math.min(29.0, Math.max(24.0, 0.54 * (climate.avg_temperature_c || 27.0) + 12.8));
  const effectiveIndoorTemp = tIndoor - ventDelta;
  const tempDev = Math.max(0, effectiveIndoorTemp - neutralTemp);
  const comfortScore = Math.max(25, Math.min(98, +(98.0 - (tempDev * 3.6)).toFixed(1)));

  // Comfort Status Labeling - STRICT: Never label low score as optimal
  let status = "Optimal Thermal Comfort";
  if (comfortScore < 50) status = "Below Comfort Threshold";
  else if (comfortScore < 70) status = "Moderate Comfort";
  else if (comfortScore < 82) status = "Acceptable Comfort";
  else status = "Optimal Thermal Comfort";

  // Construction Cost Calculation (Calibrated with Material Unit Rates matching MaterialComfortPage)
  const costWall = netWall * (wallItem.costSqmInr || 1000);
  const costRoof = roofArea * (roofItem.costSqmInr || 1400);
  const costGlaze = winArea * (glazeItem.costSqmInr || 2000);
  const costInsul = (roofArea + netWall) * (insulItem.costSqmInr || 0);
  const costPaint = (roofArea + netWall) * (paintItem.costSqmInr || 75);
  const costFloor = footprint * (floorItem.costSqmInr || 700);
  const costFoundation = footprint * 1800; // Base foundation, labor & structure framing
  const totalCost = Math.round(costWall + costRoof + costGlaze + costInsul + costPaint + costFloor + costFoundation);

  // Embodied Carbon & Sustainability Score
  const wallCarbon = wallItem.embodiedCarbonKg || 35;
  const roofCarbon = roofItem.embodiedCarbonKg || 40;
  const carbon = +(netWall * wallCarbon + roofArea * roofCarbon + winArea * 32 + footprint * 45).toFixed(1);
  const wallRating = wallItem.sustainabilityScore || 75;
  const roofRating = roofItem.sustainabilityScore || 75;
  const sustainability = +((wallRating * 0.4) + (roofRating * 0.35) + Math.max(0, 100.0 - Math.min(80, coolingKwh * 1.5)) * 0.25).toFixed(1);

  // 24-hr hourly temperature distribution
  const hourly = [];
  for (let h = 0; h < 24; h++) {
    const cycle = Math.sin((h - 8) * Math.PI / 12.0);
    const outH = avgOutdoor + (climate.diurnal_temp_range_c / 2.0) * cycle;
    const baseH = outH + (h >= 10 && h <= 17 ? 3.8 : 1.0);
    const lagH = (h - Math.floor(lagHours) + 24) % 24;
    let indH = avgOutdoor + (climate.diurnal_temp_range_c / 2.0) * 0.38 * Math.sin((lagH - 8) * Math.PI / 12.0);
    if (outH > peakOutdoor - 3) indH = Math.min(indH, tIndoor);

    hourly.push({
      hour: `${h.toString().padStart(2, '0')}:00`,
      outdoor: +outH.toFixed(1),
      uninsulated_baseline: +baseH.toFixed(1),
      sheltron_indoor: +indH.toFixed(1)
    });
  }

  const hotspots: Hotspot[] = [
    { zone: "North-West Corner", x: -L/3, y: W/3, temp_c: +(tIndoor + 1.2).toFixed(1), risk: "Moderate solar radiation accumulation" },
    { zone: "West Wall Buffer", x: -L/3, y: 0, temp_c: +(tIndoor + 1.8).toFixed(1), risk: "Afternoon direct exposure hotspot" },
    { zone: "South-West Glazing", x: -L/3, y: -W/3, temp_c: +(tIndoor + 1.6).toFixed(1), risk: "Solar radiant ingress perimeter" },
    { zone: "North Entry Core", x: 0, y: W/3, temp_c: +(tIndoor - 0.9).toFixed(1), risk: "Cool shaded corridor" },
    { zone: "Central Living Zone", x: 0, y: 0, temp_c: +(tIndoor - 0.4).toFixed(1), risk: "Optimal convective thermal balance" },
    { zone: "South Clerestory Vent", x: 0, y: -W/3, temp_c: +(tIndoor + 0.5).toFixed(1), risk: "High stack exhaust plume" },
    { zone: "North-East Morning Zone", x: L/3, y: W/3, temp_c: +(tIndoor - 1.2).toFixed(1), risk: "Coolest zone in afternoon" },
    { zone: "East Inflow", x: L/3, y: 0, temp_c: +(tIndoor - 0.8).toFixed(1), risk: "Fresh air windward intake" },
    { zone: "South-East Courtyard", x: L/3, y: -W/3, temp_c: +(tIndoor - 0.2).toFixed(1), risk: "Tempered transitional microclimate" }
  ];

  // Clean and sanitize all numbers to prevent NaN or Infinity propagation
  const cleanNum = (val: number, fallback: number = 0): number => {
    return (typeof val === 'number' && !isNaN(val) && isFinite(val)) ? val : fallback;
  };

  return {
    indoor_temp_c: cleanNum(tIndoor, 28.0),
    surface_temp_roof_c: cleanNum(surfRoof, 34.0),
    surface_temp_walls_c: cleanNum(surfWall, 30.0),
    outdoor_temp_c: cleanNum(peakOutdoor, 38.0),
    temp_reduction_c: cleanNum(tempReduction, 0),
    heat_gain_w: cleanNum(+totalHeatGain.toFixed(1), 3500),
    heat_loss_w: cleanNum(+(totalHeatGain * 0.68).toFixed(1), 2380),
    cooling_energy_kwh_day: cleanNum(coolingKwh, 85),
    thermal_comfort_score: cleanNum(comfortScore, 75),
    thermal_comfort_status: status || "Acceptable Comfort",
    overheating_risk_pct: cleanNum(tIndoor > 28 ? Math.min(100, +((tIndoor - 28) * 12.5).toFixed(1)) : 0, 10),
    airflow_index_ms: cleanNum(airflow, 0.4),
    daylight_factor_pct: cleanNum(+(wwr * 18.0 * (params.window_glazing.includes("Double") ? 1.2 : 1.0)).toFixed(1), 2.5),
    embodied_carbon_kg: cleanNum(carbon, 4500),
    estimated_cost_inr: cleanNum(totalCost, 450000),
    sustainability_score: cleanNum(sustainability, 80),
    hourly_temperatures: hourly,
    hotspots
  };
}
