import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { SEO_CONFIG } from '../../config/seo';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
  className?: string;
}

export function Breadcrumbs({ items, onNavigate, className = '' }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (!href) return;
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <nav
      aria-label="Breadcrumbs navigation"
      className={`flex items-center flex-wrap gap-1.5 text-xs text-[#5F5A52] ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#D0C9BD] shrink-0" />}
              {isLast || !item.href ? (
                <span
                  className="font-medium text-[#171717] truncate max-w-[200px] sm:max-w-[300px]"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 inline mr-1 text-[#C6922E]" />}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="hover:text-[#C6922E] transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 text-[#C6922E]" />}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
