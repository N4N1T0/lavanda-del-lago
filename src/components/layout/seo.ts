import type { Metadata } from 'next'

export const seoMetatags: Metadata = {
	title: {
		template: '%s  |  Next.js',
		default: 'Nanito - Next.js',
	},
	description: '',
	authors: [
		{ name: 'Adrian Alvarez', url: 'https://www.adrian-alvarez.dev/es/' },
	],
	generator: 'Next.js',
	applicationName: 'Next.js',
	referrer: 'origin-when-cross-origin',
	keywords: ['nanito', 'website', 'nextjs', 'boilerplate'],
	creator: 'Adrian Alvarez',
	publisher: '',
	category: '',
	formatDetection: {
		email: true,
		address: true,
		telephone: true,
		date: true,
		url: true,
	},
}
