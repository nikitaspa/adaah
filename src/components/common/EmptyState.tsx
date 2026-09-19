import React from 'react';
import { SearchX } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon = <SearchX className="h-10 w-10 text-stone-400" />,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xs border border-stone-200/80 mb-4">
        {icon}
      </div>
      <h3 className="text-base md:text-lg font-bold text-stone-900 mb-1.5">{title}</h3>
      <p className="text-sm text-stone-500 max-w-md mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
