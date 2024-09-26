// Redsys Payment Gateway Imports
import { CURRENCIES, TRANSACTION_TYPES, randomTransactionId } from 'redsys-easy'
import { createRedirectForm } from '@/lib/redsys'

// External Libraries Imports
import Decimal from 'decimal.js'

// Next.js Imports/**
import { type NextRequest, NextResponse } from 'next/server'

const merchantInfo = {
	DS_MERCHANT_MERCHANTCODE: process.env.REDSYS_MERCHANT_CODE!, // Merchant code
	DS_MERCHANT_TERMINAL: process.env.REDSYS_TERMINAL!, // Terminal number
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
	const { totalAmount, currency } = {
		totalAmount: '49.99', // Simulation of total
		currency: 'EUR',
	} as const

	const orderId = randomTransactionId() // Random ID for the transaction

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
		DS_MERCHANT_MERCHANTNAME: 'MY SHOP',
		DS_MERCHANT_MERCHANTURL: `${req.url}/api/notifications`, // Notification URL
		DS_MERCHANT_URLOK: `${req.url}/api/success`, // Success URL
		DS_MERCHANT_URLKO: `${req.url}/api/error`, // Error URL
		DS_MERCHANT_TERMINAL: merchantInfo.DS_MERCHANT_TERMINAL,
		DS_MERCHANT_MERCHANTCODE: merchantInfo.DS_MERCHANT_MERCHANTCODE,
	})

	// Create the HTML form with automatic submission via JavaScript
	const autoSubmitForm = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Redirecting to payment gateway...</title>
    </head>
    <body>
      <p>Redirecting to payment gateway...</p>
      <form id="paymentForm" action="${form.url}" method="POST">
        <input type="hidden" name="Ds_SignatureVersion" value="${form.body.Ds_SignatureVersion}" />
        <input type="hidden" name="Ds_MerchantParameters" value="${form.body.Ds_MerchantParameters}" />
        <input type="hidden" name="Ds_Signature" value="${form.body.Ds_Signature}" />
      </form>
      <script type="text/javascript">
        document.getElementById('paymentForm').submit();
      </script>
    </body>
    </html>
  `

	// Send the HTML response that redirects automatically
	return new NextResponse(autoSubmitForm, {
		headers: {
			'Content-Type': 'text/html',
		},
	})
}
