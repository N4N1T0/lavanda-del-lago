'use client'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

import { eurilize, urlize } from '@/lib/utils'
// Type imports
import type { Product } from '@/types'

// UI Import
import { Skeleton } from '@/components/ui/skeleton'

// Project Imports
import WishlistBtn from '@/components/shared/wishlist-btn'

// Assets Imports
import { MainLogo } from '@/assets'
import useShoppingCart from '@/stores/shopping-cart-store'
import { Button } from '@/components/ui/button'

/**
 * Renders a product card component with details such as title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, image, and id.
 * @return {JSX.Element} The rendered product card component.
 */
const ProductCard = ({
  product,
  index,
  lastMinute = false
}: {
  product: Product
  index: number
  lastMinute?: boolean
}): JSX.Element => {
  // Get the cart items and a function to update the cart items from the shopping cart store
  const [count, setCount] = useShoppingCart()

  // Function to add to the Cart and show a toast with a message of completed
  const addToCart = () => {
    // Find if the product is already in the cart
    const existingProduct = count.find(
      (productItem) => productItem.id === product.id
    )

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      const updatedCart = count.map((productItem) =>
        productItem.id === product.id
          ? { ...productItem, quantity: productItem.quantity + 1 }
          : productItem
      )
      setCount(updatedCart)
    } else {
      // If the product is not in the cart, add it with an initial quantity of 1
      setCount([...count, { ...product, quantity: 1 }])
    }
  }

  const { nombre, precio, descripcion, image, categoria } = product

  return (
    <li className='relative col-span-1 inline-flex flex-col items-center justify-start gap-4 rounded-lg bg-neutral-100 px-4 py-6 text-black'>
      <div className='aspect-square'>
        <Image
          src={image || MainLogo}
          alt={nombre || 'Logo Principal de Lavanda del Lago'}
          title={nombre || 'Logo Principal de Lavanda del Lago'}
          width={200}
          height={200}
          priority={index < 8}
          className='aspect-square object-cover'
        />
      </div>
      <div className='flex flex-col items-center justify-start gap-6 self-stretch'>
        <div className='flex flex-col items-start justify-start gap-4 self-stretch'>
          <Link
            prefetch
            href={
              nombre && categoria
                ? `/products/${urlize(nombre)}?category=${categoria}`
                : '/products'
            }
            className='leading-bold self-stretch text-center text-sm font-medium text-accent transition-colors duration-200 hover:text-black lg:text-base'
          >
            {nombre?.split(' ').slice(0, 3).join(' ') ||
              'Estamos trabajando en una nombre'}
          </Link>
          <div className='self-stretch text-center text-xs tracking-wide text-gray-600 md:text-base'>
            {descripcion?.split(' ').slice(0, 10).join(' ') ||
              'Estamos trabajando en una descripcion detallada para usted'}
            {'...'}
          </div>
          <div className='self-stretch text-center text-2xl font-bold leading-normal tracking-wide'>
            {eurilize(Number(precio || '0'))}
          </div>
        </div>
        {lastMinute ? (
          <Button variant='secondary' onClick={() => addToCart()}>
            Añadir <span className='ml-1 hidden md:inline'>Ahora</span>
          </Button>
        ) : (
          <Link
            prefetch
            href={
              nombre && categoria
                ? `/products/${urlize(nombre)}?category=${categoria}`
                : '/products'
            }
            className='rounded-lg bg-accent px-6 py-3 text-sm text-white transition-colors duration-200 hover:bg-white hover:text-accent md:text-base'
          >
            Comprar <span className='hidden md:inline'>Ahora</span>
          </Link>
        )}
      </div>
      <WishlistBtn product={product} className='absolute right-5 top-5' />
    </li>
  )
}

/**
 * Renders a skeleton component for the product card.
 *
 * @return {JSX.Element} The skeleton component for the product card.
 */
const ProductCardSkeleton = (): JSX.Element => {
  return (
    <li className='col-span-1 h-[500px] w-full rounded-md'>
      <Skeleton className='h-full w-full' />
    </li>
  )
}

export { ProductCard, ProductCardSkeleton }
