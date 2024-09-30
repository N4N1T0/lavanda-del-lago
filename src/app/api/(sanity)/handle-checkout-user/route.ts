// Auth Imports
import { clerkClient } from '@/auth'
import { checkoutSchema } from '@/lib/form-schemas'

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
export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const newUser = req.headers.get('new-user') === 'true'
    const body = await req.json()
    const parsedBody = checkoutSchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      )
    }

    if (newUser) {
      await sanityClientWrite.createIfNotExists({
        _id: parsedBody.data.email
          .normalize('NFC')
          .toLowerCase()
          .split('@')
          .join('_'),
        _type: 'user',
        name: parsedBody.data.name,
        email: parsedBody.data.email,
        phone: parsedBody.data.phone,
        idDocument: {
          type: parsedBody.data.documentType,
          value: parsedBody.data.documentNumber
        },
        address: {
          street: parsedBody.data.Calle,
          floor: parsedBody.data.Piso,
          locality: parsedBody.data.Localidad,
          postalCode: parsedBody.data.Codigo_Postal
        },
        password: parsedBody.data.password
      })

      clerkClient.users.createUser({
        firstName: parsedBody.data.name.split(' ')[0],
        lastName: parsedBody.data.name.split(' ')[1] || '',
        password: parsedBody.data.password,
        emailAddress: [parsedBody.data.email],
        phoneNumber: [parsedBody.data.phone],
        username: parsedBody.data.name,
        externalId: parsedBody.data.email
          .normalize('NFC')
          .toLowerCase()
          .split('@')
          .join('_')
      })

      return NextResponse.json({
        success: true
      })
    }

    return NextResponse.json({ success: true })
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
