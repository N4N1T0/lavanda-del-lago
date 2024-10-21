// Next.js Imports
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Sanity Client Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

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
    // Get the current date in ISO format
    const date = new Date().toISOString()

    try {
      req.log.info('Received request to create reseller form') // Log when the endpoint is hit

      // Get Data from the request and from the user
      const user = await currentUser()
      const formData = await req.formData()

      if (!user) {
        // If no user is found, redirect to the sign-in page
        req.log.warn('User not found, redirecting to sign-in') // Log warning
        return NextResponse.redirect('/sign-in')
      }

      // Extract form data fields
      const data = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        email: formData.get('email') as string,
        nie: formData.get('nie') as string,
        province: formData.get('province') as string,
        phone: formData.get('phone') as string,
        birthDate: formData.get('birthDate') as string,
        privacyPolicy: formData.get('privacyPolicy') === 'true',
        jobType: formData.get('jobType') as string,
        companyFile: formData.get('companyFile') as File | null // Handle file
      }

      // Validaciones personalizadas para el archivo
      if (!data.companyFile) {
        return NextResponse.json(
          { success: false, message: 'Debes subir un archivo' },
          { status: 400 }
        )
      }

      // Validar el tamaño del archivo (máximo 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024 // 5MB en bytes
      if (data.companyFile.size > maxSizeInBytes) {
        return NextResponse.json(
          { success: false, message: 'El archivo debe ser menor a 5MB' },
          { status: 400 }
        )
      }

      // Subir archivo a Sanity
      const fileAsset = await sanityClientWrite.assets.upload(
        'file',
        data.companyFile,
        {
          filename: data.companyFile.name
        }
      )

      // Deconstruction of the validated data
      const { id } = user

      // Create the reseller form in Sanity
      const response = await sanityClientWrite.createIfNotExists({
        _type: 'resellerForm',
        _id: `resellerForm-${id}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        nie: data.nie,
        province: data.province,
        phone: data.phone,
        birthDate: data.birthDate,
        privacyPolicy: data.privacyPolicy,
        jobType: data.jobType,
        companyFile: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: fileAsset._id
          }
        }
      })

      // If the response is the same id, return an already: true
      if (
        new Date(response._createdAt).getTime() < new Date(date).getTime() &&
        response._id === `resellerForm-${id}`
      ) {
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
        to: 'adrian.alvarezalonso1991@gmail.com',
        subject: 'Nueva solicitud de reseller',
        react: NewResellerApplicationEmail({
          fecha: new Date().toLocaleDateString('es-ES'),
          nombre: `${data.firstName} ${data.lastName}`,
          email: data.email,
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
