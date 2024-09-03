'use client'

// Assets Imports
import { Cart } from '@/assets'

// UI Imports
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from '@/components/ui/sheet'

// Utils Imports
import { calculateTotal, eurilize } from '@/lib/utils'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Types Imports
import type { CartItem } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

/**
 * Renders a sheet component with a trigger and content. The trigger is a child component passed as a prop.
 * The content includes a header with a title and description.
 *
 * @return {JSX.Element} The rendered sheet component.
 */
const CartSheet = (): JSX.Element => {
	// Get the shopping cart items and a function to update the cart items
	const [count, setCount] = useShoppingCart()

	// Function to remove an item from the shopping cart
	const removeFromCart = (id: string) => {
		// Filter out the item with the given id
		setCount(count.filter((item) => item.id !== id))
	}

	// Calculate the total price of the items in the shopping cart
	const [subTotal] = calculateTotal(count)

	// Render the shopping cart sheet component
	return (
		<Sheet>
			{/* Trigger for the shopping cart sheet */}
			<SheetTrigger asChild>
				<div className='relative w-fit h-auto'>
					{/* Show a badge with the number of items in the cart */}
					{count.length > 0 && (
						<span className='absolute -top-2 -right-2 bg-accent text-white rounded-full w-6 h-6 flex justify-center items-center text-xs'>
							{count.length}
						</span>
					)}
					<Image
						className=' w-8 h-8 hover:opacity-50 duration-150 transition-opacity cursor-pointer'
						alt='Icon cart'
						src={Cart}
					/>
				</div>
			</SheetTrigger>
			<SheetContent className='flex flex-col justify-between items-start'>
				<SheetHeader>
					<SheetTitle className='text-2xl'>Carrito de la Compra</SheetTitle>
				</SheetHeader>
				<ul className='w-full h-full space-y-2'>
					{/* Render each item in the shopping cart */}
					{count.map((item) => (
						<CartSheetCard
							product={item}
							key={item.id}
							removeFromCart={removeFromCart}
						/>
					))}
				</ul>
				{/* Show the Fotter in case theres items in the cart instead show a link to the products page */}
				{count.length > 0 ? (
					<SheetFooter className='w-full'>
						<div className='border-t border-gray-200 px-4 py-6 sm:px-6 w-full'>
							<div className='flex justify-between text-base font-medium text-gray-900'>
								<p>Subtotal</p>
								<p>{subTotal}</p>
							</div>
							<p className='mt-1 text-sm text-gray-500'>
								Gastos de envío e impuestos calculados en el checkout.
							</p>
							<div className='mt-6'>
								<SheetClose asChild>
									<Link
										href='/checkout'
										className='flex items-center justify-center rounded-md border border-accent bg-accent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-accent/30 hover:text-accent transition-colors duration-200'
									>
										Checkout
									</Link>
								</SheetClose>
							</div>
							<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
								<p>
									o{' '}
									<SheetClose asChild>
										<Link
											href='/products'
											className='font-medium text-accent hover:text-accent/80 transition-colors duration-200'
										>
											Continua Comprando
											<span aria-hidden='true'> &rarr;</span>
										</Link>
									</SheetClose>
								</p>
							</div>
						</div>
					</SheetFooter>
				) : (
					<SheetFooter className='w-full border-t border-accent/70 pt-5'>
						<div className='w-full flex flex-col items-center gap-5'>
							<p>No hay elementos en el carrito de la compra</p>
							<p className='text-sm text-gray-500'>Puedes empezar por:</p>
							<div className='w-full flex justify-between items-center'>
								<SheetClose asChild>
									<Link
										href='/products'
										className='font-medium text-accent hover:text-accent/80 transition-colors duration-200'
									>
										Lista de Productos
										<span aria-hidden='true'> &rarr;</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										href='/events'
										className='font-medium text-accent hover:text-accent/80 transition-colors duration-200'
									>
										Nuestros Eventos
										<span aria-hidden='true'> &rarr;</span>
									</Link>
								</SheetClose>
							</div>
						</div>
					</SheetFooter>
				)}
			</SheetContent>
		</Sheet>
	)
}

/**
 * Renders a card component for a product in the cart.
 *
 * @param {Object} props - The props object.
 * @param {CartItem} props.product - The product object containing id, title, image, price, and category.
 * @param {function} props.removeFromCart - The function to remove the product from the cart.
 * @return {JSX.Element} The rendered cart sheet card component.
 */
const CartSheetCard = ({
	product,
	removeFromCart,
}: {
	product: CartItem
	removeFromCart: (id: string) => void
}): JSX.Element => {
	// Render a card for each product in the cart
	return (
		<li className='flex py-6 px-3 bg-neutral-100 rounded-lg'>
			{/* Image of the product */}
			<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
				<Image
					src={product.image}
					alt={product.nombre}
					title={product.nombre}
					width={200}
					height={200}
					className='h-full w-full object-cover object-center'
				/>
			</div>

			{/* Details of the product */}
			<div className='ml-4 flex flex-1 flex-col'>
				<div>
					{/* Product title and price */}
					<div className='flex justify-between text-base font-light text-gray-900 hover:text-gray-800 transition-colors duration-150'>
						<h3>
							<Link
								href={`/products/${product.id}?category=${product.categoria}`}
							>
								{product.nombre}
							</Link>
						</h3>
						<p className='ml-4 font-bold'>{eurilize(Number(product.precio))}</p>
					</div>
				</div>
				<div className='flex flex-1 items-end justify-between text-sm'>
					{/* Product quantity */}
					<p className='text-gray-500'>Cantidad: {product.quantity}</p>

					{/* Remove product from cart button */}
					<div className='flex'>
						<button
							type='button'
							className='font-medium text-accent hover:text-accent/70 transition-colors duration-150'
							onClick={() => removeFromCart(product.id)}
						>
							Quitar
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}

export default CartSheet
