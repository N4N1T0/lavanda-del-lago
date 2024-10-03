// Project component imports
import { ProductCard } from '@/components/shared/product-card'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Queries imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { productsByCategory } from '@/lib/queries'

// Types imports
import type { Product } from '@/types'

/**
 * Fetches and renders a list of last-minute products from the Fake Store API.
 *
 * @return {JSX.Element} A JSX element containing the last-minute products.
 */
const LastMinute = async ({
  category
}: {
  category: string
}): Promise<JSX.Element> => {
  try {
    const response: Product[] = await sanityClientRead.fetch(
      productsByCategory,
      {
        category
      }
    )

    return (
      <article className='mt-10'>
        <h2 className='mb-4 text-2xl'>Última Oportunidad</h2>
        <ul className='grid grid-cols-2 gap-3'>
          {response.slice(0, 2).map((product: Product, index: number) => (
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
    console.error(error)
    return <ServerFetchError error={error} />
  }
}

export default LastMinute
