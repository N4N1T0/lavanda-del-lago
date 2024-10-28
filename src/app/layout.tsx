import { Josefin_Sans } from 'next/font/google'

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
import { localization } from '@/components/auth/custom-locale'

// Security
import SecurityHandling from '@/components/layout/security-handling'
import CookieConsent from '@/components/ui/cookie'

// Google Tags
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import FacebookPixel from '@/components/layout/facebook-pixel'

// Local Fonts Configuration
const josefinSand = Josefin_Sans({
  weight: ['300', '500', '700'],
  subsets: ['latin'],
  variable: '--josefin-sans'
})

// Metatdata for this site
export async function generateMetadata() {
  const metadata = await seoMetatags()
  return metadata
}

/**
 * Renders the root layout of the application.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The props object containing the children.
 * @return {JSX.Element} The root layout JSX element.
 */
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <ClerkProvider
      localization={localization}
      appearance={{
        variables: { colorPrimary: '#694DAB', colorInputText: '#694DAB' }
      }}
    >
      <html lang='es' suppressHydrationWarning>
        <GoogleTagManager gtmId='GTM-K927WFGW' />
        <body
          className={cn(
            'bg-background min-h-screen overflow-x-hidden font-sans antialiased',
            josefinSand.variable
          )}
        >
          {children}
          <CookieConsent />
          <Toaster />
          <SecurityHandling />
          <FacebookPixel />
        </body>
        <GoogleAnalytics gaId='G-CVT66KMQBQ' />
      </html>
    </ClerkProvider>
  )
}
