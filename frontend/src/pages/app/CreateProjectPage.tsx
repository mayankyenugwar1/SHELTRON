import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShelterProject } from '../../context/ProjectContext';
import { Card, SectionHeader, Button, Badge, ProgressBar } from '../../components/ui';
import { ClimateMap } from '../../components/ClimateMap';
import { CITIES } from '../../data/defaults';

// Vector SVG Icons for Earth-Green Theme
const PinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" clipRule="evenodd" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const RulerIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22h20" />
    <path d="M4 22L19 7" />
    <path d="M19 7l2 2" />
    <path d="M8 18l2-2" />
    <path d="M11 15l2-2" />
    <path d="M14 12l2-2" />
    <path d="M4 22V6a2 2 0 0 1 2-2h1.5L20 16.5V20a2 2 0 0 1-2 2H4z" />
  </svg>
);

const HouseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const RupeeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="4" x2="18" y2="4" />
    <line x1="6" y1="9" x2="18" y2="9" />
    <path d="M6 14h6a4 4 0 0 0 0-8H6" />
    <line x1="10" y1="14" x2="16" y2="21" />
  </svg>
);

const LeafIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const MapIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const SproutIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4-.1 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4.3.7-4.9 2z" />
  </svg>
);

const ShieldIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CreateProjectPage: React.FC = () => {
  const { site, setSiteRequirements, selectLocation } = useShelterProject();
  const navigate = useNavigate();

  // Multi-step state: 1 to 5, and 6 for summary review
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form Fields State with defaults
  const [formData, setFormData] = useState({
    // Step 1: Location
    location_name: site.location_name || "Nashik, Maharashtra",
    latitude: site.latitude || 19.9975,
    longitude: site.longitude || 73.7898,
    elevation_m: 565,

    // Step 2: Site
    length_m: site.length_m || 9.0,
    width_m: site.width_m || 7.0,
    height_m: site.height_m || 3.2,
    site_shape: site.site_shape || "Rectangular",
    orientation_constraint: site.orientation_constraint || "No Constraint",

    // Step 3: Shelter
    shelter_type: site.shelter_type || "Residential",
    occupants: site.occupants || 4,
    built_up_area_sqm: site.built_up_area_sqm || (site.length_m * site.width_m) || 63,

    // Step 4: Budget
    budget_inr: site.budget_inr || 450000,

    // Step 5: Comfort
    preferred_temp_c: site.preferred_temp_c || 24.5,
    sustainability_priority: site.sustainability_preference || "High Eco-Friendly",
    natural_cooling_priority: site.natural_cooling_priority || "Maximum",
    daylight_priority: site.daylight_priority || "High Diffuse Daylight"
  });

  const stepLabels = [
    { num: 1, label: "Location" },
    { num: 2, label: "Site" },
    { num: 3, label: "Shelter" },
    { num: 4, label: "Budget" },
    { num: 5, label: "Comfort" }
  ];

  const renderWizardTabIcon = (num: number, isCurrent: boolean) => {
    const iconClass = isCurrent ? "w-4 h-4 text-white" : "w-4 h-4 text-[#465a2d]";
    switch (num) {
      case 1: return <PinIcon className={iconClass} />;
      case 2: return <RulerIcon className={iconClass} />;
      case 3: return <HouseIcon className={iconClass} />;
      case 4: return <RupeeIcon className={iconClass} />;
      case 5: return <LeafIcon className={iconClass} />;
      default: return null;
    }
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.location_name.trim()) errs.location_name = "Location name is required";
      if (formData.latitude < -90 || formData.latitude > 90) errs.latitude = "Valid latitude between -90 and 90 required";
      if (formData.longitude < -180 || formData.longitude > 180) errs.longitude = "Valid longitude between -180 and 180 required";
    } else if (step === 2) {
      if (formData.length_m < 3 || formData.length_m > 60) errs.length_m = "Length must be between 3m and 60m";
      if (formData.width_m < 3 || formData.width_m > 40) errs.width_m = "Width must be between 3m and 40m";
      if (formData.height_m < 2.4 || formData.height_m > 6) errs.height_m = "Height must be between 2.4m and 6m";
    } else if (step === 3) {
      if (!formData.shelter_type) errs.shelter_type = "Please select a shelter type";
      if (formData.occupants < 1 || formData.occupants > 200) errs.occupants = "Occupancy must be between 1 and 200 persons";
      if (formData.built_up_area_sqm < 9 || formData.built_up_area_sqm > 2400) errs.built_up_area_sqm = "Valid built-up area required";
    } else if (step === 4) {
      if (formData.budget_inr < 100000 || formData.budget_inr > 5000000) errs.budget_inr = "Budget must be between ₹1,00,000 and ₹50,00,000";
    } else if (step === 5) {
      if (formData.preferred_temp_c < 18 || formData.preferred_temp_c > 30) errs.preferred_temp_c = "Preferred comfort temperature must be between 18°C and 30°C";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSelectCityFromMapOrList = (cityName: string, lat: number, lon: number, elev?: number) => {
    setFormData(prev => ({
      ...prev,
      location_name: cityName,
      latitude: lat,
      longitude: lon,
      elevation_m: elev !== undefined ? elev : prev.elevation_m
    }));
    selectLocation(cityName);
  };

  const handleDimensionChange = (len: number, wid: number) => {
    setFormData(prev => ({
      ...prev,
      length_m: len,
      width_m: wid,
      built_up_area_sqm: Math.round(len * wid)
    }));
  };

  const handleCompleteAndAnalyze = () => {
    // Commit all fields to central project state
    setSiteRequirements({
      location_name: formData.location_name,
      latitude: formData.latitude,
      longitude: formData.longitude,
      length_m: formData.length_m,
      width_m: formData.width_m,
      height_m: formData.height_m,
      site_shape: formData.site_shape,
      orientation_constraint: formData.orientation_constraint,
      shelter_type: formData.shelter_type,
      occupants: formData.occupants,
      built_up_area_sqm: formData.built_up_area_sqm,
      budget_inr: formData.budget_inr,
      comfort_preference: `${formData.preferred_temp_c}°C Target`,
      preferred_temp_c: formData.preferred_temp_c,
      sustainability_preference: formData.sustainability_priority,
      natural_cooling_priority: formData.natural_cooling_priority,
      daylight_priority: formData.daylight_priority
    });

    // Advance to Climate Analysis
    navigate('/app/climate');
  };

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.zone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Section matching reference image - Clean light area with maximum contrast */}
      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-3.5 py-1 rounded-full bg-[#bed3ba] text-[#1c371d] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#2f4922]" />
            SHELTRON PIPELINE — STAGE 1 OF 8
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b2413] tracking-tight">
          Site & Requirements Definition
        </h1>
        <p className="text-sm sm:text-base text-[#3d5a42] max-w-4xl font-normal leading-relaxed">
          Specify geographic coordinates, site dimensions, shelter typology, and comfort targets before initiating simulation.
        </p>
      </div>

      {/* 5-Step Setup Wizard Progress Bar & Indicator matching reference image */}
      <div className="bg-[#fbfdfa] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#d8e2d4] shadow-xs space-y-4">
        {/* Top Row: SETUP WIZARD — STEP 1 OF 5 • Location | 20% Completed */}
        <div className="flex items-center justify-between text-xs font-bold pb-0.5">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#bed3ba] text-[#233a1e] text-xs font-bold uppercase tracking-wider">
              SETUP WIZARD — STEP {Math.min(5, currentStep)} OF 5
            </span>
            <span className="text-[#1a331c] font-bold text-sm sm:text-base">• {stepLabels.find(s => s.num === currentStep)?.label}</span>
          </div>
          <span className="text-[#1a331c] font-bold text-sm sm:text-base">
            {Math.round((Math.min(5, currentStep) / 5) * 100)}% Completed
          </span>
        </div>

        {/* Progress Bar in Earth-Green */}
        <div className="w-full h-2.5 bg-[#dbe5d7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#465a2d] rounded-full transition-all duration-300"
            style={{ width: `${(Math.min(5, currentStep) / 5) * 100}%` }}
          />
        </div>

        {/* 5 Step Tabs */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-1">
          {stepLabels.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num <= currentStep || validateStep(currentStep)) {
                    setCurrentStep(s.num);
                  }
                }}
                className={`py-3 px-2 sm:px-4 rounded-xl text-center text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                  isCurrent
                    ? 'bg-[#465a2d] text-white border-[#465a2d] shadow-xs'
                    : isCompleted
                    ? 'bg-[#dce6d5] text-[#243d23] border-[#cbd8c6]'
                    : 'bg-[#fbfdfa] text-[#1a331c] border border-[#d8e2d4] hover:bg-[#eef5ea]'
                }`}
              >
                <span className="shrink-0 flex items-center">{renderWizardTabIcon(s.num, isCurrent)}</span>
                <span className="truncate">{s.num} {s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Step Container */}
      <div className="bg-[#fbfdfa] rounded-2xl sm:rounded-3xl border border-[#d8e2d4] shadow-xs p-6 sm:p-7 space-y-6">

        {/* STEP 1: Location */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header matching reference */}
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <PinIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1a331c]">
                    STEP 1: Location & Coordinates
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a6349] mt-0.5">
                    Search location, select on interactive map, or enter custom coordinates
                  </p>
                </div>
              </div>
              <span className="bg-[#dce6d5] text-[#243d23] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                LOCATION INGESTION
              </span>
            </div>

            {/* Location Search Bar */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-[#1a331c] block">
                Search Regional Meteorological Station
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search city e.g. Nashik, Jodhpur, Chennai, New Delhi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#fbfdfa] border border-[#d8e2d4] rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm text-[#1a331c] placeholder:text-[#8ba28b] focus:outline-none focus:ring-2 focus:ring-[#465a2d]/30 focus:border-[#465a2d]"
                />
                <div className="absolute left-4 top-3.5 text-[#465a2d] pointer-events-none">
                  <SearchIcon className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 4 Prominent City Cards matching reference image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {[
                { name: "Nashik", fullName: "Nashik, Maharashtra", state: "Maharashtra", zone: "Hot-Dry", lat: 19.9975, lon: 73.7898, elev: 565 },
                { name: "Jodhpur", fullName: "Jodhpur, Rajasthan", state: "Rajasthan", zone: "Hot-Dry", lat: 26.2389, lon: 73.0243, elev: 231 },
                { name: "Chennai", fullName: "Chennai, Tamil Nadu", state: "Tamil Nadu", zone: "Warm-Humid", lat: 13.0827, lon: 80.2707, elev: 6 },
                { name: "New Delhi", fullName: "New Delhi, Delhi NCR", state: "Delhi", zone: "Composite", lat: 28.6139, lon: 77.2090, elev: 216 }
              ].map((c) => {
                const isSelected = formData.location_name.toLowerCase().includes(c.name.toLowerCase());
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleSelectCityFromMapOrList(c.fullName, c.lat, c.lon, c.elev)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#dce6d5] border-2 border-[#465a2d] shadow-xs'
                        : 'bg-[#fbfdfa] border-[#d8e2d4] hover:border-[#465a2d]/60'
                    }`}
                  >
                    <PinIcon className="w-5 h-5 text-[#465a2d] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm sm:text-base text-[#1a331c] leading-snug">{c.name}</div>
                      <div className="text-xs text-[#4a6349] mt-0.5">{c.state}</div>
                      <div className="text-xs font-semibold text-[#243d23] mt-1.5">{c.zone}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Coordinates Manual Inputs Row matching reference */}
            <div className="space-y-3 pt-2">
              <div className="text-xs sm:text-sm font-bold text-[#1a331c] flex items-center gap-2">
                <GlobeIcon className="w-4 h-4 text-[#465a2d]" /> OR Enter Coordinates Manually
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs font-bold text-[#1a331c] block mb-1.5">Latitude (°N)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#fbfdfa] border border-[#d8e2d4] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#1a331c] focus:outline-none focus:ring-2 focus:ring-[#465a2d]/30 focus:border-[#465a2d]"
                  />
                  {errors.latitude && <span className="text-[10px] text-rose-500">{errors.latitude}</span>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1a331c] block mb-1.5">Longitude (°E)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#fbfdfa] border border-[#d8e2d4] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#1a331c] focus:outline-none focus:ring-2 focus:ring-[#465a2d]/30 focus:border-[#465a2d]"
                  />
                  {errors.longitude && <span className="text-[10px] text-rose-500">{errors.longitude}</span>}
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1a331c] block mb-1.5">Elevation (m)</label>
                  <input
                    type="number"
                    step="1"
                    value={formData.elevation_m || 565}
                    onChange={(e) => setFormData({ ...formData, elevation_m: parseFloat(e.target.value) || 565 })}
                    className="w-full bg-[#fbfdfa] border border-[#d8e2d4] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#1a331c] focus:outline-none focus:ring-2 focus:ring-[#465a2d]/30 focus:border-[#465a2d]"
                  />
                </div>
              </div>
            </div>

            {/* Optional Collapsible Map (stays closed so layout matches reference screenshot exactly) */}
            <details className="mt-2 group">
              <summary className="text-[11px] font-semibold text-[#526b4e] cursor-pointer hover:text-[#1a331c] select-none flex items-center gap-1.5 py-1">
                <MapIcon className="w-3.5 h-3.5 text-[#465a2d]" />
                <span>Interactive Map View (Optional)</span>
                <span className="text-[9px] group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden border border-[#d8e2d4] shadow-2xs">
                  <ClimateMap
                    site={{
                      ...site,
                      location_name: formData.location_name,
                      latitude: formData.latitude,
                      longitude: formData.longitude
                    }}
                    onSelectCity={(city) => handleSelectCityFromMapOrList(city.name, city.lat, city.lon)}
                  />
                </div>
              </div>
            </details>
          </div>
        )}

        {/* STEP 2: Site */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <RulerIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#16321f]">
                    STEP 2: Site Geometry & Constraints
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c54] mt-0.5">
                    Configure site footprint, shape, and orientation constraints
                  </p>
                </div>
              </div>
              <span className="bg-[#dce9d5] text-[#264428] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                SITE GEOMETRY
              </span>
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#16321f] mb-1.5">
                  <span>Site Length (m)</span>
                  <span className="font-extrabold text-[#3d5924]">{formData.length_m} m</span>
                </div>
                <input
                  type="number"
                  min="4"
                  max="60"
                  step="0.5"
                  value={formData.length_m}
                  onChange={(e) => handleDimensionChange(parseFloat(e.target.value) || 12, formData.width_m)}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                />
                {errors.length_m && <span className="text-[10px] text-rose-500">{errors.length_m}</span>}
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#16321f] mb-1.5">
                  <span>Site Width (m)</span>
                  <span className="font-extrabold text-[#3d5924]">{formData.width_m} m</span>
                </div>
                <input
                  type="number"
                  min="4"
                  max="40"
                  step="0.5"
                  value={formData.width_m}
                  onChange={(e) => handleDimensionChange(formData.length_m, parseFloat(e.target.value) || 8)}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                />
                {errors.width_m && <span className="text-[10px] text-rose-500">{errors.width_m}</span>}
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#16321f] mb-1.5">
                  <span>Clear Ceiling Height (m)</span>
                  <span className="font-extrabold text-[#3d5924]">{formData.height_m} m</span>
                </div>
                <input
                  type="number"
                  min="2.4"
                  max="6.0"
                  step="0.1"
                  value={formData.height_m}
                  onChange={(e) => setFormData({ ...formData, height_m: parseFloat(e.target.value) || 3.2 })}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                />
                {errors.height_m && <span className="text-[10px] text-rose-500">{errors.height_m}</span>}
              </div>
            </div>

            {/* Site Shape */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-[#16321f]">Site Footprint Shape</label>
              <div className="grid grid-cols-3 gap-3">
                {["Rectangular", "Square", "Irregular / Sloped"].map((shape) => (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => setFormData({ ...formData, site_shape: shape })}
                    className={`p-3.5 rounded-2xl border text-center text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      formData.site_shape === shape
                        ? 'bg-[#dce9d5] border-2 border-[#485e33] text-[#16321f] shadow-xs'
                        : 'bg-[#ffffff] border-[#d5e2d1] text-[#233d26] hover:bg-[#eef5eb]'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation Constraints */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-[#16321f]">Site Orientation Constraints</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "No Constraint", desc: "Allows full 360° solar orientation freedom (Optimal)" },
                  { id: "East-West Axis Locked", desc: "Long axis fixed East-West by road access" },
                  { id: "North-South Axis Locked", desc: "Site boundaries restrict East-West facade length" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, orientation_constraint: item.id })}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                      formData.orientation_constraint === item.id
                        ? 'bg-[#dce9d5] border-2 border-[#485e33] text-[#16321f] shadow-xs'
                        : 'bg-[#ffffff] border-[#d5e2d1] text-[#233d26] hover:bg-[#eef5eb]'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{item.id}</div>
                    <div className="text-[11px] text-[#506c54] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Geometry Summary Box */}
            <div className="p-4 rounded-2xl bg-[#f0f6ec] border border-[#d5e2d1] flex items-center justify-between text-xs">
              <div>
                <span className="text-[#506c54] font-medium">Calculated Footprint:</span>
                <span className="font-extrabold text-[#16321f] ml-1.5">{formData.length_m * formData.width_m} m² ({Math.round(formData.length_m * formData.width_m * 10.764)} sq.ft)</span>
              </div>
              <div>
                <span className="text-[#506c54] font-medium">Enclosed Air Volume:</span>
                <span className="font-extrabold text-[#16321f] ml-1.5">{Math.round(formData.length_m * formData.width_m * formData.height_m)} m³</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Shelter */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <HouseIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#16321f]">
                    STEP 3: Shelter Typology & Occupancy
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c54] mt-0.5">
                    Select shelter use case, occupant density, and verify built-up area
                  </p>
                </div>
              </div>
              <span className="bg-[#dce9d5] text-[#264428] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                TYPOLOGY
              </span>
            </div>

            {/* Shelter Type Options */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-[#16321f]">Shelter Classification</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Residential", icon: <HouseIcon className="w-5 h-5 text-[#3d5924]" />, desc: "Permanent low-carbon home with continuous 24-hr occupancy" },
                  { name: "Community Shelter", icon: <UsersIcon className="w-5 h-5 text-[#3d5924]" />, desc: "Resilient community hall and cyclone/heatwave relief hub" },
                  { name: "Classroom", icon: <BookIcon className="w-5 h-5 text-[#3d5924]" />, desc: "High daytime occupancy with maximized daylight & glare cutoff" },
                  { name: "Rural Shelter", icon: <SproutIcon className="w-5 h-5 text-[#3d5924]" />, desc: "Low-cost local earth/bamboo build with decentralized cooling" },
                  { name: "Emergency Shelter", icon: <ShieldIcon className="w-5 h-5 text-[#3d5924]" />, desc: "Rapid-deployment humanitarian disaster relief post" }
                ].map((type) => {
                  const isSelected = formData.shelter_type === type.name;
                  return (
                    <button
                      key={type.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, shelter_type: type.name })}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#dce9d5] border-2 border-[#485e33] text-[#16321f] shadow-xs'
                          : 'bg-[#ffffff] border-[#d5e2d1] text-[#233d26] hover:bg-[#eef5eb]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#eef5ea] flex items-center justify-center mb-2">
                        {type.icon}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-[#16321f]">{type.name}</div>
                      <div className="text-[11px] text-[#506c54] mt-1 leading-snug">{type.desc}</div>
                    </button>
                  );
                })}
              </div>
              {errors.shelter_type && <span className="text-[10px] text-rose-500">{errors.shelter_type}</span>}
            </div>

            {/* Occupants & Built-up Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#16321f] mb-1.5">
                  <span>Number of Occupants</span>
                  <span className="font-extrabold text-[#3d5924]">{formData.occupants} Persons</span>
                </div>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={formData.occupants}
                  onChange={(e) => setFormData({ ...formData, occupants: parseInt(e.target.value) || 6 })}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                />
                <span className="text-[10px] text-[#506c54] mt-1 block">Metabolic heat gain rate: ~110W per occupant</span>
                {errors.occupants && <span className="text-[10px] text-rose-500">{errors.occupants}</span>}
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-[#16321f] mb-1.5">
                  <span>Built-up Area (m²)</span>
                  <span className="font-extrabold text-[#3d5924]">{formData.built_up_area_sqm} m²</span>
                </div>
                <input
                  type="number"
                  value={formData.built_up_area_sqm}
                  onChange={(e) => setFormData({ ...formData, built_up_area_sqm: parseFloat(e.target.value) || 96 })}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm font-mono text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                />
                <span className="text-[10px] text-[#506c54] mt-1 block">Area per person: ~{(formData.built_up_area_sqm / Math.max(1, formData.occupants)).toFixed(1)} m²/person</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Budget */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <RupeeIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#16321f]">
                    STEP 4: Envelope Construction Budget
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c54] mt-0.5">
                    Define financial parameters and unit cost boundaries in INR
                  </p>
                </div>
              </div>
              <span className="bg-[#dce9d5] text-[#264428] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                FINANCIAL TARGET
              </span>
            </div>

            {/* Budget Slider */}
            <div className="bg-[#f0f6ec] p-5 sm:p-6 rounded-2xl border border-[#d5e2d1] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#506c54] block">Target Envelope Budget</span>
                  <div className="text-3xl sm:text-4xl font-black text-[#16321f] tracking-tight mt-0.5">
                    ₹{formData.budget_inr.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#506c54] block">Estimated Unit Rate</span>
                  <div className="text-sm sm:text-base font-extrabold text-[#16321f]">
                    ₹{Math.round(formData.budget_inr / formData.built_up_area_sqm).toLocaleString()} / m²
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="150000"
                max="2000000"
                step="25000"
                value={formData.budget_inr}
                onChange={(e) => setFormData({ ...formData, budget_inr: parseFloat(e.target.value) })}
                className="w-full accent-[#485e33] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-semibold text-[#506c54]">
                <span>₹1.5 Lakhs (Ultra Low-Cost)</span>
                <span>₹4.5 Lakhs (Demo Target)</span>
                <span>₹20 Lakhs (High Resilience)</span>
              </div>
            </div>

            {/* Quick Budget Tiers */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Economy Relief", val: 300000, desc: "Optimal for disaster & humanitarian camps" },
                { label: "Resilient Mid-Tier", val: 450000, desc: "Target budget: CSEB walls + double-skin roof" },
                { label: "High-Performance Eco", val: 850000, desc: "Rammed earth + low-E double glazing" }
              ].map((tier) => (
                <button
                  key={tier.label}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget_inr: tier.val })}
                  className={`p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                    formData.budget_inr === tier.val
                      ? 'bg-[#dce9d5] border-2 border-[#485e33] text-[#16321f] shadow-xs'
                      : 'bg-[#ffffff] border-[#d5e2d1] text-[#233d26] hover:bg-[#eef5eb]'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-[#16321f]">{tier.label}</div>
                  <div className="font-extrabold text-[#3d5924] mt-0.5 text-sm">₹{tier.val.toLocaleString()}</div>
                  <div className="text-[10px] text-[#506c54] mt-1">{tier.desc}</div>
                </button>
              ))}
            </div>
            {errors.budget_inr && <span className="text-[10px] text-rose-500">{errors.budget_inr}</span>}
          </div>
        )}

        {/* STEP 5: Comfort */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <LeafIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#16321f]">
                    STEP 5: Thermal Comfort & Sustainability Priorities
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c54] mt-0.5">
                    Configure target temperatures, daylight, and natural cooling strategies
                  </p>
                </div>
              </div>
              <span className="bg-[#dce9d5] text-[#264428] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                COMFORT TARGET
              </span>
            </div>

            {/* Preferred Comfort Temperature */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#16321f]">
                <span>Preferred Indoor Operative Temperature Target</span>
                <span className="font-extrabold text-[#3d5924] text-sm">{formData.preferred_temp_c}°C</span>
              </div>
              <input
                type="range"
                min="20.0"
                max="28.0"
                step="0.5"
                value={formData.preferred_temp_c}
                onChange={(e) => setFormData({ ...formData, preferred_temp_c: parseFloat(e.target.value) })}
                className="w-full accent-[#485e33] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#506c54]">
                <span>20°C (High Cooling)</span>
                <span>24.5°C (ASHRAE Standard)</span>
                <span>28°C (Adaptive Indian Comfort)</span>
              </div>
              {errors.preferred_temp_c && <span className="text-[10px] text-rose-500">{errors.preferred_temp_c}</span>}
            </div>

            {/* Sustainability Priority */}
            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-[#16321f]">Sustainability & Embodied Carbon Priority</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Standard", desc: "Balanced cost with conventional local materials" },
                  { id: "High Eco-Friendly", desc: "Prioritize CSEB, bamboo & natural lime coatings" },
                  { id: "Net Zero Priority", desc: "Ultra-low carbon with sedum green roof & rammed earth" }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, sustainability_priority: item.id })}
                    className={`p-4 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                      formData.sustainability_priority === item.id
                        ? 'bg-[#dce9d5] border-2 border-[#485e33] text-[#16321f] shadow-xs'
                        : 'bg-[#ffffff] border-[#d5e2d1] text-[#233d26] hover:bg-[#eef5eb]'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[#16321f]">{item.id}</div>
                    <div className="text-[10px] text-[#506c54] mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Natural Cooling & Daylight Priorities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#16321f]">Natural Convective Cooling</label>
                <select
                  value={formData.natural_cooling_priority}
                  onChange={(e) => setFormData({ ...formData, natural_cooling_priority: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                >
                  <option value="Maximum">Maximum (Night purge clerestory vents + courtyard buffer)</option>
                  <option value="Moderate">Moderate (Standard cross-ventilation windows)</option>
                  <option value="Sealed Microclimate">Sealed (Dust & extreme outdoor heat block)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#16321f]">Daylight & Visual Comfort</label>
                <select
                  value={formData.daylight_priority}
                  onChange={(e) => setFormData({ ...formData, daylight_priority: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d5e2d1] rounded-2xl p-3 text-xs sm:text-sm text-[#16321f] focus:outline-none focus:ring-2 focus:ring-[#485e33]/30 focus:border-[#485e33]"
                >
                  <option value="High Diffuse Daylight">High Diffuse Daylight (North clerestory lights)</option>
                  <option value="Controlled Low Solar">Controlled Low Solar (Deep overhangs, 14% WWR)</option>
                  <option value="Standard">Standard Balanced Glazing</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Summary Review Card */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4ede1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#dce6d5] flex items-center justify-center text-[#465a2d] shrink-0">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#16321f]">
                    Review & Verification Summary
                  </h3>
                  <p className="text-xs sm:text-sm text-[#506c54] mt-0.5">
                    Verify all site and shelter parameters before running the bioclimatic engine
                  </p>
                </div>
              </div>
              <span className="bg-[#dce9d5] text-[#264428] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs">
                READY FOR ANALYSIS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#d5e2d1] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#506c54]">Location & Site</span>
                <div className="font-extrabold text-[#16321f] text-sm">{formData.location_name}</div>
                <div className="text-[#506c54]">Coordinates: {formData.latitude}°N, {formData.longitude}°E (Elev: {formData.elevation_m}m)</div>
                <div className="text-[#506c54]">Site Dimensions: {formData.length_m}m × {formData.width_m}m ({formData.length_m * formData.width_m} m²)</div>
                <div className="text-[#506c54]">Clear Height: {formData.height_m}m | Shape: {formData.site_shape}</div>
                <div className="text-[#506c54]">Orientation Constraint: {formData.orientation_constraint}</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#ffffff] border border-[#d5e2d1] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#506c54]">Shelter & Performance Targets</span>
                <div className="font-extrabold text-[#16321f] text-sm">{formData.shelter_type}</div>
                <div className="text-[#506c54]">Occupancy: {formData.occupants} Persons</div>
                <div className="text-[#506c54]">Target Envelope Budget: ₹{formData.budget_inr.toLocaleString()}</div>
                <div className="text-[#506c54]">Comfort Target: {formData.preferred_temp_c}°C</div>
                <div className="text-[#506c54]">Sustainability: {formData.sustainability_priority}</div>
                <div className="text-[#506c54]">Cooling Strategy: {formData.natural_cooling_priority}</div>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="p-6 bg-gradient-to-r from-[#eef5ea] via-[#e2edd9] to-[#dce9d5] rounded-2xl border border-[#c6ddbe] text-center space-y-3">
              <h4 className="text-base font-extrabold text-[#16321f]">
                Ready to Generate Climate-Adaptive Architectural Directives
              </h4>
              <p className="text-xs text-[#506c54] max-w-lg mx-auto">
                SHELTRON will cross-reference National Building Code (SP 41) standards and compute deterministic Fourier thermal balance.
              </p>
              <button
                type="button"
                onClick={handleCompleteAndAnalyze}
                className="px-8 py-3.5 text-sm font-bold bg-[#485e33] hover:bg-[#3d512b] text-white rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Analyze My Site
                <span className="text-base font-bold ml-1">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#e4ede1]">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-5 py-2.5 rounded-xl font-bold border border-[#d5e2d1] bg-[#ffffff] text-[#233d26] hover:bg-[#eef5eb] disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm"
          >
            <span>←</span> Previous
          </button>

          {currentStep < 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl font-bold bg-[#485e33] hover:bg-[#3d512b] text-white shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm"
            >
              Continue to Step {currentStep + 1} <span>→</span>
            </button>
          )}

          {currentStep === 5 && (
            <button
              type="button"
              onClick={() => {
                if (validateStep(5)) setCurrentStep(6);
              }}
              className="px-6 py-2.5 rounded-xl font-bold bg-[#dce9d5] hover:bg-[#d0e0c8] text-[#1c381c] border border-[#c6ddbe] shadow-xs transition-all cursor-pointer inline-flex items-center gap-2 text-xs sm:text-sm"
            >
              <span>✓</span> Review Summary
            </button>
          )}

          {currentStep === 6 && (
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2.5 rounded-xl font-bold border border-[#d5e2d1] bg-[#ffffff] text-[#233d26] hover:bg-[#eef5eb] transition-all cursor-pointer text-xs sm:text-sm"
            >
              Edit Inputs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
