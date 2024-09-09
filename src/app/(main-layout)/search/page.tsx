// Project component imports
import { ProductCard } from '@/components/shared/product-card'

// Types imports
import type { Product } from '@/types'
import type { Metadata } from 'next'

// function to generate metadata
export async function generateMetadata({
	searchParams,
}: {
	searchParams?: Record<string, string | string[] | undefined>
}): Promise<Metadata> {
	return {
		title: `${searchParams?.q || 'Busqueda'}`,
		description: `Busqueda dentro de los productos de Lavanda del lago para: ${searchParams?.q || 'Busqueda'}.`,
	}
}

/**
 * A search page component that fetches products from a fake store API and displays the first 4 products.
 *
 * @param {Record<string, string | string[] | undefined>} searchParams - An object containing search parameters.
 * @return {Promise<JSX.Element | null>} A JSX element representing the search page, or null if no results are found.
 */
const SearchPage = async ({
	searchParams,
}: {
	searchParams?: Record<string, string | string[] | undefined>
}): Promise<JSX.Element | null> => {
	// Extract search value from search parameters
	const { q: searchValue } = searchParams as Record<string, string>

	const response = await fetch('https://fakestoreapi.com/products')
	const products: Product[] = await response.json()

	return (
		<section
			id='search'
			className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-7'
		>
			<div className='w-full space-y-2 max-w-3xl'>
				<span className='font-light text-accent'>
					Productos encontrados para tus patrones de busqueda
				</span>
				<h1 className='text-5xl font-bold uppercase'>{searchValue}</h1>
			</div>
			<section id='search-products-list' className='mt-5'>
				<ul className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 2xl:gap-10'>
					{products.slice(0, 4).map((product: Product, index: number) => (
						<ProductCard key={product.id} product={product} index={index} />
					))}
				</ul>
			</section>
		</section>
	)
}

export default SearchPage
