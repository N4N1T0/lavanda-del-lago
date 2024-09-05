// Next.js Imports
import Link from 'next/link'
import React from 'react'

// Project component imports
import { ServerFetchError } from '../shared/server-fetch-error'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'
import { sanityClient } from '@sanity-studio/lib/client'
import { categories } from '@/lib/queries'
import type { CategoriesList } from '@/types'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a list of category links.
 *
 * @return {Promise<JSX.Element>} A React component that renders a list of category links. If an error occurs during the fetch, an error message is rendered.
 */
export const Categories = async (): Promise<JSX.Element> => {
	try {
		const response: CategoriesList[] = await sanityClient.fetch(categories)
		const filterCategories = response
			.map((category) => category.categoria)
			.filter(
				(category, index, array) =>
					category && array.indexOf(category) === index,
			)

		return (
			<section
				id='categories'
				className='inline-flex flex-col items-start gap-8 px-5 lg:px-10 2xl:px-20 py-10 2xl:py-20 bg-gray-100 w-full'
			>
				<div className='flex items-center justify-between self-stretch w-full'>
					<div className='w-fit mt-1 font-normal text-black text-2xl leading-8 whitespace-nowrap'>
						BUSCAR POR CATEGORIAS
					</div>
				</div>
				<div className='flex items-start gap-8 w-full'>
					<ul className='flex gap-8 w-full overflow-x-scroll snap-x snap-mandatory pb-3 scrollbar-hide'>
						{filterCategories.map((category: string | null) => (
							<li key={uuidv4()} className='snap-start'>
								<CategoryLink category={category!} />
							</li>
						))}
					</ul>
				</div>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

/**
 * A memoized component that renders a category link.
 *
 * @param {object} props - The props object.
 * @param {string} props.category - The category name.
 * @return {JSX.Element} A React component that renders a category link.
 */
const CategoryLink = React.memo(
	({ category }: { category: string }): JSX.Element => (
		<Link
			prefetch
			href={`/products?category=${category}`}
			className='flex flex-col w-40 h-32 items-center justify-center gap-2 px-10 py-6 bg-white rounded-[15px] border-[3px] border-accent cursor-pointer hover:bg-accent hover:text-white transition-colors duration-150 text-center'
		>
			{category}
		</Link>
	),
)

export default Categories
