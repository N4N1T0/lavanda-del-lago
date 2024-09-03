// Project component imports
import FeaturedList from '@/components/home/featured-list'
import Prefooter from '@/components/home/prefooter'
import ProductDetails from '@/components/products/product-details'
import Newsletter from '@/components/shared/newsletter'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Type imports
import type { Product } from '@/types'

/**
 * Asynchronously fetches product details based on parameters and renders them on the page.
 *
 * @param {{ id: string }} params - The parameters object containing the product ID.
 * @param {{ category?: string }} searchParams - Optional search parameters object with a category.
 * @return {Promise<JSX.Element>} A React component representing the main products section.
 */
const ProductPage = async ({
	params,
	searchParams,
}: {
	params: { id: string }
	searchParams?: { category?: string }
}): Promise<JSX.Element> => {
	try {
		const response = await fetch(
			`https://fakestoreapi.com/products/${params.id}`,
		)
		const product: Product = await response.json()

		return (
			<>
				<section
					id='main-products'
					className='mx-auto max-w-screen-2xl px-4 py-4 pb-8 sm:px-6 lg:px-8 flex gap-10 flex-col'
				>
					<ProductDetails product={product} />
					<FeaturedList
						featuredTitle='Productos Relacionados'
						direction='left'
						itemCategory={searchParams?.category!}
					/>
				</section>
				<Newsletter />
				<Prefooter />
			</>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default ProductPage
