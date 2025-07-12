
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add image optimization utilities
export function optimizedImageUrl(url: string, width?: number, quality?: number): string {
  if (!url) return '';
  
  // If it's an Unsplash image, use their optimization API
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    const w = width || 1000;
    const q = quality || 80;
    return `${baseUrl}?w=${w}&q=${q}&auto=format&fit=crop`;
  }
  
  return url;
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
