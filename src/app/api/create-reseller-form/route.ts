// Next.js Imports
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

// Sanity Client Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

/**
 * Handles the creation of a reseller form in Sanity.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {NextRequest} req - The incoming request object (alias).
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the operation.
 */
export async function POST(
	request: NextRequest,
	req: NextRequest,
): Promise<NextResponse> {
	try {
		// Get Data from the request and from the user
		const user = await currentUser()
		const data = await request.json()

		if (!user) {
			// If no user is found, redirect to the sign-in page
			return NextResponse.redirect('/sign-in')
		}

		// Deconstructio of the data
		const { id } = user
		const {
			firstName,
			lastName,
			email,
			nie,
			province,
			phone,
			birthDate,
			birthPlace,
			privacyPolicy,
		} = data

		// Create the reseller form in Sanity
		const response = await sanityClientWrite.createIfNotExists({
			_type: 'resellerForm',
			_id: `resellerForm-${id}`,
			firstName,
			lastName,
			email,
			nie,
			province,
			phone,
			birthDate,
			birthPlace,
			privacyPolicy,
		})

		// If the response is the same id, return an already: true
		if (response._id === `resellerForm-${id}`) {
			return NextResponse.json({
				success: true,
				already: true,
				message: 'Reseller Form already created',
			})
		}

		// Return a success message
		return NextResponse.json({
			success: true,
			already: false,
			message: 'Reseller Form created',
		})
	} catch (error) {
		// Log the error for debugging purposes
		console.error('Error creating Reseller Form in Sanity:', error)

		// Return a 500 Internal Server Error response
		return NextResponse.json(
			{ success: false, message: 'Internal server error' },
			{ status: 500 },
		)
	}
}
