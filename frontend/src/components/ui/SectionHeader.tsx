import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  actions?: React.ReactNode;
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  tag,
  actions,
  align = 'left'
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e4ede1] ${align === 'center' ? 'text-center sm:text-center sm:items-center' : ''}`}>
      <div className="space-y-1">
        {tag && (
          <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#eaf6e8] text-[#087443] border border-[#cbe6c7] inline-flex items-center gap-1.5 mb-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087443]" />
            {tag}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-black text-[#0d3824] tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs sm:text-sm text-[#3b6b52] max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
    </div>
  );
};
