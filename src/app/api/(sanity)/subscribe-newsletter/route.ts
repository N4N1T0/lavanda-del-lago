// Query Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

// Resend Imports
import NewsletterSubscriptionEmail from '@/emails/newsletter-subs-created'
import { resend } from '@/lib/resend'

/**
 * Handles the POST request to subscribe to the newsletter.
 *
 * @param {NextRequest} request - The incoming request object.
 * @return {Promise<NextResponse>} A response indicating the result of the subscription attempt.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get Email from the request and sanitize it
    const { email } = await request.json()
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
      return NextResponse.json({
        success: true,
        message: 'Subscription successful'
      })
    }

    // Send email to admin
    resend.emails.send({
      from: 'lavandadellago.es',
      to: 'info@lavandadellago.es',
      subject: 'Nueva Usuario',
      react: NewsletterSubscriptionEmail({
        email,
        fecha: new Date(date).toLocaleDateString('es-ES')
      })
    })

    // If the response does not match the date, the subscription was unsuccessful
    return NextResponse.json({
      success: false,
      message: 'Already subscribed'
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
