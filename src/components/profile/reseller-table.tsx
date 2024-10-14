'use client'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'
import { useState, type Dispatch, type SetStateAction, useEffect } from 'react'

// UI Imports
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

// External Packages Imports
import { useDebounce } from 'use-debounce'

// Utils Imports
import { eurilize, urlize } from '@/lib/utils'

// Type Imports
import type { Product } from '@/types'

// Store Importss
import useShoppingCart from '@/stores/shopping-cart-store'
import { ResellerTableQuantity } from '@/components/shared/quantity'

const ResellerTable = ({
  products,
  selectedProducts,
  toggleProductSelection,
  discount,
  updateQuantity,
  setQuantities,
  quantities
}: {
  products: Product[]
  selectedProducts: Set<string>
  toggleProductSelection: (id: string) => void
  discount: number | null | undefined
  updateQuantity: (id: string, delta: number) => void
  setQuantities: Dispatch<
    SetStateAction<{
      [key: string]: number
    }>
  >
  quantities: { [key: string]: number }
}) => {
  // Search input state
  const [searchValue, setSearchValue] = useState('')
  // Filtered products based on search
  const [filteredProducts, setFilteredProducts] = useState(products)
  // Debounced search value to prevent excessive filtering
  const [debouncedSearchValue] = useDebounce(searchValue, 300)
  // Already Items in the Checkout
  const [count] = useShoppingCart()
  // Flag to avoid setting state on every render
  const [initialized, setInitialized] = useState(false)

  // Use effect to filter products when debounced search value changes
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.nombre.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [debouncedSearchValue, products])

  // Pre-select items that are already in the shopping cart
  useEffect(() => {
    if (!initialized && count && count.length > 0) {
      count.forEach((item) => {
        toggleProductSelection(item.id)
        setQuantities((prev) => ({
          ...prev,
          [item.id]: item.quantity // assuming each cart item has a quantity property
        }))
      })
      setInitialized(true) // Set initialized to true after setting quantities
    }
  }, [count, toggleProductSelection, setQuantities, initialized])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  // Handle quantity input change
  const handleQuantityChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      // Get new quantity from input
      const newQuantity = Number.parseInt(e.target.value) || 0
      // Update quantities object with new quantity
      setQuantities((prev) => ({
        ...prev,
        [id]: Math.max(0, newQuantity) // Prevent negative quantities
      }))
    }

  // Render description with truncated text
  const renderDescription = (description: string) => {
    return description
      ? `${description.split(' ').slice(0, 10).join(' ')} ...`
      : 'Estamos trabajando en una descripci&oacute;n'
  }

  return (
    <section id='reseller-products' className='container mx-auto p-4'>
      <div className='mb-6 flex w-full items-center justify-between'>
        <h1 className='text-3xl font-bold'>Lista de Productos</h1>
        <label htmlFor='product-search' className='sr-only'>
          Buscar productos:
        </label>
        <Input
          id='product-search'
          type='search'
          placeholder='Buscar productos...'
          className='max-w-xs'
          onChange={handleSearchChange}
        />
      </div>
      <Table>
        <TableHeader className='hidden md:table-header-group'>
          <TableRow className='border-accent/50 text-accent/60 hover:bg-white'>
            <TableHead className='md:w-[50px]'>Seleccione</TableHead>
            <TableHead className='w-[100px]'>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Descripci&oacute;n</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Descuento</TableHead>
            <TableHead>Cantidad</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map(
            ({ id, nombre, categoria, image, descripcion, precio }) => (
              <TableRow key={id} className='border-accent/50'>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.has(id)}
                    onCheckedChange={() => toggleProductSelection(id)}
                  />
                </TableCell>
                <TableCell className='w-[100px]'>
                  <Link
                    href={
                      nombre && categoria
                        ? `/products/${urlize(nombre)}?category=${categoria}`
                        : '/products'
                    }
                    target='_blank'
                    className='group'
                  >
                    <Image
                      src={image}
                      alt={nombre}
                      width={50}
                      height={50}
                      className='duration-200: h-auto w-auto rounded-md transition-opacity group-hover:opacity-70'
                    />
                  </Link>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Link
                    href={
                      nombre && categoria
                        ? `/products/${urlize(nombre)}?category=${categoria}`
                        : '/products'
                    }
                    target='_blank'
                    className='transition-colors duration-200 hover:text-accent'
                  >
                    {nombre}
                  </Link>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {renderDescription(descripcion)}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {eurilize(precio)}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {eurilize(precio - precio * (discount ?? 0.1))}
                </TableCell>
                <TableCell>
                  <ResellerTableQuantity
                    id={id}
                    quantities={quantities}
                    setQuantities={handleQuantityChange}
                    updateQuantity={updateQuantity}
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </section>
  )
}

export default ResellerTable
