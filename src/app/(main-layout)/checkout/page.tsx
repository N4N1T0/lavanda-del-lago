// Project Components Imports
import Address from '@/components/checkout/address'
import LastMinute from '@/components/checkout/last-minute'
import Summary from '@/components/checkout/summary'

// Type Imports
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Checkout',
	description:
		'Esta es la página de checkout para la tienda en linea de Lavanda del lago.',
}

/**
 * Renders the checkout page component.
 *
 * @return {JSX.Element} The rendered checkout page.
 */
const CheckoutPage = (): JSX.Element => {
	return (
		<section
			id='checkout'
			className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 gap-12 grid grid-cols-1 md:grid-cols-2'
		>
			<Summary />
			<div className='col-span-1'>
				<Address />
				<LastMinute />
			</div>
		</section>
	)
}

export default CheckoutPage
