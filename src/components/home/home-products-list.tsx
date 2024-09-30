'use client'

// React and useState imports
import React, { useEffect, useState } from 'react'

// Type imports
import type { Product } from '@/types'

// UI component imports
import { Skeleton } from '@/components/ui/skeleton'

// Project component imports
import {
  ProductCard,
  ProductCardSkeleton
} from '@/components/shared/product-card'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { allProducts } from '@/lib/queries'

/**
 * Renders a list of products based on the selected category.
 *
 * @return {JSX.Element} The JSX element containing the list of products.
 */
const HomeProductsList = (
  { categories }: { categories: string[] }
): JSX.Element => {
  // products: The list of products that will be rendered & activeCategory: The currently selected category.
  const [products, setProducts] = useState<Product[] | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    categories[0]
  )

  // Fetching of data from sanity as part of client side rendering
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await sanityClientRead.fetch(allProducts)
        setProducts(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    getAllProducts()
  }, [])

  // Rendering of the list of products based on the selected category
  if (!products) {
    return <HomeProductsListSkeleton />
  }

  return (
    <section
      id='home-products-list'
      className='mx-auto flex max-w-screen-2xl flex-col gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:px-8'
    >
      <HomeProductsListHeader
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        categories={categories}
      />

      <ul className='grid w-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:gap-10'>
        {products
          .filter((product: Product) =>
            activeCategory === 'Todos'
              ? true
              : product.categoria === activeCategory
          )
          .slice(0, 8)
          .map((product: Product, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
      </ul>
    </section>
  )
}

/**
 * Renders the Header of the home products list. using React.useMemo for not re-rendering
 *
 * @return {JSX.Element} the Header Component with the filter logic
 */
const HomeProductsListHeader = React.memo(
  (
    {
      setActiveCategory,
      categories,
      activeCategory
    }: {
      setActiveCategory: React.Dispatch<
        React.SetStateAction<string | undefined>
      >
      categories: string[]
      activeCategory: string | undefined
    }
  ) => {
    return (
      <div className='flex flex-wrap items-center justify-center gap-10 lg:justify-start'>
        {categories.map((category) => (
          <button
            type='button'
            key={uuidv4()}
            className={`text-base leading-normal transition-colors duration-150 hover:text-accent ${
              category === activeCategory ? 'text-accent' : 'text-accent/70'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    )
  }
)

/**
 * Renders a skeleton component for the home products list.
 *
 * @return {JSX.Element} The skeleton component for the home products list.
 */
const HomeProductsListSkeleton = (): JSX.Element => {
  return (
    <section
      id='home-products-list-skeleton'
      className='mx-auto flex max-w-screen-2xl flex-col gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:px-8'
    >
      <div className='flex flex-wrap items-center justify-center gap-10 lg:justify-start'>
        {Array(5)
          .fill('categories')
          .map((_) => (
            <Skeleton key={uuidv4()} className='h-4 w-24 rounded-md' />
          ))}
      </div>
      <ul className='grid w-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:gap-10'>
        {Array.from({ length: 8 }).map((_, _i) => (
          <ProductCardSkeleton key={uuidv4()} />
        ))}
      </ul>
    </section>
  )
}

export default HomeProductsList
