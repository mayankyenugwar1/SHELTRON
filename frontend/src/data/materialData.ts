export interface MaterialItem {
  id: string;
  name: string;
  category: 'walls' | 'roof' | 'insulation' | 'flooring' | 'paint' | 'glazing';
  thermalProperty: string;
  uValue?: number;
  costCategory: '₹ Low-Cost' | '₹₹ Moderate' | '₹₹₹ Premium';
  costSqmInr: number;
  climateSuitability: string;
  sustainabilityScore: number; // 0 to 100
  embodiedCarbonKg: number;
  description: string;
  recommendedFor: string[]; // climate zones
  notPreferredFor: string[];
}

export const COMPREHENSIVE_MATERIALS: Record<'walls' | 'roof' | 'insulation' | 'flooring' | 'paint' | 'glazing', MaterialItem[]> = {
  walls: [
    {
      id: "cseb",
      name: "Compressed Stabilized Earth Blocks (CSEB)",
      category: "walls",
      thermalProperty: "U-value: 1.25 W/m²K • Thermal Lag: 9.5 hrs",
      uValue: 1.25,
      costCategory: "₹ Low-Cost",
      costSqmInr: 850,
      climateSuitability: "Optimal for Hot & Dry, Composite, and Temperate zones",
      sustainabilityScore: 96,
      embodiedCarbonKg: 22,
      description: "Locally produced soil stabilized with 5-7% cement/lime. High volumetric heat capacity buffers severe diurnal temperature swings.",
      recommendedFor: ["Hot & Dry", "Composite", "Temperate"],
      notPreferredFor: []
    },
    {
      id: "aac",
      name: "Autoclaved Aerated Concrete (AAC) Blocks",
      category: "walls",
      thermalProperty: "U-value: 0.82 W/m²K • Thermal Lag: 5.5 hrs",
      uValue: 0.82,
      costCategory: "₹₹ Moderate",
      costSqmInr: 1100,
      climateSuitability: "Optimal for Warm & Humid, Composite zones",
      sustainabilityScore: 84,
      embodiedCarbonKg: 45,
      description: "Micro-cellular concrete blocks with superior lightweight thermal resistance. Avoids trapping nighttime heat.",
      recommendedFor: ["Warm & Humid", "Subtropical"],
      notPreferredFor: []
    },
    {
      id: "rammed_earth",
      name: "Insulated Rammed Earth Wall (300mm)",
      category: "walls",
      thermalProperty: "U-value: 0.70 W/m²K • Thermal Lag: 12.0 hrs",
      uValue: 0.70,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 1450,
      climateSuitability: "Optimal for Cold & Arid and Severe Desert zones",
      sustainabilityScore: 98,
      embodiedCarbonKg: 18,
      description: "Monolithic compacted subsoil with internal insulation core. Extreme thermal inertia eliminates night freeze or day heat spikes.",
      recommendedFor: ["Cold & Arid", "Hot & Dry"],
      notPreferredFor: ["Warm & Humid"]
    },
    {
      id: "bamboo_lime",
      name: "Treated Bamboo & Lime Plaster Composite",
      category: "walls",
      thermalProperty: "U-value: 1.10 W/m²K • Thermal Lag: 3.5 hrs",
      uValue: 1.10,
      costCategory: "₹ Low-Cost",
      costSqmInr: 650,
      climateSuitability: "Optimal for Warm & Humid, Flood-prone coastal regions",
      sustainabilityScore: 97,
      embodiedCarbonKg: 12,
      description: "Fast-renewing treated structural bamboo with breathable hydraulic lime render. Naturally resists fungal mold.",
      recommendedFor: ["Warm & Humid", "Subtropical"],
      notPreferredFor: ["Cold & Arid"]
    },
    {
      id: "standard_brick",
      name: "Fired Clay Red Brick (Standard Mortar)",
      category: "walls",
      thermalProperty: "U-value: 2.10 W/m²K • Thermal Lag: 4.2 hrs",
      uValue: 2.10,
      costCategory: "₹₹ Moderate",
      costSqmInr: 1350,
      climateSuitability: "Conventional standard build (High thermal conductance)",
      sustainabilityScore: 48,
      embodiedCarbonKg: 85,
      description: "High embodied energy from coal-kiln firing. Poor thermal resistance allows rapid heat ingress unless thick insulation is added.",
      recommendedFor: [],
      notPreferredFor: ["Hot & Dry", "Cold & Arid", "Warm & Humid"]
    }
  ],
  roof: [
    {
      id: "terracotta_double_skin",
      name: "Sloped Double-Skin Terracotta Ventilated Roof",
      category: "roof",
      thermalProperty: "U-value: 0.55 W/m²K • Solar Reflectance: 0.78",
      uValue: 0.55,
      costCategory: "₹₹ Moderate",
      costSqmInr: 1400,
      climateSuitability: "Universal across Hot & Dry, Composite, Warm & Humid",
      sustainabilityScore: 95,
      embodiedCarbonKg: 28,
      description: "Continuous air cavity between double clay tile layers vents buoyant convective heat before conductively reaching the living zone.",
      recommendedFor: ["Hot & Dry", "Composite", "Warm & Humid", "Temperate"],
      notPreferredFor: []
    },
    {
      id: "cool_membrane_xps",
      name: "Cool-Roof Membrane over Extruded Polystyrene (XPS)",
      category: "roof",
      thermalProperty: "U-value: 0.38 W/m²K • Solar Reflectance: 0.88",
      uValue: 0.38,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 1650,
      climateSuitability: "Optimal for Extreme Heatwave and Composite zones",
      sustainabilityScore: 82,
      embodiedCarbonKg: 48,
      description: "High SRI reflective membrane preventing radiative heating combined with continuous high-density R-3.2 extruded insulation.",
      recommendedFor: ["Hot & Dry", "Composite", "Cold & Arid"],
      notPreferredFor: []
    },
    {
      id: "sedum_green_roof",
      name: "Extensive Sedum Vegetated Green Roof",
      category: "roof",
      thermalProperty: "U-value: 0.32 W/m²K • Thermal Lag: 12.0 hrs",
      uValue: 0.32,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 2300,
      climateSuitability: "Optimal for Temperate, Urban Island, and Composite zones",
      sustainabilityScore: 98,
      embodiedCarbonKg: 25,
      description: "Living biophilic sedum layer providing intense evapotranspiration cooling, rainwater attenuation, and zero solar heat penetration.",
      recommendedFor: ["Temperate", "Composite"],
      notPreferredFor: ["Cold & Arid"]
    },
    {
      id: "uninsulated_rcc",
      name: "Reinforced Concrete Slab (Uninsulated RCC)",
      category: "roof",
      thermalProperty: "U-value: 3.20 W/m²K • Solar Reflectance: 0.25",
      uValue: 3.20,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 1750,
      climateSuitability: "Conventional standard build (Severe heat absorber)",
      sustainabilityScore: 32,
      embodiedCarbonKg: 135,
      description: "Massive thermal storage with low albedo. Absorbs solar watts all afternoon and reradiates high heat downward all night.",
      recommendedFor: [],
      notPreferredFor: ["Hot & Dry", "Composite", "Warm & Humid"]
    },
    {
      id: "corrugated_gi",
      name: "Lightweight Corrugated Metal Sheet (Uninsulated GI)",
      category: "roof",
      thermalProperty: "U-value: 5.80 W/m²K • Thermal Lag: 0.5 hrs",
      uValue: 5.80,
      costCategory: "₹ Low-Cost",
      costSqmInr: 550,
      climateSuitability: "Disaster emergency only (Severe thermal trap)",
      sustainabilityScore: 40,
      embodiedCarbonKg: 62,
      description: "Turns interior into an oven under solar radiation (>48°C indoor peak). Not recommended without secondary shaded false ceiling.",
      recommendedFor: [],
      notPreferredFor: ["Hot & Dry", "Composite", "Warm & Humid", "Cold & Arid"]
    }
  ],
  insulation: [
    {
      id: "woodfiber_wool",
      name: "Rigid Recycled Woodfiber / Mineral Wool (R-2.8)",
      category: "insulation",
      thermalProperty: "Conductivity: 0.038 W/mK • Breathable vapor open",
      costCategory: "₹₹ Moderate",
      costSqmInr: 620,
      climateSuitability: "Universal for all bioclimatic zones",
      sustainabilityScore: 94,
      embodiedCarbonKg: 14,
      description: "Recycled bio-based insulation that prevents thermal bridging while maintaining indoor moisture buffering.",
      recommendedFor: ["Hot & Dry", "Composite", "Cold & Arid", "Temperate"],
      notPreferredFor: []
    },
    {
      id: "eps_insulation",
      name: "Expanded Polystyrene (EPS 50mm Board)",
      category: "insulation",
      thermalProperty: "Conductivity: 0.035 W/mK • Moisture resistant",
      costCategory: "₹ Low-Cost",
      costSqmInr: 480,
      climateSuitability: "Moderate performance alternative",
      sustainabilityScore: 68,
      embodiedCarbonKg: 32,
      description: "Synthetic lightweight polystyrene board with high thermal resistance but petrochemical origin.",
      recommendedFor: ["Cold & Arid", "Composite"],
      notPreferredFor: []
    },
    {
      id: "no_insulation",
      name: "None (Uninsulated envelope)",
      category: "insulation",
      thermalProperty: "Conductivity: 0.850 W/mK • Zero resistance",
      costCategory: "₹ Low-Cost",
      costSqmInr: 0,
      climateSuitability: "Only tolerable in mild temperate zones",
      sustainabilityScore: 50,
      embodiedCarbonKg: 0,
      description: "Exposes shelter to direct exterior thermodynamic conduction. Causes high cooling/heating load.",
      recommendedFor: ["Temperate"],
      notPreferredFor: ["Hot & Dry", "Cold & Arid", "Composite"]
    }
  ],
  flooring: [
    {
      id: "terracotta_paver",
      name: "High Thermal Mass Terracotta Paver",
      category: "flooring",
      thermalProperty: "Specific Heat: 920 J/kgK • Thermal lag buffer",
      costCategory: "₹ Low-Cost",
      costSqmInr: 420,
      climateSuitability: "Optimal for Hot & Dry and Composite zones",
      sustainabilityScore: 95,
      embodiedCarbonKg: 12,
      description: "Porous natural clay pavers in direct contact with stabilized subgrade earth sink daytime heat.",
      recommendedFor: ["Hot & Dry", "Composite", "Temperate"],
      notPreferredFor: []
    },
    {
      id: "raised_bamboo_timber",
      name: "Raised Breathable Slotted Timber / Bamboo Floor",
      category: "flooring",
      thermalProperty: "Allows sub-floor cross breeze • Low thermal mass",
      costCategory: "₹₹ Moderate",
      costSqmInr: 720,
      climateSuitability: "Optimal for Warm & Humid coastal / flood-prone sites",
      sustainabilityScore: 96,
      embodiedCarbonKg: 10,
      description: "Elevates occupants 450mm above damp ground, allowing cool under-floor breezes to circulate continuously.",
      recommendedFor: ["Warm & Humid", "Subtropical"],
      notPreferredFor: ["Cold & Arid"]
    },
    {
      id: "polished_dark_stone",
      name: "Dark Polished Kadappa / Granite Stone",
      category: "flooring",
      thermalProperty: "High volumetric heat capacity • Solar sponge",
      costCategory: "₹₹ Moderate",
      costSqmInr: 880,
      climateSuitability: "Optimal for Cold & Arid direct solar gain rooms",
      sustainabilityScore: 82,
      embodiedCarbonKg: 28,
      description: "Acts as a thermal sponge, soaking in low winter sunshine through south windows and releasing heat overnight.",
      recommendedFor: ["Cold & Arid"],
      notPreferredFor: ["Hot & Dry"]
    },
    {
      id: "vitrified_ceramic",
      name: "Standard Vitrified Glossy Ceramic Tile",
      category: "flooring",
      thermalProperty: "Low breathability • High manufacturing energy",
      costCategory: "₹₹ Moderate",
      costSqmInr: 650,
      climateSuitability: "Conventional commercial alternative",
      sustainabilityScore: 58,
      embodiedCarbonKg: 42,
      description: "Standard industrial tiles. Impermeable surface prevents passive ground coupling cooling.",
      recommendedFor: [],
      notPreferredFor: []
    }
  ],
  paint: [
    {
      id: "high_albedo_cool",
      name: "High-Albedo Cool Paint (Solar Reflectance Index 104)",
      category: "paint",
      thermalProperty: "Solar Reflectance: 0.88 • Thermal Emittance: 0.91",
      costCategory: "₹ Low-Cost",
      costSqmInr: 120,
      climateSuitability: "Universal for all hot and composite climates",
      sustainabilityScore: 92,
      embodiedCarbonKg: 4,
      description: "Micro-ceramic beads reflect 88% of solar photons back to the sky, dropping exterior surface temperatures by up to 14°C.",
      recommendedFor: ["Hot & Dry", "Composite", "Warm & Humid"],
      notPreferredFor: ["Cold & Arid"]
    },
    {
      id: "natural_slaked_lime",
      name: "Traditional Natural Slaked Lime Wash (Eco-Cool)",
      category: "paint",
      thermalProperty: "Solar Reflectance: 0.82 • High vapor breathability",
      costCategory: "₹ Low-Cost",
      costSqmInr: 35,
      climateSuitability: "Optimal for rural, heritage, and low-budget shelters",
      sustainabilityScore: 99,
      embodiedCarbonKg: 2,
      description: "Zero-VOC mineral slaked lime wash. Naturally anti-bacterial, highly reflective, and low carbon.",
      recommendedFor: ["Hot & Dry", "Warm & Humid", "Composite"],
      notPreferredFor: []
    },
    {
      id: "acrylic_weather",
      name: "Standard Exterior Acrylic Weather Emulsion",
      category: "paint",
      thermalProperty: "Solar Reflectance: 0.35 • Moderate durability",
      costCategory: "₹ Low-Cost",
      costSqmInr: 75,
      climateSuitability: "Standard commercial paint (Limited solar reflection)",
      sustainabilityScore: 62,
      embodiedCarbonKg: 12,
      description: "Standard petroleum-derived binder. Darker or medium pigments absorb significant radiant solar heat.",
      recommendedFor: ["Cold & Arid"],
      notPreferredFor: ["Hot & Dry"]
    }
  ],
  glazing: [
    {
      id: "double_low_e",
      name: "Double Glazed Low-E Glass (Argon Filled)",
      category: "glazing",
      thermalProperty: "U-value: 1.6 W/m²K • SHGC: 0.32 • VLT: 65%",
      uValue: 1.6,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 3100,
      climateSuitability: "Optimal for Hot & Dry, Composite climates",
      sustainabilityScore: 88,
      embodiedCarbonKg: 35,
      description: "Spectrally selective microscopic silver coating admits visible daylight while reflecting invisible thermal infrared rays.",
      recommendedFor: ["Hot & Dry", "Composite"],
      notPreferredFor: []
    },
    {
      id: "double_clear",
      name: "Double Clear Glazing (6-12-6mm air gap)",
      category: "glazing",
      thermalProperty: "U-value: 2.8 W/m²K • SHGC: 0.68 • VLT: 78%",
      uValue: 2.8,
      costCategory: "₹₹ Moderate",
      costSqmInr: 1950,
      climateSuitability: "Balanced performance for Temperate and Humid regions",
      sustainabilityScore: 78,
      embodiedCarbonKg: 28,
      description: "Dual panes with sealed air cavity provide good acoustic and conductive insulation at moderate cost.",
      recommendedFor: ["Warm & Humid", "Temperate"],
      notPreferredFor: []
    },
    {
      id: "triple_krypton",
      name: "Triple Glazed Krypton (High Thermal Zone)",
      category: "glazing",
      thermalProperty: "U-value: 0.9 W/m²K • SHGC: 0.28 • VLT: 58%",
      uValue: 0.9,
      costCategory: "₹₹₹ Premium",
      costSqmInr: 5400,
      climateSuitability: "Mandatory for extreme sub-zero Cold & Arid zones",
      sustainabilityScore: 84,
      embodiedCarbonKg: 52,
      description: "Three panes with inert krypton gas fill. Eliminates window condensation and internal radiant freeze.",
      recommendedFor: ["Cold & Arid"],
      notPreferredFor: ["Warm & Humid", "Hot & Dry"]
    },
    {
      id: "single_clear",
      name: "Single Clear Glass (4mm standard)",
      category: "glazing",
      thermalProperty: "U-value: 5.7 W/m²K • SHGC: 0.82 • VLT: 88%",
      uValue: 5.7,
      costCategory: "₹ Low-Cost",
      costSqmInr: 850,
      climateSuitability: "Budget temporary shelter only",
      sustainabilityScore: 55,
      embodiedCarbonKg: 18,
      description: "Zero thermal resistance. Conducts outside heat directly inward and creates severe greenhouse overheating unless shaded.",
      recommendedFor: [],
      notPreferredFor: ["Hot & Dry", "Cold & Arid", "Composite"]
    }
  ]
};

