import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Project components imports
import NoData from '@/components/shared/no-data'

// UI Imports
import { buttonVariants } from '@/components/ui/button'

// External Libraries Imports
import { urlize } from '@/lib/utils'

// Assets Imports
import { Condimento1, Hero1, Sapone } from '@/assets'

// Types Imports
import type { BentoThreeImage, BentofeaturedCategory, Product } from '@/types'

// Queries Imports
import { productsByCategory } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

export const Hero = async ({
  bentoThreeImages,
  bentoFeaturedProducto,
  bentofeaturedCategory
}: {
  bentoThreeImages: BentoThreeImage[]
  bentoFeaturedProducto: Product
  bentofeaturedCategory: BentofeaturedCategory
}) => {
  // Fetch featured products by category
  const featuredProducts = await fetchFeaturedProducts(
    bentofeaturedCategory.title
  )

  return (
    <section id='hero' className='bg-white pt-4'>
      {/* Bento Images Section */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
        {bentoThreeImages.map(({ image, id, link }, index) => (
          <BentoImage key={id} image={image} index={index} link={link} />
        ))}
      </div>

      {/* Featured Products and Category Section */}
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        {/* Featured Category */}
        <FeaturedCategory
          title={bentofeaturedCategory.title}
          description={bentofeaturedCategory.description}
          featuredProducts={featuredProducts}
        />

        {/* Featured Product */}
        <FeaturedProduct product={bentoFeaturedProducto} />
      </div>
    </section>
  )
}

const fetchFeaturedProducts = async (category: string) => {
  const response: Product[] = await sanityClientRead.fetch(
    productsByCategory,
    { category },
    { next: { revalidate: 60 } }
  )
  return response.slice(0, 2)
}

const FeaturedCategory = ({
  title,
  description,
  featuredProducts
}: {
  title: string
  description: string
  featuredProducts: Product[]
}) => (
  <div className='col-span-1'>
    <div className='flex flex-col items-center justify-center gap-4 p-10 text-center'>
      <h2 className='text-wrap text-3xl uppercase md:text-5xl'>{title}</h2>
      <p className='w-[80%] text-gray-600 md:w-[50%]'>{description}</p>
    </div>
    <div className='grid grid-cols-2'>
      {featuredProducts.length > 0 ? (
        featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))
      ) : (
        <NoData data='No hay Productos' />
      )}
    </div>
  </div>
)

const FeaturedProduct = ({ product }: { product: Product }) => (
  <div className='col-span-1 hidden grid-cols-2 overflow-hidden bg-accent text-white md:grid'>
    <div className='col-span-1 flex flex-col items-start justify-center gap-5 p-10'>
      <h2 className='text-5xl uppercase'>{product.nombre}</h2>
      <p className='text-gray-100'>
        {`${product.descripcion.split(' ').slice(0, 10).join(' ')}...`}
      </p>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={`/products/${urlize(product.nombre)}?category=${product.categoria}`}
      >
        Comprar
      </Link>
    </div>
    <div className='relative col-span-1'>
      <Image
        src={product.image || Sapone}
        alt={product.nombre}
        height={1500}
        width={1500}
        priority
        className='absolute inset-0 h-auto w-full translate-y-1/4 object-cover'
      />
    </div>
  </div>
)

const ProductCard = ({
  product,
  index
}: {
  product: Product
  index: number
}) => (
  <div
    className={`group col-span-1 flex items-center justify-center overflow-hidden p-10 ${
      index > 0 ? 'bg-secondary' : 'bg-gray-200'
    }`}
  >
    <Link
      href={`/products/${urlize(product.nombre)}?category=${product.categoria}`}
    >
      <Image
        src={product.image || Condimento1}
        alt={product.nombre}
        width={200}
        height={200}
        priority
        className='h-auto w-auto transition-transform duration-200 group-hover:scale-110'
      />
    </Link>
  </div>
)

const BentoImage = ({
  image,
  index,
  link
}: {
  image: BentoThreeImage['image']
  index: number
  link: string
}) => {
  const isVideo = image.originalFilename.endsWith('.mp4')

  return (
    <LinkOrDiv index={index} link={link}>
      {isVideo ? (
        <div className='relative aspect-square w-full overflow-hidden'>
          <video
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-150 ease-out group-hover:scale-105'
            muted
            autoPlay
            preload='auto'
            loop
          >
            <source src={image.url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <Image
          src={image.url || Hero1}
          alt='Lavanda Del Lago'
          className='aspect-square w-full transition-transform duration-150 ease-out group-hover:scale-105'
          width={500}
          height={500}
          priority
        />
      )}
    </LinkOrDiv>
  )
}

const LinkOrDiv = ({
  index,
  link,
  children
}: {
  index: number
  link: string
  children: React.ReactNode
}) => {
  const isLink = !!link

  return isLink ? (
    <Link
      className={`col-span-1 ${index > 0 ? 'hidden md:block' : ''} group overflow-hidden`}
      href={link}
    >
      {children}
    </Link>
  ) : (
    <div className={`col-span-1 ${index > 0 ? 'hidden md:block' : ''}`}>
      {children}
    </div>
  )
}

export default Hero
