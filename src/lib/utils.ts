// Type imports
import type { Breadcrumbs, CartItem, Product } from '@/types'

// Package imports
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function that merges and normalizes CSS class names using Tailwind CSS.
 *
 * @param {string | undefined | string[]} inputs - The CSS class names to merge.
 * @return {string | undefined} - The merged and normalized CSS class names.
 *
 * @example
 * cn('bg-red-500', 'text-white', 'rounded-full', 'p-2') // 'bg-red-500 text-white rounded-full p-2'
 * cn('bg-red-500', undefined, 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
 * cn('bg-red-500', [], 'rounded-full', 'p-2') // 'bg-red-500 rounded-full p-2'
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
 *
 * @example
 * eurilize(1000) // "€1,000.00"
 * eurilize(50.5) // "€50.50"
 * eurilize(12345.6789) // "€12,345.68"
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
 *
 * @example
 * breakUrlToBreadcrumb('/products/accessories/belts') // [{ name: 'products', path: '/products' }, { name: 'accessories', path: '/products/accessories' }, { name: 'belts', path: '/products/accessories/belts' }]
 * breakUrlToBreadcrumb('/products/clothes/jackets?category=coats') // [{ name: 'products', path: '/products' }, { name: 'clothes', path: '/products/clothes' }, { name: 'jackets', path: '/products/clothes/jackets' }, { name: 'coats', path: '/products/clothes/jackets?category=coats' }]
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
 *
 * @example
 * capitalizeFirstLetter('hello') // 'Hello'
 * capitalizeFirstLetter('world') // 'World'
 * capitalizeFirstLetter('javascript') // 'Javascript'
 */
export function capitalizeFirstLetter(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Calculates the total cost of a shopping cart, including shipping. and returns an array of three strings.
 * 1 - Subtotal
 * 2 - Total
 * 3 - IVA
 *
 * @param {CartItem[]} count - An array of items in the shopping cart.
 * @param {number} [shipping=0] - The cost of shipping.
 * @return {[string, string, string]} An array of three strings representing the subtotal, total, and tax.
 *
 * @example
 * calculateTotal([{ price: 10, quantity: 1 }, { price: 20, quantity: 2 }], 5) // ['30', '35', '1.75']
 * calculateTotal([{ price: 5, quantity: 3 }, { price: 10, quantity: 1 }], 10) // ['25', '35', '1.75']
 * calculateTotal([{ price: 100, quantity: 1 }], 20) // ['100', '120', '8.5']
 *
 */
export function calculateTotal(
	count: CartItem[],
	shipping = 0,
): [string, string, string] {
	let subTotal = 0
	for (const item of count) {
		subTotal += Number(item.price) * item.quantity
	}
	return [
		eurilize(subTotal),
		eurilize(subTotal * 1.21 + shipping),
		eurilize(subTotal * 0.21),
	]
}

/**
 * Removes an item from the wishlist based on its ID.
 *
 * @param {WPProduct[]} count - The current wishlist.
 * @param {string} id - The ID of the item to remove.
 * @return {WPProduct[]} - The updated wishlist with the item removed.
 *
 * @example
 * removeFromWishlist([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }], '2') // [{ id: 1, name: 'Product 1' }]
 * removeFromWishlist([{ id: 3, name: 'Product 3' }], '2') // [{ id: 3, name: 'Product 3' }]
 */
export const removeFromWishlist = (count: Product[], id: number): Product[] => {
	return count.filter((item) => item.id !== id)
}
