import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const AED_TO_EUR = 0.25

export function aedToEur(aed: number): number {
  return Math.round(aed * AED_TO_EUR)
}

export function formatAED(amount: number): string {
  return `${amount.toLocaleString('it-IT')} AED`
}

export function formatEUR(amount: number): string {
  return `~€${aedToEur(amount).toLocaleString('it-IT')}`
}
