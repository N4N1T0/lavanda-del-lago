import { NextResponse } from 'next/server'
import { sanityClientWrite } from '@sanity-studio/lib/client'

export async function POST(request: Request) {
	try {
		const { email } = await request.json()
		const sanitizedEmail = email.replace(/[@.]/g, '-')
		const date = new Date().toISOString()

		const response = await sanityClientWrite.createIfNotExists({
			_type: 'newsletter',
			email,
			date,
			_id: `newsletter-${sanitizedEmail}`,
		})

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
