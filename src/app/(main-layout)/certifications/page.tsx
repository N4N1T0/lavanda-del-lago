// Types Imports
import type { Certifications } from '@/types'
import type { Metadata } from 'next'

// Query Imports
import { certifications } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'
import { PortableText } from 'next-sanity'

// Metadata for this page
export const metadata: Metadata = {
  title: 'Certificaciones',
  description:
    'Las Certificaciones obtenidas por nuestra marca a lo largo de una exitosa carrera'
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const CertificationsPage = async (): Promise<JSX.Element> => {
  const response: Certifications = await sanityClientRead.fetch(
    certifications,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  return (
    <section
      id='CertificationsPage'
      className='mx-auto flex max-w-screen-lg flex-col items-center gap-12 text-balance px-4 py-12 sm:px-6 lg:px-8 lg:py-20'
    >
      <h1 className='text-xl text-accent md:text-5xl'>{response.title}</h1>
      <section id='certifications index' className='w-full'>
        <h2 className='text-2xl'>Indice de Certificaciones</h2>
        <ol className='mt-5 w-full'>
          {response.certificationsBlocks.map((certification, index) => (
            <li key={certification.title}>
              <a
                href={`#${certification.title}`}
                className='mt-1 text-lg text-accent transition-colors duration-150 ease-out hover:text-black'
              >
                {index + 1}. {certification.title}
              </a>
            </li>
          ))}
        </ol>
      </section>
      {response.certificationsBlocks.map((certification) => (
        <section
          id={certification.title}
          key={certification.title}
          className='mt-5 w-full'
        >
          <h2 className='text-2xl text-accent'>{certification.title}</h2>
          <div className='[&>p:first-child]:mt-0 [&>p]:mt-5 [&>p]:text-lg'>
            <PortableText value={certification.description} />
          </div>
        </section>
      ))}
    </section>
  )
}

export default CertificationsPage
