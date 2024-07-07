// Type imports
import type { Product } from '@/types'

// React Imports
import type React from 'react'

// Project component imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'
import ClientProductPage from '@/components/products/client-product-page'
import ProductsSidebar from '@/components/products/sidebar'

/**
 * Asynchronously fetches products based on search parameters and renders them on the page.
 *
 * @param {object} searchParams - The search parameters object.
 * @param {string} searchParams.category - The category for which products are fetched.
 * @return {Promise<JSX.Element>} A React component representing the main products section.
 */
const ProdcutsPage = async ({
	searchParams,
}: {
	searchParams?: { category?: string }
}): Promise<JSX.Element> => {
	const productUrl = searchParams?.category
		? `https://fakestoreapi.com/products/category/${searchParams?.category}`
		: 'https://fakestoreapi.com/products'

	try {
		const response = await fetch(productUrl)
		const products: Product[] = await response.json()

		return (
			<section
				id='main-products'
				className='mx-auto max-w-screen-2xl px-4 py-4 pb-8 sm:px-6 lg:px-8 flex gap-10'
			>
				<ProductsSidebar categoryPath={searchParams?.category} />
				<article className='flex-[80%]'>
					<ClientProductPage products={products} />
				</article>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default ProdcutsPage
