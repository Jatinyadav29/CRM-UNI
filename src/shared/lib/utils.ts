import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, compact = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '$0';
  if (compact) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (isNaN(num) || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '—';
  try {
    // Normalize date strings for iOS/WebKit Safari compatibility
    // Handle 'YYYY-MM-DD' formats to avoid UTC midnight date shifting
    const normalized = dateString.includes('T')
      ? dateString
      : dateString.replace(/-/g, '/');

    const date = new Date(normalized);

    // Guard against Invalid Date
    if (isNaN(date.getTime())) {
      const fallbackDate = new Date(dateString);
      if (isNaN(fallbackDate.getTime())) {
        return dateString;
      }
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(fallbackDate);
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString || '—';
  }
}
