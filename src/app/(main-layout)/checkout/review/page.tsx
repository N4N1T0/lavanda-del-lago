// Project Components Imports
import LastMinute from '@/components/checkout/last-minute'
import Summary from '@/components/checkout/summary'

// Type Imports
import type { Metadata } from 'next'
import { User } from '@/types'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { userByIdPartial } from '@sanity-studio/queries'

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
const CheckoutReviewPage = async ({
  searchParams
}: {
  searchParams: { userId: string }
}): Promise<JSX.Element> => {
  const response: User = await sanityClientRead.fetch(userByIdPartial, {
    id: searchParams.userId
  })

  return (
    <section
      id='checkout info'
      className='relative mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20'
    >
      <div>
        <Summary user={response} />
      </div>
      <article className='sticky top-0 h-fit'>
        <LastMinute category='Higiene personal' />
      </article>
    </section>
  )
}

export default CheckoutReviewPage
