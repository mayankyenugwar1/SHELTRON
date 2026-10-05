from app.models import ClimateData, SiteRequirements, DesignRecommendation, ShelterParameters

class RecommendationEngine:
    """Deterministic, rules-based climate-adaptive architecture generator."""

    @staticmethod
    def generate_recommendations(climate: ClimateData, site: SiteRequirements) -> (DesignRecommendation, ShelterParameters):
        zone = climate.climate_zone

        # Defaults tailored per climate zone
        if "Hot & Dry" in zone:
            rec = DesignRecommendation(
                orientation_recommendation="Long axis aligned East-West (10° North bias) to minimize intense solar exposure on broad facades.",
                layout_zoning="Compact courtyard layout with daytime activity zones situated centrally, buffered by storage/services on the West.",
                roof_design="Double-skin ventilated pitched roof or vaulted high-mass roof with high solar reflectance index (SRI > 100).",
                roof_slope="15° to 20° slope optimized for radiant night-sky re-radiation and rapid storm runoff.",
                window_placement="Windows primarily on North and shaded South facades; minimal or recessed openings on East and West.",
                window_size_wwr="12% - 15% Window-to-Wall Ratio (WWR) with deep external overhangs (chajjas) and micro-louvers.",
                shading_strategy="Deep horizontal fins (overhang ≥ 0.9m) on North/South, vertical movable terracotta louvers on East/West.",
                cross_ventilation="Night purge ventilation strategy with high clerestory vents while maintaining sealed daytime microclimate.",
                insulation_strategy="External envelope thermal mass (CSEB / Rammed Earth) + R-2.5 natural mineral wool to delay thermal peak.",
                wall_material_recommendation="Compressed Stabilized Earth Blocks (CSEB) or 300mm Rammed Earth for high thermal lag (>9 hrs).",
                roof_material_recommendation="Sloped Double-Skin Terracotta Ventilated Roof with radiant radiant barrier.",
                flooring_recommendation="High thermal mass terracotta pavers over stabilized soil base.",
                paint_coating_recommendation="High-Albedo Cool Paint (SRI 104) or traditional natural slaked lime wash.",
                glazing_recommendation="Double Glazed Low-E Glass (U-value < 1.8, SHGC < 0.35).",
                natural_cooling_plants="Deciduous dense shade trees on West/Southwest (Neem, Peepal); central evaporative water basin or potted courtyard buffer.",
                daylight_and_lighting="Indirect diffused daylight through high clerestories; warm 2700K low-heat task LEDs.",
                climate_rationale="In Hot & Dry climates, the priority is minimizing solar heat gain through compact forms, high thermal mass to bridge large diurnal temperature swings (15°C+), and nighttime convective cooling."
            )
            params = ShelterParameters(
                orientation_deg=10.0,
                roof_type="Sloped Double-Skin Roof",
                roof_slope_deg=15.0,
                roof_material="Sloped Double-Skin Terracotta Ventilated Roof",
                wall_material="Compressed Stabilized Earth Blocks (CSEB)",
                flooring_material="High Thermal Mass Terracotta Paver",
                paint_coating="High-Albedo Cool Paint (SRI 104)",
                window_glazing="Double Glazed Low-E Glass (Argon Filled)",
                window_to_wall_ratio_pct=14.0,
                shading_overhang_m=0.9,
                cross_ventilation_strategy="Night Purge Clerestory Convection",
                insulation_type="Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
                natural_cooling_buffer=True
            )
        elif "Warm & Humid" in zone:
            rec = DesignRecommendation(
                orientation_recommendation="Orient long axis perpendicular to prevailing coastal breeze (typically SE/SW) to maximize natural airflow.",
                layout_zoning="Linear, elongated open-plan layout (single-banked rooms) promoting unimpeded breeze cross-circulation.",
                roof_design="Steeply sloping roof with generous ventilated overhangs (>1.2m) protecting walls from heavy rain and direct sun.",
                roof_slope="25° to 35° pitched roof facilitating rapid rain shedding and buoyancy-driven hot air stack exhaust.",
                window_placement="Large, operable openings on windward and leeward sides placed at occupant sitting and sleeping heights.",
                window_size_wwr="25% - 30% Window-to-Wall Ratio (WWR) equipped with rain-proof louvered jali shutters.",
                shading_strategy="Continuous wrap-around verandas and extended solar eaves shielding walls and glass completely.",
                cross_ventilation="Maximized permanent cross-ventilation with permeable bamboo screens and high ridge ventilators.",
                insulation_strategy="Lightweight reflective roof insulation to avoid nighttime thermal radiation into living spaces.",
                wall_material_recommendation="Treated Bamboo & Lime Plaster Composite or permeable AAC blocks with breathable lime plaster.",
                roof_material_recommendation="Sloped Double-Skin Terracotta Ventilated Roof with wide eaves.",
                flooring_recommendation="Raised timber or breathable clay tiles allowing ground airflow beneath floor.",
                paint_coating_recommendation="High-Albedo Cool Paint (SRI 104) resisting fungal growth in high humidity.",
                glazing_recommendation="Double Clear Glazing (6-12-6mm) with exterior wooden jali louvers.",
                natural_cooling_plants="Tall palm varieties and high-canopy indigenous trees that do not obstruct ground-level cooling breezes.",
                daylight_and_lighting="Maximized soft natural daylight through deep verandas; cool 4000K moisture-rated LED fixtures.",
                climate_rationale="In Warm & Humid climates, continuous natural air velocity (≥0.5 m/s) is essential to lower skin physiological temperature. High thermal mass is avoided to prevent trapped nighttime heat."
            )
            params = ShelterParameters(
                orientation_deg=45.0,
                roof_type="Sloped Double-Skin Roof",
                roof_slope_deg=25.0,
                roof_material="Sloped Double-Skin Terracotta Ventilated Roof",
                wall_material="Treated Bamboo & Lime Plaster Composite",
                flooring_material="High Thermal Mass Terracotta Paver",
                paint_coating="High-Albedo Cool Paint (SRI 104)",
                window_glazing="Double Clear Glazing (6-12-6mm air gap)",
                window_to_wall_ratio_pct=26.0,
                shading_overhang_m=1.2,
                cross_ventilation_strategy="Continuous Louver Cross Ventilation",
                insulation_type="Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
                natural_cooling_buffer=True
            )
        elif "Cold" in zone:
            rec = DesignRecommendation(
                orientation_recommendation="Strict South orientation (0° deviation) to trap maximum direct solar thermal insolation.",
                layout_zoning="Extremely compact rectangular envelope; buffer spaces (stores, livestock/utility) placed along freezing North wall.",
                roof_design="Insulated flat or low-slope solar mass roof equipped with passive skylight solar collectors.",
                roof_slope="10° to 15° slope or flat trombe surface capturing winter sun.",
                window_placement="Expansive double/triple glazed solar windows facing South; zero or micro-windows on North wall.",
                window_size_wwr="20% - 25% on South facade; <5% on all other orientations.",
                shading_strategy="Removable or high-angle summer-only overhangs; allow unobstructed low winter solar rays (28° azimuth).",
                cross_ventilation="Airtight sealed thermal envelope with controlled heat-recovery ventilation louvers.",
                insulation_strategy="Continuous exterior envelope super-insulation (R-4+) with thermal bridge elimination.",
                wall_material_recommendation="Insulated Rammed Earth Wall (300mm) with external wool insulation layer.",
                roof_material_recommendation="Cool-Roof Membrane over Extruded Polystyrene (XPS) with internal thermal mass ceiling.",
                flooring_recommendation="Dark polished stone or earth floor functioning as direct-gain solar thermal sponge.",
                paint_coating_recommendation="Standard dark solar-absorbing finish on exterior solar trap areas.",
                glazing_recommendation="Triple Glazed Krypton (High Thermal Zone).",
                natural_cooling_plants="Coniferous evergreen windbreaks on North and Northwest to deflect frigid winter gales.",
                daylight_and_lighting="Direct solar heat gain through south glazed solarium; warm 3000K ambient illumination.",
                climate_rationale="In Cold climates, the envelope must capture every solar watt during daytime, store heat in internal heavy mass, and prevent conductio-convective heat bleeding at night."
            )
            params = ShelterParameters(
                orientation_deg=0.0,
                roof_type="Flat Concrete",
                roof_slope_deg=10.0,
                roof_material="Cool-Roof Membrane over Extruded Polystyrene (XPS)",
                wall_material="Insulated Rammed Earth Wall (300mm)",
                flooring_material="High Thermal Mass Terracotta Paver",
                paint_coating="Standard Acrylic Weather Emulsion",
                window_glazing="Triple Glazed Krypton (High Thermal Zone)",
                window_to_wall_ratio_pct=20.0,
                shading_overhang_m=0.5,
                cross_ventilation_strategy="Airtight Envelope with Controlled Trickle Vents",
                insulation_type="Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
                natural_cooling_buffer=False
            )
        else:
            # Composite / Temperate fallback
            rec = DesignRecommendation(
                orientation_recommendation="East-West alignment with moderate North/South glazing balances both summer cooling and winter heat.",
                layout_zoning="Flexible semi-open courtyard configuration with seasonal adaptive transitional zones.",
                roof_design="Insulated pitched or terrace roof with cool reflective topcoat and green vegetation patches.",
                roof_slope="15° slope facilitating rainwater harvesting and balanced solar deflection.",
                window_placement="Balanced North-South windows with adjustable shading screens.",
                window_size_wwr="16% - 20% WWR with seasonal operable solar shading.",
                shading_strategy="Adjustable exterior louvers and deciduous trellises providing summer shade while admitting winter sun.",
                cross_ventilation="Dual-mode operable windows with high-level stack vents for humid monsoons.",
                insulation_strategy="Balanced external thermal mass combined with breathable cavity insulation.",
                wall_material_recommendation="Autoclaved Aerated Concrete (AAC) Blocks or CSEB.",
                roof_material_recommendation="Sloped Double-Skin Terracotta Ventilated Roof.",
                flooring_recommendation="High Thermal Mass Terracotta Paver.",
                paint_coating_recommendation="High-Albedo Cool Paint (SRI 104).",
                glazing_recommendation="Double Glazed Low-E Glass (Argon Filled).",
                natural_cooling_plants="Deciduous shade trees to South and West; green vegetative facade screening.",
                daylight_and_lighting="Ample natural daylighting minimizing artificial lighting load; 3500K dynamic LEDs.",
                climate_rationale="Composite climates experience extreme summers, monsoons, and cool winters. The shelter employs adaptive shading, dual-mode ventilation, and high thermal mass."
            )
            params = ShelterParameters(
                orientation_deg=15.0,
                roof_type="Sloped Double-Skin Roof",
                roof_slope_deg=15.0,
                roof_material="Sloped Double-Skin Terracotta Ventilated Roof",
                wall_material="Autoclaved Aerated Concrete (AAC) Blocks",
                flooring_material="High Thermal Mass Terracotta Paver",
                paint_coating="High-Albedo Cool Paint (SRI 104)",
                window_glazing="Double Glazed Low-E Glass (Argon Filled)",
                window_to_wall_ratio_pct=18.0,
                shading_overhang_m=0.8,
                cross_ventilation_strategy="Cross Ventilation with Clerestory Louvers",
                insulation_type="Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
                natural_cooling_buffer=True
            )

        return rec, params
