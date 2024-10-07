// Next Imports
import Link from 'next/link'

// Project Component Imports
import ServerFetchError from '@/components/shared/server-fetch-error'
import NoData from '@/components/shared/no-data'

// UI Imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// Queries Imports
import { productsByCategory } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Utils Imports
import { urlize } from '@/lib/utils'

// Type Imports
import type { Product } from '@/types'

// Assets Imports
import { ShoppingBag } from 'lucide-react'

/**
 * A component that fetches and displays new items in a given category.
 *
 * @param {string} category - The category of products to fetch.
 * @return {Promise<JSX.Element>} A Card component containing a list of new items, or an error message if the fetch fails.
 */
const NewItems = async ({
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

    if (response.length === 0) {
      return <NoData data='No hay Productos' />
    }

    return (
      <Card className='border border-accent/70'>
        <CardHeader>
          <CardTitle>Nuevos en Productos</CardTitle>
        </CardHeader>
        <CardContent>
          {response?.length ? (
            <ul className='space-y-2'>
              {response.slice(0, 5).map((item) => {
                const { id, nombre, categoria, precio } = item
                return (
                  <li key={id} className='group'>
                    <Link
                      href={
                        nombre && categoria
                          ? `/products/${urlize(nombre)}?category=${categoria}`
                          : '/products'
                      }
                      className='flex items-center justify-between transition-colors duration-200 group-hover:text-accent'
                      aria-label={`Ver producto ${nombre}`}
                    >
                      <span className='flex items-center'>
                        <ShoppingBag className='mr-2 h-4 w-4 shrink-0' />
                        <small>{nombre || 'Producto Desconocido'}</small>
                      </span>
                      <span className='font-semibold'>
                        ${precio?.toFixed(2) || 'N/A'}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>No items available in this category.</p>
          )}
        </CardContent>
        <CardFooter className='text-center text-sm text-accent/70'>
          Nuevos Productos de tu categoría más comprada
        </CardFooter>
      </Card>
    )
  } catch (error) {
    return <ServerFetchError error={error} />
  }
}

export default NewItems
