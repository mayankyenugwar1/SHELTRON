import React from 'react';
import { Card, SectionHeader, Badge } from '../../components/ui';

export const FeaturesPage: React.FC = () => {
  const features = [
    { title: "Geospatial Climate Mapping", desc: "Interactive Leaflet mapping with real-time zone switching across 6 diverse Indian climatic zones.", tag: "Climate" },
    { title: "3D Parametric Digital Twin", desc: "Interactive Three.js viewport with realistic shadows, overhang dimensions, and airflow indicators.", tag: "3D Visuals" },
    { title: "Surface Thermal Heatmap", desc: "Color-coded thermal gradient mapped across roofs, walls, and interior spatial zones from 20°C to 45°C.", tag: "Hotspots" },
    { title: "Diurnal Lag Damping", desc: "Visualizes thermal phase lag showing how heavy earth blocks defer daytime heat ingress until the cool of the night.", tag: "Physics" },
    { title: "What-If Real-Time Sandbox", desc: "Instantly adjust WWR, roof slope, materials, and observe live delta shifts in temperature and energy.", tag: "Simulation" },
    { title: "Side-by-Side Variant Comparison", desc: "Benchmarking table detailing baseline vs modified configurations with explicit improved/regressed indicators.", tag: "Analytics" },
    { title: "Multi-Objective Optimizer", desc: "Pareto-optimal parameter finder balancing PMV comfort, embodied carbon, and strict INR budget ceilings.", tag: "Optimization" },
    { title: "Future Climate Surge Testing", desc: "Stress test designs under extreme IPCC RCP8.5 scenarios (+2.5°C surge) to guarantee longevity.", tag: "Resilience" },
    { title: "Client-Side Engineering PDF", desc: "Export instant construction dossiers ready for SIH judges, field engineers, and civic authorities.", tag: "Reporting" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <SectionHeader
        title="Comprehensive Platform Capabilities"
        subtitle="Engineered to provide professional bioclimatic testing tools without requiring costly CFD software."
        tag="Feature Matrix"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <Card key={i} variant="default" padding="md" className="space-y-2">
            <Badge variant="blue" size="sm">{f.tag}</Badge>
            <h3 className="text-sm font-bold text-slate-900">{f.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
