from typing import List, Dict, Any
from app.models import SimulationResults, ComparisonMetric, ShelterParameters, SiteRequirements, ClimateData
from app.modules.simulation import ThermalSimulationEngine

class WhatIfAnalysisEngine:
    @staticmethod
    def compare_runs(
        site: SiteRequirements,
        climate: ClimateData,
        base_params: ShelterParameters,
        mod_params: ShelterParameters
    ) -> Dict[str, Any]:
        sim_base = ThermalSimulationEngine.simulate(site, climate, base_params)
        sim_mod = ThermalSimulationEngine.simulate(site, climate, mod_params)

        metrics: List[ComparisonMetric] = [
            ComparisonMetric(
                metric="Indoor Temperature",
                baseline=f"{sim_base.indoor_temp_c} °C",
                modified=f"{sim_mod.indoor_temp_c} °C",
                delta=f"{round(sim_mod.indoor_temp_c - sim_base.indoor_temp_c, 1)} °C",
                improved=sim_mod.indoor_temp_c <= sim_base.indoor_temp_c,
                unit="°C"
            ),
            ComparisonMetric(
                metric="Thermal Comfort Score",
                baseline=f"{sim_base.thermal_comfort_score} / 100",
                modified=f"{sim_mod.thermal_comfort_score} / 100",
                delta=f"{round(sim_mod.thermal_comfort_score - sim_base.thermal_comfort_score, 1)} pts",
                improved=sim_mod.thermal_comfort_score >= sim_base.thermal_comfort_score,
                unit="Score"
            ),
            ComparisonMetric(
                metric="Peak Total Heat Gain",
                baseline=f"{sim_base.heat_gain_w} W",
                modified=f"{sim_mod.heat_gain_w} W",
                delta=f"{round(sim_mod.heat_gain_w - sim_base.heat_gain_w, 1)} W",
                improved=sim_mod.heat_gain_w <= sim_base.heat_gain_w,
                unit="W"
            ),
            ComparisonMetric(
                metric="Cooling Energy Demand",
                baseline=f"{sim_base.cooling_energy_kwh_day} kWh/day",
                modified=f"{sim_mod.cooling_energy_kwh_day} kWh/day",
                delta=f"{round(sim_mod.cooling_energy_kwh_day - sim_base.cooling_energy_kwh_day, 2)} kWh",
                improved=sim_mod.cooling_energy_kwh_day <= sim_base.cooling_energy_kwh_day,
                unit="kWh/day"
            ),
            ComparisonMetric(
                metric="Estimated Material & Envelope Cost",
                baseline=f"₹{int(sim_base.estimated_cost_inr):,}",
                modified=f"₹{int(sim_mod.estimated_cost_inr):,}",
                delta=f"₹{int(sim_mod.estimated_cost_inr - sim_base.estimated_cost_inr):,}",
                improved=sim_mod.estimated_cost_inr <= sim_base.estimated_cost_inr,
                unit="INR"
            ),
            ComparisonMetric(
                metric="Sustainability Rating",
                baseline=f"{sim_base.sustainability_score} / 100",
                modified=f"{sim_mod.sustainability_score} / 100",
                delta=f"{round(sim_mod.sustainability_score - sim_base.sustainability_score, 1)} pts",
                improved=sim_mod.sustainability_score >= sim_base.sustainability_score,
                unit="Score"
            ),
            ComparisonMetric(
                metric="Embodied Carbon Footprint",
                baseline=f"{sim_base.embodied_carbon_kg} kg CO2e",
                modified=f"{sim_mod.embodied_carbon_kg} kg CO2e",
                delta=f"{round(sim_mod.embodied_carbon_kg - sim_base.embodied_carbon_kg, 1)} kg",
                improved=sim_mod.embodied_carbon_kg <= sim_base.embodied_carbon_kg,
                unit="kg CO2e"
            )
        ]

        overall_improved = (
            (sim_mod.thermal_comfort_score >= sim_base.thermal_comfort_score) and
            (sim_mod.indoor_temp_c <= sim_base.indoor_temp_c or sim_mod.sustainability_score > sim_base.sustainability_score)
        )

        return {
            "baseline_simulation": sim_base,
            "modified_simulation": sim_mod,
            "metrics": metrics,
            "overall_improved": overall_improved,
            "summary_verdict": "Design Configuration Improved Overall Performance" if overall_improved else "Performance Downgraded in Thermal/Efficiency Attributes"
        }
