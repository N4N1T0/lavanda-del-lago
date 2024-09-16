'use client'

// React Imports
import { useState } from 'react'

// Types Imports
import type { Product, User } from '@/types'

// Project Components Imports
import UserInfoCard from '@/components/profile/info-card'
import ResellerCheckout from '@/components/profile/reseller-checkout'
import ResellerTable from '@/components/profile/reseller-table'

/**
 * A layout component for resellers, displaying user information, a checkout summary, and a table of products.
 *
 * @param {User} user - The user object containing information and discount details.
 * @param {Product[]} products - An array of product objects.
 * @return {JSX.Element} The ResellerLayout component.
 */
const ResellerLayout = ({
	user,
	products,
}: { user: User; products: Product[] }): JSX.Element => {
	// State Variables for Quantities using the product id as the key
	const [quantities, setQuantities] = useState<{ [key: string]: number }>(
		Object.fromEntries(products.map((p) => [p.id, 0])),
	)

	// State Variables for Selected Products
	const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
		new Set(),
	)

	// Helper function to update quantities
	const updateQuantity = (id: string, delta: number) => {
		setQuantities((prev) => ({
			...prev,
			[id]: Math.max(0, prev[id] + delta),
		}))
	}

	// Helper function to toggle product selection
	const toggleProductSelection = (id: string) => {
		setSelectedProducts((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(id)) {
				newSet.delete(id)
			} else {
				newSet.add(id)
			}
			return newSet
		})
	}

	const productsToCheckout = products
		.filter((p) => selectedProducts.has(p.id))
		.map((item) => ({
			...item,
			quantity: quantities[item.id],
		}))

	return (
		<div className='flex flex-col md:flex-row gap-6 relative'>
			<div className='w-full md:w-1/4 space-y-2 md:sticky top-2 h-fit'>
				<UserInfoCard user={user} />
				<ResellerCheckout
					productsToCheckout={productsToCheckout}
					discount={user.discount}
				/>
			</div>
			<div className='w-full md:w-3/4'>
				<ResellerTable
					products={products}
					selectedProducts={selectedProducts}
					toggleProductSelection={toggleProductSelection}
					discount={user.discount}
					quantities={quantities}
					setQuantities={setQuantities}
					updateQuantity={updateQuantity}
				/>
			</div>
		</div>
	)
}

export default ResellerLayout
