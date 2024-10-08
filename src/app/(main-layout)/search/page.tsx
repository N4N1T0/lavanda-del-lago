import { ProductCard } from '@/components/shared/product-card'
import { oramaClient } from '@/lib/clients'
import type { Metadata } from 'next'

// function to generate metadata
export async function generateMetadata({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}): Promise<Metadata> {
  return {
    title: `${searchParams?.q || 'Busqueda'}`,
    description: `Busqueda dentro de los productos de Lavanda del lago para: ${
      searchParams?.q || 'Busqueda'
    }.`
  }
}

/**
 * A search page component that fetches products from a fake store API and displays the first 4 products.
 *
 * @param {Record<string, string | string[] | undefined>} searchParams - An object containing search parameters.
 * @return {Promise<JSX.Element | null>} A JSX element representing the search page, or null if no results are found.
 */
const SearchPage = async ({
  searchParams
}: {
  searchParams?: Record<string, string | string[] | undefined>
}): Promise<JSX.Element | null> => {
  // Extract search value from search parameters
  const { q: searchValue } = searchParams as Record<string, string>

  const results = await oramaClient.search({
    term: searchValue,
    mode: 'fulltext' // can be 'fulltext', 'vector' or 'hybrid'
  })

  return (
    <section
      id='search'
      className='mx-auto flex max-w-screen-2xl flex-col gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:px-8'
    >
      <div className='w-full max-w-3xl space-y-2'>
        <span className='font-light text-accent'>
          Productos encontrados para tus patrones de busqueda
        </span>
        <h1 className='text-5xl font-bold uppercase'>{searchValue}</h1>
        <p className='font-light text-accent'>
          Cantidad de productos econtrados:{' '}
          <span className='font-bold'>{results?.hits.length}</span>
        </p>
      </div>
      <section id='search-products-list' className='mt-5'>
        <ul className='grid w-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:gap-10'>
          {results?.hits.map(({ id, document }, index) => (
            <ProductCard key={id} product={document} index={index} />
          ))}
        </ul>
      </section>
    </section>
  )
}

export default SearchPage
