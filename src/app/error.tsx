'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Assets Imports
import { Image500 } from '@/assets'
import { v4 as uuidv4 } from 'uuid'

// Types Imports
import type { ErrorPage as ErrorPageSanity } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { errorPage } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Data Imports
import { contactLinks } from '@/constants/site-data'

// Axiom Imports
import { useLogger } from 'next-axiom'

// Metadata for the error page
export const metadata: Metadata = {
  title: 'Error 500',
  description: 'Error Interno'
}

const ErrorPage = ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  // Router initialization
  const router = useRouter()

  // Axiom Init
  const log = useLogger()

  // State for the Page info from Sanity
  const [pageInfo, setPageInfo] = useState<ErrorPageSanity | null>(null)

  // Fetch Page info from Sanity
  useEffect(() => {
    const getPageInfo = async () => {
      try {
        const response = await sanityClientRead.fetch(
          errorPage,
          {},
          {
            next: {
              revalidate: 86400
            }
          }
        )

        setPageInfo(response)
      } catch (err) {
        log.debug('Error fetching page info in errorPage', { data: err })
      }
    }

    getPageInfo()
  }, [log])

  return (
    <section className='min-h-screen bg-white'>
      <div className='container mx-auto px-6 py-12 lg:flex lg:flex-row-reverse lg:items-center lg:gap-12'>
        <div className='w-full lg:w-1/2'>
          <p className='text-5xl font-medium uppercase text-secondary'>
            Error 500
          </p>
          <h1 className='mt-3 text-xl font-bold text-gray-800 md:text-2xl'>
            Error Interno
          </h1>
          <small>{error.message}</small>
          <h2 className='mt-3'>{pageInfo?.digest}</h2>
          <ul className='mt-3 space-y-1'>
            {pageInfo === null
              ? contactLinks.map((link) => (
                  <li key={uuidv4()}>
                    <Link
                      href={link.link}
                      target='_blank'
                      rel='noreferrer'
                      className='text-secondary underline'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              : pageInfo?.contacts.map((link) => (
                  <li key={uuidv4()}>
                    <Link
                      href={link.link}
                      target='_blank'
                      rel='noreferrer'
                      className='text-secondary underline'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
          </ul>

          <div className='mt-6 flex items-center gap-x-3'>
            <button
              type='button'
              className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border border-secondary bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-secondary hover:text-white sm:w-auto'
              onClick={() => router.back()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 rtl:rotate-180'
              >
                <title>Volver</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Volver</span>
            </button>

            <Link
              href='/'
              className='w-1/2 shrink-0 rounded-lg bg-secondary px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-secondary/70 sm:w-auto'
            >
              Pagina Principal
            </Link>

            <button
              type='button'
              className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border border-secondary bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-secondary hover:text-white sm:w-auto'
              onClick={() => reset()}
            >
              <span>Reintentar</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5 rotate-180'
              >
                <title>Reintentar</title>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='relative mt-8 w-full lg:mt-0 lg:w-1/2'>
          <Image
            className='h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem]'
            src={pageInfo?.imageUrl.url || Image500}
            priority
            width={500}
            height={500}
            alt='Imagen Lavanda 404'
            title='Imagen Lavanda 404'
            placeholder='blur'
            blurDataURL={pageInfo?.imageUrl.blur}
          />
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
