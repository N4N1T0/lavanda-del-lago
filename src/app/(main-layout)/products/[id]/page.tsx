// Project component imports
import FeaturedList from '@/components/home/featured-list'
import Prefooter from '@/components/home/prefooter'
import ProductDetails from '@/components/products/product-details'
import Newsletter from '@/components/shared/newsletter'

// Utils Imports
import { desurlizeForQuery } from '@/lib/utils'

// Queries imports
import { productByName } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { Product } from '@/types'
import type { Metadata } from 'next'

// Assets Imports
import { MainLogo } from '@/assets'

// function to generate metadata
export async function generateMetadata({
	params,
}: {
	params: { id: string }
}): Promise<Metadata> {
	const desurlizedProductName = desurlizeForQuery(params.id)

	let response: Product | null = null

	// ftist feth for the product with the given name
	response = await sanityClientRead.fetch(productByName, {
		name: desurlizedProductName,
	})

	if (!response) {
		// if not found, fetch for the product with the given name plus and space
		response = await sanityClientRead.fetch(productByName, {
			name: `${desurlizedProductName} `,
		})
	}

	return {
		title: `${response?.nombre || 'Estamos trabajando en una nombre'}`,
		description: `${response?.descripcion || 'No hay descripción'}`,
		openGraph: {
			title: `${response?.nombre || 'Estamos trabajando en una nombre'}`,
			description: `${response?.descripcion || 'No hay descripción'}`,
			images: response?.image || MainLogo.src,
		},
		twitter: {
			title: `${response?.nombre || 'Estamos trabajando en una nombre'}`,
			description: `${response?.descripcion || 'No hay descripción'}`,
			images: response?.image || MainLogo.src,
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
	const desurlizedProductName = desurlizeForQuery(params.id)

	let response: Product | null = null

	// ftist feth for the product with the given name
	response = await sanityClientRead.fetch(productByName, {
		name: desurlizedProductName,
	})

	if (!response) {
		// if not found, fetch for the product with the given name plus and space
		response = await sanityClientRead.fetch(productByName, {
			name: `${desurlizedProductName} `,
		})
	}

	return (
		<>
			<section
				id='main-products'
				className='mx-auto max-w-screen-2xl px-4 py-4 pb-8 sm:px-6 lg:px-8 flex gap-5 flex-col'
			>
				{response && <ProductDetails product={response} />}
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
}

export default ProductPage
