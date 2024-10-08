// Project Components Imports
import LastMinute from '@/components/checkout/last-minute'

// Auth Imports
import { currentUser } from '@clerk/nextjs/server'

// Queries Imports
import { userByIdPartial } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Type Imports
import type { Metadata } from 'next'
import type { User } from '@/types'
import { UserProfileForm } from '@/components/profile/user-info-from'

// Metadata for the Page
export const metadata: Metadata = {
  title: 'Checkout Info',
  description:
    'Esta es la página de checkout para la tienda en linea de Lavanda del lago. Puedes realizar cambios en la informacion del usuario y compras de ultima hora'
}

/**
 * Fetches the current user's information and renders the checkout page with the user's address and last-minute purchase options.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the checkout page content.
 */
const CheckoutInfoPage = async (): Promise<JSX.Element> => {
  const user = await currentUser()
  let response: User | null = null

  if (user !== null) {
    response = await sanityClientRead.fetch(userByIdPartial, {
      id: user.id
    })
  }

  return (
    <section
      id='checkout info'
      className='relative mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20'
    >
      <UserProfileForm user={response} />
      <article className='sticky top-0 h-fit'>
        <LastMinute category='Bienestar' />
      </article>
    </section>
  )
}

export default CheckoutInfoPage
