import { Button } from '@/components/ui/button'
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
import { eurilize, urlize } from '@/lib/utils'
import type { Product } from '@/types'
import { MinusCircle, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

const ResellerTable = (
  {
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
    discount: number | null
    updateQuantity: (id: string, delta: number) => void
    setQuantities: Dispatch<
      SetStateAction<{
        [key: string]: number
      }>
    >
    quantities: { [key: string]: number }
  }
) => {
  discount = discount ?? 10

  return (
    <section id='reseller-products' className='container mx-auto p-4'>
      <h1 className='mb-6 text-3xl font-bold'>Lista de Productos</h1>
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
          {products.map((product) => (
            <TableRow key={product.id} className='border-accent/50'>
              <TableCell>
                <Checkbox
                  checked={selectedProducts.has(product.id)}
                  onCheckedChange={() => toggleProductSelection(product.id)}
                />
              </TableCell>
              <TableCell className='w-[100px]'>
                <Link
                  href={
                    product.nombre && product.categoria
                      ? `/products/${urlize(product.nombre)}?category=${
                          product.categoria
                        }`
                      : '/products'
                  }
                  target='_blank'
                  className='group'
                >
                  <Image
                    src={product.image}
                    alt={product.nombre}
                    width={50}
                    height={50}
                    className='duration-200: rounded-md transition-opacity group-hover:opacity-70'
                  />
                </Link>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <Link
                  href={
                    product.nombre && product.categoria
                      ? `/products/${urlize(product.nombre)}?category=${
                          product.categoria
                        }`
                      : '/products'
                  }
                  target='_blank'
                  className='transition-colors duration-200 hover:text-accent'
                >
                  {product.nombre}
                </Link>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {`${product.descripcion
                  ?.split(' ')
                  .slice(0, 10)
                  .join(' ')} ...` ||
                  'Estamos trabajando en una descripci&oacute;n'}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {eurilize(product.precio)}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {eurilize(product.precio - product.precio * (discount / 100))}
              </TableCell>
              <TableCell>
                <div className='flex items-center space-x-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => updateQuantity(product.id, -1)}
                  >
                    <MinusCircle className='h-4 w-4' />
                  </Button>
                  <Input
                    type='number'
                    value={quantities[product.id]}
                    onChange={(e) => {
                      const newQuantity = Number.parseInt(e.target.value) || 0
                      setQuantities((prev) => ({
                        ...prev,
                        [product.id]: Math.max(0, newQuantity)
                      }))
                    }}
                    className='w-16 text-center'
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => updateQuantity(product.id, 1)}
                  >
                    <PlusCircle className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default ResellerTable
