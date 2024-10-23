import { NextResponse } from 'next/server'
import { resend } from '@/lib/clients'
import ContactConfirmationEmail from '@/emails/contact-email'
import { withAxiom, AxiomRequest } from 'next-axiom'

export const POST = withAxiom(async (req: AxiomRequest) => {
  // Destructure the request body
  const { name, email, phone, message } = await req.json()

  try {
    // Send the email
    const { error } = await resend.emails.send({
      from: 'info@lavandadellago.es',
      to: 'info@lavandadellago.es',
      subject: 'Nuevo mensaje de contacto',
      react: ContactConfirmationEmail({
        email,
        message,
        phone,
        name
      })
    })

    // Check if the email was sent successfully
    if (error) {
      req.log.error('Error sending email', { error: error })
      return NextResponse.json(
        { error: 'Error sending email', data: error, success: false },
        { status: 500 }
      )
    }

    // Return a success response
    return NextResponse.json({
      message: 'Email sent successfully',
      success: true
    })
  } catch (err) {
    // Log the error
    req.log.error('Failed to send email', { error: err })

    // Return an error response
    return NextResponse.json(
      { error: 'Failed to send email', data: err, success: false },
      { status: 500 }
    )
  }
})
