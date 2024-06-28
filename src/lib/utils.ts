// Type imports
import type { Breadcrumbs } from '@/types'

// Package imports
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

/**
 * A utility function that takes a URL and breaks it apart into a breadcrumb object.
 *
 * @param {string} url - The URL to be broken apart.
 * @return {Breadcrumb} The broken-apart breadcrumb object.
 */
export function breakUrlToBreadcrumb(url: string): Breadcrumbs {
	const parts = url.split('/').filter(Boolean)
	const breadcrumb: Breadcrumbs = []
	let currentPath = ''
	for (const part of parts) {
		currentPath += `/${part}`
		breadcrumb.push({
			name: part,
			path: currentPath,
		})
	}
	return breadcrumb
}

/**
 * A utility function that capitalizes the first letter of a string.
 *
 * @param {string} str - The string to be capitalized.
 * @return {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * A utility function that checks if a string is a URL and extracts the category query parameter if it exists.
 *
 * @param {string} url - The URL to check.
 * @return {{category: string }} The original URL and the extracted category query parameter if it exists, or just the original URL if it doesn't.
 *
 */
export function extractCategoryFromUrl(url: string): {
	category: string
} {
	// TODO: Change Base in the URL constructure for the eviroment production site
	const urlObj = new URL(url, 'http://localhost:3000/')
	if (urlObj.searchParams.has('category')) {
		return {
			category: urlObj.searchParams.get('category') ?? 'Todos',
		}
	}
	return { category: 'Todos' }
}
