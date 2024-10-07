'use client'

// UI Imports
import { Button } from '@/components/ui/button'

// Types Imports
import type { Product } from '@/types'

// Assets Imports
import {
  AwardIcon,
  BarcodeIcon,
  DownloadIcon,
  FileIcon,
  PackageIcon,
  QuoteIcon,
  RulerIcon,
  TagIcon
} from 'lucide-react'

/**
 * A React component that displays the characteristics of a product.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.product - The product data.
 * @return {JSX.Element} The product characteristics section.
 */
const ProductCaracteristics = ({
  product
}: {
  product: Product
}): JSX.Element => {
  // Deconstruction with default values in Spanish

  return (
    <section
      id={`${product.nombre}-caracteristicas`}
      className='grid w-full max-w-xl content-center gap-4'
    >
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-3'>
          <BarcodeIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Código de Barras</p>
            <p className='text-sm text-gray-600'>
              {product.codigoBarras || 'N/A'}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3 justify-self-end'>
          <TagIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Código de Referencia</p>
            <p className='text-sm text-gray-600'>
              {product.codigoReferencia || 'N/A'}
            </p>
          </div>
        </div>
      </div>
      <hr className='border-accent/50' />
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-3'>
          <RulerIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Dimensiones</p>
            <p className='text-sm text-gray-600'>
              {product.medidas?.ancho || 'N/A'}cm x{' '}
              {product.medidas?.alto || 'N/A'}cm x{' '}
              {product.medidas?.profundidad || 'N/A'}cm
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3 justify-self-end'>
          <PackageIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Peso y Volumen</p>
            <p className='text-sm text-gray-600'>
              {product.medidas?.volumen || 'N/A'}m³
            </p>
          </div>
        </div>
      </div>
      <hr className='border-accent/50' />
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex items-center gap-3'>
          <AwardIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Certificación</p>
            <p className='text-sm text-gray-600'>
              {product.certificacion || 'N/A'}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-3 justify-self-end'>
          <FileIcon className='h-5 w-5 shrink-0 text-accent/80' />
          <div>
            <p className='text-sm font-medium'>Subcategoría</p>
            <p className='text-sm text-gray-600'>
              {product.subcategoria || 'N/A'}
            </p>
          </div>
        </div>
      </div>
      <hr className='border-accent/50' />
      <div className='flex w-full items-start space-x-4'>
        <QuoteIcon className='mt-1 h-5 w-5 shrink-0 text-accent/80' />
        <div>
          <p className='text-gray-600'>{product.slogan || 'N/A'}</p>
        </div>
      </div>

      {product.fichaTecnica && (
        <div className='grid w-full place-items-center border-t border-accent/30 pt-3'>
          <Button
            className='w-3/4 self-center'
            onClick={() => window.open(product.fichaTecnica, '_blank')}
          >
            <DownloadIcon className='mr-2 h-4 w-4' />
            Descargar Hoja de Producto
          </Button>
        </div>
      )}
    </section>
  )
}

export default ProductCaracteristics
