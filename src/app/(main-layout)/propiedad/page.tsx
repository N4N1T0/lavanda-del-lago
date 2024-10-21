// Next.js Imports
import Image from 'next/image'

import Link from 'next/link'
// Types Imports
import type { Property } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { property } from '@sanity-studio/queries'
import { PortableText } from 'next-sanity'

// Data Imports
import { badges } from '@/constants/site-data'

// UI Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'

// Utils Imports
import { urlize } from '@/lib/utils'

// Function to genarte Metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const response: Property = await sanityClientRead.fetch(
    property,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  return {
    title: response.title,
    description: response.product.descripcion
  }
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the property page.
 */
const ProperyPage = async (): Promise<JSX.Element> => {
  const response: Property = await sanityClientRead.fetch(
    property,
    {},
    { next: { revalidate: 60 } }
  )

  const { title, product, featuredImage, content } = response

  return (
    <section
      id='ProperyPage'
      className='mx-auto flex max-w-screen-lg flex-col items-center gap-12 text-balance px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20'
    >
      <h1 className='text-xl text-accent md:text-5xl'>{title}</h1>
      <div className='grid w-full md:grid-cols-3'>
        <div className='col-span-2 flex flex-col justify-center gap-5'>
          <p className='text-xl leading-relaxed tracking-wide'>
            {product.descripcion}
          </p>
          <div className='flex w-full flex-wrap items-center justify-center gap-5'>
            {badges.map((badge) => (
              <Avatar key={badge.alt} className='mb-4 h-16 w-16 border-2'>
                <AvatarImage
                  src={badge.src.src}
                  alt={badge.alt}
                  title={badge.title}
                />
                <AvatarFallback>
                  {badge.title
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <br />
        </div>
        <Image
          src={product.image}
          alt={title}
          title={title}
          width={500}
          height={500}
          className='col-span-1'
          priority
        />
      </div>
      <Image
        src={featuredImage.url}
        alt={title}
        title={title}
        width={1024}
        height={1080}
        placeholder='blur'
        blurDataURL={featuredImage.blur}
      />
      <div className='[&>p:first-child]:mt-0 [&>p]:mt-5 [&>p]:text-lg'>
        <PortableText value={content} />
      </div>
      <Link
        href={
          product.nombre && product.categoria
            ? `/productos/${urlize(product.nombre)}?category=${
                product.categoria
              }`
            : '/productos'
        }
        className={`${buttonVariants({ variant: 'cart' })} w-fit uppercase`}
      >
        Comprar Ahora
      </Link>
    </section>
  )
}

export default ProperyPage
