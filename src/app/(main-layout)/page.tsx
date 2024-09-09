// Project component imports
import Info from '@/components/home/info'
import Hero from '@/components/home/hero'
import Categories from '@/components/home/categories'
import FeaturedList from '@/components/home/featured-list'
import HomeProductsList from '@/components/home/home-products-list'
import Newsletter from '@/components/shared/newsletter'
import Prefooter from '@/components/home/prefooter'
import FeaturedEvent from '@/components/home/featured-event'

// Queries Imports
import { homePage } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { HomePageType } from '@/types'

/**
 * Renders the Home component which displays a hero section, categories section,
 * home products list, info section, featured lists for jewelry and electronics,
 * newsletter section, and prefooter section.
 *
 * @return {Promise<JSX.Element>} The rendered Home component.
 */
export default async function Home(): Promise<JSX.Element> {
	const homePageResponse: HomePageType = await sanityClientRead.fetch(homePage)

	// TODO
	const {
		bentoFeaturedProducto,
		bentoThreeImages,
		bentofeaturedCategory,
		InfoCards,
		carousel1,
		carousel2,
		featuredEvent,
		mainListCategories,
	} = homePageResponse

	return (
		<>
			<Hero
				bentoThreeImages={bentoThreeImages}
				bentoFeaturedProducto={bentoFeaturedProducto}
				bentofeaturedCategory={bentofeaturedCategory}
			/>
			<Categories />
			<HomeProductsList categories={mainListCategories} />
			<Info infoCards={InfoCards} />
			<FeaturedList
				itemCategory={carousel1.category}
				featuredTitle={carousel1.title}
			/>
			<FeaturedList
				itemCategory={carousel2.category}
				featuredTitle={carousel2.title}
				direction='right'
			/>
			<FeaturedEvent event={featuredEvent} />
			<Newsletter />
			<Prefooter />
		</>
	)
}
