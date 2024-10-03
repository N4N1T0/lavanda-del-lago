// Redsys Payment Gateway Imports
import { processRestNotification } from '@/lib/redsys'

// Queries Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Type imports
import type { ResponseJSONSuccess } from 'redsys-easy'
import { type NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import CompletedPurchase from '@/emails/completed-purchase'
import { Purchase } from '@/types/sanity'
import { Product, User } from '@/types'
import { userById } from '@/lib/queries'

export async function POST(req: NextRequest) {
  console.log('Notification received')

  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  const { Ds_Order: orderId, Ds_Response: responseCode } =
    processRestNotification(notificationParams)

  if (responseCode === '0000') {
    // Verificar el código de respuesta (0000 es éxito)
    const response: Purchase = await sanityClientWrite
      .patch(orderId)
      .set({ status: 'completado' })
      .commit()

    if (!response) {
      console.log('No se pudo actualizar el estado de la orden')
      return NextResponse.json({ success: false }, { status: 500 })
    }

    const userResponse: User = await sanityClientWrite.fetch(userById, {
      id: response.userEmail?._ref
    })

    if (!userResponse) {
      console.log('No se pudo obtener el usuario')
      return NextResponse.json({ success: false }, { status: 500 })
    }

    console.log(
      'User response =>',
      userResponse.pastPurchases?.find((p) => p.id === orderId)?.products
    )

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
