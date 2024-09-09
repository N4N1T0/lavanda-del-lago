// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { privacyPolicy } from '@/lib/queries'

// Components Imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'
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
	try {
		const response: Policies = await sanityClientRead.fetch(privacyPolicy)

		// Deconstructure of the response
		const { title, content } = response

		return (
			<main>
				<h1>{title}</h1>
				<div className='w-full md:w-3/4 text-left space-y-7'>
					<PortableText value={content} />
				</div>
			</main>
		)
	} catch (error) {
		return <ServerFetchError error={error} />
	}
}

export default PrivacyPoliciesPage
