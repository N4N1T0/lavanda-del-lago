// Next.js Imports
import Image from 'next/image'

// Types Imports
import type { Remedies } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { remedies } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Metadata for this page
export const metadata: Metadata = {
  title: 'Nuestos Remedios',
  description:
    'La Lavanda es conocida desde la antigüedad por sus propiedades; es un antiséptico, cicatrizante y bactericida natural.'
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const RemediesPage = async (): Promise<JSX.Element> => {
  const response: Remedies = await sanityClientRead.fetch(
    remedies,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  const { firstDescription, dualImage, secodDescription, benefits, title } =
    response

  return (
    <section
      id='RemediesPage'
      className='mx-auto flex max-w-screen-lg flex-col items-center gap-12 text-balance px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20'
    >
      <h1 className='text-xl text-accent md:text-5xl'>{title}</h1>
      <p>{firstDescription}</p>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {dualImage.map((image) => (
          <Image
            src={image.url}
            alt={title}
            title={title}
            key={image.url}
            width={500}
            height={500}
            priority
            placeholder='blur'
            blurDataURL={image.blur}
            className='col-span-1 aspect-square rounded-sm'
          />
        ))}
      </div>
      <p>{secodDescription}</p>
      <ul className='flex w-full flex-col justify-center gap-10 md:w-[80%]'>
        {benefits.map((benefit) => (
          <li
            key={benefit.description.split(' ').slice(0, 3).join(' ')}
            className='flex items-center justify-center gap-5'
          >
            <Image
              src={benefit.image}
              alt={benefit.description}
              title={benefit.description}
              width={100}
              height={100}
              className='aspect-square h-20 w-20'
            />
            <h2 className='text-left text-lg'>{benefit.description}</h2>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RemediesPage
