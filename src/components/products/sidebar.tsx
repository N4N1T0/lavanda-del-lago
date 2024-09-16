// Next.js Imports
import Link from 'next/link'

// Fetcher function
import { capitalizeFirstLetter, categoriesFilter } from '@/lib/utils'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

import type { CategoriesList } from '@/types'
// Quiries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'

// Utils Imports
import { categories } from '@/lib/queries'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a sidebar with category links.
 *
 * @param {string | undefined} categoryPath - The category path to display.
 * @return {Promise<JSX.Element>} The sidebar component with category links.
 */
const ProductsSidebar = async ({
	categoryPath,
}: { categoryPath: string | undefined }): Promise<JSX.Element> => {
	const response: CategoriesList[] = await sanityClientRead.fetch(categories)
	const filterCategories = categoriesFilter(response)

	return (
		<aside className='flex-[20%] sticky top-5 h-screen hidden md:block overflow-y-auto'>
			<ul>
				{filterCategories.map((category: string) => {
					return (
						<li
							key={uuidv4()}
							className={`${
								categoryPath === category ||
								(category === 'Todos' && categoryPath === undefined)
									? 'bg-gray-200 pointer-events-none'
									: 'hover:bg-gray-200 cursor-pointer'
							} border-b border-gray-200 transition-colors duration-150 rounded-md my-2`}
						>
							<Link
								href={
									category === 'Todos'
										? '/products'
										: `/products?category=${category}`
								}
								className='w-full block h-full py-4 pl-2'
							>
								{capitalizeFirstLetter(category)}
							</Link>
						</li>
					)
				})}
			</ul>
		</aside>
	)
}

export default ProductsSidebar
