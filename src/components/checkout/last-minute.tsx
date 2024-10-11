// Project component imports
import { ProductCard } from '@/components/products/product-card'
import ServerFetchError from '@/components/shared/server-fetch-error'

import NoData from '@/components/shared/no-data'

// Queries imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { productsByCategory } from '@sanity-studio/queries'

// Types imports
import type { Product } from '@/types'

/**
 * Fetches and renders a list of last-minute products from the Sanity API.
 *
 * @param {Object} params - Component props
 * @param {string} params.category - The category of products to fetch
 * @return {Promise<JSX.Element>} A JSX element containing the last-minute products.
 */
const LastMinute = async ({
  category
}: {
  category: string
}): Promise<JSX.Element> => {
  try {
    const response = await sanityClientRead.fetch<Product[]>(
      productsByCategory,
      {
        category
      },
      {
        next: { revalidate: 3600 }
      }
    )

    if (response.length === 0) {
      return <NoData data='No hay Articulosde ultimo minuto' />
    }

    return (
      <article className='mt-10'>
        <h2 className='mb-4 text-2xl'>Última Oportunidad</h2>
        <ul className='grid grid-cols-2 gap-3'>
          {response.slice(0, 2).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              lastMinute
            />
          ))}
        </ul>
      </article>
    )
  } catch (error) {
    console.error('Error fetching last-minute products:', error)
    return <ServerFetchError error={error} />
  }
}

export default LastMinute
