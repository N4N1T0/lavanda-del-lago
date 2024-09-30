'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * Renders an error component for the home products list.
 *
 * @return {JSX.Element} The error component for the home products list.
 */
export const ClientFetchError = React.memo(function ClientFetchError({
  error
}: {
  error: unknown
}) {
  const router = useRouter()
  const handleClick = React.useCallback(() => router.refresh(), [router])

  return (
    <section
      id='home-products-list-error'
      className='flex w-full flex-col items-center justify-center gap-5 bg-red-300 py-24'
    >
      <h3 className='text-center text-3xl'>
        Lo sentimos, <br />
        {error as React.ReactNode}
      </h3>
      <button
        type='button'
        onClick={handleClick}
        className='rounded-md bg-white px-5 py-3 transition-colors duration-150 hover:bg-accent hover:text-white'
      >
        Trate otra vez
      </button>
    </section>
  )
})
