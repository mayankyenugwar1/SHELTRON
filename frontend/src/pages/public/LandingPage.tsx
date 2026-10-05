import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, SectionHeader } from '../../components/ui';
import { HeroShelterViewer } from '../../components/HeroShelterViewer';
import { BeforeAfterComparisonCard } from '../../components/BeforeAfterComparisonCard';

export const LandingPage: React.FC = () => {
  const pillarCards = [
    {
      title: "Climate Intelligence",
      icon: "🌐",
      tag: "Meteorology",
      desc: "Localized microclimate ingestion covering diurnal temperature swings, solar radiation insolation, relative humidity, and prevailing wind vector mapping.",
      badgeColor: "bg-sky-50 text-sky-800 border-sky-200"
    },
    {
      title: "Thermal Simulation",
      icon: "🌡️",
      tag: "Thermodynamics",
      desc: "Deterministic Fourier conduction, Sol-air temperature calculations, 24-hour diurnal thermal lag damping, and spatial microclimate hotspot grids.",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      title: "Smart Materials",
      icon: "🧱",
      tag: "Assembly Catalog",
      desc: "Comprehensive database of local sustainable materials: Compressed Stabilized Earth Blocks (CSEB), AAC blocks, and double-skin terracotta assemblies.",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      title: "Natural Cooling",
      icon: "💨",
      tag: "Passive Strategies",
      desc: "Calculates stack-driven cross-ventilation, clerestory louver airflow, night flush purge cycles, and biophilic vegetative microclimate buffers.",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      title: "What-If Optimization",
      icon: "⚡",
      tag: "Parametric Sandbox",
      desc: "Instantly vary overhang depths, window-to-wall ratios (WWR), and wall insulation to monitor real-time temperature, cost, and comfort score impacts.",
      badgeColor: "bg-purple-50 text-purple-800 border-purple-200"
    },
    {
      title: "Design Comparison",
      icon: "⚖️",
      tag: "Multi-Variant Analytics",
      desc: "Side-by-side performance benchmarking across baseline and customized designs, highlighting exact performance improvements or regressions.",
      badgeColor: "bg-rose-50 text-rose-800 border-rose-200"
    }
  ];

  const workflowSteps = [
    { step: "01 INPUT", label: "Site & Occupancy", sub: "Dimensions, occupants, budget", icon: "📍" },
    { step: "02 ANALYZE", label: "Climate Profiling", sub: "Solar irradiance, wind, diurnal swing", icon: "📊" },
    { step: "03 DESIGN", label: "3D Digital Twin", sub: "Passive orientation & zoning", icon: "🏛️" },
    { step: "04 SIMULATE", label: "Thermal Physics", sub: "Fourier conduction & sol-air temps", icon: "🌡️" },
    { step: "05 COMPARE", label: "What-If Delta", sub: "Materials, WWR & shading sandbox", icon: "⚡" },
    { step: "06 OPTIMIZE", label: "Pareto Blueprint", sub: "Max comfort within target budget", icon: "✨" }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-6 md:pt-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Badge matching reference: leaf icon + Climate-Adaptive Architecture Platform */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#cbdcc5] border border-[#b2cca9] text-[#123b2a] text-xs font-bold shadow-2xs">
              <span className="text-sm">🍃</span>
              <span>Climate-Adaptive Architecture Platform</span>
            </div>

            {/* Large Heading matching reference: Design Before (dark forest green) / You Build. (olive/moss green) */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#123b2a] tracking-tight leading-[1.05]">
              Design Before <br />
              <span className="text-[#436e35]">You Build.</span>
            </h1>

            {/* Subtitle paragraph */}
            <p className="text-[#3b6b52] text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Virtual shelter prototyping combining local microclimate analysis with deterministic thermodynamic simulation and Pareto multi-objective optimization.
            </p>

            {/* Action buttons matching reference */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link to="/app/create">
                <button className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#436e35] hover:bg-[#36592a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer">
                  <span className="text-base">📐</span>
                  <span>Create Your Shelter</span>
                  <span>→</span>
                </button>
              </Link>
              <Link to="/how-it-works">
                <button className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-[#fffdf7] hover:bg-[#f2f7ef] text-[#123b2a] font-bold text-sm border border-[#cbdcc5] shadow-xs transition-all active:scale-[0.99] cursor-pointer">
                  <span className="text-base">📖</span>
                  <span>Explore How It Works</span>
                </button>
              </Link>
            </div>

            {/* 3 Metric Blocks matching reference exactly: icon box + large number + small label with subtle vertical dividers */}
            <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#cbdcc5]/80">
              {/* Metric 1: Thermometer */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#cbdcc5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  🌡️
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#123b2a] tabular-nums leading-none">18.2°C</div>
                  <div className="text-[10px] sm:text-[11px] text-[#3b6b52] font-semibold mt-1">Max Surface Damping</div>
                </div>
              </div>

              {/* Metric 2: Leaf */}
              <div className="flex items-center gap-2.5 sm:gap-3 pl-1 sm:pl-3 border-l border-[#cbdcc5]/80">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#cbdcc5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  🍃
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#123b2a] tabular-nums leading-none">83.4%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#3b6b52] font-semibold mt-1">Cooling Energy Saved</div>
                </div>
              </div>

              {/* Metric 3: Layers / Stack */}
              <div className="flex items-center gap-2.5 sm:gap-3 pl-1 sm:pl-3 border-l border-[#cbdcc5]/80">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#cbdcc5] flex items-center justify-center text-xl shrink-0 shadow-2xs">
                  📑
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#123b2a] tabular-nums leading-none">5 Zones</div>
                  <div className="text-[10px] sm:text-[11px] text-[#3b6b52] font-semibold mt-1">NBC Indian Climates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive 3D Model Column */}
          <div className="lg:col-span-6">
            <HeroShelterViewer />
          </div>
        </div>
      </section>

      {/* Layered Green Landscape / Wave Background Section matching reference */}
      <div className="relative -my-6 py-6 overflow-hidden pointer-events-none select-none">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto text-[#cbdcc5]/60">
          <path d="M0,40 C320,90 640,10 960,60 C1200,100 1360,50 1440,30 L1440,120 L0,120 Z" fill="#b9d4b0" opacity="0.45" />
          <path d="M0,70 C360,20 720,90 1080,40 C1280,10 1380,50 1440,65 L1440,120 L0,120 Z" fill="#9ec494" opacity="0.35" />
        </svg>
      </div>

      {/* 2. Platform Definition Section & Key USP - CORE PHILOSOPHY matching reference */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#f0f6ec] p-8 sm:p-10 rounded-[32px] border border-[#cbdcc5] shadow-[0_4px_24px_-4px_rgba(20,50,30,0.08)] space-y-6 text-center">
          {/* Pill badge: CORE PHILOSOPHY */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#cbdcc5] text-[#123b2a] text-xs font-bold font-mono uppercase tracking-widest border border-[#b2cca9]">
            CORE PHILOSOPHY
          </div>

          {/* Heading with bullets: Climate-Responsive • Data-Driven • Buildable Solutions */}
          <div className="space-y-2 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#123b2a] tracking-tight">
              Climate-Responsive &nbsp;•&nbsp; Data-Driven &nbsp;•&nbsp; Buildable Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#3b6b52] font-medium">
              Turning climate data into practical, comfortable and sustainable shelter designs for Indian conditions.
            </p>
          </div>

          {/* 4 Core Horizontal Feature Cards from Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 text-left">
            {/* Card 1: Local Climate Intelligence */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#e3eedd] border border-[#c2dab8] flex items-center gap-3.5 shadow-2xs hover:bg-[#dcead5] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#cbdcc5] text-[#123b2a] flex items-center justify-center text-2xl font-bold shrink-0">
                🍃
              </div>
              <div>
                <div className="font-extrabold text-[#123b2a] text-sm">Local Climate Intelligence</div>
                <div className="text-xs text-[#3b6b52] leading-tight mt-0.5">
                  Site-specific microclimate analysis
                </div>
              </div>
            </div>

            {/* Card 2: Virtual Prototyping */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#e3eedd] border border-[#c2dab8] flex items-center gap-3.5 shadow-2xs hover:bg-[#dcead5] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#cbdcc5] text-[#123b2a] flex items-center justify-center text-2xl font-bold shrink-0">
                📦
              </div>
              <div>
                <div className="font-extrabold text-[#123b2a] text-sm">Virtual Prototyping</div>
                <div className="text-xs text-[#3b6b52] leading-tight mt-0.5">
                  Test designs before construction
                </div>
              </div>
            </div>

            {/* Card 3: Multi-Objective Optimization */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#e3eedd] border border-[#c2dab8] flex items-center gap-3.5 shadow-2xs hover:bg-[#dcead5] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#cbdcc5] text-[#123b2a] flex items-center justify-center text-2xl font-bold shrink-0">
                📊
              </div>
              <div>
                <div className="font-extrabold text-[#123b2a] text-sm">Multi-Objective Optimization</div>
                <div className="text-xs text-[#3b6b52] leading-tight mt-0.5">
                  Balance comfort, cost and sustainability
                </div>
              </div>
            </div>

            {/* Card 4: Buildable Solutions */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#e3eedd] border border-[#c2dab8] flex items-center gap-3.5 shadow-2xs hover:bg-[#dcead5] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#cbdcc5] text-[#123b2a] flex items-center justify-center text-2xl font-bold shrink-0">
                🏠
              </div>
              <div>
                <div className="font-extrabold text-[#123b2a] text-sm">Buildable Solutions</div>
                <div className="text-xs text-[#3b6b52] leading-tight mt-0.5">
                  Practical designs for real-world use
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Below Hero Core 6 Features Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <SectionHeader
          title="Integrated Bioclimatic Engineering Pillars"
          subtitle="Everything required to virtually model, test, and optimize a climate-responsive shelter before breaking ground."
          tag="Core Capabilities"
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillarCards.map((c, i) => (
            <Card key={i} variant="default" padding="lg" className="space-y-3 border border-[#e4ede1] card-hover flex flex-col justify-between bg-[#fffdf7]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl p-2 rounded-xl bg-[#f4faf0] border border-[#d8e6d4]">{c.icon}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border font-mono ${c.badgeColor}`}>
                    {c.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0d3824] mb-1.5">{c.title}</h3>
                <p className="text-xs text-[#3b6b52] leading-relaxed">{c.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Visual Workflow Pipeline */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        <SectionHeader
          title="The Closed-Loop Engineering Workflow"
          subtitle="A deterministic 6-step pathway from site definition to an optimized bioclimatic blueprint."
          tag="Workflow Pipeline"
          align="center"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {workflowSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-2xl bg-[#fffdf7] border border-[#e4ede1] shadow-2xs text-center space-y-2 flex flex-col items-center justify-center card-hover"
            >
              <div className="text-2xl">{step.icon}</div>
              <div className="text-[10px] font-mono font-bold text-[#087443] tracking-wider">{step.step}</div>
              <div className="font-bold text-[#0d3824] text-xs">{step.label}</div>
              <div className="text-[10px] text-[#3b6b52] leading-tight">{step.sub}</div>

              {idx < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#cbe6c7] font-bold select-none text-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Prominent Before vs After Comparison Card */}
      <section className="max-w-5xl mx-auto px-4 space-y-6">
        <SectionHeader
          title="Virtual Impact Before Groundbreaking"
          subtitle="Quantifiable evidence of thermal lag damping and passive cooling achieved through informed design."
          tag="Before vs After"
          align="center"
        />

        <BeforeAfterComparisonCard />
      </section>

      {/* 6. Bottom Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-[#123b2a] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-5 border border-[#1e503a]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4b35] text-[#86efac] border border-[#2d6a4f] text-xs font-bold font-mono">
            <span>⚡</span>
            <span>Zero Guesswork Construction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#fffdf7]">
            Ready to design your first climate-adaptive shelter?
          </h2>
          <p className="text-[#a7f3d0] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Test and optimize your structure virtually. Reduce extreme heatwave risk, save active energy, and build resiliently with SHELTRON.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/app/create">
              <Button size="lg" variant="primary" icon="🚀" className="bg-[#087443] hover:bg-[#065b34] text-white">
                Create Your Shelter Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
