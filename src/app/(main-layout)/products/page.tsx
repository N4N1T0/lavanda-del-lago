// Next imports
import type { Metadata } from 'next'

// Type imports
import type { Product } from '@/types'

// Project component imports
import ClientProductPage from '@/components/products/client-product-page'
import ProductsSidebar from '@/components/products/sidebar'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Types Imports
import { allProducts, productsByCategory } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// function to generate metadata
export async function generateMetadata({
	searchParams,
}: {
	searchParams?: { category?: string }
}): Promise<Metadata> {
	return {
		title: `Productos | ${searchParams?.category ? searchParams?.category : 'Todos los productos'}`,
		description: `Productos de la tienda en linea de Lavanda del lago. para la categoria de productos ${searchParams?.category ? searchParams?.category : 'Todos los productos'}`,
	}
}

/**
 * Asynchronously fetches products based on search parameters and renders them on the page.
 *
 * @param {object} searchParams - The search parameters object.
 * @param {string} searchParams.category - The category for which products are fetched.
 * @return {Promise<JSX.Element>} A React component representing the main products section.
 */
const ProductsPage = async ({
	searchParams,
}: {
	searchParams?: { category?: string }
}): Promise<JSX.Element> => {
	// Determine query based on the presence of a category
	const productQuery = searchParams?.category
		? sanityClientRead.fetch(productsByCategory, {
				category: searchParams?.category,
			})
		: sanityClientRead.fetch(allProducts)

	try {
		// Fetch products, passing in category if needed
		const response: Product[] = await productQuery

		// Filter and trim products
		const filteredProducts = response
			.map((product: Product) => ({
				...product,
				categoria: product.categoria?.trim(),
			}))
			.filter((product: Product) => product.stock && product.stock > 0)

		return (
			<section
				id='main-products'
				className='mx-auto max-w-screen-2xl px-4 py-4 pb-8 sm:px-6 lg:px-8 flex gap-10'
			>
				<ProductsSidebar categoryPath={searchParams?.category} />
				<article className='flex-[80%]'>
					<ClientProductPage products={filteredProducts} />
				</article>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default ProductsPage
