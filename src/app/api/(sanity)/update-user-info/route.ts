// Auth Imports
import { clerkClient } from '@/auth'
import { currentUser } from '@clerk/nextjs/server'

// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Handles the POST request to update user information.
 *
 * @param {NextRequest} request - The incoming request object.
 * @return {NextResponse} A JSON response indicating the success or failure of the update operation.
 */
export async function POST(
	request: NextRequest,
): Promise<NextResponse<unknown>> {
	try {
		// Fetch the current user from Clerk
		const clerkUser = await currentUser()
		if (!clerkUser) {
			return NextResponse.redirect('/sign-in')
		}

		// Parse request body
		const { name, email, phone, address, id } = await request.json()

		// Update user in Sanity
		const sanityUpdateResponse = await updateSanityUser(id, {
			name,
			email,
			phone,
			address,
		})

		// Update user in Clerk
		await updateClerkUser(id, name)

		// Check and update Clerk email addresses
		await ensureClerkEmail(clerkUser.id, email)

		return NextResponse.json({
			success: true,
			message: `The profile has been updated successfully with ID: ${sanityUpdateResponse._id}`,
		})
	} catch (error) {
		console.error('Error updating user:', error)
		return NextResponse.json({
			success: false,
			message: `Internal server error: ${(error as Error)?.message}`,
		})
	}
}

// Helper function to update user in Sanity
async function updateSanityUser(
	id: string,
	userData: { name: string; email: string; phone: string; address: string },
) {
	return sanityClientWrite.patch(id).set(userData).commit()
}

// Helper function to update user in Clerk
async function updateClerkUser(id: string, name: string) {
	const [firstName, ...lastNameParts] = name.split(' ')
	const lastName = lastNameParts.join(' ') || ''

	return clerkClient.users.updateUser(id, { firstName, lastName })
}

// Helper function to ensure email address is present in Clerk
async function ensureClerkEmail(userId: string, email: string) {
	const { emailAddresses } = await clerkClient.users.getUser(userId)

	// Check if the provided email is already one of the user's email addresses
	const emailExists = emailAddresses.some(
		(emailObj) => emailObj.emailAddress === email,
	)

	if (!emailExists) {
		await clerkClient.emailAddresses.createEmailAddress({
			userId,
			emailAddress: email,
			primary: false,
			verified: false,
		})
	}
}
