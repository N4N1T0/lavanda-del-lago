// Server Middleware
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
	'/',
	'/about',
	'/blog',
	'/search',
	'/privacy-policy',
	'/cookies-policy',
	'/events',
	'/sitemap',
	'/studio(.*)',
	'/api(.*)',
	'/sign-in(.*)',
	'/reseller-form',
	'/sign-up(.*)',
])

// Define routes that need authentication
const isProtectedRoute = createRouteMatcher(['/reseller(.*)'])

export default clerkMiddleware((auth, req) => {
	const { userId, sessionClaims } = auth()

	// Bypass authentication for public routes
	if (publicRoutes(req)) {
		return NextResponse.next()
	}

	// Redirect to sign-in if not authenticated
	if (!userId) {
		return auth().redirectToSignIn({ returnBackUrl: req.url })
	}

	// Check if the route requires reseller access
	if (isProtectedRoute(req)) {
		const isReseller = sessionClaims?.reseller

		if (!isReseller) {
			const homeUrl = new URL('/', req.url)
			// Add a query parameter to let the homepage know about the unauthorized access
			homeUrl.searchParams.set('security', 'reseller_access_denied')
			return NextResponse.redirect(homeUrl)
		}
	}

	// Proceed to the next middleware or handler
	return NextResponse.next()
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
}
