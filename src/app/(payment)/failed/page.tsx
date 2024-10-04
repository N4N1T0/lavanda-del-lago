// Next.js Imports
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AlertCircle, HelpCircle, RefreshCcw } from 'lucide-react'

// Types Imports
import type { Metadata } from 'next'
import { eurilize } from '@/lib/utils'

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
const FailedPaymentPage = ({
  searchParams
}: {
  searchParams: {
    userId: string
    userName: string
    orderId: string
    totalAmount: number
    reseller: string
  }
}): JSX.Element => {
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
              {decodeURIComponent(searchParams.userName)}
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
              <span>#{searchParams.orderId}</span>
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
          <Button variant='cart' className='w-fit'>
            <RefreshCcw className='mr-2 h-4 w-4' />
            <Link href={`/checkout/review?userId=${searchParams.userId}`}>
              Reintentar Pago
            </Link>
          </Button>
          <Button variant='link'>
            <HelpCircle className='mr-2 h-4 w-4' />
            {/* TODO: Link to support */}
            <Link href='/support'>Contactar Soporte</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default FailedPaymentPage
