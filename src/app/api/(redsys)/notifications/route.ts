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
import { type NextRequest, NextResponse } from 'next/server'

// Resend Imports
import { resend } from '@/lib/clients'
import CompletedPurchase from '@/emails/completed-purchase'

/**
 * Procesa la notificación de pago de Redsys.
 * @param req Solicitud de Next.js.
 * @returns Respuesta de Next.js con el estado de la solicitud.
 */
export async function POST(req: NextRequest) {
  console.log('Notification received')

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
      console.log('No se pudo actualizar el estado de la orden')
      return NextResponse.json({ success: false }, { status: 500 })
    }

    const userResponse: User = await sanityClientWrite.fetch(
      userByIdCompleted,
      {
        id: response.userEmail?._ref
      }
    )

    if (!userResponse) {
      console.log('No se pudo obtener el usuario')
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
  } else {
    console.log(`Fallo en el pago para la orden ${orderId}`)
    // Aquí puedes actualizar el estado de la orden a 'fallido'
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
