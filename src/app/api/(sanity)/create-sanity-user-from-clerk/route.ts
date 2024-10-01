// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

// Auth Imports
import { currentUser } from '@clerk/nextjs/server'

// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Resend Imports
import NewUserCreatedEmail from '@/emails/new-user-created'
import { resend } from '@/lib/resend'

/**
 * Handles GET requests for creating a Sanity user.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A redirect response to the sign-in page if the user is not authenticated, or a redirect to the original URL after creating the Sanity user.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
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

    // Send email to admin
    resend.emails.send({
      from: 'lavandadellago.es',
      to: 'info@lavandadellago.es',
      subject: 'Nueva Usuario',
      react: NewUserCreatedEmail({
        nombre: fullName || '',
        email: emailAddresses[0].emailAddress,
        fecha: new Date().toLocaleDateString('es-ES'),
        link: `https://lavandadellago.es/studio/structure/usuariosYVentas;user;${id}`
      })
    })

    // Redirect to the main URL after successful operation
    const baseUrl =
      req.url?.split('api/create-sanity-user-from-clerk')[0] || '/'
    return NextResponse.redirect(baseUrl)
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
