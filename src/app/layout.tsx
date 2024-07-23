// Next.js Imports
import type { Metadata } from 'next'
import localFont from 'next/font/local'

// Components Imports
import { seoMetatags } from '@/components/layout/seo'

// Utility Imports
import { cn } from '@/lib/utils'

// CSS Imports
import './globals.css'

// UI Imports
import { Toaster } from '@/components/ui/toaster'

// Clerk Imports
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'

// Local Fonts Configuration
const lemon = localFont({
	src: './lemon/LemonMilkProRegular.woff2',
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
				<ClerkProvider
					localization={esES}
					appearance={{
						variables: { colorPrimary: '#694DAB', colorInputText: '#694DAB' },
					}}
				>
					<main>{children}</main>
					<Toaster />
				</ClerkProvider>
			</body>
		</html>
	)
}
