// Next.js Imports
import Link from 'next/link'

// Project Components Imports
import ServerFetchError from '@/components/shared/server-fetch-error'

import NoData from '@/components/shared/no-data'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

// Quiries Imports
import type { CategoriesList } from '@/types'
import { sanityClientRead } from '@sanity-studio/lib/client'
import { categories } from '@/lib/queries'

// Utils Imports
import { capitalizeFirstLetter, categoriesFilter } from '@/lib/utils'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a sidebar with category links.
 *
 * @param {string | undefined} categoryPath - The category path to display.
 * @return {Promise<JSX.Element>} The sidebar component with category links.
 */
const ProductsSidebar = async ({
  categoryPath
}: {
  categoryPath: string | undefined
}): Promise<JSX.Element> => {
  try {
    const response: CategoriesList[] = await sanityClientRead.fetch(categories)
    const filterCategories = categoriesFilter(response)

    if (response.length === 0) {
      return <NoData data='No hay Categorias' />
    }

    return (
      <aside className='sticky top-5 hidden h-screen flex-[20%] overflow-y-auto md:block'>
        <ul>
          {filterCategories.map((category: string) => {
            return (
              <li
                key={uuidv4()}
                className={`${
                  categoryPath === category ||
                  (category === 'Todos' && categoryPath === undefined)
                    ? 'pointer-events-none bg-gray-200'
                    : 'cursor-pointer hover:bg-gray-200'
                } my-2 rounded-md border-b border-gray-200 transition-colors duration-150`}
              >
                <Link
                  href={
                    category === 'Todos'
                      ? '/products'
                      : `/products?category=${category}`
                  }
                  className='block h-full w-full py-4 pl-2'
                >
                  {capitalizeFirstLetter(category)}
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>
    )
  } catch (error) {
    return <ServerFetchError error={error} />
  }
}

export default ProductsSidebar
