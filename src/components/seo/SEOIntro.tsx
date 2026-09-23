import React from 'react';

export interface SEOIntroProps {
  badge?: string;
  title: string;
  description: string;
  subtitle?: string;
  className?: string;
}

export function SEOIntro({
  badge,
  title,
  description,
  subtitle,
  className = '',
}: SEOIntroProps) {
  return (
    <div className={`space-y-3 pb-6 border-b border-[#E6E1D8] ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full bg-[#C6922E]/10 border border-[#C6922E]/30 text-[#916718] text-xs font-bold uppercase tracking-wider">
          {badge}
        </span>
      )}
      <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xs sm:text-sm font-semibold text-[#916718] uppercase tracking-wide">
          {subtitle}
        </p>
      )}
      <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
}
