// Project component imports
import ServerFetchError from '@/components/shared/server-fetch-error'

import ProductCarousel from '@/components/products/product-carousel'
import NoData from '@/components/shared/no-data'

// Queries imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { productsByCategory } from '@sanity-studio/queries'

// Types imports
import type { Product } from '@/types'

// Axiom Imports
import { Logger } from 'next-axiom'

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
  featuredTitle
}: {
  itemCategory: string | undefined
  featuredTitle: string
  direction?: 'left' | 'right'
}): Promise<JSX.Element> => {
  const log = new Logger()
  try {
    const response: Product[] = await sanityClientRead.fetch(
      productsByCategory,
      {
        category: itemCategory
      },
      {
        next: { revalidate: 60 }
      }
    )

    if (response.length === 0) {
      return <NoData data='No hay Productos' />
    }

    return (
      <section id={itemCategory}>
        <div className='mx-auto max-w-screen-2xl space-y-5 px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
          <h2 className='text-4xl font-bold uppercase text-accent'>
            {featuredTitle}
          </h2>
          <ProductCarousel productList={response} />
        </div>
      </section>
    )
  } catch (error) {
    log.debug('Error in the featured List Component', { data: error })

    await log.flush()
    return <ServerFetchError error={error} />
  }
}

export default FeaturedList
