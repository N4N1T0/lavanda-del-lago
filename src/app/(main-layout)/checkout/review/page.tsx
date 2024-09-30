// Project Components Imports
import Address from '@/components/checkout/address'
import LastMinute from '@/components/checkout/last-minute'

// Auth Imports
import { currentUser } from '@clerk/nextjs/server'

// Queries Imports
import { userById } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Type Imports
import type { Metadata } from 'next'
import type { User } from '@/types'

// Metadata for the Page
export const metadata: Metadata = {
  title: 'Checkout Review',
  description:
    'Esta es la página de checkout para la tienda en linea de Lavanda del lago. Puedes realizar cambios en la informacion de la compra y compras de ultima hora'
}

/**
 * Fetches the current user's information and renders the checkout page with the user's address and last-minute purchase options.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the checkout page content.
 */
const CheckoutReviewPage = async (): Promise<JSX.Element> => {
  const user = await currentUser()
  let response: User | null = null

  if (user !== null) {
    response = await sanityClientRead.fetch(userById, {
      id: user.id
    })
  }

  return (
    <section
      id='checkout info'
      className='mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20'
    >
      <Address user={response} />
      <LastMinute />
    </section>
  )
}

export default CheckoutReviewPage
