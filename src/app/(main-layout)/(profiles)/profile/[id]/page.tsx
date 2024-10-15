// Project Components Imports
import UserInfoCard from '@/components/profile/info-card'
import NewItems from '@/components/profile/new-items'
import PastPurchasesCard from '@/components/profile/past-purchase'

// Queries Imports
import { userByIdCompleted } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Utils Imports
import { getMostUsedCategory } from '@/lib/utils'

// Types Imports
import type { User } from '@/types'

export const dynamic = 'force-dynamic'

/**
 * Renders the user profile page.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.id - The ID of the user.
 * @return {Promise<JSX.Element>} The JSX element representing the user profile page.
 */
const UserProfilePage = async ({
  params
}: {
  params: { id: string }
}): Promise<JSX.Element> => {
  // Fetch user data
  const response: User = await sanityClientRead.fetch(
    userByIdCompleted,
    {
      id: params.id
    },
    {
      cache: 'no-store'
    }
  )

  // Check if user exists
  if (!response || params.id === 'no_user_id') {
    // Handle error
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <h1 className='text-5xl text-accent'>Usuario no encontrado</h1>
        <p className='text-lg'>
          por favor trate de cerrar session y vuelva a iniciarla
        </p>
      </div>
    )
  }

  // Get most used category for the reselling
  const mostUsedCategory = getMostUsedCategory(response.pastPurchases)

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-6 text-3xl font-bold uppercase text-accent'>
        Perfil de Usuario
      </h1>
      <div className='flex flex-col gap-6 md:flex-row'>
        <div className='w-full space-y-6 md:w-1/4'>
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
