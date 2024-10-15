/* eslint-disable @typescript-eslint/no-explicit-any */
// Server Functions Imports
import { NextResponse } from 'next/server'

// Auth Imports
import { currentUser } from '@clerk/nextjs/server'

// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Resend Imports
import NewUserCreatedEmail from '@/emails/new-user-created'
import { resend } from '@/lib/clients'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Handles GET requests for creating a Sanity user.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A redirect response to the sign-in page if the user is not authenticated, or a redirect to the original URL after creating the Sanity user.
 */
export const GET = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    try {
      req.log.info('GET request for creating Sanity user initiated')

      const now = new Date()

      // Get the current user
      const user = await currentUser()

      // If no user is found, redirect to the sign-in page
      if (!user) {
        req.log.warn('No user found, redirecting to sign-in page')
        return NextResponse.redirect('/sign-in')
      }

      // Destructure relevant user properties
      const { id, fullName, emailAddresses, imageUrl } = user

      // Upload the user's image to Sanity
      const uploadedImage = await uploadImageToSanity(imageUrl, id)

      // Create the user document in Sanity if it doesn't already exist
      const response: any = await sanityClientWrite.createIfNotExists({
        _type: 'user',
        _id: id,
        name: fullName,
        email: emailAddresses[0].emailAddress,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id // Reference the uploaded image asset
          }
        }
      })

      const createdAtDate = new Date(response._createdAt)

      // Log new user creation
      if (Math.abs(now.getTime() - createdAtDate.getTime()) < 1000) {
        req.log.info('New user created', { userId: id, fullName })
        // Send email to admin
        await resend.emails.send({
          from: 'info@lavandadellago.es',
          to: 'info@lavandadellago.es',
          subject: 'Nuevo Usuario',
          react: NewUserCreatedEmail({
            nombre: fullName || '',
            email: emailAddresses[0].emailAddress,
            fecha: new Date().toLocaleDateString('es-ES'),
            link: `https://lavandadellago.es/studio/structure/usuariosYVentas;user;${id}`
          })
        })
      }

      return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!)
    } catch (error) {
      // Log the error for debugging purposes
      req.log.error('Error creating user in Sanity', { error })

      // Return a 500 Internal Server Error response
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)

// Helper to upload image to Sanity from URL
async function uploadImageToSanity(imageUrl: string, userId: string) {
  const response = await fetch(imageUrl)
  const imageBlob = await response.blob()

  // Upload the image to Sanity as an asset
  const sanityImageAsset = await sanityClientWrite.assets.upload(
    'image',
    imageBlob,
    {
      filename: userId
    }
  )

  return sanityImageAsset
}
