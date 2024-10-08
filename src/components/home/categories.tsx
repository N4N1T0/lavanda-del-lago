// Next.js Imports
import Link from 'next/link'
import React from 'react'

// Project component imports
import ServerFetchError from '@/components/shared/server-fetch-error'

import NoData from '@/components/shared/no-data'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Queries
import { sanityClientRead } from '@sanity-studio/lib/client'
import { categories } from '@sanity-studio/queries'

// Types Imports
import type { CategoriesList } from '@/types'

/**
 * Asynchronously fetches categories from the Fake Store API and renders a list of category links.
 *
 * @return {Promise<JSX.Element>} A React component that renders a list of category links. If an error occurs during the fetch, an error message is rendered.
 */
export const Categories = async (): Promise<JSX.Element> => {
  try {
    const response: CategoriesList[] = await sanityClientRead.fetch(categories)

    const filterCategories = response
      .map((category) => category.categoria)
      .filter(
        (category, index, array) =>
          category && array.indexOf(category) === index
      )

    if (response.length === 0) {
      return <NoData data='No hay Categorias' />
    }

    return (
      <section
        id='categories'
        className='inline-flex w-full flex-col items-start gap-8 bg-gray-100 px-5 py-10 lg:px-10 2xl:px-20 2xl:py-20'
      >
        <div className='flex w-full items-center justify-between self-stretch'>
          <div className='mt-1 w-fit whitespace-nowrap text-2xl font-normal leading-8 text-black'>
            BUSCAR POR CATEGORIAS
          </div>
        </div>
        <div className='flex w-full items-start gap-8'>
          <ul className='flex w-full snap-x snap-mandatory gap-8 overflow-x-scroll pb-3'>
            {filterCategories.map((category: string | null) => (
              <li key={uuidv4()} className='snap-start'>
                <CategoryLink category={category!} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  } catch (error) {
    console.error(error)
    return <ServerFetchError error={error} />
  }
}

/**
 * A memoized component that renders a category link.
 *
 * @param {object} props - The props object.
 * @param {string} props.category - The category name.
 * @return {JSX.Element} A React component that renders a category link.
 */
const CategoryLink = React.memo(function CategoryLink({
  category
}: {
  category: string
}) {
  return (
    <Link
      prefetch
      href={`/products?category=${category}`}
      className='flex h-32 w-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-[15px] border-[3px] border-accent bg-white px-10 py-6 text-center transition-colors duration-150 hover:bg-accent hover:text-white'
    >
      {category}
    </Link>
  )
})

export default Categories
