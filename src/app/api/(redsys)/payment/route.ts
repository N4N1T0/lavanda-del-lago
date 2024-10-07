// Next.js Imports
import { type NextRequest, NextResponse } from 'next/server'
// Redsys Payment Gateway Imports
import {
  CURRENCIES,
  TRANSACTION_TYPES,
  randomTransactionId,
  LANGUAGES
} from 'redsys-easy'
import { createRedirectForm } from '@/lib/redsys'

// External Libraries Imports
import Decimal from 'decimal.js'
import { User } from '@/types'

const merchantInfo = {
  DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE!, // Merchant code
  DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL! // Terminal number
}

/**
 * Handles GET requests for RedSys payment gateway.
 *
 * This function generates a RedSys redirect form, creates an HTML form with automatic submission via JavaScript,
 * and sends the HTML response that redirects automatically to the payment gateway.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} The HTML response that redirects to the payment gateway.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
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
    }
  } = await req.json()

  const { name, id, reseller, email } = user
  const currency = 'EUR'
  const serializedProducts = encodeURIComponent(JSON.stringify(products))

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
    DS_MERCHANT_MERCHANTURL: `${process.env.CI ? 'http://www.lavandadellago.es' : 'https://lavanda-del-lago.vercel.app'}/api/notifications`, // Notification URL
    DS_MERCHANT_URLOK: `${process.env.CI ? 'http://www.lavandadellago.es' : 'http://localhost:3000'}/success?userId=${id}&userName=${encodeURIComponent(name.normalize('NFC'))}&orderId=${orderId}&totalAmount=${totalAmount}&reseller=${reseller}&userEmail=${email}&products=${serializedProducts}`, // Success URL
    DS_MERCHANT_URLKO: `${process.env.CI ? 'http://www.lavandadellago.es' : 'http://localhost:3000'}/failed?userId=${id}&userName.normalize('NFC')=${encodeURIComponent(name.normalize('NFC'))}&orderId=${orderId}&totalAmount=${totalAmount}&reseller=${reseller}&userEmail=${email}`, // Error URL
    DS_MERCHANT_TERMINAL: merchantInfo.DS_MERCHANT_TERMINAL,
    DS_MERCHANT_MERCHANTCODE: merchantInfo.DS_MERCHANT_MERCHANTCODE,
    DS_MERCHANT_TRANSACTIONDATE: new Date().toISOString(),
    DS_MERCHANT_CONSUMERLANGUAGE: LANGUAGES.es,
    DS_MERCHANT_SHIPPINGADDRESSPYP: 'S',
    DS_MERCHANT_TITULAR: name
  })

  // Return the HTML response
  return NextResponse.json({
    success: true,
    data: form
  })
}
