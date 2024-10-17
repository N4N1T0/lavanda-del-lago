// Next.js Imports
import { NextResponse } from 'next/server'
// Redsys Payment Gateway Imports
import {
  CURRENCIES,
  TRANSACTION_TYPES,
  randomTransactionId,
  LANGUAGES
} from 'redsys-easy'
import { createRedirectForm } from '@/lib/clients'

// External Libraries Imports
import Decimal from 'decimal.js'
import { User } from '@/types'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

const merchantInfo = {
  DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE!, // Merchant code
  DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL! // Terminal number
}

export const runtime = 'nodejs'

/**
 * Handles GET requests for RedSys payment gateway.
 *
 * This function generates a RedSys redirect form, creates an HTML form with automatic submission via JavaScript,
 * and sends the HTML response that redirects automatically to the payment gateway.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} The HTML response that redirects to the payment gateway.
 */
export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    const {
      totalAmount,
      user,
      products
    }: {
      totalAmount: number
      user: User
      products: {
        id: string
        quantity: number
      }[]
    } = await req.json()

    const { name, id } = user
    const currency = 'EUR'

    // Random ID for the transaction
    const orderId = randomTransactionId()

    // Get the currency information
    const currencyInfo = CURRENCIES[currency]
    const redsysAmount = new Decimal(totalAmount)
      .mul(10 ** currencyInfo.decimals)
      .toFixed(0)
    const redsysCurrency = currencyInfo.num

    // Generate the RedSys redirect form
    const form = createRedirectForm({
      ...merchantInfo,
      DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION, // '0' = Authorization
      DS_MERCHANT_ORDER: orderId,
      DS_MERCHANT_AMOUNT: redsysAmount,
      DS_MERCHANT_CURRENCY: redsysCurrency,
      DS_MERCHANT_MERCHANTNAME: 'Lavanda del Lago.es',
      DS_MERCHANT_MERCHANTURL: `${process.env.NEXT_PUBLIC_URL}/api/notifications`, // Notification URL
      DS_MERCHANT_URLOK: `${process.env.NEXT_PUBLIC_URL}/exito?userId=${id}&orderId=${orderId}&totalAmount=${totalAmount}&products=${products}&gateway=RedSys`, // Success URL
      DS_MERCHANT_URLKO: `${process.env.NEXT_PUBLIC_URL}/fallo?userId=${id}&orderId=${orderId}&totalAmount=${totalAmount}`, // Error URL
      DS_MERCHANT_TERMINAL: merchantInfo.DS_MERCHANT_TERMINAL,
      DS_MERCHANT_MERCHANTCODE: merchantInfo.DS_MERCHANT_MERCHANTCODE,
      DS_MERCHANT_TRANSACTIONDATE: new Date().toISOString(),
      DS_MERCHANT_CONSUMERLANGUAGE: LANGUAGES.es,
      DS_MERCHANT_SHIPPINGADDRESSPYP: 'S',
      DS_MERCHANT_TITULAR: name
    })

    req.log.info('RedSys redirect form created', { orderId, totalAmount }) // Log success with order details

    // Return the HTML response
    return NextResponse.json({
      success: true,
      data: form
    })
  }
)
