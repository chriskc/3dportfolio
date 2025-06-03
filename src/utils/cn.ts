import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names using clsx and ensures proper Tailwind CSS merging
 * This is especially useful when conditionally applying classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
