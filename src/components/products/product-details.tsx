// Next.js Imports
import Image from 'next/image'

// Uitility Imports
import { eurilize, isNew } from '@/lib/utils'

// Type imports
import type { Product } from '@/types'

// UI Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Component Imports
import ProductCaracteristics from '@/components/products/product-caracteristics'
import { Quantity } from '@/components/shared/quantity'

// Data Import
import { badges } from '@/constants/site-data'

// Assets Imports
import { MainLogo } from '@/assets'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'
import ImageGallery from './image-gallery'
import IngredientsTable from './ingredients-table'

/**
 * Renders the details of a product including title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, and image
 * @return {JSX.Element} The JSX element representing the product details
 */
const ProductDetails = ({ product }: { product: Product }): JSX.Element => {
  const {
    nombre,
    precio,
    descripcion,
    image,
    usabilidad,
    categoria,
    createdAt,
    fotosVarias,
    composicion
  } = product

  const imageGallery =
    fotosVarias !== null
      ? [{ image: image, key: uuidv4() }, ...fotosVarias]
      : []

  return (
    <article className='relative mt-7 grid flex-[80%] grid-cols-1 gap-10 md:grid-cols-2'>
      <div className='top-2 flex h-fit items-center justify-center md:sticky'>
        {imageGallery.length > 0 ? (
          <ImageGallery images={imageGallery} />
        ) : (
          <Image
            src={image || MainLogo}
            alt={nombre || 'Logo Principal de Lavanda del Lago'}
            title={nombre || 'Logo Principal de Lavanda del Lago'}
            width={500}
            height={500}
            priority
            className='aspect-square object-contain'
          />
        )}
      </div>
      <section id='product-details' className='space-y-4'>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-xl text-accent md:text-4xl'>
            {nombre || 'Estamos trabajando en una nombre'}
          </h1>
          {isNew(createdAt) && (
            <span className='rounded-md bg-tertiary px-3 py-1 text-sm text-white md:px-5 md:py-2 md:text-base'>
              Nuevo
            </span>
          )}
        </div>
        <h2 className='!-mt-1 text-lg uppercase'>{categoria || 'Bienestar'}</h2>
        <p className='text-3xl font-bold'>{eurilize(Number(precio || '0'))}</p>
        <Tabs defaultValue='description' className='mt-2 w-full'>
          <TabsList className='mb-3 flex w-full items-center justify-between gap-5 bg-transparent md:gap-10'>
            <TabsTrigger
              value='description'
              className='flex-1 rounded-lg border border-accent/50 py-3 text-xs md:text-base'
            >
              Descripción
            </TabsTrigger>
            <TabsTrigger
              value='use'
              className='flex-1 rounded-lg border border-accent/50 py-3 text-xs md:text-base'
            >
              <span className='hidden md:inline'>Ingredientes y Uso</span>
              <span className='inline md:hidden'>Ingredientes</span>
            </TabsTrigger>
            <TabsTrigger
              value='caracteristics'
              className='flex-1 rounded-lg border border-accent/50 py-3 text-xs md:text-base'
            >
              Características
            </TabsTrigger>
          </TabsList>
          <TabsContent value='description' className='px-5 py-3 text-center'>
            <p className='text-lg text-gray-600'>
              {descripcion ||
                'Estamos trabajando en una descripcion detallada para usted'}
            </p>{' '}
          </TabsContent>
          <TabsContent value='use' className='px-5 py-3 text-center'>
            <p className='text-lg text-gray-600'>
              {composicion !== null ? (
                <IngredientsTable composicion={composicion} />
              ) : (
                usabilidad ||
                'Estamos trabajando en una usabilidad detallada para usted'
              )}
            </p>
          </TabsContent>
          <TabsContent value='caracteristics' className='px-5 py-3 text-center'>
            <ProductCaracteristics product={product} />
          </TabsContent>
        </Tabs>
        <Quantity prduct={product} />
        <div className='flex w-full items-center justify-between'>
          {badges.map((badge) => (
            <Image
              key={uuidv4()}
              src={badge.src}
              alt={badge.alt}
              title={badge.title}
              width={100}
              height={100}
              className='h-auto w-24'
            />
          ))}
        </div>
      </section>
    </article>
  )
}

export default ProductDetails
