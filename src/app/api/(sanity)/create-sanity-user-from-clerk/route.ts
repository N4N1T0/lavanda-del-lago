// Auth Imports
import { currentUser } from '@clerk/nextjs/server'

// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

/**
 * Handles GET requests for creating a Sanity user.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {NextResponse} A redirect response to the sign-in page if the user is not authenticated, or a redirect to the original URL after creating the Sanity user.
 */
export async function GET(req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    // Get the current user
    const user = await currentUser()

    // If no user is found, redirect to the sign-in page
    if (!user) {
      return NextResponse.redirect('/sign-in')
    }

    // Destructure relevant user properties
    const { id, fullName, emailAddresses, imageUrl } = user

    // Create the user document in Sanity if it doesn't already exist
    await sanityClientWrite.createIfNotExists({
      _type: 'user',
      _id: id,
      name: fullName,
      email: emailAddresses[0].emailAddress,
      image: imageUrl
    })

    // TODO Send Email to the Admin

    // Redirect to the main URL after successful operation
    const url = req.url?.split('api/create-sanity-user-from-clerk')[0] || '/'
    return NextResponse.redirect(url)
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating user in Sanity:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
