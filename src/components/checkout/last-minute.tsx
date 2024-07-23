import type { Product } from '@/types'
import { ServerFetchError } from '../shared/server-fetch-error'
import { ProductCard } from '../shared/product-card'

const LastMinute = async () => {
	try {
		const response = await fetch(
			'https://fakestoreapi.com/products/category/jewelery',
		)
		const products: Product[] = await response.json()

		return (
			<article className='mt-10'>
				<h2 className='text-2xl mb-4'>Última Oportunidad</h2>
				<ul className='flex gap-3'>
					{products.slice(0, 2).map((product: Product, index: number) => (
						<ProductCard key={product.id} product={product} index={index} />
					))}
				</ul>
			</article>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default LastMinute
