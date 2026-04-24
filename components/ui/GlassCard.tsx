import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: 'cyan' | 'violet' | 'green' | 'amber' | 'none';
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', glowColor = 'none', ...rest }) => {
  const glowClasses = {
    cyan: 'border-accent-cyan/20 shadow-[0_0_15px_rgba(0,245,255,0.1)]',
    violet: 'border-accent-violet/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]',
    green: 'border-accent-green/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]',
    amber: 'border-accent-amber/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    none: 'border-white/10',
  };

  return (
    <div
      className={`glass rounded-xl p-6 ${glowClasses[glowColor]} transition-shadow duration-300 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GlassCard;
