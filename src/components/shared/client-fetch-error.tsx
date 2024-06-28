'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * Renders an error component for the home products list.
 *
 * @return {JSX.Element} The error component for the home products list.
 */
export const ClientFetchError = React.memo(({ error }: { error: unknown }) => {
	const router = useRouter()
	const handleClick = React.useCallback(() => router.refresh(), [router])

	return (
		<section
			id='home-products-list-error'
			className='w-full py-24 bg-red-300 flex flex-col justify-center items-center gap-5'
		>
			<h3 className='text-3xl text-center'>
				Lo sentimos, <br />
				{error as React.ReactNode}
			</h3>
			<button
				type='button'
				onClick={handleClick}
				className='bg-white px-5 py-3 rounded-md hover:bg-accent hover:text-white transition-colors duration-150'
			>
				Trate otra vez
			</button>
		</section>
	)
})
