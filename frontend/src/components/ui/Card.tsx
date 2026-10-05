import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'subtle' | 'pale-blue' | 'pale-green' | 'pale-purple' | 'pale-orange';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const base = "rounded-2xl transition-all duration-150";
  
  const variants = {
    default: "bg-[#fffdf7] border border-[#e4ede1] shadow-[0_4px_16px_-3px_rgba(18,59,42,0.05)] hover:border-[#c2debe]",
    elevated: "bg-[#fffdf7] border border-[#d8e6d4] shadow-[0_8px_24px_-4px_rgba(18,59,42,0.07)] hover:shadow-[0_12px_28px_-4px_rgba(18,59,42,0.09)]",
    glass: "bg-[#fffdf7]/95 backdrop-blur-xs border border-[#e4ede1] shadow-sm",
    subtle: "bg-[#f4faf0] border border-[#e4ede1]",
    'pale-blue': "bg-[#f0f8ff] border border-[#bae6fd] text-[#0f172a] shadow-2xs",
    'pale-green': "bg-[#eaf6e8] border border-[#cbe6c7] text-[#0d3824] shadow-2xs",
    'pale-purple': "bg-[#f5f3ff] border border-[#ddd6fe] text-[#0d3824] shadow-2xs",
    'pale-orange': "bg-[#fff8ee] border border-[#fed7aa] text-[#0d3824] shadow-2xs"
  };

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-6 sm:p-7"
  };

  return (
    <div className={`${base} ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>
      {children}
    </div>
  );
};
