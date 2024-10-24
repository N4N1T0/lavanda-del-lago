// Next imports
import type { Metadata } from 'next'

// Type imports
import type { Product } from '@/types'

// Project component imports
import ClientProductPage from '@/components/products/client-product-page'
import ProductsSidebar from '@/components/products/sidebar'
import ServerFetchError from '@/components/shared/server-fetch-error'
import { jldProductList } from '@/components/layout/seo'

// Types Imports
import { allProducts, productsByCategory } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Axiom Imports
import { Logger } from 'next-axiom'

// function to generate metadata
export async function generateMetadata({
  searchParams
}: {
  searchParams?: { category?: string }
}): Promise<Metadata> {
  return {
    title: `Productos | ${
      searchParams?.category ? searchParams?.category : 'Todos los productos'
    }`,
    description: `Productos de la tienda en linea de Lavanda del lago. para la categoria de productos ${
      searchParams?.category ? searchParams?.category : 'Todos los productos'
    }`
  }
}

/**
 * Asynchronously fetches products based on search parameters and renders them on the page.
 *
 * @param {object} searchParams - The search parameters object.
 * @param {string} searchParams.category - The category for which products are fetched.
 * @return {Promise<JSX.Element>} A React component representing the main products section.
 */
const ProductsPage = async ({
  searchParams
}: {
  searchParams?: { category?: string }
}): Promise<JSX.Element> => {
  // Determine query based on the presence of a category
  const productQuery = searchParams?.category
    ? sanityClientRead.fetch(
        productsByCategory,
        {
          category: searchParams?.category
        },
        {
          next: { revalidate: 60 }
        }
      )
    : sanityClientRead.fetch(
        allProducts,
        {},
        {
          next: { revalidate: 60 }
        }
      )

  // Axiom Init
  const log = new Logger()

  try {
    // Fetch products, passing in category if needed
    const response: Product[] = await productQuery

    // Filter and trim products
    const filteredProducts = response
      .map((product: Product) => ({
        ...product,
        categoria: product.categoria?.trim()
      }))
      .filter((product: Product) => product.stock && product.stock > 0)

    return (
      <section
        id='main-products'
        className='mx-auto flex max-w-screen-2xl gap-10 px-4 py-4 pb-8 sm:px-6 lg:px-8'
      >
        <ProductsSidebar categoryPath={searchParams?.category} />
        <article className='flex-[80%]'>
          <ClientProductPage products={filteredProducts} />
        </article>
        {jldProductList(filteredProducts)}
      </section>
    )
  } catch (error) {
    log.info('Error fetching in the ProductsPage', { data: error })

    await log.flush()
    return <ServerFetchError error={error} />
  }
}

export default ProductsPage
