// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Server Functions Imports
import { NextResponse } from 'next/server'

// Resend Imports
import NewsletterSubscriptionEmail from '@/emails/newsletter-subs-created'
import { resend } from '@/lib/clients'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'

/**
 * Handles the POST request to subscribe to the newsletter.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A response indicating the result of the subscription attempt.
 */
export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    try {
      req.log.info('Received subscription request') // Log request receipt

      // Get Email from the request and sanitize it
      const { email } = await req.json()
      const sanitizedEmail = email.replace(/[@.]/g, '-')

      // Get the current date in ISO format
      const date = new Date().toISOString()

      // Create or update the newsletter subscription in Sanity
      const response = await sanityClientWrite.createIfNotExists({
        _type: 'newsletter',
        email,
        date,
        _id: `newsletter-${sanitizedEmail}`
      })

      // Check if the response indicates a successful subscription
      if (response.date === date) {
        req.log.info('Subscription successful', { email }) // Log successful subscription
        return NextResponse.json({
          success: true,
          message: 'Subscription successful'
        })
      }

      // Send email to admin
      await resend.emails.send({
        from: 'info@lavandadellago.es',
        to: 'info@lavandadellago.es',
        subject: 'Nueva Usuario',
        react: NewsletterSubscriptionEmail({
          email,
          fecha: new Date(date).toLocaleDateString('es-ES')
        })
      })

      req.log.warn('Already subscribed', { email }) // Log already subscribed case
      // If the response does not match the date, the subscription was unsuccessful
      return NextResponse.json({
        success: false,
        message: 'Already subscribed'
      })
    } catch (error) {
      req.log.error('Error subscribing to newsletter', { error }) // Log error details

      // Return a 500 Internal Server Error response
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)
