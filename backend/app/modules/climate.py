import math
from typing import Dict, Any, List
from app.models import ClimateData

# Indian & Global benchmark climate regions database
CLIMATE_DATABASE: Dict[str, Dict[str, Any]] = {
    "Jodhpur, Rajasthan": {
        "climate_zone": "Hot & Dry",
        "avg_temperature_c": 33.5,
        "peak_summer_temp_c": 44.8,
        "winter_min_temp_c": 11.0,
        "relative_humidity_pct": 28.0,
        "wind_speed_ms": 3.4,
        "prevailing_wind_direction": "SW",
        "solar_insolation_kwh_m2": 6.3,
        "annual_rainfall_mm": 360.0,
        "extreme_heatwave_risk": "Severe",
        "diurnal_temp_range_c": 15.2,
    },
    "Chennai, Tamil Nadu": {
        "climate_zone": "Warm & Humid",
        "avg_temperature_c": 31.8,
        "peak_summer_temp_c": 40.2,
        "winter_min_temp_c": 21.5,
        "relative_humidity_pct": 74.0,
        "wind_speed_ms": 4.1,
        "prevailing_wind_direction": "SE",
        "solar_insolation_kwh_m2": 5.4,
        "annual_rainfall_mm": 1380.0,
        "extreme_heatwave_risk": "Moderate",
        "diurnal_temp_range_c": 7.5,
    },
    "New Delhi, Delhi NCR": {
        "climate_zone": "Composite",
        "avg_temperature_c": 29.5,
        "peak_summer_temp_c": 45.1,
        "winter_min_temp_c": 5.8,
        "relative_humidity_pct": 52.0,
        "wind_speed_ms": 2.8,
        "prevailing_wind_direction": "NW",
        "solar_insolation_kwh_m2": 5.8,
        "annual_rainfall_mm": 790.0,
        "extreme_heatwave_risk": "Severe",
        "diurnal_temp_range_c": 13.8,
    },
    "Bengaluru, Karnataka": {
        "climate_zone": "Temperate",
        "avg_temperature_c": 24.2,
        "peak_summer_temp_c": 36.4,
        "winter_min_temp_c": 15.1,
        "relative_humidity_pct": 58.0,
        "wind_speed_ms": 3.2,
        "prevailing_wind_direction": "W",
        "solar_insolation_kwh_m2": 5.5,
        "annual_rainfall_mm": 970.0,
        "extreme_heatwave_risk": "Low",
        "diurnal_temp_range_c": 11.2,
    },
    "Leh, Ladakh": {
        "climate_zone": "Cold & Arid",
        "avg_temperature_c": 6.2,
        "peak_summer_temp_c": 26.5,
        "winter_min_temp_c": -14.8,
        "relative_humidity_pct": 35.0,
        "wind_speed_ms": 3.8,
        "prevailing_wind_direction": "SW",
        "solar_insolation_kwh_m2": 6.5,
        "annual_rainfall_mm": 105.0,
        "extreme_heatwave_risk": "None (Severe Cold)",
        "diurnal_temp_range_c": 16.0,
    },
    "Guwahati, Assam": {
        "climate_zone": "Warm & Humid / Subtropical",
        "avg_temperature_c": 26.8,
        "peak_summer_temp_c": 36.2,
        "winter_min_temp_c": 10.5,
        "relative_humidity_pct": 79.0,
        "wind_speed_ms": 2.1,
        "prevailing_wind_direction": "NE",
        "solar_insolation_kwh_m2": 4.6,
        "annual_rainfall_mm": 1820.0,
        "extreme_heatwave_risk": "Low",
        "diurnal_temp_range_c": 8.5,
    }
}

class ClimateEngine:
    """Provides validated climate zone analytics and physics inputs."""

    @staticmethod
    def get_supported_locations() -> List[str]:
        return list(CLIMATE_DATABASE.keys())

    @staticmethod
    def analyze_location(location_name: str, lat: float = 26.2, lon: float = 73.0, future_climate: bool = False) -> ClimateData:
        # Match nearest or fallback to normalized closest
        data = None
        for key, val in CLIMATE_DATABASE.items():
            if location_name.lower() in key.lower() or key.lower() in location_name.lower():
                data = val
                break

        if not data:
            # Fallback estimation based on latitude
            if lat > 30:
                data = CLIMATE_DATABASE["Leh, Ladakh"]
            elif lat < 15:
                data = CLIMATE_DATABASE["Bengaluru, Karnataka"]
            elif lon > 85:
                data = CLIMATE_DATABASE["Guwahati, Assam"]
            else:
                data = CLIMATE_DATABASE["Jodhpur, Rajasthan"]

        peak_summer = data["peak_summer_temp_c"]
        avg_temp = data["avg_temperature_c"]
        solar = data["solar_insolation_kwh_m2"]

        if future_climate:
            peak_summer += 2.6
            avg_temp += 2.1
            solar += 0.2

        return ClimateData(
            location=location_name,
            latitude=lat,
            longitude=lon,
            climate_zone=data["climate_zone"],
            avg_temperature_c=round(avg_temp, 1),
            peak_summer_temp_c=round(peak_summer, 1),
            winter_min_temp_c=data["winter_min_temp_c"],
            relative_humidity_pct=data["relative_humidity_pct"],
            wind_speed_ms=data["wind_speed_ms"],
            prevailing_wind_direction=data["prevailing_wind_direction"],
            solar_insolation_kwh_m2=round(solar, 1),
            annual_rainfall_mm=data["annual_rainfall_mm"],
            extreme_heatwave_risk="Severe (High Risk Climate Trend)" if future_climate else data["extreme_heatwave_risk"],
            diurnal_temp_range_c=data["diurnal_temp_range_c"]
        )
