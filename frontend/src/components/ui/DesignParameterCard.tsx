import React from 'react';
import { Card } from './Card';

export interface DesignParameterCardProps {
  title: string;
  category: string;
  icon?: string | React.ReactNode;
  currentValue: string | number;
  recommendedValue?: string | number;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const DesignParameterCard: React.FC<DesignParameterCardProps> = ({
  title,
  category,
  icon,
  currentValue,
  recommendedValue,
  description,
  action,
  className = ''
}) => {
  return (
    <Card variant="default" padding="sm" className={`border border-slate-200 card-hover bg-white ${className}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-base shrink-0">{icon}</span>}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
              {category}
            </span>
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
              {title}
            </h4>
          </div>
        </div>
        {action}
      </div>

      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-500 font-medium">Selected:</span>
          <span className="font-bold text-slate-900 text-right">{currentValue}</span>
        </div>
        {recommendedValue && (
          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-200/60">
            <span className="text-emerald-700 font-semibold">Recommended:</span>
            <span className="text-emerald-800 font-bold px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-right">
              {recommendedValue}
            </span>
          </div>
        )}
      </div>

      {description && <p className="text-xs text-slate-600 leading-snug">{description}</p>}
    </Card>
  );
};
