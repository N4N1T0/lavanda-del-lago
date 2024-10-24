// Project Components Imports
import LastMinute from '@/components/checkout/last-minute'
import Summary from '@/components/checkout/summary'

// Type Imports
import type { Metadata } from 'next'
import { User } from '@/types'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { shippingAddress, userByIdPartial } from '@sanity-studio/queries'
import { ShippingAddress } from '@/types/sanity'
import { getMostUsedCategory } from '@/lib/utils'

// Metadata for the Page
export const metadata: Metadata = {
  title: 'Checkout Review',
  description:
    'Esta es la página de checkout para la tienda en línea de Lavanda del Lago. Puedes realizar cambios en la información de la compra y compras de última hora'
}

/**
 * Fetches the current user's information and renders the checkout page with the user's address and last-minute purchase options.
 * Also performs a PayPal API call to retrieve an OAuth token.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the checkout page content.
 */
const CheckoutReviewPage = async ({
  searchParams
}: {
  searchParams: { userId: string; shippingAddress: string }
}): Promise<JSX.Element> => {
  const response: User = await sanityClientRead.fetch(
    userByIdPartial,
    {
      id: searchParams.userId
    },
    {
      cache: 'no-store'
    }
  )

  const shippingAddressResponse: ShippingAddress = await sanityClientRead.fetch(
    shippingAddress,
    {
      id: searchParams.shippingAddress
    },
    {
      cache: 'no-store'
    }
  )

  // Get most used category for the reselling
  const mostUsedCategory =
    response.pastPurchases === null
      ? 'Bienestar'
      : getMostUsedCategory(response.pastPurchases)

  return (
    <section
      id='checkout info'
      className='relative mx-auto grid max-w-screen-lg grid-cols-1 gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20'
    >
      <div>
        <Summary user={response} shippingAddressId={shippingAddressResponse} />
      </div>
      <article className='sticky top-0 h-fit'>
        <LastMinute category={mostUsedCategory} />
      </article>
    </section>
  )
}

export default CheckoutReviewPage
