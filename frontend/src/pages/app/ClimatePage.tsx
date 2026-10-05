import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, MetricCard, Button, Badge, ProgressBar } from '../../components/ui';
import { ClimateMap } from '../../components/ClimateMap';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ClimatePage: React.FC = () => {
  const { site, climate, selectLocation, activeScenario, toggleFutureClimateScenario } = useShelterProject();
  const navigate = useNavigate();

  // Compute Climate Severity Score (0-100) where 100 is extreme thermal challenge
  const computeClimateScore = () => {
    let score = 50;
    if (climate.peak_summer_temp_c > 42) score += 25;
    else if (climate.peak_summer_temp_c > 38) score += 15;

    if (climate.solar_insolation_kwh_m2 > 6.0) score += 15;
    if (climate.relative_humidity_pct > 70) score += 10;
    if (climate.wind_speed_ms < 2.5) score += 5; // stagnant air penalty

    if (site.future_climate_scenario) score += 10;
    return Math.min(98, Math.max(15, score));
  };

  const climateScore = computeClimateScore();

  // Determine qualitative levels
  const heatRiskLevel = climate.peak_summer_temp_c > 42 ? "Extreme" : (climate.peak_summer_temp_c > 38 ? "High" : "Moderate");
  const solarExposureLevel = climate.solar_insolation_kwh_m2 > 6.0 ? "Severe Direct Insolation" : (climate.solar_insolation_kwh_m2 > 5.0 ? "Moderate-High" : "Diffused");
  const ventilationPotential = "High Ventilation Potential";

  // 12-Month Seasonal Climate Pattern Profile
  const seasonalMonthlyData = [
    { month: 'Jan', temp: +(climate.winter_min_temp_c + 8).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.72).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.02) },
    { month: 'Feb', temp: +(climate.winter_min_temp_c + 12).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.82).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.03) },
    { month: 'Mar', temp: +(climate.avg_temperature_c - 4).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.92).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.04) },
    { month: 'Apr', temp: +(climate.avg_temperature_c + 2).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 1.05).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.05) },
    { month: 'May', temp: climate.peak_summer_temp_c, solar: +(climate.solar_insolation_kwh_m2 * 1.12).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.08) },
    { month: 'Jun', temp: +(climate.peak_summer_temp_c - 2.5).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 1.02).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.16) },
    { month: 'Jul', temp: +(climate.avg_temperature_c + 1).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.85).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.28) },
    { month: 'Aug', temp: +(climate.avg_temperature_c).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.82).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.22) },
    { month: 'Sep', temp: +(climate.avg_temperature_c - 1).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.88).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.08) },
    { month: 'Oct', temp: +(climate.avg_temperature_c - 3).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.85).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.02) },
    { month: 'Nov', temp: +(climate.winter_min_temp_c + 10).toFixed(1), solar: +(climate.solar_insolation_kwh_m2 * 0.78).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.01) },
    { month: 'Dec', temp: climate.winter_min_temp_c, solar: +(climate.solar_insolation_kwh_m2 * 0.70).toFixed(1), rain: Math.round(climate.annual_rainfall_mm * 0.01) }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <SectionHeader
        title={`Climate Intelligence Profile: ${climate.location}`}
        subtitle={`Bioclimatic zone classification: ${climate.climate_zone}. Meteorological analysis synthesized for passive shelter design.`}
        tag="SHELTRON Pipeline — Stage 2 of 8"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFutureClimateScenario}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                activeScenario === 'surge'
                  ? 'bg-[#fff1ed] text-[#c2410c] border-[#fdba74] ring-2 ring-orange-200'
                  : 'bg-[#fffdf7] text-[#123b2a] border-[#e4ede1] hover:bg-[#f4faf0]'
              }`}
            >
              <span>🔥</span>
              <span>{activeScenario === 'surge' ? 'Future Stress Test (+2.5°C Active)' : 'Future Climate Stress Test: +2.5°C'}</span>
            </button>
            <Button variant="primary" onClick={() => navigate('/app/materials')} icon="→">
              Continue to Materials & Comfort
            </Button>
          </div>
        }
      />

      {/* Future Climate Stress Scenario Card */}
      {activeScenario === 'surge' && (
        <Card variant="default" padding="lg" className="border-rose-300 bg-rose-50/40 shadow-xs space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-200/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🔥</span>
              <h4 className="font-black text-rose-900 text-sm">Future Climate Stress Test: +2.5°C Stress Scenario</h4>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-200/80 text-rose-900 px-2.5 py-0.5 rounded-full">
              Stress Scenario Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/90 p-2.5 rounded-xl border border-rose-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Peak Outdoor Temp</span>
              <div className="font-black text-rose-700 text-base">39.5°C → 42.0°C</div>
              <span className="text-[10px] text-slate-400">+2.5°C ambient surge</span>
            </div>
            <div className="bg-white/90 p-2.5 rounded-xl border border-rose-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Indoor Operative Temp</span>
              <div className="font-black text-slate-800 text-base">30.9°C → 32.4°C</div>
              <span className="text-[10px] text-slate-400">Buffered by CSEB mass</span>
            </div>
            <div className="bg-white/90 p-2.5 rounded-xl border border-rose-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Thermal Comfort</span>
              <div className="font-black text-amber-700 text-base">84 pts → 71 pts</div>
              <span className="text-[10px] text-slate-400">Moderate Comfort (resilient)</span>
            </div>
            <div className="bg-white/90 p-2.5 rounded-xl border border-rose-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Peak Heat Ingress</span>
              <div className="font-black text-rose-700 text-base">3650 W → 4080 W</div>
              <span className="text-[10px] text-slate-400">+430 W additional heat</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic">
            * Stress Scenario modeled for building resilience evaluation. Demonstrates how passive thermal mass and double-skin insulation prevent dangerous indoor thermal spikes. Not a formal scientific climate projection.
          </p>
        </Card>
      )}

      {/* Climate Data Transparency Badge */}
      <div className="p-3.5 bg-sky-50/80 border border-sky-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-900 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#087443] shrink-0 animate-pulse"></span>
          <span className="font-semibold text-[#123b2a]">
            Representative Regional Climate Dataset • IMD / NASA POWER Climatological Norms
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#eaf6e8] text-[#087443] border border-[#cbe6c7] px-2.5 py-0.5 rounded-full">
            Status: Prototype Climate Data
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#eaf6e8] text-[#087443] border border-[#cbe6c7] px-2.5 py-0.5 rounded-full">
            Zero API Keys Required
          </span>
        </div>
      </div>

      {/* Top 6 Representative Climate KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Temperature */}
        <MetricCard
          label="Peak Summer Temp"
          value={`${climate.peak_summer_temp_c}°C`}
          subValue={`Diurnal: ±${climate.diurnal_temp_range_c}°C`}
          badge={{ text: heatRiskLevel, positive: heatRiskLevel === 'Moderate' }}
          color={climate.peak_summer_temp_c > 42 ? 'rose' : 'amber'}
          icon="🌡️"
        />

        {/* Humidity */}
        <MetricCard
          label="Relative Humidity"
          value={`${climate.relative_humidity_pct}%`}
          subValue={climate.relative_humidity_pct > 65 ? "High / Humid" : "Dry / Arid"}
          color="emerald"
          icon="💧"
        />

        {/* Wind Speed */}
        <MetricCard
          label="Wind Velocity"
          value={`${climate.wind_speed_ms} m/s`}
          subValue={`Dir: ${climate.prevailing_wind_direction}`}
          color="emerald"
          icon="💨"
        />

        {/* Wind Direction */}
        <MetricCard
          label="Prevailing Wind"
          value={climate.prevailing_wind_direction}
          subValue="Orientation Reference"
          color="sky"
          icon="🧭"
        />

        {/* Solar Exposure */}
        <MetricCard
          label="Solar Exposure"
          value={climate.solar_insolation_kwh_m2}
          unit="kWh/m²"
          subValue="Daily Peak Insolation"
          color="amber"
          icon="☀️"
        />

        {/* Rainfall */}
        <MetricCard
          label="Annual Rainfall"
          value={`${climate.annual_rainfall_mm} mm`}
          subValue="Precipitation Load"
          color="purple"
          icon="🌧️"
        />
      </div>

      {/* Main Grid: Interactive Map + Site Climate Profile Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Map View */}
        <div className="lg:col-span-7 space-y-4">
          <Card variant="default" padding="sm" className="space-y-2">
            <div className="flex items-center justify-between px-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Regional Station Geocoding
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Lat: {climate.latitude}°N • Lon: {climate.longitude}°E
              </span>
            </div>
            <ClimateMap
              site={site}
              onSelectCity={(c) => selectLocation(c.name)}
            />
          </Card>

          {/* 12-Month Seasonal Climate Pattern Chart */}
          <Card variant="default" padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Annual 12-Month Seasonal Climate Profile</h3>
                <p className="text-xs text-slate-500">Monthly mean temperature curve, solar radiation insolation, and rainfall</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-rose-500 rounded" /> Temp (°C)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-amber-500 rounded" /> Solar (kWh/m²)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-sky-500 rounded" /> Rain (mm)</span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seasonalMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#f43f5e" strokeWidth={2} fill="url(#tempGrad)" name="Temperature (°C)" />
                  <Area type="monotone" dataKey="solar" stroke="#f59e0b" strokeWidth={2} fill="url(#solarGrad)" name="Solar Insolation" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Right: Site Climate Profile & Climate Score Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Site Climate Profile Panel */}
          <Card variant="default" padding="lg" className="border-sky-100 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Synthesized Dossier</span>
                <h3 className="text-base font-black text-slate-900">Site Climate Profile</h3>
              </div>
              <Badge variant="blue">{climate.climate_zone}</Badge>
            </div>

            {/* Overall Climate Severity Score (0-100) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-700">Climate Thermal Challenge Score</span>
                <span className="text-2xl font-black text-sky-800">{climateScore} <span className="text-xs font-semibold text-slate-400">/ 100</span></span>
              </div>
              <ProgressBar
                value={climateScore}
                color={climateScore > 75 ? 'rose' : (climateScore > 50 ? 'amber' : 'emerald')}
              />
              <div className="flex justify-between text-[10px] font-semibold text-slate-500 pt-0.5">
                <span>Benign / Mild (0)</span>
                <span>Moderate (50)</span>
                <span>Severe Heat Challenge (100)</span>
              </div>
            </div>

            {/* Profile Assessment Details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500">Heat Gain Risk:</span>
                  <span className={heatRiskLevel === 'Extreme' ? 'text-rose-600' : 'text-amber-600'}>
                    {heatRiskLevel} ({climate.peak_summer_temp_c}°C Peak)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Envelope will experience severe conductio-radiant heating between 11:00 and 16:30 without shading.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500">Solar Exposure Level:</span>
                  <span className="text-amber-600">{solarExposureLevel}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Peak daily insolation of {climate.solar_insolation_kwh_m2} kWh/m² requires high-albedo cool coatings (SRI &gt; 100).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500">Prevailing Wind Vector:</span>
                  <span className="text-sky-700">{climate.prevailing_wind_direction} ({climate.wind_speed_ms} m/s)</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Primary breeze trajectory dictates facade opening alignment for cross-ventilation.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-500">Ventilation Potential:</span>
                  <span className="text-emerald-700 font-bold">{ventilationPotential}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Stack-driven clerestory exhausts can provide continuous air exchanges during stagnant hours.
                </p>
              </div>
            </div>
          </Card>

          {/* Explanation Panel: Why this climate matters for your shelter */}
          <Card variant="default" padding="lg" className="bg-gradient-to-b from-sky-50/50 to-teal-50/40 border-sky-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <h4 className="font-extrabold text-slate-900 text-sm">
                Why this climate matters for your shelter
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-2.5 rounded-xl bg-white/90 border border-sky-100">
                <b className="text-amber-700 block mb-0.5">High Solar Exposure ({climate.solar_insolation_kwh_m2} kWh/m²):</b>
                Requires deep exterior overhangs (≥0.9m chajjas), high-albedo reflective roof coatings, and minimal glazing on direct east-west facades.
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 border border-sky-100">
                <b className="text-sky-700 block mb-0.5">
                  {climate.relative_humidity_pct > 60 ? `High Humidity (${climate.relative_humidity_pct}%):` : `Dry Climate (${climate.relative_humidity_pct}% RH):`}
                </b>
                {climate.relative_humidity_pct > 60
                  ? "Prioritize maximum uninterrupted cross-ventilation and elevated breathable floors to maintain skin sweat evaporation."
                  : "Enables evaporative courtyard vegetative cooling buffers and heavy thermal mass (CSEB) to capture nighttime cool air."}
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 border border-sky-100">
                <b className="text-rose-700 block mb-0.5">High Peak Temperature ({climate.peak_summer_temp_c}°C):</b>
                Prioritize thermal mass, insulation, shading and night-time ventilation to reduce indoor heat buildup.
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Climate-Adaptive Recommendations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block font-mono">Engineering Design Guidance</span>
            <h3 className="font-extrabold text-slate-900 text-lg">Climate-Adaptive Recommendations</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">Reference Basis: SP 41 / ECBC Passive Guidelines</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card variant="default" padding="md" className="border-amber-200/70 bg-amber-50/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">☀️</span>
              <h5 className="font-bold text-slate-900 text-xs">High Solar Exposure ({climate.solar_insolation_kwh_m2} kWh/m²)</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Incorporate deep exterior overhangs (≥0.9m) & high-SRI white cool roof coating.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> Blocks peak angle irradiance from entering unshaded window openings.</div>
              <div className="text-teal-700 font-medium">Expected Effect: Reduces peak solar heat gain by 18-24%.</div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="border-rose-200/70 bg-rose-50/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🌡️</span>
              <h5 className="font-bold text-slate-900 text-xs">High Peak Summer Temp ({climate.peak_summer_temp_c}°C)</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Dense 230mm CSEB / fly ash wall mass + expanded clay aggregate roof insulation.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> Delays diurnal heat transfer so daytime warmth reaches the interior only at night.</div>
              <div className="text-teal-700 font-medium">Expected Effect: Lowers peak indoor temperature by 1.8°C - 2.4°C.</div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="border-sky-200/70 bg-sky-50/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">💧</span>
              <h5 className="font-bold text-slate-900 text-xs">Dry Climate ({climate.relative_humidity_pct}% RH)</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Central shaded courtyard buffer or micro-vegetation planting.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> High evaporation potential allows passive adiabatic cooling of incoming breeze.</div>
              <div className="text-teal-700 font-medium">Expected Effect: Drops ambient entry air temperature by up to 1.5°C.</div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="border-emerald-200/70 bg-emerald-50/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">💨</span>
              <h5 className="font-bold text-slate-900 text-xs">Prevailing Winds ({climate.prevailing_wind_direction} @ {climate.wind_speed_ms} m/s)</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Staggered WSW inlet louvers paired with high northeast exhaust vents.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> Aligns positive windward pressure with convective thermal stack assist.</div>
              <div className="text-teal-700 font-medium">Expected Effect: Ensures 1.5-2.2 ACH natural ventilation rate.</div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="border-indigo-200/70 bg-indigo-50/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🌙</span>
              <h5 className="font-bold text-slate-900 text-xs">Diurnal Temperature Fluctuation ({climate.diurnal_temp_range_c}°C)</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Night-purge ventilation through operable upper clerestory windows.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> Flushes stored envelope heat during cooler nighttime ambient conditions (22°C).</div>
              <div className="text-teal-700 font-medium">Expected Effect: Pre-cools building structure for the next sun cycle.</div>
            </div>
          </Card>

          <Card variant="default" padding="md" className="border-slate-200/70 bg-slate-50/40 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base">📐</span>
              <h5 className="font-bold text-slate-900 text-xs">Orientation & Window-to-Wall Ratio</h5>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-700">Recommendation:</span> Elongate along East-West axis (15° true North tilt) with ≤18% WWR.</div>
              <div><span className="font-semibold text-slate-700">Reason:</span> Minimizes low-angle early morning and late afternoon direct solar entry.</div>
              <div className="text-teal-700 font-medium">Expected Effect: Curbs overall building cooling load by ~14%.</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Journey Progression Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">Next Step in Bioclimatic Pipeline</span>
          <div className="font-extrabold text-slate-800 text-sm">Select Smart Materials & Passive Comfort Directives</div>
        </div>
        <Button size="lg" variant="primary" onClick={() => navigate('/app/materials')} icon="→">
          Continue to Materials & Comfort
        </Button>
      </div>
    </div>
  );
};
