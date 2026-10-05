import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShelterProject } from '../context/ProjectContext';
import { SheltronLogo } from './SheltronLogo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { site, activeScenario, toggleFutureClimateScenario, startDemoMode, isDemoMode } = useShelterProject();
  const isAppSection = location.pathname.startsWith('/app');

  const navLinks = [
    { label: 'Problem', path: '/problem' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Features', path: '/features' },
    { label: 'Impact', path: '/impact' },
    { label: 'Technical', path: '/technical' },
    { label: 'Research', path: '/research' },
  ];

  const handleLaunchDemoFromNav = () => {
    startDemoMode();
    navigate('/app/create');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-4 pb-2">
      <header className="bg-[#fbfdfa]/95 backdrop-blur-sm border border-[#dce8d7] rounded-full px-5 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(20,50,30,0.07)] transition-all">
        {/* Brand logo & tagline */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <SheltronLogo size="md" />
            <div className="hidden xl:flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#dce9d5] text-[#2c4d32] border border-[#c6ddbe]">
                  CLIMATE-TECH
                </span>
                {isDemoMode && (
                  <span className="text-[10px] font-mono font-bold bg-[#3d5924] text-white px-2 py-0.5 rounded-full shadow-2xs animate-pulse inline-flex items-center gap-1">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Demo
                  </span>
                )}
              </div>
              <p className="text-[9px] text-[#506c54] font-medium tracking-tight mt-0.5">
                Design Before You Build • Thermal Optimization
              </p>
            </div>
          </Link>
        </div>

        {/* Public Nav Links (Center) */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#16321f]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
                location.pathname === link.path
                  ? 'bg-[#dce9d5] text-[#16321f] font-bold'
                  : 'hover:text-[#3d5924] hover:bg-[#eef5ea]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls & Project Selector (Right) matching reference */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Fast-Track Demo Button */}
          <button
            onClick={handleLaunchDemoFromNav}
            className="text-xs px-3.5 py-1.5 rounded-full font-semibold bg-[#dce9d5] hover:bg-[#d0e0c8] text-[#1c381c] border border-[#c6ddbe] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-[0.99]"
            title="Load Nashik 3-Minute Judge Evaluation Demo"
          >
            <svg className="w-3.5 h-3.5 text-[#2c4d32] fill-current" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="hidden sm:inline">Judge Demo (Nashik)</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Climate Surge */}
          <button
            onClick={toggleFutureClimateScenario}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScenario === 'surge'
                ? 'bg-[#fff1ed] text-[#9a3412] border-[#fdba74] ring-2 ring-orange-200'
                : 'bg-[#f7fbf4] text-[#34532c] border-[#cddfc6] hover:bg-[#edf5e7]'
            }`}
            title="Toggle Climate Surge (+2.5°C)"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 23c-4.97 0-9-4.03-9-9 0-3.8 2.37-7.05 5.75-8.35.5-.19.85-.68.85-1.22 0-.96-.98-1.63-1.84-1.21C4.38 4.78 2 8.1 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-2.45-.88-4.7-2.35-6.45-.63-.75-1.78-.47-2.03.49C16.92 8.87 16 11.23 16 13c0 1.66 1.34 3 3 3-1.22 4.09-4.8 7-9 7z" />
            </svg>
            <span className="hidden md:inline">Climate Surge (+2.5°C)</span>
            <span className="md:hidden">+2.5°</span>
          </button>

          {/* Project dropdown */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs">
            <span className="text-[#506c54] font-medium">Project:</span>
            <span className="font-semibold bg-[#ffffff] text-[#16321f] px-3 py-1 rounded-full border border-[#dce8d7] flex items-center gap-1 shadow-2xs">
              Nashik <span className="text-[10px] text-[#506c54]">▾</span>
            </span>
          </div>

          {/* User Avatar M */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#3d5924] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0" title="User Account">
            M
          </div>
        </div>
      </header>
    </div>
  );
};
