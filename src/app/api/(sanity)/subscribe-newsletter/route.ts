// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Handles the POST request to subscribe to the newsletter.
 *
 * @param {NextRequest} request - The incoming request object.
 * @return {NextResponse} A response indicating the result of the subscription attempt.
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<unknown>> {
	try {
		// Get Email from the request and Sanitize it
		const { email } = await request.json()
		const sanitizedEmail = email.replace(/[@.]/g, '-')

		// Get the current date
		const date = new Date().toISOString()

		// Create or update the newsletter in Sanity
		const response = await sanityClientWrite.createIfNotExists({
			_type: 'newsletter',
			email,
			date,
			_id: `newsletter-${sanitizedEmail}`,
		})

		// if the response matches the date, the subscription was successful
		if (response.date === date) {
			return NextResponse.json({
				success: true,
				message: 'Subscription successful',
			})
		}
		return NextResponse.json({
			success: false,
			message: 'Already subscribed',
		})
	} catch (error) {
		console.error('Error subscribing to newsletter:', error)
		return NextResponse.json(
			{ success: false, message: 'Internal server error' },
			{ status: 500 },
		)
	}
}
