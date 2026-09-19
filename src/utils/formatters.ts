import { AvailabilityStatus } from '../types';

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAvailabilityBadgeProps(status: AvailabilityStatus): {
  variant: 'success' | 'warning' | 'neutral' | 'secondary';
  label: string;
  dotColor: string;
} {
  switch (status) {
    case 'Available':
      return {
        variant: 'success',
        label: 'Available Today',
        dotColor: 'bg-emerald-500',
      };
    case 'Busy':
      return {
        variant: 'warning',
        label: 'Limited Openings',
        dotColor: 'bg-amber-500',
      };
    case 'By Appointment':
      return {
        variant: 'secondary',
        label: 'By Appointment',
        dotColor: 'bg-sky-500',
      };
    case 'Away':
    default:
      return {
        variant: 'neutral',
        label: 'Temporarily Away',
        dotColor: 'bg-neutral-400',
      };
  }
}
