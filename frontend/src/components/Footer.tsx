import React from 'react';
import { Link } from 'react-router-dom';
import { SheltronLogo } from './SheltronLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#e4ede1] bg-[#fffdf7] py-8 px-6 md:px-12 text-xs text-[#3b6b52]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <SheltronLogo size="sm" />
          <p className="text-[11px] text-[#3b6b52] hidden sm:block">Smart Climate-Adaptive Shelter Design Platform</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#123b2a]">
          <Link to="/" className="hover:text-[#087443] transition-colors">Overview</Link>
          <Link to="/problem" className="hover:text-[#087443] transition-colors">The Problem</Link>
          <Link to="/how-it-works" className="hover:text-[#087443] transition-colors">How It Works</Link>
          <Link to="/features" className="hover:text-[#087443] transition-colors">Features</Link>
          <Link to="/impact" className="hover:text-[#087443] transition-colors">Impact & Sustainability</Link>
          <Link to="/technical" className="hover:text-[#087443] transition-colors">Physics Architecture</Link>
          <Link to="/research" className="hover:text-[#087443] transition-colors">Research & Standards</Link>
          <Link to="/app" className="text-[#087443] font-black hover:underline">App Platform</Link>
        </div>

        <div className="text-[11px] text-[#3b6b52] text-center md:text-right font-medium">
          <div>Built for Smart India Hackathon Presentation</div>
          <div>Physics-Based Deterministic Bioclimatic Modeling</div>
        </div>
      </div>
    </footer>
  );
};
