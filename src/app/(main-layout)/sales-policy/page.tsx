// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { policiesPages } from '@/lib/queries'

// Components Imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'
import { PortableText } from 'next-sanity'

// Types Imports
import type { Policies } from '@/types'
import type { Metadata } from 'next'

// metadata for this page
export const metadata: Metadata = {
	title: 'Política de Compras y Ventas',
	description:
		'Política de Compras y Ventas para la tienda en linea de Lavanda del lago.',
}

/**
 * Fetches the sales policy from the Sanity client and renders it.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the sales policy.
 * @throws {Error} If there is an error fetching the policy.
 */
const SalesPolicy = async (): Promise<JSX.Element> => {
	try {
		const response: Policies = await sanityClientRead.fetch(
			policiesPages('sales'),
		)

		// deconstructure of the data
		const { title, content } = response
		return (
			<main>
				<h1>{title || 'Política de Compras y Ventas'}</h1>
				<div className='w-full md:w-3/4 text-left space-y-7'>
					{response === null ? (
						<p>No hay contenido disponible</p>
					) : (
						<PortableText value={content} />
					)}
				</div>
			</main>
		)
	} catch (error) {
		return <ServerFetchError error={error} />
	}
}

export default SalesPolicy
