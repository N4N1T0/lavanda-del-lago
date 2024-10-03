'use client'

// Assets Imports
import { Cart } from '@/assets'

// UI Imports
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

// Utils Imports
import { calculateTotal, eurilize } from '@/lib/utils'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Types Imports
import type { CartItem } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

/**
 * Renders a sheet component with a trigger and content. The trigger is a child component passed as a prop.
 * The content includes a header with a title and description.
 *
 * @return {JSX.Element} The rendered sheet component.
 */
const CartSheet = (): JSX.Element => {
  // Get the shopping cart items and a function to update the cart items
  const [count, setCount] = useShoppingCart()

  // Function to remove an item from the shopping cart
  const removeFromCart = (id: string) => {
    // Filter out the item with the given id
    setCount(count.filter((item) => item.id !== id))
  }

  // Calculate the total price of the items in the shopping cart
  const [subTotal] = calculateTotal(count)

  // Calculate total ammount of items
  const totalamountOfItems =
    count.length > 0
      ? count.map((item) => item.quantity).reduce((a, b) => a + b)
      : 0

  // Render the shopping cart sheet component
  return (
    <Sheet>
      {/* Trigger for the shopping cart sheet */}
      <SheetTrigger asChild>
        <div className='relative h-auto w-fit'>
          {/* Show a badge with the number of items in the cart */}
          {totalamountOfItems > 0 && (
            <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-white'>
              {totalamountOfItems}
            </span>
          )}
          <Image
            className='h-8 w-8 cursor-pointer transition-opacity duration-150 hover:opacity-50'
            alt='Icon cart'
            src={Cart}
          />
        </div>
      </SheetTrigger>
      <SheetContent className='flex flex-col items-start justify-between overflow-y-scroll pb-2'>
        <SheetHeader>
          <SheetTitle className='text-2xl'>Carrito de la Compra</SheetTitle>
          <SheetDescription className='sr-only'>
            Carrito de la Compra
          </SheetDescription>
        </SheetHeader>
        <ul className='h-full w-full space-y-2'>
          {/* Render each item in the shopping cart */}
          {count.map((item) => (
            <CartSheetCard
              product={item}
              key={item.id}
              removeFromCart={removeFromCart}
            />
          ))}
        </ul>
        {/* Show the Fotter in case theres items in the cart instead show a link to the products page */}
        {count.length > 0 ? (
          <SheetFooter className='w-full'>
            <div className='w-full border-t border-gray-200 px-4 py-3 sm:px-6'>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>{subTotal}</p>
              </div>
              <p className='mt-1 text-sm text-gray-500'>
                Gastos de envío e impuestos calculados en el checkout.
              </p>
              <div className='mt-3'>
                <SheetClose asChild>
                  <Link
                    href='/checkout'
                    className={`${buttonVariants({ variant: 'cart' })} w-full`}
                  >
                    Checkout
                  </Link>
                </SheetClose>
              </div>
              <div className='mt-3 flex justify-center text-center text-sm text-gray-500'>
                <p>
                  o{' '}
                  <SheetClose asChild>
                    <Link
                      href='/products'
                      className='font-medium text-accent transition-colors duration-200 hover:text-accent/80'
                    >
                      Continua Comprando
                      <span aria-hidden='true'> &rarr;</span>
                    </Link>
                  </SheetClose>
                </p>
              </div>
            </div>
          </SheetFooter>
        ) : (
          <SheetFooter className='w-full border-t border-accent/70 pt-5'>
            <div className='flex w-full flex-col items-center gap-5'>
              <p>No hay elementos en el carrito de la compra</p>
              <p className='text-sm text-gray-500'>Puedes empezar por:</p>
              <div className='flex w-full items-center justify-between'>
                <SheetClose asChild>
                  <Link
                    href='/products'
                    className='font-medium text-accent transition-colors duration-200 hover:text-accent/80'
                  >
                    Lista de Productos
                    <span aria-hidden='true'> &rarr;</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href='/events'
                    className='font-medium text-accent transition-colors duration-200 hover:text-accent/80'
                  >
                    Nuestros Eventos
                    <span aria-hidden='true'> &rarr;</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

/**
 * Renders a card component for a product in the cart.
 *
 * @param {Object} props - The props object.
 * @param {CartItem} props.product - The product object containing id, title, image, price, and category.
 * @param {function} props.removeFromCart - The function to remove the product from the cart.
 * @return {JSX.Element} The rendered cart sheet card component.
 */
const CartSheetCard = ({
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
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md'>
        <Image
          src={product.image}
          alt={product.nombre}
          title={product.nombre}
          width={200}
          height={200}
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Details of the product */}
      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          {/* Product title and price */}
          <div className='flex justify-between text-base font-light text-gray-900 transition-colors duration-150 hover:text-gray-800'>
            <h3>
              <Link
                href={`/products/${product.id}?category=${product.categoria}`}
              >
                {product.nombre}
              </Link>
            </h3>
            <p className='ml-4 font-bold'>
              {eurilize(Number(product.precio || '0'))}
            </p>
          </div>
          <small className='text-gray-600'>{`${product.descripcion
            .split(' ')
            .slice(0, 12)
            .join(' ')}...`}</small>
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

export default CartSheet
