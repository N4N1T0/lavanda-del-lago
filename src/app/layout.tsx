// Next.js Imports
import type { Metadata } from 'next'
import localFont from 'next/font/local'

// Components Imports
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'
import { seoMetatags } from '@/components/layout/seo'

// Utility Imports
import { cn } from '@/lib/utils'

// CSS Imports
import './globals.css'

// UI Imports
import { Toaster } from '@/components/ui/toaster'

// Local Fonts Configuration
const lemon = localFont({
	src: [
		{
			path: '../assets/lemon-milk-PRO/Lemon_Milk_Pro_Ultra_Light.otf',
			weight: '100',
			style: 'light',
		},
		{
			path: '../assets/lemon-milk-PRO/Lemon_Milk_Pro_Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/lemon-milk-PRO/Lemon_Milk_Pro_Bold.otf',
			weight: '700',
			style: 'bold',
		},
	],
	variable: '--font-lemon',
})

// Metatdata for this site
export const metadata: Metadata = seoMetatags

/**
 * Renders the root layout of the application.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing the children.
 * @return {JSX.Element} The root layout JSX element.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>): JSX.Element {
	return (
		<html lang='en'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased overflow-x-hidden',
					lemon.variable,
				)}
			>
				<Navbar />
				<main>{children}</main>
				<Footer />
				<Toaster />
			</body>
		</html>
	)
}
