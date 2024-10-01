// Server Middleware
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  '/',
  '/about',
  '/blog(.*)',
  '/search',
  '/privacy-policy',
  '/cookies-policy',
  '/events',
  '/sitemap',
  '/studio(.*)',
  '/api(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/products(.*)',
  '/just-a-flower',
  '/property',
  '/about-us',
  '/certifications',
  '/remedies',
  '/checkout(.*)'
])

// Define reseller-protected routes
const resellerProtectedRoutes = createRouteMatcher(['/reseller/(.*)'])

// Reseller Form Protected Routes
const resellerFormProtectedRoutes = createRouteMatcher(['/reseller-form(.*)'])

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = auth()

  // Bypass authentication for public routes
  if (publicRoutes(req)) return NextResponse.next()

  // Redirect to sign-in if not authenticated
  if (!userId) {
    return auth().redirectToSignIn({ returnBackUrl: req.url })
  }

  // If user is authenticated but accesses a reseller-protected route
  if (resellerProtectedRoutes(req)) {
    const isReseller = sessionClaims?.reseller

    // If not a reseller, redirect to homepage with a query parameter
    if (!isReseller) {
      return NextResponse.redirect(
        new URL('/?security=reseller_access_denied', req.url)
      )
    }
  }

  if (resellerFormProtectedRoutes(req)) {
    const isReseller = sessionClaims?.reseller

    if (isReseller) {
      return NextResponse.redirect(
        new URL('/?security=already_reseller', req.url)
      )
    }
  }

  // Continue to the next middleware or handler
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
}
