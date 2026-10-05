import React from 'react';
import { Card } from './Card';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  legend,
  children,
  action,
  className = ''
}) => {
  return (
    <Card variant="default" padding="md" className={`space-y-4 border border-slate-200 bg-white ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {legend}
          {action}
        </div>
      </div>

      <div className="w-full">{children}</div>
    </Card>
  );
};