export interface ComfortDirective {
  category: 'natural_cooling' | 'plants' | 'shading' | 'daylight' | 'warm_lighting' | 'cool_lighting' | 'glazing';
  title: string;
  icon: string;
  recommendation: string;
  thermalPhysicsBasis: string;
  expectedComfortImprovement: string;
}

export const COMFORT_RECOMMENDATIONS: Record<string, ComfortDirective[]> = {
  "Hot & Dry": [
    {
      category: "natural_cooling",
      title: "Night Flush Convective Purge",
      icon: "💨",
      recommendation: "Operate high clerestory vents strictly between 22:00 and 06:00; seal envelope during peak daytime hours (11:00 - 17:00).",
      thermalPhysicsBasis: "Air exchange during cool nighttime hours (24°C) dumps heat stored in heavy CSEB earth mass, preparing structure for next day.",
      expectedComfortImprovement: "-3.5°C lower morning indoor start temperature"
    },
    {
      category: "plants",
      title: "Deciduous Shade Canopy Placement",
      icon: "🌿",
      recommendation: "Plant high-canopy deciduous trees (Neem / Peepal) along South-West perimeter 4.5m from shelter wall.",
      thermalPhysicsBasis: "Dense foliage intercepts direct solar beam radiation (6.3 kWh/m²) and provides localized evaporative transpiration cooling.",
      expectedComfortImprovement: "Reduces exterior sol-air facade temperature by up to 6.2°C"
    },
    {
      category: "shading",
      title: "Deep Horizontal Overhangs (Chajjas)",
      icon: "☂️",
      recommendation: "Install 0.9m horizontal cantilevered overhangs on South and North facades; vertical terracotta fins on East/West.",
      thermalPhysicsBasis: "Cut-off angle blocks summer solar elevation rays (>68°) while allowing ambient indirect diffuse light.",
      expectedComfortImprovement: "68% reduction in peak solar window heat flux"
    },
    {
      category: "daylight",
      title: "Indirect High Clerestory Illumination",
      icon: "☀️",
      recommendation: "Place horizontal strip windows 2.4m above floor level facing North to provide uniform diffused illumination.",
      thermalPhysicsBasis: "Diffuse north sky daylight provides 350-500 lux without accompanying thermal infrared solar gain.",
      expectedComfortImprovement: "Eliminates daytime artificial lighting heat load (saves ~5 W/m²)"
    },
    {
      category: "warm_lighting",
      title: "Warm LED Task Lighting (2700K)",
      icon: "💡",
      recommendation: "Use low-wattage 2700K warm LED task fixtures directed downward for nighttime reading and rest zones.",
      thermalPhysicsBasis: "Warm spectrum emits minimal blue circadian disturbance and solid-state low-wattage drivers prevent internal thermal buildup.",
      expectedComfortImprovement: "Calming psychological comfort; zero parasitic heat gain"
    },
    {
      category: "cool_lighting",
      title: "Cool Ambient Day-Simulation (4000K)",
      icon: "🔦",
      recommendation: "Deploy 4000K diffused ceiling downlights during cloudy or late afternoon working hours only.",
      thermalPhysicsBasis: "Matches natural daytime color temperature to maintain alert cognitive focus without glaring glare contrast.",
      expectedComfortImprovement: "Optimal visual acuity in medical or classroom setups"
    },
    {
      category: "glazing",
      title: "Low-E Double Glazing with Argon Gap",
      icon: "🪟",
      recommendation: "Specify Double Glazed Low-E Glass (SHGC < 0.32, U < 1.6 W/m²K).",
      thermalPhysicsBasis: "Spectrally selective coating reflects longwave infrared heat while transmitting 65% visible light.",
      expectedComfortImprovement: "Prevents radiant perimeter hot-spots around windows"
    }
  ],
  "Warm & Humid": [
    {
      category: "natural_cooling",
      title: "Continuous Convective Cross-Breeze",
      icon: "💨",
      recommendation: "Maintain unrestricted windward-to-leeward air paths across living and sleeping planes with permeable jali louvers.",
      thermalPhysicsBasis: "Air velocity of 0.8 - 1.2 m/s enhances skin sweat evaporation, offsetting uncomfortable high relative humidity (74% RH).",
      expectedComfortImprovement: "Lowers physiological operative skin temperature by 2.5°C"
    },
    {
      category: "plants",
      title: "High-Canopy Palm & Airway Shading",
      icon: "🌿",
      recommendation: "Plant tall palms that cast roof shadows without blocking ground-level breeze channels.",
      thermalPhysicsBasis: "Preserves horizontal wind velocity streamlines while shielding building roof from direct tropical zenith sun.",
      expectedComfortImprovement: "Maintains unimpeded 1.1 m/s cross breeze through openings"
    },
    {
      category: "shading",
      title: "Wrap-Around Veranda Eaves (>1.2m)",
      icon: "☂️",
      recommendation: "Construct continuous 1.2m overhang verandas on all exposed facades.",
      thermalPhysicsBasis: "Protects walls from monsoon driving rains while keeping windows open for full ventilation during storms.",
      expectedComfortImprovement: "Permits 100% ventilation even during heavy precipitation"
    },
    {
      category: "daylight",
      title: "Deep Veranda Reflected Daylighting",
      icon: "☀️",
      recommendation: "Utilize light-colored veranda ceilings to reflect diffused daylight deep into interior rooms.",
      thermalPhysicsBasis: "Prevents direct high-contrast glare while achieving 300+ lux natural daylight across the floor.",
      expectedComfortImprovement: "Glare-free visual comfort across the entire space"
    },
    {
      category: "warm_lighting",
      title: "Soft 3000K Evening Lighting",
      icon: "💡",
      recommendation: "Deploy enclosed IP65 moisture-rated 3000K warm LED strips along baseboards and perimeter coves.",
      thermalPhysicsBasis: "Sealed moisture-proof fixtures resist high coastal humidity corrosion while providing relaxing illumination.",
      expectedComfortImprovement: "High humidity durability and soothing visual ambience"
    },
    {
      category: "cool_lighting",
      title: "Cool 4000K Moisture-Rated Task Fixtures",
      icon: "🔦",
      recommendation: "Deploy 4000K cool LED task lighting above desk/clinic work surfaces.",
      thermalPhysicsBasis: "Creates psychologically refreshing cool-feeling illumination in warm humid environments.",
      expectedComfortImprovement: "Psychological feeling of freshness in humid conditions"
    },
    {
      category: "glazing",
      title: "Louvered Aerodynamic Double Glazing",
      icon: "🪟",
      recommendation: "Combine Double Clear Glazing with exterior operable wooden/aluminum louvered shutters.",
      thermalPhysicsBasis: "Enables 100% aperture opening area when breezy and complete storm sealing during squalls.",
      expectedComfortImprovement: "Maximum flexible airflow control"
    }
  ],
  "Composite": [
    {
      category: "natural_cooling",
      title: "Dual-Mode Seasonal Ventilation",
      icon: "💨",
      recommendation: "Operate in night purge mode during dry summer; switch to continuous cross-ventilation during humid monsoon months.",
      thermalPhysicsBasis: "Adapts to extreme seasonal shifts between dry desert heat (May) and humid tropical monsoons (July-August).",
      expectedComfortImprovement: "Year-round comfort matching seasonal ambient conditions"
    },
    {
      category: "plants",
      title: "Deciduous Shade Trees on South & West",
      icon: "🌿",
      recommendation: "Plant deciduous varieties that shed leaves in winter (admitting sun) and flourish in summer (providing dense shade).",
      thermalPhysicsBasis: "Dynamic natural solar control: 85% summer shade and 70% winter solar transmission.",
      expectedComfortImprovement: "Seasonal passive solar optimization without mechanical shutters"
    },
    {
      category: "shading",
      title: "Adjustable Exterior Louvers",
      icon: "☂️",
      recommendation: "Install 0.8m overhangs with adjustable secondary bamboo/terracotta louvers.",
      thermalPhysicsBasis: "Provides high-angle summer solar cutoff while permitting low winter sun to warm interior floors.",
      expectedComfortImprovement: "Cuts summer heat by 60%; increases winter warmth by 25%"
    },
    {
      category: "daylight",
      title: "Balanced Bilateral Daylighting",
      icon: "☀️",
      recommendation: "Symmetrical North-South windows providing daylight distribution without dark corners.",
      thermalPhysicsBasis: "Minimizes reliance on daytime electric lighting while preventing asymmetric solar thermal loading.",
      expectedComfortImprovement: "Uniform 400 lux illumination across 85% of floor area"
    },
    {
      category: "warm_lighting",
      title: "Warm 2700K Low-Energy LEDs",
      icon: "💡",
      recommendation: "2700K warm LED luminaires for winter warmth and tranquil evening occupancy.",
      thermalPhysicsBasis: "Enhances psychological warmth during chilly composite winter nights (5°C - 8°C).",
      expectedComfortImprovement: "Cozy interior perception during winter months"
    },
    {
      category: "cool_lighting",
      title: "Dynamic Tunable 3500K - 4500K LEDs",
      icon: "🔦",
      recommendation: "Install tunable white LED luminaires that transition between warm and cool depending on season.",
      thermalPhysicsBasis: "Aligns human circadian rhythm with changing seasonal daylengths.",
      expectedComfortImprovement: "Enhanced occupant well-being and alertness"
    },
    {
      category: "glazing",
      title: "Double Glazed Low-E Glass with Air Gap",
      icon: "🪟",
      recommendation: "Double Glazed Low-E Glass with argon gas fill (U < 1.6 W/m²K, SHGC ~0.35).",
      thermalPhysicsBasis: "Balances summer solar rejection with winter thermal insulation.",
      expectedComfortImprovement: "Prevents seasonal overheating and winter heat loss"
    }
  ]
};
