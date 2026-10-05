from typing import Dict, Any, List

MATERIAL_CATALOG: Dict[str, Dict[str, Any]] = {
    "walls": {
        "Compressed Stabilized Earth Blocks (CSEB)": {
            "u_value": 1.25, # W/m2K
            "thermal_mass": "Very High",
            "embodied_carbon_kg_m2": 22.0,
            "cost_sqm_inr": 850.0,
            "sustainability_rating": 95,
            "suitable_climates": ["Hot & Dry", "Composite", "Temperate"]
        },
        "Autoclaved Aerated Concrete (AAC) Blocks": {
            "u_value": 0.82,
            "thermal_mass": "Medium",
            "embodied_carbon_kg_m2": 45.0,
            "cost_sqm_inr": 1100.0,
            "sustainability_rating": 82,
            "suitable_climates": ["Warm & Humid", "Hot & Dry", "Composite"]
        },
        "Fired Clay Red Brick (Standard Mortar)": {
            "u_value": 2.10,
            "thermal_mass": "High",
            "embodied_carbon_kg_m2": 85.0,
            "cost_sqm_inr": 1350.0,
            "sustainability_rating": 50,
            "suitable_climates": ["Composite", "Cold & Arid"]
        },
        "Insulated Rammed Earth Wall (300mm)": {
            "u_value": 0.70,
            "thermal_mass": "Extremely High",
            "embodied_carbon_kg_m2": 18.0,
            "cost_sqm_inr": 1450.0,
            "sustainability_rating": 98,
            "suitable_climates": ["Hot & Dry", "Cold & Arid"]
        },
        "Treated Bamboo & Lime Plaster Composite": {
            "u_value": 1.10,
            "thermal_mass": "Low-Medium",
            "embodied_carbon_kg_m2": 12.0,
            "cost_sqm_inr": 650.0,
            "sustainability_rating": 96,
            "suitable_climates": ["Warm & Humid", "Subtropical"]
        }
    },
    "roofs": {
        "Sloped Double-Skin Terracotta Ventilated Roof": {
            "u_value": 0.55,
            "solar_reflectance": 0.78,
            "thermal_lag_hours": 9.5,
            "cost_sqm_inr": 1400.0,
            "embodied_carbon_kg_m2": 28.0,
            "sustainability_rating": 94
        },
        "Reinforced Concrete Slab (Uninsulated)": {
            "u_value": 3.20,
            "solar_reflectance": 0.25,
            "thermal_lag_hours": 4.0,
            "cost_sqm_inr": 1750.0,
            "embodied_carbon_kg_m2": 135.0,
            "sustainability_rating": 35
        },
        "Cool-Roof Membrane over Extruded Polystyrene (XPS)": {
            "u_value": 0.38,
            "solar_reflectance": 0.88,
            "thermal_lag_hours": 8.0,
            "cost_sqm_inr": 1650.0,
            "embodied_carbon_kg_m2": 48.0,
            "sustainability_rating": 80
        },
        "Lightweight Corrugated Metal Sheet (Uninsulated GI)": {
            "u_value": 5.80,
            "solar_reflectance": 0.35,
            "thermal_lag_hours": 0.5,
            "cost_sqm_inr": 550.0,
            "embodied_carbon_kg_m2": 62.0,
            "sustainability_rating": 40
        },
        "Extensive Sedum Vegetated Green Roof": {
            "u_value": 0.32,
            "solar_reflectance": 0.82,
            "thermal_lag_hours": 12.0,
            "cost_sqm_inr": 2300.0,
            "embodied_carbon_kg_m2": 25.0,
            "sustainability_rating": 97
        }
    },
    "glazing": {
        "Single Clear Glass (4mm standard)": {
            "u_value": 5.7,
            "shgc": 0.82,
            "cost_sqm_inr": 850.0,
            "vlt": 0.88
        },
        "Double Glazed Low-E Glass (Argon Filled)": {
            "u_value": 1.6,
            "shgc": 0.32,
            "cost_sqm_inr": 3100.0,
            "vlt": 0.65
        },
        "Double Clear Glazing (6-12-6mm air gap)": {
            "u_value": 2.8,
            "shgc": 0.68,
            "cost_sqm_inr": 1950.0,
            "vlt": 0.78
        },
        "Triple Glazed Krypton (High Thermal Zone)": {
            "u_value": 0.9,
            "shgc": 0.28,
            "cost_sqm_inr": 5400.0,
            "vlt": 0.58
        }
    },
    "coatings": {
        "High-Albedo Cool Paint (SRI 104)": {
            "albedo_boost": 0.35,
            "cost_sqm_inr": 120.0,
            "durability_years": 5
        },
        "Standard Acrylic Weather Emulsion": {
            "albedo_boost": 0.10,
            "cost_sqm_inr": 75.0,
            "durability_years": 4
        },
        "Traditional Natural Slaked Lime Wash (Eco-cool)": {
            "albedo_boost": 0.32,
            "cost_sqm_inr": 35.0,
            "durability_years": 2
        }
    },
    "insulation": {
        "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)": {
            "thermal_conductivity": 0.038,
            "cost_sqm_inr": 620.0,
            "embodied_carbon_factor": 1.1
        },
        "None (Uninsulated envelope)": {
            "thermal_conductivity": 0.85,
            "cost_sqm_inr": 0.0,
            "embodied_carbon_factor": 1.0
        },
        "Expanded Polystyrene (EPS 50mm)": {
            "thermal_conductivity": 0.035,
            "cost_sqm_inr": 480.0,
            "embodied_carbon_factor": 2.4
        }
    }
}

class MaterialSelector:
    @staticmethod
    def get_catalog() -> Dict[str, Any]:
        return MATERIAL_CATALOG
