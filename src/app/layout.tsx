import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import './globals.css'
import { seoMetatags } from '@/components/layout/seo'
import Navbar from '@/components/layout/navbar'
import Footer from '@/components/layout/footer'

const lemon = localFont({
	src: [
		{
			path: '../assets/lemon-milk-PRO/Lemon Milk Pro Ultra Light.otf',
			weight: '100',
			style: 'light',
		},
		{
			path: '../assets/lemon-milk-PRO/Lemon Milk Pro Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../assets/lemon-milk-PRO/Lemon Milk Pro Bold.otf',
			weight: '700',
			style: 'bold',
		},
	],
	variable: '--font-lemon',
})

export const metadata: Metadata = {}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
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
			</body>
		</html>
	)
}
