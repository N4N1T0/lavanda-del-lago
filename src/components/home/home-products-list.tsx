'use client'

// React and useState imports
import React, { useState } from 'react'

// Type imports
import type { Product } from '@/types'

// UI component imports
import { Skeleton } from '@/components/ui/skeleton'

// Project component imports
import {
	ProductCard,
	ProductCardSkeleton,
} from '@/components/shared/product-card'
import { ClientFetchError } from '@/components/shared/client-fetch-error'

// Fetcher function
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

// Constants
import { categoriesList } from '@/constants/site-data'

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
	) as { data: Product[]; error: unknown }

	if (productsError) {
		return <ClientFetchError error={productsError} />
	}

	if (!products) {
		return <HomeProductsListSkeleton />
	}

	return (
		<section
			id='home-products-list'
			className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-7'
		>
			<HomeProductsListHeader
				setCategories={setCategories}
				categories={categories}
			/>
			<ul className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 2xl:gap-10'>
				{products.slice(0, 8).map((product: Product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</ul>
		</section>
	)
}

const HomeProductsListHeader = React.memo(
	({
		setCategories,
		categories,
	}: {
		setCategories: React.Dispatch<React.SetStateAction<string>>
		categories: string
	}) => {
		return (
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
		)
	},
)

/**
 * Renders a skeleton component for the home products list.
 *
 * @return {JSX.Element} The skeleton component for the home products list.
 */
const HomeProductsListSkeleton = (): JSX.Element => {
	return (
		<section
			id='home-products-list-skeleton'
			className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-7'
		>
			<div className='flex justify-center lg:justify-start items-center flex-wrap gap-10'>
				{categoriesList.map((category: string) => (
					<Skeleton
						key={`${category}-sekeleton`}
						className='h-4 w-24 rounded-md'
					/>
				))}
			</div>
			<ul className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 2xl:gap-10'>
				{Array.from({ length: 8 }).map((_, index) => (
					<ProductCardSkeleton key={`Product-card-skeleton-${index + 1}`} />
				))}
			</ul>
		</section>
	)
}

export default HomeProductsList
