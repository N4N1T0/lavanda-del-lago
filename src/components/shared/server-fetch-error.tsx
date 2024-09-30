// React Imports
import React, { type ReactNode } from 'react'

/**
 * Renders an error component for the home products list.
 *
 * @return {JSX.Element} The error component for the home products list.
 */
export const ServerFetchError = React.memo(({ error }: { error: unknown }) => {
  return (
    <section
      id='home-products-list-error'
      className='flex w-full flex-col items-center justify-center gap-5 bg-red-300 py-24'
    >
      <h3 className='text-center text-3xl'>
        Lo sentimos, <br />
        <span>{error as ReactNode}</span>
      </h3>
    </section>
  )
})
