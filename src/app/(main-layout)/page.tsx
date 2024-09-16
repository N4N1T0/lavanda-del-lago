import Categories from '@/components/home/categories'
import FeaturedEvent from '@/components/home/featured-event'
import FeaturedList from '@/components/home/featured-list'
import Hero from '@/components/home/hero'
import HomeProductsList from '@/components/home/home-products-list'
// Project component imports
import Info from '@/components/home/info'
import Prefooter from '@/components/home/prefooter'
import Newsletter from '@/components/shared/newsletter'

// Queries Imports
import { homePage } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { HomePageType } from '@/types'
import SecurityHandling from '@/components/layout/security-handling'

/**
 * Renders the Home component which displays a hero section, categories section,
 * home products list, info section, featured lists for jewelry and electronics,
 * newsletter section, and prefooter section.
 *
 * @return {Promise<JSX.Element>} The rendered Home component.
 */
export default async function Home({
	searchParams,
}: {
	searchParams?: { security?: string }
}): Promise<JSX.Element> {
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
			<SecurityHandling security={searchParams?.security} />
		</>
	)
}
