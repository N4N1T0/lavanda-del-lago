import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that merges and normalizes CSS class names using Tailwind CSS.
 *
 * @param {string | undefined} inputs - The CSS class names to merge.
 * @return {string | undefined} - The merged and normalized CSS class names.
 */
export function cn(...inputs: Array<string | undefined>): string | undefined {
	return twMerge(clsx(inputs))
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

/**
 * A utility function that formats a number as a Euro currency string.
 *
 * @param {number} number - The number to be formatted as Euro currency.
 * @return {string} The formatted Euro currency string.
 */
export function eurilize(number: number): string {
	return number.toLocaleString('de-DE', {
		style: 'currency',
		currency: 'EUR',
	})
}
