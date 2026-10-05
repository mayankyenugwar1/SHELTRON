import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  color?: 'green' | 'forest' | 'emerald' | 'amber' | 'rose' | 'purple' | 'sky';
  showLabel?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = 'forest',
  showLabel = false,
  label
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  const colors = {
    forest: 'bg-[#087443]',
    green: 'bg-[#436e35]',
    emerald: 'bg-[#2d6a4f]',
    amber: 'bg-[#d97706]',
    rose: 'bg-[#e11d48]',
    purple: 'bg-[#7c3aed]',
    sky: 'bg-[#087443]' // Replaced bright blue with deep forest green
  };

  return (
    <div className="w-full space-y-1.5">
      {(showLabel || label) && (
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className={`h-full ${colors[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
