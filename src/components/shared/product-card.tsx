// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Type imports
import type { Product } from '@/types'
import { eurilize, urlize } from '@/lib/utils'

// UI Import
import { Skeleton } from '@/components/ui/skeleton'

// Project Imports
import WishlistBtn from '@/components/shared/wishlist-btn'

// Assets Imports
import { MainLogo } from '@/assets'

/**
 * Renders a product card component with details such as title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, image, and id.
 * @return {JSX.Element} The rendered product card component.
 */
const ProductCard = ({
	product,
	index,
}: { product: Product; index: number }): JSX.Element => {
	const { nombre, precio, descripcion, image, categoria } = product

	return (
		<li className='col-span-1 px-4 py-6 bg-neutral-100 rounded-lg flex-col justify-start items-center gap-4 inline-flex text-black relative'>
			<div className='aspect-square'>
				<Image
					src={image || MainLogo}
					alt={nombre || 'Logo Principal de Lavanda del Lago'}
					title={nombre || 'Logo Principal de Lavanda del Lago'}
					width={200}
					height={200}
					priority={index < 8}
					className='object-cover aspect-square'
				/>
			</div>
			<div className='self-stretch flex-col justify-start items-center gap-6 flex'>
				<div className='self-stretch flex-col justify-start items-start gap-4 flex'>
					<Link
						prefetch
						href={
							nombre && categoria
								? `/products/${urlize(nombre)}?category=${categoria}`
								: '/products'
						}
						className='self-stretch text-center text-accent font-medium leading-bold text-sm lg:text-base hover:text-black transition-colors duration-200'
					>
						{nombre?.split(' ').slice(0, 3).join(' ') ||
							'Estamos trabajando en una nombre'}
					</Link>
					<div className='self-stretch text-center text-gray-600 tracking-wide text-xs md:text-base'>
						{descripcion?.split(' ').slice(0, 10).join(' ') ||
							'Estamos trabajando en una descripcion detallada para usted'}
						{'...'}
					</div>
					<div className='self-stretch text-center text-2xl font-bold leading-normal tracking-wide'>
						{eurilize(Number(precio || '0'))}
					</div>
				</div>
				<Link
					prefetch
					href={
						nombre && categoria
							? `/products/${urlize(nombre)}?category=${categoria}`
							: '/products'
					}
					className='px-6 py-3 text-sm md:text-base bg-accent rounded-lg text-white hover:bg-white hover:text-accent transition-colors duration-200'
				>
					Comprar <span className='hidden md:inline'>Ahora</span>
				</Link>
			</div>
			<WishlistBtn product={product} className='absolute top-5 right-5' />
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
		<li className='rounded-md col-span-1 h-[500px] w-full'>
			<Skeleton className='w-full h-full' />
		</li>
	)
}

export { ProductCard, ProductCardSkeleton }
