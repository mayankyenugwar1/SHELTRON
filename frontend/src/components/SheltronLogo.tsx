import React from 'react';

interface SheltronLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showPillBorder?: boolean;
}

export const SheltronLogo: React.FC<SheltronLogoProps> = ({
  className = '',
  size = 'md',
  showPillBorder = true
}) => {
  // Dimension scales
  const sizeClasses = {
    sm: 'h-8 px-2.5 py-1 text-sm gap-2',
    md: 'h-9 sm:h-10 px-3 sm:px-3.5 py-1.5 text-base sm:text-lg gap-2.5',
    lg: 'h-11 sm:h-12 px-4 py-2 text-lg sm:text-xl gap-3'
  };

  const emblemSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-8 h-8 sm:w-9 sm:h-9'
  };

  const oSizes = {
    sm: 'w-[14px] h-[14px]',
    md: 'w-[16px] h-[16px] sm:w-[17.5px] sm:h-[17.5px]',
    lg: 'w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]'
  };

  return (
    <div
      className={`inline-flex items-center rounded-full transition-all select-none ${
        showPillBorder
          ? 'bg-[#f7faf4] hover:bg-[#f2f7ed] border border-[#d0e3cb] shadow-[0_2px_8px_-2px_rgba(20,50,30,0.06)] hover:shadow-xs'
          : ''
      } ${sizeClasses[size]} ${className}`}
    >
      {/* ============================================================== */}
      {/* LEFT: Modern House + Leaf + Sun Emblem */}
      {/* ============================================================== */}
      <div className={`shrink-0 flex items-center justify-center ${emblemSizes[size]}`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Subtle sun radial glow */}
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f7c84c" />
              <stop offset="100%" stopColor="#e5a832" />
            </radialGradient>
            {/* Soft leaf gradient */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#48915e" />
              <stop offset="100%" stopColor="#1e5433" />
            </linearGradient>
          </defs>

          {/* 1. Small Warm Golden Sun behind the roof */}
          <circle cx="31" cy="11.5" r="5.5" fill="url(#sunGlow)" />
          {/* Subtle sun ray halo */}
          <circle cx="31" cy="11.5" r="7" stroke="#f5c242" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.6" />

          {/* 2. Background Biophilic Foliage Shape */}
          <path
            d="M 8 24 C 7 15, 14 9, 22 8 C 19 13, 18 19, 21 24 Z"
            fill="#5c936b"
            opacity="0.85"
          />

          {/* 3. Modern House: Dark forest green with light green dimensional accents */}
          {/* Main Overhanging Roof (Pitched Bioclimatic Eaves) */}
          <path
            d="M 9 19 L 24 10 L 37 16 L 35.5 19 L 24 13 L 11 21 Z"
            fill="#0d3824"
          />
          {/* Roof Accent Facia / Highlight */}
          <path
            d="M 11 19 L 24 11 L 36 16.5"
            stroke="#6fa87e"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Front Wall Facade */}
          <path
            d="M 14 19.5 L 24 14 L 24 33 L 14 33 Z"
            fill="#14422b"
          />
          {/* Dimensional Shadow Wall Facet */}
          <path
            d="M 24 14 L 34 18 L 34 33 L 24 33 Z"
            fill="#0b2c1c"
          />

          {/* Clean Geometric Fenestration (Door & High Window) */}
          <rect x="17" y="23" width="4.8" height="10" rx="0.5" fill="#eef5eb" />
          <line x1="19.4" y1="23" x2="19.4" y2="33" stroke="#14422b" strokeWidth="0.6" />
          <rect x="27" y="21" width="4.5" height="7" rx="0.5" fill="#eef5eb" />
          <line x1="27" y1="24.5" x2="31.5" y2="24.5" stroke="#0b2c1c" strokeWidth="0.5" />

          {/* 4. Large Flowing Green Leaves around & under the house */}
          {/* Deep Base Foundation Leaf */}
          <path
            d="M 3 35 C 7 39, 18 40, 27 36 C 18 37, 9 36, 5 31 C 2 27, 3 20, 4 14 C 5 21, 9 27, 15 29 C 20 31, 28 31, 35 28 C 24 33, 13 36, 3 35 Z"
            fill="#1b4d2e"
          />
          {/* Flowing Upper Sage Leaf */}
          <path
            d="M 4 34 C 8 37, 17 38, 25 33 C 17 34, 10 33, 6 29 C 4 25, 4 19, 5 15 C 6 21, 9 26, 14 28 C 18 29, 25 29, 32 27 C 23 31, 13 33, 4 34 Z"
            fill="url(#leafGrad)"
          />
          {/* Delicate Leaf Center Vein */}
          <path
            d="M 4 34 Q 15 35 25 31"
            stroke="#99d1a6"
            strokeWidth="0.9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* RIGHT: Bold Uppercase Text "SHELTRON" with Leaf in "O" */}
      {/* ============================================================== */}
      <div className="flex items-center tracking-tight font-black text-[#0d3824] leading-none">
        <span>SHELT</span>
        <span>R</span>
        
        {/* Integrated Leaf inside the "O" */}
        <span className={`relative inline-flex items-center justify-center ${oSizes[size]} mx-[0.5px]`}>
          <svg viewBox="0 0 20 20" className="w-full h-full overflow-visible" fill="none">
            {/* Outer Ring of "O" in Dark Forest Green */}
            <circle cx="10" cy="10" r="8" fill="#0d3824" />
            {/* Inner Counter Cutout in Pale Pill Cream */}
            <circle cx="10" cy="10" r="4.3" fill="#f7faf4" />
            {/* Integrated Botanical Green Leaf inside "O" */}
            <path
              d="M 7.5 13.5 C 7 11.2, 8.6 7.8, 12.8 6.5 C 12.2 8.8, 10.6 12.2, 7.5 13.5 Z"
              fill="#2d7a4c"
            />
            {/* Leaf Vein Accent */}
            <path
              d="M 8 13 Q 10 10.5 12.2 7"
              stroke="#8bc49f"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span>N</span>
      </div>
    </div>
  );
};
