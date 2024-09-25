// Project Components Imports
import UserInfoCard from '@/components/profile/info-card'
import NewItems from '@/components/profile/new-items'
import PastPurchasesCard from '@/components/profile/past-purchase'

// Queries Imports
import { userById } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Utils Imports
import { getMostUsedCategory } from '@/lib/utils'

// Types Imports
import type { User } from '@/types'

/**
 * Renders the user profile page.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.id - The ID of the user.
 * @return {Promise<JSX.Element>} The JSX element representing the user profile page.
 */
const UserProfilePage = async ({
	params,
}: { params: { id: string } }): Promise<JSX.Element> => {
	// Fetch user data
	const response: User = await sanityClientRead.fetch(userById, {
		id: params.id,
	})

	// Check if user exists
	if (!response) {
		// Handle error
		return <h1 className='text-3xl text-accent'>User not found</h1>
	}

	// Get most used category for the reselling
	const mostUsedCategory = getMostUsedCategory(response.pastPurchases)

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 uppercase text-accent'>
				Perfil de Usario
			</h1>
			<div className='flex flex-col md:flex-row gap-6'>
				<div className='w-full md:w-1/4 space-y-6'>
					<UserInfoCard user={response} />
					<NewItems category={mostUsedCategory || 'Hogar y ambiente'} />
				</div>
				<div className='w-full md:w-3/4'>
					<PastPurchasesCard purchases={response.pastPurchases} />
				</div>
			</div>
		</div>
	)
}

export default UserProfilePage
