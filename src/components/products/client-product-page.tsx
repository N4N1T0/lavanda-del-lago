'use client'

// React Imports
import { useMemo, useState } from 'react'

// UI Imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Project Components Imports
import {
  ProductCard,
  ProductCardSkeleton
} from '@/components/products/product-card'

// Types Imports
import type { Product } from '@/types'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Constants Imports
import { productsFilers } from '@/constants/site-data'

const ClientProductPage = ({ products }: { products: Product[] }) => {
  const [filter, setfilter] = useState('')

  const filteredProducts = useMemo(() => {
    if (filter === 'menor-precio') {
      return [...products].sort((a, b) => a.precio - b.precio)
    }
    if (filter === 'mayor-precio') {
      return [...products].sort((a, b) => b.precio - a.precio)
    }
    if (filter === 'nuevos') {
      return [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    }
    return products
  }, [filter, products])

  return (
    <>
      <ProductPageHeader
        productsLength={products.length}
        setFilter={setfilter}
      />
      <section id='products-list'>
        <ul className='grid w-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:gap-10'>
          {filteredProducts.length === 0
            ? Array(8)
                .fill('Product Skeleteon')
                .map(() => <ProductCardSkeleton key={uuidv4()} />)
            : filteredProducts.map((product: Product, index: number) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
        </ul>
      </section>
    </>
  )
}

const ProductPageHeader = ({
  productsLength,
  setFilter
}: {
  productsLength: number
  setFilter: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  return (
    <header className='flex w-full flex-row-reverse items-center justify-between px-2 py-4 md:flex-row'>
      <p className='text-sm text-gray-600 md:text-base'>
        Total de Productos{' '}
        <span className='text-lg font-medium text-accent'>
          {productsLength}
        </span>
      </p>
      <Select onValueChange={setFilter}>
        <SelectTrigger className='w-[160px] border-accent text-gray-600 md:w-[190px]'>
          <SelectValue placeholder='Ordenar por...' />
        </SelectTrigger>
        <SelectContent>
          {productsFilers.map((filter) => (
            <SelectItem key={uuidv4()} value={filter.value} className='pl-3'>
              {filter.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}

export default ClientProductPage
