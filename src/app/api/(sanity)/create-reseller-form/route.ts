// Next.js Imports
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Sanity Client Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'
import { resellerFormSchema } from '@/lib/forms/form-schemas'

// Resend Imports
import { resend } from '@/lib/clients'
import NewResellerApplicationEmail from '@/emails/new-reseller-form-application'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'

/**
 * Handles the creation of a reseller form in Sanity.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the operation.
 */
export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    try {
      req.log.info('Received request to create reseller form') // Log when the endpoint is hit

      // Get Data from the request and from the user
      const user = await currentUser()
      const data = await req.json()

      if (!user) {
        // If no user is found, redirect to the sign-in page
        req.log.warn('User not found, redirecting to sign-in') // Log warning
        return NextResponse.redirect('/sign-in')
      }

      // Validate the request body
      const parsedBody = resellerFormSchema.safeParse(data)
      if (!parsedBody.success) {
        req.log.error('Invalid request body', {
          errors: parsedBody.error.errors
        }) // Log validation errors
        return NextResponse.json(
          { success: false, message: 'Invalid request body' },
          { status: 400 }
        )
      }

      // Deconstruction of the data
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
        privacyPolicy
      } = parsedBody.data

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
        privacyPolicy
      })

      // If the response is the same id, return an already: true
      if (response._id === `resellerForm-${id}`) {
        req.log.info('Reseller Form already created', { userId: id }) // Log existing form
        return NextResponse.json({
          success: true,
          already: true,
          message: 'Reseller Form already created'
        })
      }

      // Send email to admin
      await resend.emails.send({
        from: 'info@lavandadellago.es',
        to: 'info@lavandadellago.es',
        subject: 'Nueva solicitud de reseller',
        react: NewResellerApplicationEmail({
          fecha: new Date().toLocaleDateString('es-ES'),
          nombre: `${firstName} ${lastName}`,
          email: email,
          link: `https://lavandadellago.es/studio/structure/usuariosYVentas;resellerForm;resellerForm-${id}`
        })
      })

      req.log.info('Reseller Form created successfully', { userId: id }) // Log success message

      // Return a success message
      return NextResponse.json({
        success: true,
        already: false,
        message: 'Reseller Form created'
      })
    } catch (error) {
      // Log the error for debugging purposes
      req.log.error('Error creating Reseller Form in Sanity', { error })

      // Return a 500 Internal Server Error response
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)
