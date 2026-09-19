import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  children?: React.ReactNode;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-900 text-white border-transparent',
    secondary: 'bg-stone-100 text-stone-800 border-stone-200/80',
    outline: 'border-stone-300 text-stone-700 bg-transparent',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    destructive: 'bg-rose-50 text-rose-800 border-rose-200',
    neutral: 'bg-stone-100 text-stone-600 border-stone-200',
    accent: 'bg-amber-100 text-amber-900 border-amber-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs rounded-md',
    md: 'px-2.5 py-1 text-xs font-medium rounded-lg',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 border font-medium tracking-wide transition-colors whitespace-nowrap select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
