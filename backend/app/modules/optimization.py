import copy
from typing import Dict, Any, List
from app.models import SiteRequirements, ClimateData, ShelterParameters, SimulationResults
from app.modules.simulation import ThermalSimulationEngine
from app.modules.materials import MATERIAL_CATALOG

class OptimizationEngine:
    """
    Multi-objective Pareto-oriented design optimizer.
    Finds optimal parameter combinations balancing thermal comfort, carbon footprint, and budget constraints.
    """

    @staticmethod
    def optimize_shelter(site: SiteRequirements, climate: ClimateData, current_params: ShelterParameters) -> Dict[str, Any]:
        best_params = copy.deepcopy(current_params)
        best_score = -1e9
        best_sim = None
        evaluations: List[Dict[str, Any]] = []

        candidate_orientations = [0.0, 15.0, 90.0]
        candidate_roofs = list(MATERIAL_CATALOG["roofs"].keys())
        candidate_walls = list(MATERIAL_CATALOG["walls"].keys())
        candidate_wwrs = [14.0, 18.0, 24.0]

        for orientation in candidate_orientations:
            for roof in candidate_roofs[:3]: # Top 3 roof variants
                for wall in candidate_walls[:3]: # Top 3 wall variants
                    for wwr in candidate_wwrs:
                        test_param = copy.deepcopy(current_params)
                        test_param.orientation_deg = orientation
                        test_param.roof_material = roof
                        test_param.wall_material = wall
                        test_param.window_to_wall_ratio_pct = wwr
                        
                        sim = ThermalSimulationEngine.simulate(site, climate, test_param)
                        
                        # Penalty for exceeding budget
                        budget_penalty = max(0.0, (sim.estimated_cost_inr - site.budget_inr) / 5000.0)
                        
                        # Multi-objective composite objective function
                        # Objective: Maximize comfort + sustainability, Minimize indoor temp and cost penalty
                        fitness = (
                            (sim.thermal_comfort_score * 1.5) +
                            (sim.sustainability_score * 1.2) -
                            (sim.indoor_temp_c * 1.8) -
                            (sim.cooling_energy_kwh_day * 0.8) -
                            budget_penalty
                        )

                        evaluations.append({
                            "orientation": orientation,
                            "roof": roof,
                            "wall": wall,
                            "wwr": wwr,
                            "comfort_score": sim.thermal_comfort_score,
                            "indoor_temp": sim.indoor_temp_c,
                            "cost": sim.estimated_cost_inr,
                            "fitness": fitness
                        })

                        if fitness > best_score:
                            best_score = fitness
                            best_params = test_param
                            best_sim = sim

        evaluations.sort(key=lambda x: x["fitness"], reverse=True)

        return {
            "optimized_parameters": best_params,
            "optimized_simulation": best_sim,
            "top_candidates_explored": len(evaluations),
            "top_alternatives": evaluations[:5]
        }
