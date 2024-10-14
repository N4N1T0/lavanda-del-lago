// Queries Imports
import { salesPolicy } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'
import { PortableText } from 'next-sanity'

// Types Imports
import type { Policies } from '@/types'
import type { Metadata } from 'next'

// metadata for this page
export const metadata: Metadata = {
  title: 'Política de Compras y Ventas',
  description:
    'Política de Compras y Ventas para la tienda en linea de Lavanda del lago.'
}

/**
 * Fetches the sales policy from the Sanity client and renders it.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the sales policy.
 * @throws {Error} If there is an error fetching the policy.
 */
const SalesPolicy = async (): Promise<JSX.Element> => {
  const response: Policies = await sanityClientRead.fetch(
    salesPolicy,
    {},
    {
      next: { revalidate: 3600 }
    }
  )

  // deconstructure of the data
  const { title, content } = response
  return (
    <section
      id={title}
      className='mx-auto flex h-auto max-w-screen-2xl flex-col items-center gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-20'
    >
      <h1 className='text-center text-2xl uppercase text-accent md:text-4xl'>
        {title || 'Política de Cookies'}
      </h1>
      <div className='w-full space-y-7 text-left md:w-3/4'>
        {response === null ? (
          <p>No hay contenido disponible</p>
        ) : (
          <PortableText value={content} />
        )}
      </div>
    </section>
  )
}

export default SalesPolicy
