// Project component imports
import FeaturedList from '@/components/home/featured-list'
import Prefooter from '@/components/home/prefooter'
import Newsletter from '@/components/shared/newsletter'
import ProductDetails from '@/components/products/product-details'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Utils Imports
import { desurlize } from '@/lib/utils'

// Queries imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { productByName } from '@/lib/queries'

// Types Imports
import type { Product } from '@/types'
import type { Metadata } from 'next'

// function to generate metadata
export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const desurlizedProductName = desurlize(params.id).toUpperCase()

	const response: Product = await sanityClientRead.fetch(
		productByName(desurlizedProductName),
	)

	return {
		title: `${response.nombre}`,
		description: `${response.descripcion}`,
		openGraph: {
			title: `${response.nombre}`,
			description: `${response.descripcion}`,
			images: response.image,
		},
		twitter: {
			title: `${response.nombre}`,
			description: `${response.descripcion}`,
			images: response.image,
		},
	}
}

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
		const desurlizedProductName = desurlize(params.id).toUpperCase()

		const response: Product = await sanityClientRead.fetch(
			productByName(desurlizedProductName),
		)

		return (
			<>
				<section
					id='main-products'
					className='mx-auto max-w-screen-2xl px-4 py-4 pb-8 sm:px-6 lg:px-8 flex gap-5 flex-col'
				>
					<ProductDetails product={response} />
					<FeaturedList
						featuredTitle='Productos Relacionados'
						direction='left'
						itemCategory={searchParams?.category!}
					/>
					<FeaturedList
						featuredTitle='Mas Vendidos'
						direction='right'
						itemCategory={'Bienestar'}
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
