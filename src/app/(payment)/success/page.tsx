// Next.js Imports
import React from 'react'
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

// Assets Imports
import {
  CheckCircle2Icon,
  PackageIcon,
  TruckIcon,
  UserIcon
} from 'lucide-react'

// Types Imports
import { Purchase } from '@/types/sanity'
import { eurilize } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { sanityClientWrite } from '@sanity-studio/lib/client'

// Define the Server Component
const SuccesPaymentPage = async ({
  searchParams
}: {
  searchParams: {
    userId: string
    userName: string
    orderId: string
    totalAmount: number
    reseller: string
    userEmail: string
    products: string
  }
}): Promise<JSX.Element> => {
  // Destructure search parameters
  const {
    userId,
    userName,
    orderId,
    totalAmount,
    reseller,
    userEmail,
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
  const products: Purchase['products'] = productsParam
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
    status: 'pendiente',
    reseller: reseller === 'true',
    paymentMethod: 'tarjeta_credito',
    products,
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    _rev: orderId
  })

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
          <p className='text-center text-xs text-gray-500'>
            Solo falta la confirmación de la pasarela de pago, para empezar a
            preparar tu envío, puedes ver el estado de tu pedido en tu perfil.
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
          <Button variant='cart'>
            <Link href='/products'>Seguir Comprando</Link>
          </Button>
          <Button variant='default'>
            <Link
              href={
                reseller === 'true' || reseller !== 'null'
                  ? `/reseller/${userId}`
                  : `/profile/${userId}`
              }
              className='flex items-center'
            >
              <UserIcon className='mr-2 h-4 w-4' />
              Tu Perfil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default SuccesPaymentPage
