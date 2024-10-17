/* eslint-disable @typescript-eslint/no-explicit-any */

// auth imports
import { clerkClient } from '@/lib/clients'
import { userSchema } from '@/lib/forms/form-schemas'
import { User } from '@/types'
import { currentUser } from '@clerk/nextjs/server'

// query imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// server functions imports
import { NextResponse } from 'next/server'

// Resend Imports
import NewUserCreatedEmail from '@/emails/new-user-created'
import { resend } from '@/lib/clients'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'

/**
 * Handles the POST request to update or create user information.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the operation.
 */
export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse<unknown>> => {
    try {
      req.log.info('Received user update/create request') // Log request receipt

      // Parse and validate request body
      const body = await req.json()
      const newUser = req.headers.get('new-user')
      const parsedBody = userSchema.safeParse(body)

      if (!parsedBody.success) {
        req.log.warn('Invalid request body', { errors: parsedBody.error }) // Log validation error
        return NextResponse.json(
          { success: false, message: 'Invalid request body' },
          { status: 400 }
        )
      }

      const {
        name,
        email,
        phone,
        floor,
        locality,
        street,
        postal_code,
        documentNumber,
        documentType,
        password,
        reference,
        country
      } = parsedBody.data

      // Helper to split full name into parts
      const { firstName, lastName } = splitFullName(name)

      if (newUser === 'false') {
        // Update existing user
        const clerkUser = await currentUser()
        if (!clerkUser) {
          req.log.warn('User not signed in') // Log sign-in warning
          return NextResponse.redirect('/sign-in')
        }

        const id = clerkUser.id

        await updateSanityUser(id, {
          name,
          email,
          phone,
          address: {
            floor,
            locality,
            street,
            postal_code,
            reference: reference === undefined ? null : reference,
            country
          },
          idDocument: {
            type: documentType,
            value: documentNumber
          }
        })

        await updateClerkUser(id, firstName, lastName)
        await ensureClerkEmail(id, email)

        req.log.info('User profile updated successfully', { userId: id }) // Log successful update
        return NextResponse.json({
          success: true,
          message: 'The profile has been updated successfully.',
          data: id
        })
      } else {
        // Create a new user
        const clerkUser = await clerkClient.users.createUser({
          emailAddress: [email],
          firstName,
          lastName,
          password,
          username: firstName
        })

        // Upload the user's image to Sanity
        const uploadedImage = await uploadImageToSanity(
          clerkUser.imageUrl,
          clerkUser.id
        )

        const sanityCreateResponse = await sanityClientWrite.createIfNotExists({
          _id: clerkUser.id,
          _type: 'user',
          name,
          email,
          phone,
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImage._id // Reference the uploaded image asset
            }
          },
          address: {
            floor,
            locality,
            street,
            postal_code,
            country
          },
          idDocument: {
            type: documentType,
            value: documentNumber
          },
          password
        })

        if (!sanityCreateResponse) {
          req.log.error('Failed to create user in Sanity', {
            response: sanityCreateResponse
          }) // Log Sanity error
          return NextResponse.json({
            success: false,
            message: 'Internal server error',
            data: sanityCreateResponse
          })
        }

        // Send email to admin
        await resend.emails.send({
          from: 'info@lavandadellago.es',
          to: 'info@lavandadellago.es',
          subject: 'Nuevo Usuario',
          react: NewUserCreatedEmail({
            nombre: name || '',
            email: email,
            fecha: new Date().toLocaleDateString('es-ES'),
            link: `https://lavandadellago.es/studio/structure/usuariosYVentas;user;${clerkUser.id}`
          })
        })

        req.log.info('New user created successfully', {
          userId: clerkUser.id,
          fullName: name
        }) // Log user creation
        return NextResponse.json({
          success: true,
          message: 'The profile has been created successfully',
          data: clerkUser.id
        })
      }
    } catch (error: any) {
      req.log.error('Error updating user', { error }) // Log error details
      return NextResponse.json({
        success: false,
        message: error?.message || 'Internal server error',
        data: error.errors
      })
    }
  }
)

// * HELPER FUNCTIONS ↓↓↓

/**
 * Splits a full name into first name and last name.
 *
 * @param {string} name - The full name of the user.
 * @return {{ firstName: string, lastName: string }} - Object containing firstName and lastName.
 */
function splitFullName(name: string): { firstName: string; lastName: string } {
  const [firstName, ...lastNameParts] = name.split(' ')
  const lastName = lastNameParts.join(' ') || ''
  return { firstName, lastName }
}

/**
 * Updates user information in Sanity.
 *
 * @param {string} id - The user ID in Sanity.
 * @param {User} userData - The user data to update.
 * @return {Promise<void>} Resolves when the update is complete.
 */
async function updateSanityUser(id: string, userData: User): Promise<void> {
  await sanityClientWrite.patch(id).set(userData).commit()
}

/**
 * Updates user information in Clerk.
 *
 * @param {string} id - The user ID in Clerk.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @return {Promise<void>} Resolves when the update is complete.
 */
async function updateClerkUser(
  id: string,
  firstName: string,
  lastName: string
): Promise<void> {
  await clerkClient.users.updateUser(id, { firstName, lastName })
}

/**
 * Ensures the user's email address is present in Clerk.
 *
 * @param {string} userId - The user ID in Clerk.
 * @param {string} email - The email address to check and add if necessary.
 * @return {Promise<void>} Resolves when the operation is complete.
 */
async function ensureClerkEmail(userId: string, email: string): Promise<void> {
  const { emailAddresses } = await clerkClient.users.getUser(userId)

  // Check if the provided email is already one of the user's email addresses
  if (!emailAddresses.some((emailObj) => emailObj.emailAddress === email)) {
    await clerkClient.emailAddresses.createEmailAddress({
      userId,
      emailAddress: email,
      primary: false,
      verified: false
    })
  }
}

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
