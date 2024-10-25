// Next.js Imports
import { redirect } from 'next/navigation'

// Project Components Imports
import NotidicationsPageButton from '@/components/checkout/notification-pages-button'

// UI Imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertCircle, HelpCircle } from 'lucide-react'

// Types Imports
import type { Metadata } from 'next'

// Utils Imports
import { eurilize } from '@/lib/utils'
import { FailedPage, User } from '@/types'
import { sanityClientRead } from '@sanity-studio/lib/client'

import { userByIdCompleted } from '@sanity-studio/queries'
// Axiom Imports
import { Logger } from 'next-axiom'
import { resend } from '@/lib/clients'
import PaymentErrorNotification from '@/emails/error-in-the-payment'

// Metadata for this page
export const metadata: Metadata = {
  title: 'Pago Fallido',
  description: 'Pago Fallido'
}

/**
 * Fetches data from
 *
 * @return {JSX.Element} The JSX element representing the.
 */
const FailedPaymentPage = async ({
  searchParams
}: {
  searchParams: FailedPage
}): Promise<JSX.Element> => {
  const log = new Logger()

  // Destructure search parameters
  const { userId, orderId, totalAmount, errorDetails } = searchParams

  // Verify the presence of required parameters
  if (!totalAmount || !userId) {
    log.debug('Missing required parameters in the Failed Page')
    redirect('/')
  }

  // fetch the user
  const user: User = await sanityClientRead.fetch(
    userByIdCompleted,
    {
      id: userId
    },
    {
      cache: 'no-store'
    }
  )

  // Verify the presence of required user information
  if (user?.name === undefined || user?.reseller === undefined) {
    log.debug('Missing required user information in the Failed Page')
    redirect('/')
  }

  await resend.emails.send({
    from: 'info@lavandadellago.es',
    to: ['info@lavandadellago.es', 'pedidos@lavandadellago.es'],
    subject: 'Error en el Pago',
    react: PaymentErrorNotification({
      user,
      orderId,
      errorDetails,
      totalAmount
    })
  })

  return (
    <main className='flex min-h-screen items-center justify-center bg-red-100 p-4'>
      <Card className='w-full max-w-lg border-accent'>
        <CardHeader className='text-center'>
          <AlertCircle className='mx-auto mb-4 h-16 w-16 text-red-500' />
          <CardTitle className='text-2xl font-bold text-red-600'>
            Pago Fallido
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <p className='text-center text-gray-600'>
            <span className='block text-lg font-bold text-accent'>
              {user.name}
            </span>{' '}
            Lo sentimos, hubo un problema al procesar tu pago. Por favor, revisa
            la información a continuación e intenta nuevamente.
          </p>

          <div className='space-y-4 rounded-lg bg-[#694DAB10] p-4'>
            <h3 className='text-lg font-semibold text-accent'>
              Detalles del Pedido
            </h3>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <span className='font-medium'>Número de Pedido:</span>
              <span>#{orderId || 'Sin Numero de Orden'}</span>
              <span className='font-medium'>Total:</span>
              <span>{eurilize(Number(searchParams.totalAmount || '0'))}</span>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-lg font-semibold text-accent'>
              Posibles Razones del Fallo
            </h3>
            <ul className='list-inside list-disc space-y-1 text-sm text-gray-600'>
              <li>Fondos insuficientes en la cuenta</li>
              <li>Información de la tarjeta incorrecta</li>
              <li>La transacción fue rechazada por el banco</li>
              <li>Problemas técnicos temporales</li>
            </ul>
          </div>

          <div className='rounded border-l-4 border-yellow-400 bg-yellow-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <HelpCircle className='h-5 w-5 text-yellow-400' />
              </div>
              <div className='ml-3'>
                <p className='text-sm text-yellow-700'>
                  Si continúas teniendo problemas, por favor contacta a tu banco
                  o a nuestro servicio de atención al cliente.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <NotidicationsPageButton
            reseller={user?.reseller === null ? false : user?.reseller}
            userId={userId}
            status='failed'
          />
        </CardFooter>
      </Card>
    </main>
  )
}

export default FailedPaymentPage
