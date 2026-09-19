import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export function Breadcrumbs({ items, onNavigate, className }: BreadcrumbsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (href && onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs md:text-sm text-stone-500 overflow-x-auto no-scrollbar py-1', className)}>
      <ol className="flex items-center space-x-1.5 whitespace-nowrap">
        <li>
          <a
            href="/"
            onClick={(e) => handleClick(e, '/')}
            className="flex items-center text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="Home"
          >
            <Home className="h-3.5 w-3.5" />
          </a>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-stone-300 shrink-0" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="font-semibold text-stone-900 truncate max-w-[200px] sm:max-w-none" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="hover:text-stone-900 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
