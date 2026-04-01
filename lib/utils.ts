import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};

export const extractSpeed = (productName: string) => {
  const match = productName.match(/(\d+)\s*Mbps/i);
  return match ? `${match[1]} Mbps` : 'N/A';
};
