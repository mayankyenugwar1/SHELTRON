import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'md',
  className = ''
}) => {
  const styles = {
    blue: "bg-[#eaf6e8] text-[#087443] border-[#cbe6c7]",
    green: "bg-[#eaf6e8] text-[#087443] border-[#cbe6c7]",
    amber: "bg-[#fff8ee] text-[#b45309] border-[#fde68a]",
    rose: "bg-[#fff1ed] text-[#c2410c] border-[#fecdd3]",
    purple: "bg-[#f5f3ff] text-[#6d28d9] border-[#ddd6fe]",
    neutral: "bg-[#f4faf0] text-[#123b2a] border-[#e4ede1]"
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1"
  };

  return (
    <span className={`inline-flex items-center font-bold tracking-wider uppercase rounded-full border ${styles[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
