import React from 'react';
import { Link } from 'react-router-dom';
import { Card, SectionHeader, Button, Badge, MetricCard } from '../../components/ui';

export const ImpactPage: React.FC = () => {
  const audiences = [
    {
      role: "Homeowners & Families",
      icon: "🏡",
      tag: "Humanitarian & Health",
      color: "border-sky-200 bg-sky-50/20",
      accent: "text-sky-700",
      headline: "Comfortable, healthy and energy-efficient homes",
      points: [
        "Cooler indoor living spaces (up to 18°C lower than peak outdoor ambient)",
        "Improved health, sleep quality, and physiological well-being",
        "Protection from acute heatwave fatigue, dehydration, and heatstroke risks",
        "Significantly reduced electricity utility bills through passive thermal design"
      ]
    },
    {
      role: "Architects & Designers",
      icon: "📐",
      tag: "Data-Driven Workflow",
      color: "border-teal-200 bg-teal-50/20",
      accent: "text-teal-700",
      headline: "Evidence-based bioclimatic design acceleration",
      points: [
        "Data-driven design decisions backed by deterministic Fourier physics",
        "Rapid parametric iterations via instant What-If sandboxing",
        "Climate-based recommendations adhering strictly to National Building Code (SP 41)",
        "Elimination of costly architectural trial-and-error construction"
      ]
    },
    {
      role: "Construction Industry",
      icon: "🧱",
      tag: "Sustainable Engineering",
      color: "border-amber-200 bg-amber-50/20",
      accent: "text-amber-800",
      headline: "Efficient, low-carbon, and durable structural solutions",
      points: [
        "Optimal local material selection (CSEB, AAC, ventilated terracotta tiles)",
        "Pre-verified envelope designs that prevent on-site rework and thermal failure",
        "Lower long-term structural maintenance and roof degradation costs",
        "Enhanced compliance with green building rating standards (GRIHA / LEED)"
      ]
    },
    {
      role: "Urban Planners & Authorities",
      icon: "🏙️",
      tag: "Civic Policy & Resilience",
      color: "border-purple-200 bg-purple-50/20",
      accent: "text-purple-800",
      headline: "Climate-resilient, net-zero, and scalable communities",
      points: [
        "Climate-resilient and sustainable social housing & disaster relief centers",
        "Standardized climate-adaptive building guidelines across regional climate zones",
        "Mitigation of the Urban Heat Island (UHI) effect via high-albedo cool roofs",
        "Reduced peak grid strain during severe regional summer heat emergencies"
      ]
    }
  ];

  const impactPillars = [
    {
      pillar: "SOCIAL",
      icon: "👥",
      tag: "Community Well-Being",
      points: [
        "Improved indoor thermal comfort for vulnerable demographics",
        "Healthier living environment eliminating indoor heat traps",
        "Better conditions in extreme climates (desert heat & freezing arid cold)",
        "Inclusive design customized for diverse geographic regions across India"
      ]
    },
    {
      pillar: "ECONOMIC",
      icon: "💰",
      tag: "Financial Viability",
      points: [
        "Reduced energy consumption (up to 83% drop in active HVAC demand)",
        "Reduced monthly cooling and heating utility bills for low-income families",
        "Optimized material usage preventing over-engineered concrete expense",
        "Long-term lifecycle savings and delayed capital replacement costs"
      ]
    },
    {
      pillar: "ENVIRONMENTAL",
      icon: "🌱",
      tag: "Decarbonization",
      points: [
        "Reduced carbon footprint using local earth blocks (65% lower embodied CO₂)",
        "Energy-efficient design minimizing fossil-fuel powered grid load",
        "Natural cooling strategies leveraging windward breezes and night purge",
        "Future-ready shelters resilient against IPCC +2.5°C climate surge scenarios"
      ]
    },
    {
      pillar: "OPERATIONAL",
      icon: "⚡",
      tag: "Productivity & Scale",
      points: [
        "Faster design exploration from weeks of manual analysis down to seconds",
        "Interactive What-If parametric delta tracking with live feedback",
        "Data-driven decisions removing guesswork and superstitious heuristics",
        "Reduced manual engineering effort with instantaneous report generation",
        "Cloud and desktop scalability for nationwide municipal disaster relief deployment"
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 pb-16">
      {/* Header */}
      <SectionHeader
        title="Measurable Multi-Stakeholder Impact"
        subtitle="SHELTRON bridges climate justice, architectural precision, and decarbonized shelter construction across society."
        tag="Impact Assessment"
        actions={
          <Link to="/app">
            <Button variant="primary" icon="🚀">
              Launch Interactive Sandbox
            </Button>
          </Link>
        }
      />

      {/* Top Level Metric KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Passive Thermal Relief"
          value="-18.0°C"
          subValue="Indoor Temperature Reduction"
          badge={{ text: "Verified Passive", positive: true }}
          color="emerald"
          icon="🌡️"
        />
        <MetricCard
          label="Cooling Energy Saved"
          value="-83%"
          subValue="Active Grid Demand Cut"
          badge={{ text: "Net Zero Ready", positive: true }}
          color="sky"
          icon="⚡"
        />
        <MetricCard
          label="Embodied Carbon Drop"
          value="-65%"
          subValue="vs Conventional Concrete"
          badge={{ text: "CSEB Bio-Mass", positive: true }}
          color="purple"
          icon="🌱"
        />
        <MetricCard
          label="Design Iteration Speed"
          value="< 2 Secs"
          subValue="Instant What-If Delta"
          badge={{ text: "100x Faster", positive: true }}
          color="amber"
          icon="⏱️"
        />
      </div>

      {/* SECTION 1: Target Audiences Impact Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            Stakeholder Value Proposition
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            How SHELTRON Empowers Key Ecosystem Stakeholders
          </h3>
          <p className="text-xs text-slate-500">
            Delivering tangible, verified benefits from individual rural families to municipal urban governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((aud, idx) => (
            <Card
              key={idx}
              variant="default"
              padding="lg"
              className={`border ${aud.color} shadow-2xs space-y-4 hover:border-slate-400 transition-all flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                      {aud.icon}
                    </span>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{aud.role}</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{aud.tag}</span>
                    </div>
                  </div>
                  <Badge variant="blue" size="sm">Empowered</Badge>
                </div>

                <div className="p-3 bg-white/95 rounded-xl border border-slate-200/80">
                  <span className={`text-xs font-black block ${aud.accent}`}>
                    "{aud.headline}"
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  {aud.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className={`font-bold mt-0.5 ${aud.accent}`}>✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 2: Four Core Impact Pillars (Social, Economic, Environmental, Operational) */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-1 max-w-2xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Comprehensive Quad-Pillar Framework
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Holistic Benefits Across Four Vital Dimensions
          </h3>
          <p className="text-xs text-slate-500">
            Validated framework presented at the Smart India Hackathon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {impactPillars.map((p, idx) => (
            <Card
              key={idx}
              variant="default"
              padding="lg"
              className="border-slate-200/90 hover:border-sky-300 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100">{p.icon}</span>
                  <Badge variant="neutral" size="sm">{p.tag}</Badge>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-sm tracking-wider uppercase">
                    {p.pillar} IMPACT
                  </h4>
                </div>

                <ul className="space-y-2 text-xs text-slate-600">
                  {p.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span className="leading-snug">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 3: Bottom Callout Banner */}
      <section className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl text-center space-y-5 shadow-xl border border-slate-800">
        <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 bg-sky-950 px-3 py-1 rounded-full border border-sky-800 inline-block">
          SHELTRON Mission
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white max-w-xl mx-auto">
          "Design Before You Build for Climate Resilience"
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Ready to experience evidence-based bioclimatic shelter design? Launch the SHELTRON sandbox to model, simulate, and optimize your shelter in minutes.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link to="/app/create">
            <Button size="lg" variant="primary" icon="🚀">
              Launch SHELTRON Sandbox
            </Button>
          </Link>
          <Link to="/technical">
            <Button size="lg" variant="outline" className="text-slate-200 border-slate-700 bg-slate-800 hover:bg-slate-700">
              Inspect Physics Engine
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
