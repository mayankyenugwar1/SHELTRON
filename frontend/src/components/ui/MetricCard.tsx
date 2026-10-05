import React from 'react';
import { Card } from './Card';

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subValue?: string;
  badge?: {
    text: string;
    positive?: boolean;
  };
  icon?: string | React.ReactNode;
  color?: 'sky' | 'emerald' | 'amber' | 'purple' | 'rose';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  subValue,
  badge,
  icon,
  color = 'sky'
}) => {
  const colorBorders = {
    sky: 'border-[#e4ede1] hover:border-[#087443]',
    emerald: 'border-[#e4ede1] hover:border-[#087443]',
    amber: 'border-[#e4ede1] hover:border-[#f59e0b]',
    purple: 'border-[#e4ede1] hover:border-[#8b5cf6]',
    rose: 'border-[#e4ede1] hover:border-[#f43f5e]'
  };

  const topAccents = {
    sky: 'bg-[#087443]',
    emerald: 'bg-[#087443]',
    amber: 'bg-[#f59e0b]',
    purple: 'bg-[#087443]',
    rose: 'bg-[#f43f5e]'
  };

  return (
    <Card
      variant="default"
      padding="md"
      className={`relative overflow-hidden bg-[#fffdf7] border-[#e4ede1] ${colorBorders[color]} transition-all duration-200 card-hover shadow-[0_4px_16px_-3px_rgba(18,59,42,0.06)] rounded-2xl`}
    >
      {/* Subtle top indicator line matching reference */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${topAccents[color]}`} />

      <div className="flex items-center gap-2 mb-2 pt-1">
        {icon && (
          <span className="text-base shrink-0">
            {icon}
          </span>
        )}
        <span className="text-[10px] font-black uppercase tracking-wider text-[#3b6b52] font-mono leading-tight">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-1.5 my-1">
        <span className="text-3xl sm:text-4xl font-black text-[#0d3824] tracking-tight tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-bold text-[#2e8b57] font-mono">
            {unit}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-[#f0f5ed]">
        {subValue ? (
          <span className="text-[#3b6b52] text-[11px] font-semibold truncate max-w-[65%]">
            {subValue}
          </span>
        ) : (
          <span />
        )}
        {badge && (
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider border ${
            badge.positive 
              ? 'bg-[#eaf6e8] text-[#087443] border-[#cbe6c7]' 
              : 'bg-[#fff1ed] text-[#c2410c] border-[#fecdd3]'
          }`}>
            {badge.text}
          </span>
        )}
      </div>
    </Card>
  );
};
