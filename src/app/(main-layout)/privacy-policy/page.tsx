// Queries Imports
import { privacyPolicy } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'
import { PortableText } from 'next-sanity'

// Types Imports
import type { Policies } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Políticas de privacidad',
	description:
		'Políticas de privacidad de la tienda en linea de Lavanda del lago.',
}

/**
 * Fetches the cookies policy from the Sanity client and renders it.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the cookies policy.
 * @throws {Error} If there is an error fetching the policy.
 */
const PrivacyPoliciesPage = async (): Promise<JSX.Element> => {
	const response: Policies = await sanityClientRead.fetch(privacyPolicy)

	// Deconstructure of the response
	const { title, content } = response

	return (
		<section
			id={title}
			className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 items-center h-auto'
		>
			<h1 className='text-2xl md:text-4xl text-accent text-center uppercase'>
				{title || 'Política de Cookies'}
			</h1>
			<div className='w-full md:w-3/4 text-left space-y-7'>
				{response === null ? (
					<p>No hay contenido disponible</p>
				) : (
					<PortableText value={content} />
				)}
			</div>
		</section>
	)
}

export default PrivacyPoliciesPage
