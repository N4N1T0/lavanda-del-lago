'use client'

// Project Components Imports
import PaypalButton from '@/components/checkout/paypal-button'

// Utilitys Imports
import { calculateTotal, eurilize } from '@/lib/utils'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Types Imports
import type { CartItem, User } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'
import { MutableRefObject, Suspense, useEffect, useRef, useState } from 'react'

// UI Imports
import { Button, buttonVariants } from '@/components/ui/button'

// Assets Imports
import { Loader2 } from 'lucide-react'
import { RedirectForm } from 'redsys-easy'

/**
 * Calculate the total price of the items in the shopping cart.
 *
 * @return {JSX.Element} An array containing the subtotal, total, and tax.
 */
const Summary = ({ user }: { user: User | null }): JSX.Element => {
  // Get the shopping cart items and a function to update the cart items
  const [count, setCount] = useShoppingCart()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentForm, setPaymentForm] = useState(null)

  // Function to remove an item from the shopping cart
  const removeFromCart = (id: string) => {
    setCount(count.filter((item) => item.id !== id))
  }

  // Calculate the total price of the items in the shopping cart
  const [subTotal, total, iva] = calculateTotal(count)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          totalAmount: Number(total.split(' ')[0].replace(',', '.')),
          user: user,
          products: count.map((item) => ({
            id: item.id,
            quantity: item.quantity
          }))
        })
      })

      const data = await response.json()

      if (data.success) {
        setPaymentForm(data.data)
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Payment error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='col-span-1 h-fit rounded-md border border-accent/50 p-5'>
      <ul className='space-y-3 border-b border-accent/50 py-5'>
        {count.map((item) => (
          <SummaryCard
            key={item.id}
            product={item}
            removeFromCart={removeFromCart}
          />
        ))}
      </ul>
      <div className='mt-3 space-y-3'>
        {/* shipping costs */}
        <div>
          <h3 className='text-xl'>Gastos de Envio</h3>
          <p className='text-gray-600'>Gratis</p>
        </div>
        {/* Subtotal */}
        <div className='flex justify-between'>
          <h3 className='text-lg'>Subtotal</h3>
          <p className='text-gray-600'>{subTotal}</p>
        </div>
        {/* IVA */}
        <div className='flex justify-between'>
          <h3 className='text-lg'>
            IVA <span className='text-sm'>(21%)</span>
          </h3>
          <p className='text-gray-600'>{iva}</p>
        </div>
        {/* Total price */}
        <div className='flex justify-between rounded-lg bg-neutral-100 p-2 text-xl'>
          <h3>Total</h3>
          <p>{total}</p>
        </div>
        {total === '0,00 €' ? (
          <Link
            href='/products'
            className={`${buttonVariants({ variant: 'cart' })} w-full`}
          >
            Comprar ahora
          </Link>
        ) : (
          <form onSubmit={onSubmit}>
            <Button
              type='submit'
              variant='cart'
              className='w-full'
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Proceder al Pago'
              )}
            </Button>
          </form>
        )}
        <Suspense fallback={<>loading</>}>
          <PaypalButton products={count} total={total} user={user} />
        </Suspense>
      </div>
      <PaymentForm form={paymentForm} />
    </div>
  )
}

/**
 * Renders a card component for a product in the cart.
 *
 * @param {Object} props - The props object.
 * @param {CartItem} props.product - The product object containing id, title, image, price, and quantity.
 * @param {function} props.removeFromCart - The function to remove the product from the cart.
 * @return {JSX.Element} The rendered cart card component.
 */
const SummaryCard = ({
  product,
  removeFromCart
}: {
  product: CartItem
  removeFromCart: (id: string) => void
}): JSX.Element => {
  // Render a card for each product in the cart
  return (
    <li className='flex rounded-lg bg-neutral-100 px-3 py-6'>
      {/* Image of the product */}
      <div className='h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <Image
          src={product.image}
          alt={product.nombre}
          title={product.nombre}
          width={100}
          height={100}
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Details of the product */}
      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          {/* Product title and price */}
          <div className='flex justify-between text-base font-light text-gray-900 transition-colors duration-150 hover:text-gray-800'>
            <h3 className='text-sm'>{product.nombre}</h3>
            <p className='ml-4 font-bold'>{eurilize(Number(product.precio))}</p>
          </div>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          {/* Product quantity */}
          <p className='text-gray-500'>Cantidad: {product.quantity}</p>

          {/* Remove product from cart button */}
          <div className='flex'>
            <button
              type='button'
              className='font-medium text-accent transition-colors duration-150 hover:text-accent/70'
              onClick={() => removeFromCart(product.id)}
            >
              Quitar
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

const PaymentForm = ({ form }: { form: RedirectForm | null }) => {
  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null)

  useEffect(() => {
    // Enviar automáticamente el formulario cuando el componente se monta
    if (formRef.current && form !== null) {
      formRef.current.submit()
    }
  }, [form])

  if (!form) {
    return null
  }

  return (
    <form id='paymentForm' ref={formRef} action={form?.url} method='POST'>
      <input
        type='hidden'
        name='Ds_SignatureVersion'
        value={form?.body.Ds_SignatureVersion}
      />
      <input
        type='hidden'
        name='Ds_MerchantParameters'
        value={form?.body.Ds_MerchantParameters}
      />
      <input
        type='hidden'
        name='Ds_Signature'
        value={form?.body.Ds_Signature}
      />
    </form>
  )
}

export default Summary
