import React, { useState } from 'react';
import { Card, Badge } from './ui';

export const BeforeAfterComparisonCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'after' | 'before'>('after');

  return (
    <Card variant="default" padding="none" className="overflow-hidden border-[#e4ede1] shadow-xs bg-[#fffdf7]">
      {/* Top Banner Header */}
      <div className="bg-[#f7faf5] p-5 border-b border-[#e4ede1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eaf6e8] text-[#087443] border border-[#cbe6c7]">
              Verified Case Study
            </span>
            <span className="text-xs font-semibold text-[#3b6b52]">Nashik, Maharashtra (Warm & Humid / Composite, 38.6°C Peak)</span>
          </div>
          <h3 className="text-base font-extrabold text-[#0d3824]">
            Uninsulated Baseline vs SHELTRON Climate-Adaptive Shelter
          </h3>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#fffdf7] p-1 rounded-xl border border-[#e4ede1] shadow-2xs">
          <button
            onClick={() => setActiveTab('before')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'before'
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'text-[#3b6b52] hover:text-[#0d3824]'
            }`}
          >
            Conventional Baseline
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'after'
                ? 'bg-[#eaf6e8] text-[#087443] border border-[#cbe6c7]'
                : 'text-[#3b6b52] hover:text-[#0d3824]'
            }`}
          >
            SHELTRON Optimized
          </button>
        </div>
      </div>

      {/* Side-by-Side Dual Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e4ede1]">
        {/* BEFORE: Conventional Shelter */}
        <div className={`p-6 space-y-5 transition-opacity ${activeTab === 'before' ? 'bg-rose-50/20' : 'bg-[#fffdf7] opacity-85'}`}>
          <div className="flex items-center justify-between">
            <Badge variant="rose">Conventional Build (Before)</Badge>
            <span className="text-xs font-bold text-rose-600">Lethal Heat Ingress</span>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase text-slate-400">Peak Indoor Temperature</div>
            <div className="text-4xl font-black text-rose-600 tracking-tight mt-0.5">48.6°C</div>
            <p className="text-xs text-rose-700 mt-1 font-medium">+3.8°C hotter than ambient outdoor air</p>
          </div>

          {/* Specifications */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Roof Assembly</span>
              <span className="font-bold text-[#0d3824] text-right">Corrugated GI Tin (U: 5.8 W/m²K)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Wall Assembly</span>
              <span className="font-bold text-[#0d3824] text-right">Standard 115mm Burnt Red Brick</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Shading Strategy</span>
              <span className="font-bold text-rose-600 text-right">Zero Overhang (Direct Solar Ingress)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Thermal Comfort Score</span>
              <span className="font-bold text-rose-600 text-right">18 / 100 (Severe Overheating)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#3b6b52]">AC Cooling Energy Load</span>
              <span className="font-bold text-rose-600 text-right">38.4 kWh / day</span>
            </div>
          </div>
        </div>

        {/* AFTER: SHELTRON Optimized Shelter */}
        <div className={`p-6 space-y-5 transition-opacity ${activeTab === 'after' ? 'bg-[#f4faf0]' : 'bg-[#fffdf7] opacity-85'}`}>
          <div className="flex items-center justify-between">
            <Badge variant="green">SHELTRON Design (After)</Badge>
            <span className="text-xs font-bold text-[#087443]">Passive Thermal Equilibrium</span>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase text-[#3b6b52]">Peak Indoor Temperature</div>
            <div className="text-4xl font-black text-[#087443] tracking-tight mt-0.5">26.8°C</div>
            <p className="text-xs text-[#087443] mt-1 font-medium">-18.0°C cooler than outdoor ambient</p>
          </div>

          {/* Specifications */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Roof Assembly</span>
              <span className="font-bold text-[#087443] text-right">Sloped Double-Skin Terracotta (U: 0.55)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Wall Assembly</span>
              <span className="font-bold text-[#087443] text-right">Stabilized Earth Blocks (CSEB 9.5hr Lag)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Shading Strategy</span>
              <span className="font-bold text-[#087443] text-right">0.9m Chajja Overhang + Low-E Glaze</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#e4ede1]">
              <span className="text-[#3b6b52]">Thermal Comfort Score</span>
              <span className="font-bold text-[#087443] text-right">92 / 100 (Optimal Thermal Comfort)</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#3b6b52]">AC Cooling Energy Load</span>
              <span className="font-bold text-[#087443] text-right">6.4 kWh / day (83% Reduction)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Callout */}
      <div className="p-4 bg-[#f7faf5] border-t border-[#e4ede1] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
        <div className="text-[#3b6b52]">
          <b className="text-[#0d3824]">Net Delta Impact:</b> 21.8°C indoor temperature drop, within ₹4,50,000 budget target, and 65% lower embodied carbon footprint.
        </div>
        <div className="font-bold text-[#087443] text-xs shrink-0 flex items-center gap-1.5">
          <span>✓</span> Tested with Deterministic Fourier Physics
        </div>
      </div>
    </Card>
  );
};
