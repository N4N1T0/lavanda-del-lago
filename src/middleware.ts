import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isResellerRoute = createRouteMatcher(['/reseller(.*)'])

export default clerkMiddleware((auth, req) => {
	const { userId, sessionClaims } = auth()

	if (!userId) {
		return auth().redirectToSignIn({ returnBackUrl: req.url })
	}

	if (isResellerRoute(req)) {
		const isReseller = sessionClaims?.reseller

		if (!isReseller) {
			const homeUrl = new URL('/', req.url)
			// Add a query parameter to let the homepage know about the unauthorized access
			homeUrl.searchParams.set('security', 'reseller_access_denied')
			return NextResponse.redirect(homeUrl)
		}
	}

	return NextResponse.next()
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
}
