/* eslint-disable @typescript-eslint/no-explicit-any */

// Server Functions Imports
import { NextResponse } from 'next/server'

// Sanity Secret Helper Functions
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Auth Imports
import { readBody } from '@sanity-studio/lib/utils'

// Resend Imports
import { resend } from '@/lib/clients'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

// Types Imports
import { WebhookPurchase } from '@/types'
import PackageOnTheWayEmail from '@/emails/package-on-delivery'

export const runtime = 'nodejs'

// Get the Secret Sanity Webhook from the Environment Variables
const secret = process.env.SANITY_WEBHOOK_SECRET

export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    try {
      // Read the request body
      const body = await readBody(req.body)
      const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''

      // Validate the signature
      if (!(await validateSignature(body, signature))) {
        req.log.error('Invalid signature', { signature }) // Log invalid signature attempt
        return NextResponse.json(
          { success: false, message: 'Invalid signature' },
          { status: 401 }
        )
      }

      // Process the request if the signature is valid
      const jsonBody: WebhookPurchase = JSON.parse(body)

      console.log(jsonBody)

      const { data, error } = await resend.emails.send({
        from: 'info@lavandadellago.es',
        to: [
          jsonBody.userEmail.email,
          'info@lavandadellago.es',
          'pedidos@lavandadellago.es'
        ],
        subject: 'Pedido enviado',
        react: PackageOnTheWayEmail({
          currier: jsonBody.currier,
          currierCode: jsonBody.currierCode,
          customerName: jsonBody.userEmail.name,
          expectedDeliveryDate: new Date(jsonBody.expectedDeliveryDate),
          orderNumber: jsonBody.id,
          products: jsonBody.products,
          shippingAddress:
            jsonBody.shippingAddress === null
              ? jsonBody.userEmail.address
              : jsonBody.shippingAddress.address
        })
      })

      if (error) {
        console.error('Error sending email', error)
        return NextResponse.json(
          { success: false, message: 'Error sending email' },
          { status: 500 }
        )
      }

      return NextResponse.json({ success: true, data }, { status: 200 })
    } catch (error) {
      console.error('Error processing request', error)
      return NextResponse.json(
        { success: false, message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
)

// * HELPER FUNCTIONS ↓↓↓

/**
 * Validates the incoming request's signature.
 *
 * @param {string} body - The raw body of the request.
 * @param {string} signature - The signature from the request headers.
 * @return {Promise<boolean>} A promise that resolves to true if the signature is valid, false otherwise.
 */
async function validateSignature(
  body: string,
  signature: string
): Promise<boolean> {
  return await isValidSignature(body, signature, secret!)
}
