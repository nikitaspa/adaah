import React from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';

export interface CallButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
}

export function CallButton({
  className = '',
  size = 'md',
  fullWidth = false,
  showIcon = true,
}: CallButtonProps) {
  const sizeClasses = {
    sm: 'h-9 px-3 text-xs rounded-xl gap-1.5',
    md: 'h-10 px-4 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'h-12 px-5 text-sm sm:text-base rounded-xl gap-2.5',
  };

  return (
    <a
      href={`tel:${siteConfig.contact.phoneRaw}`}
      aria-label={`Call Now: ${siteConfig.contact.phone}`}
      className={cn(
        'inline-flex items-center justify-center font-semibold bg-[#171717] hover:bg-[#2A2622] text-[#F8F6F1] border border-[#3E382E] shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap',
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {showIcon && (
        <Phone className="w-3.5 h-3.5 text-[#C6922E] shrink-0" aria-hidden="true" />
      )}
      <span className="truncate">Call Now</span>
    </a>
  );
}
