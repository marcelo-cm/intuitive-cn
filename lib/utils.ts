import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDate(
  date: Date,
  config?: { includeTime?: boolean; excludeDate?: boolean },
): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (!config?.excludeDate) {
    options.year = 'numeric';
    options.month = 'short';
    options.day = '2-digit';
  }

  if (config?.includeTime) {
    options.hour = 'numeric';
    options.minute = '2-digit';
    options.timeZoneName = 'short';
  }

  return new Date(date).toLocaleString('en-US', options);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(value);
}

export function formatSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;

  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${remainingSeconds}s`;
}

export const formatSecondsToMMSS = (d: number | null) => {
  if (d === undefined || d === null) return '0:00';

  d = Number(d);
  const m = Math.floor(d / 60);
  const s = Math.floor(d % 60);

  return `${m}:${s.toString().padStart(2, '0')}`;
};

export const prettifyText = (text: string | undefined): string => {
  return text
    ? text
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';
};

export const generateRandomPassword = (): string => {
  return Math.random().toString(36).slice(-8); // Simple random password generator
};

export const generateFutureDateString = (years: number): string => {
  return new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 365.25 * years,
  ).toISOString();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
