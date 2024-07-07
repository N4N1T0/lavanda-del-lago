'use client'

// UI Imports
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Type imports
import type { CartItem, Product } from '@/types'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Store Imports
import { useState } from 'react'

/**
 * Renders a quantity input field with increment and decrement buttons, and a button to add the selected quantity to the cart.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.prduct - The product to be added to the cart.
 * @return {JSX.Element} The rendered quantity component.
 */
const Quantity = ({ prduct }: { prduct: Product }): JSX.Element => {
	// State to hold the selected quantity
	const [quantity, setQuantity] = useState(1)
	// Get the cart items and a function to update the cart items from the shopping cart store
	const [count, setCount] = useShoppingCart()
	// initialize toast
	const { toast } = useToast()

	// Function to increment the quantity state
	const increment = () => {
		setQuantity(quantity + 1)
	}

	// Function to decrement the quantity state
	const decrement = () => {
		if (quantity <= 1) return
		setQuantity(quantity - 1)
	}

	// Create a new cart item object with the selected quantity and the product details
	const cartItem: CartItem = {
		quantity: quantity,
		...prduct,
	}

	// Function to add to the Cart and show a toast with a meesage of completed
	const addToCart = () => {
		setCount([...count, cartItem])
		// ???????? Why dosnt this work???
		toast({
			title: 'Se agrego correctamente al carrito',
			description:
				'Puedes Seguir comprando o ir al checkout desde el carrito de compras',
		})
	}

	return (
		<div className='w-full flex justify-between items-center px-10 border-t border-b border-accent/50 py-5'>
			<p className='font-bold text-lg'>Cantidad</p>
			<label htmlFor='Quantity' className='sr-only'>
				{' '}
				Quantity{' '}
			</label>

			{/* Quantity input field with increment and decrement buttons */}
			<div className='flex items-center rounded border border-accent/70 w-fit'>
				<button
					type='button'
					aria-label='Disminuir cantidad'
					className='size-10 leading-10 text-gray-600 transition hover:opacity-75'
					onClick={decrement}
				>
					&minus;
				</button>

				<input
					type='number'
					id='Quantity'
					value={quantity}
					className='h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
				/>

				<button
					type='button'
					aria-label='Incrementar cantidad'
					className='size-10 leading-10 text-gray-600 transition hover:opacity-75'
					onClick={increment}
				>
					&#43;
				</button>
			</div>

			{/* Button to add the selected quantity of the product to the cart */}
			<Button variant='cart' onClick={() => addToCart()}>
				Añadir al carrito
			</Button>
		</div>
	)
}

const QuantitySmall = ({
	prduct,
	removeFromWishlist,
}: {
	prduct: Product
	removeFromWishlist: (id: number) => void
}): JSX.Element => {
	// State to hold the selected quantity
	const [quantity, setQuantity] = useState(1)
	// Get the cart items and a function to update the cart items from the shopping cart store
	const [count, setCount] = useShoppingCart()
	// initialize toast
	const { toast } = useToast()

	// Function to increment the quantity state
	const increment = () => {
		setQuantity(quantity + 1)
	}

	// Function to decrement the quantity state
	const decrement = () => {
		if (quantity <= 1) return
		setQuantity(quantity - 1)
	}

	// Create a new cart item object with the selected quantity and the product details
	const cartItem: CartItem = {
		quantity: quantity,
		...prduct,
	}

	const handleAddToCartFromWishlist = () => {
		setCount([...count, cartItem])
		removeFromWishlist(prduct.id)
		toast({
			title: 'Se agrego correctamente al carrito',
			description:
				'Se elimino del la lsita de Favoritos y se agrego al carrito de compras',
		})
	}

	return (
		<div className='w-fit flex justify-between items-center gap-3 px-3'>
			<label htmlFor='Quantity' className='sr-only'>
				{' '}
				Quantity{' '}
			</label>

			{/* Quantity input field with increment and decrement buttons */}
			<div className='flex items-center rounded border border-white w-fit'>
				<button
					type='button'
					aria-label='Disminuir cantidad'
					className='size-10 text-gray-100 transition hover:opacity-75'
					onClick={decrement}
				>
					&minus;
				</button>

				<input
					type='number'
					id='Quantity'
					value={quantity}
					className='h-5 w-10 rounded-md border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
				/>

				<button
					type='button'
					aria-label='Incrementar cantidad'
					className='size-10 text-gray-100 transition hover:opacity-75'
					onClick={increment}
				>
					&#43;
				</button>
			</div>

			{/* Button to add the selected quantity of the product to the cart */}
			<Button
				onClick={() => handleAddToCartFromWishlist()}
				className='text-sm px-3 py-0 hover:bg-transparent hover:text-white border border-white'
			>
				Añadir al carrito
			</Button>
		</div>
	)
}

export { Quantity, QuantitySmall }
