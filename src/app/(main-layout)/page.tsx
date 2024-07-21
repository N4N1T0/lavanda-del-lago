import Info from '@/components/home/info'
import Hero from '@/components/home/hero'
import Categories from '@/components/home/categories'
import FeaturedList from '@/components/home/featured-list'
import HomeProductsList from '@/components/home/home-products-list'
import Newsletter from '@/components/shared/newsletter'
import Prefooter from '@/components/home/prefooter'
import { homePage } from '@/lib/queries'
import { sanityClient } from '@sanity-studio/lib/client'
import type { HomePageType } from '@/types'
import FeaturedEvent from '@/components/home/featured-event'

/**
 * Renders the Home component which displays a hero section, categories section,
 * home products list, info section, featured lists for jewelry and electronics,
 * newsletter section, and prefooter section.
 *
 * @return {Promise<JSX.Element>} The rendered Home component.
 */
export default async function Home(): Promise<JSX.Element> {
	const homePageResponse: HomePageType = await sanityClient.fetch(homePage)

	// TODO
	const {
		bentoFeaturedProducto,
		featuredCategories,
		productsWithOffer,
		bentoThreeImages,
		bentofeaturedCategory,
		newProducts,
		topSellingProducts,
		featuredEvent,
	} = homePageResponse

	return (
		<>
			<Hero bentoThreeImages={bentoThreeImages} />
			<Categories />
			<HomeProductsList />
			<Info />
			<FeaturedList itemCategory='jewelery' featuredTitle='productos Nuevos' />
			<FeaturedList
				itemCategory='electronics'
				featuredTitle='Lo mas vendido'
				direction='right'
			/>
			<FeaturedEvent event={featuredEvent} />
			<Newsletter />
			<Prefooter />
		</>
	)
}
