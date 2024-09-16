import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ResellerCheckout = ({
	totalProducts,
	totalPrice,
}: { totalProducts: number; totalPrice: number }) => {
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
				<Button className='w-full mt-4' variant='cart'>
					<Link
						href='/checkout'
						className='flex items-center justify-center gap-2'
					>
						{/* TODO add query with amount or Cart Store */}
						<ShoppingCart className='mr-2 h-4 w-4' />
						Checkout
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

export default ResellerCheckout
