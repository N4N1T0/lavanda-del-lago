// Next.js Imports
import Link from 'next/link'

// Fetcher function
import { capitalizeFirstLetter } from '@/lib/utils'

// Data imports
import { categoriesList } from '@/constants/site-data'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a sidebar with category links.
 *
 * @param {string | undefined} categoryPath - The category path to display.
 * @return {JSX.Element} The sidebar component with category links.
 */
const ProductsSidebar = ({
	categoryPath,
}: { categoryPath: string | undefined }): JSX.Element => {
	return (
		<aside className='flex-[20%] sticky top-5 h-fit hidden md:block'>
			<ul>
				{['Todos', ...categoriesList].map((category: string) => {
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
									categoryPath === undefined && category === 'Todos'
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
