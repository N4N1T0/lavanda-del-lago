'use client'

// Assets Imports
import { Favorites } from '@/assets'
import { X } from 'lucide-react'

// Ui Imports
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { eurilize } from '@/lib/utils'

// Store Imports
import useWishlist from '@/stores/wishlist-store'

// Type Imports
import type { Product } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

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
	const [count, setCount] = useWishlist()

	// Function to remove an item from the wishlist
	const removeFromWishlist = (id: string) => {
		// Filter out the item with the given id
		setCount(count.filter((item) => item.id !== id))
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className='relative w-fit h-auto'>
					{/* Show a badge with the number of items in the cart */}
					{count.length > 0 && (
						<span className='absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex justify-center items-center text-xs'>
							{count.length}
						</span>
					)}
					<Image
						className=' w-8 h-8 hover:opacity-50 duration-150 transition-opacity cursor-pointer'
						alt='Icon favorites'
						src={Favorites}
					/>
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className='text-2xl'>Tus Favoritos</SheetTitle>
				</SheetHeader>
				<ul className='w-full h-full space-y-2'>
					{/* Render each item in the shopping cart */}
					{count.map((item) => (
						<WishlistCartSheetCard
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
	removeFromWishlist,
}: {
	product: Product
	removeFromWishlist: (id: string) => void
}): JSX.Element => {
	return (
		<li className='flex py-6 px-3 bg-accent/70 rounded-lg items-center relative'>
			{/* Image of the product */}
			<div className='h-24 w-24 flex-shrink-0 overflow-hidden'>
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
					<div className='flex justify-between items-end text-sm text-gray-100 hover:text-gray-300 transition-colors duration-150'>
						<h3>
							<Link
								href={`/products/${product.id}?category=${product.categoria}`}
							>
								{product.nombre}
							</Link>
						</h3>
						<p className='ml-4 font-bold'>{eurilize(Number(product.precio))}</p>
					</div>
				</div>
				<WishlistCartSheetCardFooter
					product={product}
					removeFromWishlist={removeFromWishlist}
				/>
			</div>
			<X
				className='h-5 w-5 text-gray-100 hover:text-gray-300 transition-colors duration-150 absolute right-3 top-3'
				onClick={() => removeFromWishlist(product.id)}
			/>
		</li>
	)
}

/**
 * Renders the footer component for the WishlistCartSheetCard.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.product - The product object.
 * @param {Function} props.removeFromWishlist - The function to remove the product from the wishlist.
 * @return {JSX.Element} The rendered footer component.
 */
const WishlistCartSheetCardFooter = ({
	product,
	removeFromWishlist,
}: {
	product: Product
	removeFromWishlist: (id: string) => void
}): JSX.Element => {
	return (
		<div className='w-full border-t border-gray-100 mt-2 pt-2'>
			<QuantitySmall prduct={product} removeFromWishlist={removeFromWishlist} />
		</div>
	)
}

export default WishlistCart
