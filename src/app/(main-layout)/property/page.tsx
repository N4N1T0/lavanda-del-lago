// Types Imports
import type { Property } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { property } from '@/lib/queries'

// Function to genarte Metadata for this page
export async function generateMetadata(): Promise<Metadata> {
	const response: Property = await sanityClientRead.fetch(property)

	return {
		title: response.title,
		description: response.product.descripcion,
	}
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const ProperyPage = async (): Promise<JSX.Element> => {
	const response: Property = await sanityClientRead.fetch(property)

	console.log(response)
	return (
		<section
			id='ProperyPage'
			className='mx-auto max-w-screen-lg px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 text-balance text-center'
		>
			<h1 className='text-xl md:text-5xl text-accent'>{response.title}</h1>
		</section>
	)
}

export default ProperyPage
