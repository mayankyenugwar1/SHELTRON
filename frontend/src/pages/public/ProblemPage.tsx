import React from 'react';
import { Card, SectionHeader, Badge } from '../../components/ui';

export const ProblemPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <SectionHeader
        title="The Climate Shelter Crisis: The Construction Paradox"
        subtitle="Across developing and climate-vulnerable regions, conventional emergency shelters and affordable housing turn into dangerous heat traps."
        tag="Problem Statement"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default" padding="lg" className="space-y-3 border-rose-200 bg-rose-50/30">
          <Badge variant="rose">Failure Mode 1</Badge>
          <h3 className="text-lg font-bold text-slate-900">Uninsulated Corrugated GI / Tin Sheds</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Relief shelters and temporary housing constructed with corrugated tin sheets suffer from U-values exceeding <b>5.8 W/m²K</b> and zero thermal mass (0.5 hour lag). During heatwaves exceeding 44°C, interior temperatures reach unbearable levels of <b>48°C+</b>, causing lethal heat stress, dehydration, and health emergencies.
          </p>
        </Card>

        <Card variant="default" padding="lg" className="space-y-3 border-amber-200 bg-amber-50/30">
          <Badge variant="amber">Failure Mode 2</Badge>
          <h3 className="text-lg font-bold text-slate-900">Heavy Uninsulated RCC Slabs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Reinforced cement concrete roofs store intense solar radiation throughout the midday and reradiate heat into interiors late into the night. Occupants cannot cool down during sleep, triggering chronic fatigue and driving high energy demand for fans and air conditioning.
          </p>
        </Card>

        <Card variant="default" padding="lg" className="space-y-3 border-sky-200 bg-sky-50/30">
          <Badge variant="blue">Failure Mode 3</Badge>
          <h3 className="text-lg font-bold text-slate-900">One-Size-Fits-All Architecture</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard housing typologies fail to account for distinct bioclimatic zones. Designs optimized for hot & dry deserts in Rajasthan are deployed in humid coastal Tamil Nadu or freezing Ladakh without orientation, shading, or airflow considerations.
          </p>
        </Card>

        <Card variant="default" padding="lg" className="space-y-3 border-purple-200 bg-purple-50/30">
          <Badge variant="purple">Failure Mode 4</Badge>
          <h3 className="text-lg font-bold text-slate-900">High Embodied Carbon & HVAC Reliance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Attempting to solve bad design by installing mechanical AC exacerbates the urban heat island effect, consumes fragile electricity grids, and prices out low-income communities.
          </p>
        </Card>
      </div>

      <Card variant="default" padding="lg" className="bg-gradient-to-r from-sky-50 via-teal-50 to-emerald-50 border-sky-200 space-y-3">
        <h3 className="text-base font-extrabold text-slate-900">The SHELTRON Solution: Design Before You Build</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          SHELTRON eliminates costly trial-and-error construction. By simulating thermodynamic performance upfront using local microclimate datasets, developers can achieve up to an <b>18°C temperature drop passively</b> using localized natural materials (CSEB, double-skin terracotta, lime wash) before a single brick is laid.
        </p>
      </Card>
    </div>
  );
};
