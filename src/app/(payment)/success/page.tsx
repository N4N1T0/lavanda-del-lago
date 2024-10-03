'use client'

// Next.js Imports
import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
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

// Queries Imports
import { useSearchParams } from 'next/navigation'
import useShoppingCart from '@/stores/shopping-cart-store'

const SuccesPaymentPage = (): JSX.Element => {
  const [cart] = useShoppingCart() // Obtener productos del carrito
  const searchParamsRaw = useSearchParams()
  const router = useRouter() // Usar el enrutador de Next.js

  const searchParams = useMemo(() => {
    const params = {} as Record<string, string>
    searchParamsRaw.forEach((value, key) => {
      params[key] = value
    })
    return params
  }, [searchParamsRaw])

  // Verificar si los parámetros de búsqueda son válidos
  useEffect(() => {
    if (
      !searchParams.orderId ||
      !searchParams.userEmail ||
      !searchParams.totalAmount ||
      !searchParams.reseller ||
      !searchParams.userId
    ) {
      // Redirigir a la página principal si falta algún valor
      router.push('/')
    }
  }, [searchParams, router])

  // Create purchase on component mount
  useEffect(() => {
    const createPurchase = async () => {
      const products: Purchase['products'] = cart.map((item) => ({
        product: {
          _ref: item.id,
          _type: 'reference'
        },
        quantity: item.quantity,
        _key: item.id
      }))

      if (products.length === 0) return

      // Create purchase
      try {
        const response = await fetch('/api/create-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            orderId: searchParams.orderId,
            userEmail: searchParams.userEmail,
            totalAmount: searchParams.totalAmount,
            reseller: searchParams.reseller === 'true',
            userId: searchParams.userId,
            products
          })
        })

        const resopnseData = await response.json()

        if (!resopnseData.success) {
          throw new Error('Failed to create purchase')
        }
      } catch (error) {
        console.error('Error creating purchase:', error)
      }
    }

    createPurchase()
  }, [searchParams, cart])

  return (
    <div className='flex min-h-screen items-center justify-center bg-green-100 p-4'>
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
              {decodeURIComponent(searchParams.userName)}
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
              <span>#{searchParams.orderId}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='font-semibold'>Monto Total:</span>
              <span>{eurilize(Number(searchParams.totalAmount || '0'))}</span>
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
                searchParams.reseller === 'true' ||
                searchParams.reseller !== 'null'
                  ? `/reseller/${searchParams.userId}`
                  : `/profile/${searchParams.userId}`
              }
              className='flex items-center'
            >
              <UserIcon className='mr-2 h-4 w-4' />
              Tu Perfil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SuccesPaymentPage
