// Next.js Imports
import React from 'react'
import { redirect } from 'next/navigation'

// Project Components Imports
import NotificationsPageButton from '@/components/checkout/notification-pages-button'

// UI Imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// Assets Imports
import { CheckCircle2Icon, PackageIcon, TruckIcon } from 'lucide-react'

// Types Imports
import { Product, SuccessPage, User } from '@/types'
import { Purchase } from '@/types/sanity'

// Utils imports
import { eurilize } from '@/lib/utils'

// Query Imports
import { sanityClientRead, sanityClientWrite } from '@sanity-studio/lib/client'
import { userByIdCompleted } from '@sanity-studio/queries'

// Resend Imports
import { resend } from '@/lib/clients'
import CompletedPurchase from '@/emails/completed-purchase'

// Define the Server Component
const SuccessPaymentPage = async ({
  searchParams
}: {
  searchParams: SuccessPage
}): Promise<JSX.Element> => {
  // Destructure search parameters
  const {
    userId,
    userName,
    orderId,
    totalAmount,
    reseller,
    userEmail,
    gateway,
    products: productsParam
  } = searchParams

  // Verify the presence of required parameters
  if (
    !orderId ||
    !totalAmount ||
    !reseller ||
    !userId ||
    !userName ||
    !userEmail
  ) {
    redirect('/')
  }

  // Parse products from the URL parameter
  const products: { id: string; quantity: number }[] = productsParam
    ? JSON.parse(decodeURIComponent(productsParam))
    : []

  // create the Purchase Order
  await sanityClientWrite.createIfNotExists<Purchase>({
    _type: 'purchase',
    _id: orderId,
    purchaseDate: new Date().toISOString(),
    userEmail: {
      _ref: userId,
      _type: 'reference'
    },
    totalAmount: Number(totalAmount),
    status:
      gateway === 'PayPal' || gateway === 'Transferencia'
        ? 'completado'
        : 'pendiente',
    reseller: reseller === 'true',
    paymentMethod: gateway,
    products: products?.map((item) => ({
      product: { _ref: item.id, _type: 'reference' }, // Fix: product reference
      quantity: item.quantity,
      _key: item.id
    })),
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: orderId
  })

  if (gateway === 'PayPal' || gateway === 'Transferencia') {
    const user: User = await sanityClientRead.fetch(
      userByIdCompleted,
      {
        _id: userId
      },
      {
        cache: 'no-store'
      }
    )

    // Send email to user
    await resend.emails.send({
      from: 'info@lavandadellago.es',
      to: [userEmail, 'info@lavandadellago.es'],
      subject: 'Orden Completada',
      react: CompletedPurchase({
        customerName: userName,
        orderNumber: orderId,
        totalAmount: Number(totalAmount),
        purchaseDate: new Date().toLocaleString('es-ES'),
        id: userId,
        reseller: reseller === 'true',
        products: user.pastPurchases?.find((p) => p.id === orderId)
          ?.products as unknown as { product: Product; quantity: number }[],
        gateway
      })
    })
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-green-100 p-4'>
      <Card className='w-full max-w-lg border-accent'>
        <CardHeader className='text-center'>
          <CheckCircle2Icon className='mx-auto mb-4 h-16 w-16 text-green-500' />
          <CardTitle className='text-2xl font-bold text-green-500'>
            ¡Pago Exitoso!
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-gray-600'>
            <span className='block text-lg font-bold text-accent'>
              {decodeURIComponent(userName)}
            </span>
            Gracias por tu compra. Tu pedido ha sido procesado con éxito.
          </p>
          <p className='text-center text-xs'>
            {gateway === 'RedSys' || gateway === 'PayPal' ? (
              <span className='text-gray-500'>
                Solo falta la confirmación de la pasarela de pago, para empezar
                a preparar tu envío, puedes ver el estado de tu pedido en tu
                perfil.
              </span>
            ) : (
              <div className='text-center text-gray-800'>
                Si has elegido pagar mediante transferencia, solo tienes que
                realizar la transferencia a la cuenta{' '}
                <span className='font-bold'>
                  ES12 0182 2310 08 0200 1632 13
                </span>{' '}
                con el concepto &quot;lavandadellago-{orderId}&quot;.
                <br />
                <br />
                Después de recibir la confirmación de la transferencia, nosotros
                nos pondremos en contacto contigo para confirmar la recepción
                del pago y proceder con el envío de tu pedido.
              </div>
            )}
          </p>
          <div className='space-y-2 rounded-lg bg-[#694DAB10] p-4'>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>Número de Pedido:</span>
              <span>#{orderId}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>Monto Total:</span>
              <span>{eurilize(Number(totalAmount || '0'))}</span>
            </div>
          </div>
          <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
            <PackageIcon className='h-4 w-4 text-accent' />
            <span>Preparando tu pedido</span>
          </div>
          <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
            <TruckIcon className='h-4 w-4 text-accent' />
            <span>Entrega estimada: 3-5 días hábiles</span>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center space-x-4'>
          <NotificationsPageButton
            reseller={reseller}
            userId={userId}
            status='success'
          />
        </CardFooter>
      </Card>
    </main>
  )
}

export default SuccessPaymentPage
