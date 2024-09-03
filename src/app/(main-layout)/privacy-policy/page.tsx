// React Imports
import React from 'react'

// Queries Imports
import { sanityClient } from '@sanity-studio/lib/client'
import { privacyPolicy } from '@/lib/queries'

// Components Imports
import { ServerFetchError } from '@/components/shared/server-fetch-error'
import { PortableText } from 'next-sanity'

// Types Imports
import type { Policies } from '@/types'

/**
 * Fetches the cookies policy from the Sanity client and renders it.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the cookies policy.
 * @throws {Error} If there is an error fetching the policy.
 */
const PrivacyPoliciesPage = async (): Promise<JSX.Element> => {
	try {
		const response: Policies = await sanityClient.fetch(privacyPolicy)
		return (
			<main>
				<h1>{response.title}</h1>
				<div className='w-full md:w-3/4 text-left space-y-7'>
					<PortableText value={response.content} />
				</div>
			</main>
		)
	} catch (error) {
		return <ServerFetchError error={error} />
	}
}

export default PrivacyPoliciesPage
