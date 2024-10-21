'use client'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import { Favorites } from '@/assets'
import { X } from 'lucide-react'

// Ui Imports
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'

// Utils Imports
import { eurilize, urlize } from '@/lib/utils'

// Store Imports
import useWishlist from '@/stores/wishlist-store'

// Type Imports
import type { Product } from '@/types'

// Components Imports
import { QuantitySmall } from '@/components/shared/quantity'

/**
 * Renders a wishlist cart component that displays the items in the user's wishlist.
 * The component uses the `useWishlist` hook to manage the wishlist items.
 * The `removeFromWishlist` function is used to remove an item from the wishlist.
 *
 * @return {JSX.Element} The rendered wishlist cart component.
 */
const WishlistCart = (): JSX.Element => {
  // State hook to access and update the wishlist items
  const [count, setCount, { isLoading }] = useWishlist()

  // Function to remove an item from the wishlist
  const removeFromWishlist = (id: string) => {
    // Filter out the item with the given id
    setCount(count.filter((item) => item.id !== id))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className='relative h-auto w-fit'>
          {/* Show a badge with the number of items in the cart */}
          {isLoading && (
            <Skeleton className='absolute -right-2 -top-2 flex h-5 w-5 rounded-full' />
          )}
          {count.length > 0 && (
            <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs text-white'>
              {count.length}
            </span>
          )}
          <Image
            className='h-8 w-8 cursor-pointer transition-opacity duration-150 hover:opacity-50'
            alt='Icon favorites'
            src={Favorites}
          />
        </div>
      </SheetTrigger>
      <SheetContent className='px-2 md:px-5'>
        <SheetHeader>
          <SheetTitle className='text-2xl'>Tus Favoritos</SheetTitle>
          <SheetDescription className='sr-only'>Favoritos</SheetDescription>
        </SheetHeader>
        <ul className='hidden h-full w-full space-y-2 overflow-y-scroll pr-2 md:block'>
          {/* Render each item in the shopping cart */}
          {count.map((item) => (
            <WishlistCartSheetCard
              product={item}
              key={item.id}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </ul>
        <ul className='block h-full w-full space-y-2 overflow-y-scroll pr-2 md:hidden'>
          {/* Render each item in the shopping cart */}
          {count.map((item) => (
            <WishlistCartSheetCardMobile
              product={item}
              key={item.id}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Renders a card component for a product in the wishlist sheet.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.product - The product object.
 * @param {Function} props.removeFromWishlist - The function to remove the product from the wishlist.
 * @return {JSX.Element} The rendered card component.
 */
const WishlistCartSheetCard = ({
  product,
  removeFromWishlist
}: {
  product: Product
  removeFromWishlist: (id: string) => void
}): JSX.Element => {
  const { image, nombre, categoria, precio, id } = product

  return (
    <li className='relative flex w-full items-center rounded-lg bg-neutral-100 px-3 py-6'>
      {/* Image of the product */}
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden'>
        <Image
          src={image}
          alt={nombre}
          title={nombre}
          width={200}
          height={200}
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Details of the product */}
      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          {/* Product title and price */}
          <div className='flex items-end justify-between text-sm text-gray-900 transition-colors duration-150 hover:text-gray-700'>
            <h3>
              <SheetClose asChild>
                <Link
                  href={
                    nombre && categoria
                      ? `/productos/${urlize(nombre)}?category=${categoria}`
                      : '/productos'
                  }
                >
                  {nombre}
                </Link>
              </SheetClose>
            </h3>
            <p className='ml-4 text-xl font-bold'>{eurilize(Number(precio))}</p>
          </div>
        </div>
        <div className='mt-2 w-full border-t border-accent/70 pt-2'>
          <QuantitySmall
            prduct={product}
            removeFromWishlist={removeFromWishlist}
          />
        </div>
      </div>
      <X
        className='absolute right-2 top-2 h-5 w-5 text-gray-900 transition-colors duration-150 hover:text-gray-700'
        onClick={() => removeFromWishlist(id)}
      />
    </li>
  )
}

const WishlistCartSheetCardMobile = ({
  product,
  removeFromWishlist
}: {
  product: Product
  removeFromWishlist: (id: string) => void
}): JSX.Element => {
  const { image, nombre, categoria, precio, id } = product

  return (
    <li className='relative flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-6'>
      {/* Image of the product */}
      <div className='h-20 w-20 flex-shrink-0 overflow-hidden'>
        <Image
          src={image}
          alt={nombre}
          title={nombre}
          width={200}
          height={200}
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Product title and price */}
      <div className='flex flex-col justify-between gap-1'>
        <h3 className='text-sm font-semibold'>
          <SheetClose asChild>
            <Link
              href={
                nombre && categoria
                  ? `/productos/${urlize(nombre)}?category=${categoria}`
                  : '/productos'
              }
            >
              {nombre}
            </Link>
          </SheetClose>
        </h3>
        <p className='text-lg font-medium'>{eurilize(Number(precio))}</p>
      </div>
      <X
        className='absolute right-2 top-2 h-3 w-3 text-gray-900 transition-colors duration-150 hover:text-gray-700'
        onClick={() => removeFromWishlist(id)}
      />
    </li>
  )
}

export default WishlistCart
