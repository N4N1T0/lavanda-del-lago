// Next Imports
import Link from 'next/link'

// Project Component Imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// UI Imports
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

// Queries Imports
import { productsByCategory } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Utils Imports
import { urlize } from '@/lib/utils'

// Type Imports
import type { Product } from '@/types'

// Assets Imports
import { ShoppingBag } from 'lucide-react'

/**
 * A component that fetches and displays new items in a given category.
 *
 * @param {string} category - The category of products to fetch.
 * @return {Promise<JSX.Element>} A Card component containing a list of new items, or an error message if the fetch fails.
 */
const NewItems = async ({
	category,
}: { category: string }): Promise<JSX.Element> => {
	try {
		const response: Product[] = await sanityClientRead.fetch(
			productsByCategory(category),
		)

		return (
			<Card className='border-accent/70 border'>
				<CardHeader>
					<CardTitle>Nuevos en Productos</CardTitle>
				</CardHeader>
				<CardContent>
					{response && response.length > 0 ? (
						<ul className='space-y-2'>
							{response.slice(0, 5).map((item) => (
								<li key={item.id} className='group'>
									<Link
										href={
											item.nombre && item.categoria
												? `/products/${urlize(item.nombre)}?category=${item.categoria}`
												: '/products'
										}
										className='flex justify-between items-center group-hover:text-accent transition-colors duration-200'
									>
										<span className='flex items-center'>
											<ShoppingBag className='mr-2 h-4 w-4 shrink-0' />
											<small>{item.nombre}</small>
										</span>
										<span className='font-semibold'>${item.precio}</span>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>No items available in this category.</p>
					)}
				</CardContent>
				<CardFooter className='text-sm text-center text-accent/70'>
					Nuevos Productos de tu categoria mas comprada
				</CardFooter>
			</Card>
		)
	} catch (error) {
		return <ServerFetchError error={error} />
	}
}

export default NewItems
