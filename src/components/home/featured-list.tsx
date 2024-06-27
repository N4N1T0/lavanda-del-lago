// Project component imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'
import ProductCarousel from '@/components/shared/product-carousel'

/**
 * Renders a featured list section with a title and a product carousel.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.itemCategory - The category of items to fetch from the API.
 * @param {string} props.featuredTitle - The title of the featured list section.
 * @param {string} [props.direction='left'] - The direction of the title text.
 * @return {Promise<JSX.Element>} A promise that resolves to a JSX element representing the featured list section.
 * @throws {Error} If there is an error fetching the items from the API.
 */
const FeaturedList = async ({
	itemCategory,
	featuredTitle,
	direction = 'left',
}: {
	itemCategory: string
	featuredTitle: string
	direction?: 'left' | 'right'
}): Promise<JSX.Element> => {
	try {
		const response = await fetch(
			`https://fakestoreapi.com/products/category/${itemCategory}`,
		)
		const items = await response.json()

		return (
			<section>
				<div className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 space-y-5'>
					<h2
						className={`text-4xl font-bold text-accent uppercase ${
							direction === 'right' ? 'text-right' : 'text-left'
						}`}
					>
						{featuredTitle}
					</h2>
					<div className='flex gap-5 w-full mx-auto'>
						<ProductCarousel productList={items} />
					</div>
				</div>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError />
	}
}

export default FeaturedList
