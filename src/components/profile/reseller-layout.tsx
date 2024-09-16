'use client'

import type { Product, User } from '@/types'
import { UserInfoCard } from './info-card'
import ResellerCheckout from './reseller-checkout'
import ResellerTable from './reseller-table'
import { useState } from 'react'

const ResellerLayout = ({
	user,
	products,
}: { user: User; products: Product[] }) => {
	const [quantities, setQuantities] = useState<{ [key: string]: number }>(
		Object.fromEntries(products.map((p) => [p.id, 0])),
	)

	const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
		new Set(),
	)

	const updateQuantity = (id: string, delta: number) => {
		setQuantities((prev) => ({
			...prev,
			[id]: Math.max(0, prev[id] + delta),
		}))
	}

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

	const totalProducts = Array.from(selectedProducts).reduce(
		(sum, id) => sum + quantities[id],
		0,
	)

	const totalPrice = Array.from(selectedProducts).reduce((sum, id) => {
		// Find the product based on the id
		const product = products.find((p) => p.id === id)

		// Ensure the product exists and retrieve its price
		if (!product) return sum

		// Apply discount: use a default of 10% if discount is null or undefined
		const discountValue = user.discount ?? 10
		const discountedPrice =
			product.precio - product.precio * (discountValue / 100)

		// Calculate the total price with the quantity and discounted price
		return sum + (quantities[id] || 0) * discountedPrice
	}, 0)

	return (
		<div className='flex flex-col md:flex-row gap-6 relative'>
			<div className='w-full md:w-1/4 space-y-2 sticky top-2 h-fit'>
				<UserInfoCard user={user} />
				<ResellerCheckout
					totalProducts={totalProducts}
					totalPrice={totalPrice}
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
