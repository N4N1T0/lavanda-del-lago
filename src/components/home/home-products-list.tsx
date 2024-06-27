'use client'

// React and useState imports
import React, { useState } from 'react'

// Type imports
import type { Product } from '@/types'

// UI component imports
import { Skeleton } from '@/components/ui/skeleton'

// Next.js Imports
import useSWR from 'swr'

// Project component imports
import ProductCard from '@/components/shared/product-card'
import { ClientFetchError } from '@/components/shared/client-fetch-error'

// Fetcher function
import { fetcher } from '@/lib/utils'

// Constants
const categoriesList: string[] = [
	'electronics',
	'jewelery',
	"men's clothing",
	"women's clothing",
]

/**
 * Renders a list of products based on the selected category.
 *
 * @return {JSX.Element} The JSX element containing the list of products.
 */
const HomeProductsList = (): JSX.Element => {
	const [categories, setCategories] = useState(categoriesList[0])
	const productsUrl = `https://fakestoreapi.com/products/category/${categories}`

	const { data: products, error: productsError } = useSWR(
		productsUrl,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	)

	if (productsError) {
		return <ClientFetchError />
	}

	if (!products) {
		return <HomeProductsListSkeleton />
	}

	return (
		<section
			id='home-products-list'
			className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-7'
		>
			<div className='flex justify-center lg:justify-start items-center flex-wrap gap-10'>
				{categoriesList.map((category: string) => (
					<button
						type='button'
						key={category}
						className={`text-base leading-normal hover:text-accent transition-colors duration-150 ${
							category === categories ? 'text-accent' : 'text-accent/70'
						}`}
						onClick={() => setCategories(category)}
					>
						{category}
					</button>
				))}
			</div>
			<ul className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 2xl:gap-10'>
				{products.slice(0, 8).map((product: Product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</ul>
		</section>
	)
}

/**
 * Renders a skeleton component for the home products list.
 *
 * @return {JSX.Element} The skeleton component for the home products list.
 */
const HomeProductsListSkeleton = (): JSX.Element => {
	return (
		<section
			id='home-products-list-skeleton'
			className='w-full p-24 bg-white flex-col justify-start items-start gap-8 flex'
		>
			<div className='flex justify-start items-center gap-10'>
				{categoriesList.map((category: string) => (
					<Skeleton
						key={`${category}-sekeleton`}
						className='h-4 w-24 rounded-md'
					/>
				))}
			</div>
			<div className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-10'>
				{Array.from({ length: 8 }).map((_, index) => (
					<Skeleton
						key={`Product-card-skeleton-${index + 1}`}
						className='rounded-md col-span-1 w-80 h-96'
					/>
				))}
			</div>
		</section>
	)
}

export default HomeProductsList
