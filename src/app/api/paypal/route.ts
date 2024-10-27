/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js Imports
import { NextResponse } from 'next/server'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

/**
 * Create a PayPal order.
 *
 * @param {string} total - The total amount for the order.
 * @return {Promise<any>} The PayPal order data.
 */
const createPayPalOrder = async (total: string): Promise<any> => {
  const PAYPAL_API = 'https://api-m.paypal.com'
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: total
          }
        }
      ],
      'payment_source': {
        'paypal': {
          'experience_context': {
            'payment_method_preference': 'IMMEDIATE_PAYMENT_REQUIRED',
            'brand_name': 'Lavanda del Lago España',
            'locale': 'es-ES',
            'user_action': 'PAY_NOW'
          }
        }
      }
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`Failed to create PayPal order: ${JSON.stringify(data)}`)
  }

  return data
}

/**
 * Capture a PayPal order.
 *
 * @param {string} orderId - The ID of the PayPal order to capture.
 * @return {Promise<any>} The captured PayPal order data.
 */
const capturePayPalOrder = async (orderId: string): Promise<any> => {
  const PAYPAL_API = 'https://api-m.paypal.com'
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(
    `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`
      }
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(`Failed to capture PayPal order: ${JSON.stringify(data)}`)
  }

  return data
}

/**
 * Handles POST requests for PayPal order creation and capturing.
 *
 * @param {AxiomRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} The JSON response with payment data.
 */
export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    const { action, total, orderId } = await req.json()

    try {
      let result

      if (action === 'create') {
        // Create an order with PayPal
        result = await createPayPalOrder(total)
      } else if (action === 'capture') {
        // Capture the payment for the existing PayPal order
        result = await capturePayPalOrder(orderId)
      }

      req.log.info('PayPal payment processed successfully', { action, total }) // Log success

      return NextResponse.json(result)
    } catch (error: any) {
      console.error(error.message)
      req.log.error('PayPal payment processing error', { error: error.message }) // Log the error
      return NextResponse.json({ success: false, error: error.message })
    }
  }
)
