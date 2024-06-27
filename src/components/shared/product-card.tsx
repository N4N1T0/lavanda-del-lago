// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// React Imports
import React from 'react'

// Type imports
import type { Product } from '@/types'
import { eurilize } from '@/lib/utils'

/**
 * Renders a product card component with details such as title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, image, and id.
 * @return {JSX.Element} The rendered product card component.
 */
const ProductCard = ({ product }: { product: Product }): JSX.Element => {
	const { title, price, description, image, id } = product
	return (
		<li className='col-span-1 px-4 py-6 bg-neutral-100 rounded-lg flex-col justify-start items-center gap-4 inline-flex text-black'>
			<div className='aspect-square'>
				<Image
					src={image}
					alt={title}
					width={200}
					height={200}
					className='object-cover aspect-square'
				/>
			</div>
			<div className='self-stretch flex-col justify-start items-center gap-6 flex'>
				<div className='self-stretch flex-col justify-start items-start gap-4 flex'>
					<Link
						href={`/products/${id}`}
						className='self-stretch text-center text-accent font-medium leading-bold text-sm lg:text-base hover:text-black transition-colors duration-200'
					>
						{title.split(' ').slice(0, 3).join(' ')}
					</Link>
					<div className='self-stretch text-center font-light tracking-wide text-xs md:text-base'>
						{description.split(' ').slice(0, 10).join(' ')}
						{'...'}
					</div>
					<div className='self-stretch text-center text-2xl font-bold leading-normal tracking-wide'>
						{eurilize(Number(price))}
					</div>
				</div>
				<button
					type='button'
					className='px-6 py-3 text-sm md:text-base bg-accent rounded-lg text-white hover:bg-white hover:text-accent transition-colors duration-200'
				>
					Comprar <span className='hidden md:inline'>Ahora</span>
				</button>
			</div>
		</li>
	)
}

export default ProductCard
