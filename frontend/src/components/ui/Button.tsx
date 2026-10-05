import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.99]";
  
  const variants = {
    primary: "bg-[#087443] hover:bg-[#065f37] text-white shadow-[0_2px_8px_rgba(8,116,67,0.25)] hover:shadow-[0_4px_12px_rgba(8,116,67,0.3)] focus:ring-[#087443]",
    secondary: "bg-[#eaf6e8] hover:bg-[#dff0dc] text-[#087443] border border-[#cbe6c7] shadow-2xs hover:shadow-xs focus:ring-[#087443]",
    outline: "border border-[#d0e2cc] hover:border-[#087443] bg-[#fffdf7] hover:bg-[#f4faf0] text-[#123b2a] shadow-2xs focus:ring-[#087443]",
    danger: "bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-2xs focus:ring-rose-500",
    ghost: "bg-transparent hover:bg-[#eaf6e8] text-[#123b2a]",
    accent: "bg-[#123b2a] hover:bg-[#087443] text-white shadow-2xs"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-xs sm:text-sm px-4 py-2 gap-2",
    lg: "text-sm px-5 py-2.5 gap-2.5"
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
