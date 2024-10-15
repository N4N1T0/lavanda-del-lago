// Redsys Payment Gateway Imports
import { processRestNotification } from '@/lib/clients'

// Queries Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'
import { userByIdCompleted } from '@sanity-studio/queries'

// Type imports
import type { ResponseJSONSuccess } from 'redsys-easy'
import { Purchase } from '@/types/sanity'
import { Product, User } from '@/types'

// Next.js Imports
import { NextResponse } from 'next/server'

// Resend Imports
import { resend } from '@/lib/clients'
import CompletedPurchase from '@/emails/completed-purchase'

// Axiom Imports
import { withAxiom, AxiomRequest } from 'next-axiom'

export const runtime = 'nodejs'

/**
 * Procesa la notificación de pago de Redsys.
 * @param req Solicitud de Next.js.
 * @returns Respuesta de Next.js con el estado de la solicitud.
 */
export const POST = withAxiom(async (req: AxiomRequest) => {
  req.log.info('Payment notification received') // Log when endpoint is hit

  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  const {
    Ds_Order: orderId,
    Ds_Response: responseCode,
    Ds_ProcessedPayMethod
  } = processRestNotification(notificationParams)

  if (responseCode === '0000') {
    // Verificar el código de respuesta (0000 es éxito)
    const response: Purchase = await sanityClientWrite
      .patch(orderId)
      .set({ status: 'completado', paymentMethod: Ds_ProcessedPayMethod })
      .commit()

    if (!response) {
      req.log.error('Failed to update order status') // Log error for order update failure
      return NextResponse.json({ success: false }, { status: 500 })
    }

    const userResponse: User = await sanityClientWrite.fetch(
      userByIdCompleted,
      {
        id: response.userEmail?._ref
      },
      {
        cache: 'no-store'
      }
    )

    if (!userResponse) {
      req.log.error('Failed to fetch user information') // Log error for user fetch failure
      return NextResponse.json({ success: false }, { status: 500 })
    }

    // Send email to user
    await resend.emails.send({
      from: 'info@lavandadellago.es',
      to: [userResponse.email, 'info@lavandadellago.es'],
      subject: 'Orden Completada',
      react: CompletedPurchase({
        customerName: userResponse.name,
        orderNumber: response._id,
        totalAmount: response.totalAmount,
        purchaseDate: response.purchaseDate,
        id: userResponse.id,
        reseller: response.reseller,
        products: userResponse.pastPurchases?.find((p) => p.id === orderId)
          ?.products as unknown as { product: Product; quantity: number }[]
      })
    })

    req.log.info('Order updated and email sent successfully', { orderId }) // Log success
  } else {
    req.log.warn(`Payment failed for order ${orderId}`) // Log payment failure
    // Aquí puedes actualizar el estado de la orden a 'fallido'
  }

  return NextResponse.json({ success: true }, { status: 200 })
})
