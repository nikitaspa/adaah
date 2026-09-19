import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { AvailabilityStatus } from '../../types';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  src?: string;
  alt?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  availabilityStatus?: AvailabilityStatus;
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  availabilityStatus,
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (n: string) => {
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-11 w-11 text-sm',
    lg: 'h-16 w-16 text-base',
    xl: 'h-24 w-24 text-xl',
  };

  const statusColors = {
    Available: 'bg-emerald-500 ring-white',
    Busy: 'bg-amber-500 ring-white',
    'By Appointment': 'bg-sky-500 ring-white',
    Away: 'bg-stone-400 ring-white',
  };

  const dotSizes = {
    sm: 'h-2.5 w-2.5 right-0 bottom-0 ring-1.5',
    md: 'h-3 w-3 right-0 bottom-0 ring-2',
    lg: 'h-3.5 w-3.5 right-0.5 bottom-0.5 ring-2',
    xl: 'h-4 w-4 right-1 bottom-1 ring-3',
  };

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700 font-semibold overflow-visible border border-stone-200/80 select-none',
        sizes[size],
        className
      )}
      {...props}
    >
      <div className="relative h-full w-full rounded-full overflow-hidden flex items-center justify-center">
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || name}
            className="h-full w-full object-cover object-center"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="font-semibold text-stone-600 tracking-tight">{getInitials(name)}</span>
        )}
      </div>

      {availabilityStatus && (
        <span
          className={cn(
            'absolute rounded-full ring-2 shadow-xs',
            dotSizes[size],
            statusColors[availabilityStatus]
          )}
          title={`Status: ${availabilityStatus}`}
          aria-label={`Status: ${availabilityStatus}`}
        />
      )}
    </div>
  );
}
