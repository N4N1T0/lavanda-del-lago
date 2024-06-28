'use client'

// Next.js Imports
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Fetcher function
import useSWR from 'swr'
import {
	capitalizeFirstLetter,
	extractCategoryFromUrl,
	fetcher,
} from '@/lib/utils'

// Project component imports
import { ClientFetchError } from '@/components/shared/client-fetch-error'
import { Skeleton } from '@/components/ui/skeleton'

const ProductsSidebar = () => {
	const path = usePathname()
	const categoryPath = extractCategoryFromUrl(path)

	const categoriesUrl = 'https://fakestoreapi.com/products/categories'

	const { data: categoriesList, error: categoriesError } = useSWR(
		categoriesUrl,
		fetcher,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	) as { data: string[]; error: unknown }

	if (categoriesError) {
		return <ClientFetchError error={categoriesError} />
	}

	if (!categoriesList) {
		return <CategoriesListSkeleton />
	}

	const newCategoriesList = ['Todos', ...categoriesList]

	return (
		<aside className='flex-[20%]'>
			<ul>
				{newCategoriesList.map((category: string) => (
					<li
						key={category}
						className={`${
							categoryPath.category === category
								? 'bg-gray-200 pointer-events-none'
								: 'hover:bg-gray-200 cursor-pointer'
						} py-4 pl-2 border-b border-gray-200 font-light transition-colors duration-150 rounded-md my-2`}
					>
						<Link href={`/products?category=${category}`}>
							{capitalizeFirstLetter(category)}
						</Link>
					</li>
				))}
			</ul>
		</aside>
	)
}

const CategoriesListSkeleton = () => {
	return (
		<aside className='flex-[20%]'>
			<ul>
				{Array.from({ length: 10 }).map((_, index: number) => (
					<li key={`${index + 1}-skeleton-productsidebar`}>
						<Skeleton className='w-full rounded-md' />
					</li>
				))}
			</ul>
		</aside>
	)
}

export default ProductsSidebar
