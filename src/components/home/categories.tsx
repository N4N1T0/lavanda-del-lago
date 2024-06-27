// Next.js Imports
import Link from 'next/link'
import React from 'react'

// Project component imports
import { ServerFetchError } from '../shared/server-fetch-error'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a list of category links.
 *
 * @return {Promise<JSX.Element>} A React component that renders a list of category links. If an error occurs during the fetch, an error message is rendered.
 */
export const Categories = async (): Promise<JSX.Element> => {
	try {
		const response = await fetch('https://fakestoreapi.com/products/categories')
		const categories = await response.json()

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
					<ul className='flex gap-8 w-full overflow-x-scroll snap-x snap-mandatory'>
						{categories.map((category: string) => (
							<li key={category} className='snap-start'>
								<CategoryLink category={category} />
							</li>
						))}
					</ul>
				</div>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError />
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
			className='flex flex-col w-40 h-32 items-center justify-center gap-2 px-10 py-6 bg-white rounded-[15px] border-[3px] border-accent cursor-pointer hover:bg-accent hover:text-white transition-colors duration-150'
		>
			{category}
		</Link>
	),
)

export default Categories
