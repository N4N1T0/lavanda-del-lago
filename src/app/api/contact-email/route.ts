import { NextResponse } from 'next/server'
import { resend } from '@/lib/clients'
import ContactConfirmationEmail from '@/emails/contact-email'
import { withAxiom, AxiomRequest } from 'next-axiom'

export const POST = withAxiom(async (req: AxiomRequest) => {
  const { name, email, phone, message } = await req.json()

  try {
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

    if (error) {
      return NextResponse.json(
        { error: 'Error sending email', data: error, success: false },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Email sent successfully',
      success: true
    })
  } catch (err) {
    req.log.error('Failed to send email', { error: err }) // Use Axiom logger
    return NextResponse.json(
      { error: 'Failed to send email', data: err, success: false },
      { status: 500 }
    )
  }
})
