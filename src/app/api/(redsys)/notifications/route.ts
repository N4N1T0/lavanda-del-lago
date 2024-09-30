// Redsys Payment Gateway Imports
import { processRestNotification } from '@/lib/redsys'

// Type imports
import type { ResponseJSONSuccess } from 'redsys-easy'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const notificationParams: ResponseJSONSuccess = {
    Ds_SignatureVersion: req.headers.get('Ds_SignatureVersion') as string,
    Ds_Signature: req.headers.get('Ds_Signature') as string,
    Ds_MerchantParameters: req.headers.get('Ds_MerchantParameters') as string
  }

  const { Ds_Order: orderId, Ds_Response: responseCode } =
    processRestNotification(notificationParams)

  if (responseCode === '0000') {
    // Verificar el código de respuesta (0000 es éxito)
    console.log(`Pago exitoso para la orden ${orderId}`)

    // TODO Send Email to the Admin
  } else {
    console.log(`Fallo en el pago para la orden ${orderId}`)
    // Aquí puedes actualizar el estado de la orden a 'fallido'

    // TODO Send Email to the Admin
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
