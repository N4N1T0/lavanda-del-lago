// React Imports
import React from 'react'

/**
 * Renders an error component for the home products list.
 *
 * @return {JSX.Element} The error component for the home products list.
 */
export const ServerFetchError = React.memo(() => {
	return (
		<section
			id='home-products-list-error'
			className='w-full py-24 bg-red-300 flex flex-col justify-center items-center gap-5'
		>
			<h3 className='text-3xl text-center'>
				Lo sentimos, <br />
				Hubo un error cargando los Elementos
			</h3>
		</section>
	)
})
