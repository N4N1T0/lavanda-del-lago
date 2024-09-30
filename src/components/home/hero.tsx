// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Assets Imports
import { Condimento1, Hero1, Sapone } from '@/assets'

// Types Imports
import type { BentoThreeImage, BentofeaturedCategory, Product } from '@/types'

// Queries Imports
import { productsByCategory } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

export const Hero = async (
  {
    bentoThreeImages,
    bentoFeaturedProducto,
    bentofeaturedCategory
  }: {
    bentoThreeImages: BentoThreeImage[]
    bentoFeaturedProducto: Product
    bentofeaturedCategory: BentofeaturedCategory
  }
) => {
  const response: Product[] = await sanityClientRead.fetch(productsByCategory, {
    category: bentofeaturedCategory.title
  })
  const featuredProducts = response.slice(0, 2).map((product) => {
    return {
      name: product.nombre,
      id: product.id,
      image: product.image,
      categoria: product.categoria
    }
  })

  return (
    <section id='hero' className='bg-white pt-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3'>
        {bentoThreeImages.map(({ image }, index) => (
          <div
            key={uuidv4()}
            className={`col-span-1 ${index > 0 ? 'hidden md:block' : ''}`}
          >
            <Image
              src={image || Hero1}
              alt='Lavanda Del Lago'
              className='aspect-square h-auto w-full object-cover'
              width={500}
              height={500}
              priority
            />
          </div>
        ))}
      </div>
      <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
        <div className='col-span-1'>
          <div className='flex flex-col items-center justify-center gap-4 p-10 text-center'>
            <h2 className='text-wrap text-3xl uppercase md:text-5xl'>
              {bentofeaturedCategory.title}
            </h2>
            <p className='w-[80%] text-gray-600 md:w-[50%]'>
              {bentofeaturedCategory.description}
            </p>
          </div>
          <div className='grid grid-cols-2'>
            {featuredProducts.map((product, index) => (
              <div
                className={`group col-span-1 flex items-center justify-center overflow-hidden p-10 ${
                  index > 0 ? 'bg-secondary' : 'bg-gray-200'
                }`}
                key={product.id}
              >
                <Link
                  href={`/products/${product.id}?category=${product.categoria}`}
                  prefetch
                >
                  <Image
                    src={product.image || Condimento1}
                    alt={product.name}
                    width={200}
                    height={200}
                    priority
                    className='h-auto w-auto transition-transform duration-200 group-hover:scale-110'
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-1 hidden grid-cols-2 overflow-hidden bg-accent text-white md:grid'>
          <div className='col-span-1 flex flex-col items-start justify-center gap-5 p-10'>
            <h2 className='text-5xl uppercase'>
              {bentoFeaturedProducto.nombre}
            </h2>
            <p className='text-gray-100'>
              {`${bentoFeaturedProducto.descripcion
                .split(' ')
                .slice(0, 10)
                .join(' ')}...`}
            </p>
            <Button>Comprar</Button>
          </div>
          <div className='relative col-span-1'>
            <Image
              src={bentoFeaturedProducto.image || Sapone}
              alt={bentoFeaturedProducto.nombre}
              height={1500}
              width={1500}
              priority
              className='absolute inset-0 h-auto w-full translate-y-1/4 object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
