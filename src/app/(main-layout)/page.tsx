// Project component imports
import Categories from '@/components/home/categories'
import FeaturedEvent from '@/components/home/featured-event'
import FeaturedList from '@/components/home/featured-list'
import Hero from '@/components/home/hero'
import HomeProductsList from '@/components/home/home-products-list'
import Info from '@/components/home/info'
import Prefooter from '@/components/home/prefooter'
import Newsletter from '@/components/shared/newsletter'
import { jldHomePage } from '@/components/layout/seo'

// Queries Imports
import { homePage } from '@sanity-studio/queries'
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
  const homePageResponse: HomePageType = await sanityClientRead.fetch(
    homePage,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  const {
    bentoFeaturedProducto,
    bentoThreeImages,
    bentofeaturedCategory,
    InfoCards,
    carousel1,
    carousel2,
    featuredEvent,
    mainListCategories
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
      />
      <div className='mx-auto mb-3 flex max-w-screen-2xl flex-col items-center px-4 sm:px-6 lg:px-8'>
        <FeaturedEvent event={featuredEvent} />
        <Newsletter />
        <Prefooter />
      </div>
      {jldHomePage()}
    </>
  )
}
