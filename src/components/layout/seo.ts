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
	keywords: ['nanito'],
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
	openGraph: {
		title: 'Nanito - Next.js Boilerplate',
		description: '',
		url: process.env.SITE_URL,
		siteName: '',
		locale: '',
		type: 'website',
		countryName: '',
		emails: '',
		phoneNumbers: '',
		images: [''],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nanito - Next.js Boilerplate',
		description: '',
		creator: '',
		site: process.env.SITE_URL,
		images: [''],
	},
}
