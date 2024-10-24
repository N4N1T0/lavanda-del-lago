'use client'

// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Assets Imports
import { Image404 } from '@/assets'

// Types Imports
import type { Metadata } from 'next'

// UI Imports
import { buttonVariants } from '@/components/ui/button'

// Metadata for the error page
export const metadata: Metadata = {
  title: 'Error 404',
  description: 'Pagina No Encontrada'
}

export default function NotFound() {
  // initialize router
  const router = useRouter()

  const getLabel = (link: string) => {
    switch (link) {
      case '/productos':
        return <span>Productos</span>
      case '/eventos':
        return <span>Eventos</span>
      default:
        return <span>Blog</span>
    }
  }

  return (
    <section className='bg-white'>
      <div className='container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12'>
        <div className='lg:w-1/2'>
          <p className='text-5xl font-medium uppercase text-accent'>
            Error 404
          </p>
          <h1 className='mt-3 text-xl font-bold text-gray-800 md:text-2xl'>
            Página No Encontrada
          </h1>

          <div className='mt-6 flex items-center gap-x-3'>
            <button
              type='button'
              className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border border-accent bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-accent hover:text-white sm:w-auto'
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
              className='w-1/2 shrink-0 rounded-lg bg-accent px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-accent/70 sm:w-auto'
            >
              Pagina Principal
            </Link>
          </div>

          <p className='mt-5'>Puedes usar estos links alternativos</p>

          <div className='mt-5 space-y-6'>
            {['/productos', '/eventos', '/blog'].map((link) => (
              <div key={link}>
                <Link
                  href={link}
                  className={buttonVariants({ variant: 'default' })}
                >
                  {getLabel(link)}

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='ml-2 h-5 w-5 rtl:rotate-180'
                  >
                    <title>Flecha Derecha</title>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className='relative mt-8 w-full lg:mt-0 lg:w-1/2'>
          <Image
            className='h-80 w-full rounded-lg object-cover md:h-96 lg:h-[32rem]'
            src={Image404}
            width={500}
            height={500}
            alt='Imagen Lavanda 404'
            title='Imagen Lavanda 404'
            priority
            placeholder='blur'
          />
        </div>
      </div>
    </section>
  )
}
