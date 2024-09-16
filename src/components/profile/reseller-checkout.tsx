'use client'

// UI Components Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Assets Imports
import { ShoppingCart } from 'lucide-react'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'
import { useRouter } from 'next/navigation'

// Type Imports
import type { CartItem } from '@/types'

/**
 * Renders a checkout component for a reseller with the total number of products and the total price.
 *
 * @param {Object} props - An object containing the total number of products and the total price.
 * @param {number} props.totalProducts - The total number of products in the order.
 * @param {number} props.totalPrice - The total price of the order.
 * @return {JSX.Element} A Card component with the order summary and a checkout button.
 */
const ResellerCheckout = ({
	productsToCheckout,
	discount,
}: {
	productsToCheckout: CartItem[]
	discount: number
}): JSX.Element => {
	// Router Initialization
	const router = useRouter()

	// Get the cart items and a function to update the cart items from the shopping cart store
	const [count, setCount] = useShoppingCart()

	// Function to add to the Cart and redirect to the checkout page
	const addToCart = () => {
		setCount([...count, ...productsToCheckout])
		router.push('/checkout')
	}

	// Calculate the total number of selected products
	const totalProducts = productsToCheckout.reduce(
		(sum, item) => sum + item.quantity,
		0,
	)

	// Calculate the total price
	const totalPrice = productsToCheckout.reduce((sum, item) => {
		// Apply discount: use a default of 10% if discount is null or undefined
		const discountValue = discount ?? 10
		const discountedPrice = item.precio - item.precio * (discountValue / 100)

		// Calculate the total price with the quantity and discounted price
		return sum + (item.quantity || 0) * discountedPrice
	}, 0)

	return (
		<Card className='border-accent/70 border'>
			<CardHeader>
				<CardTitle>Order Summary</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div>
					<p>Total Products: {totalProducts}</p>
					<p>Total Price: ${totalPrice.toFixed(2)}</p>
				</div>
				<Button className='w-full mt-4' variant='cart' onClick={addToCart}>
					<ShoppingCart className='mr-2 h-4 w-4' />
					Checkout
				</Button>
			</CardContent>
		</Card>
	)
}

export default ResellerCheckout
