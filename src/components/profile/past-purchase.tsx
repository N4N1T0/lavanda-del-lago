import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package } from 'lucide-react'

interface PastPurchase {
	id: number
	name: string
	price: number
	date: string
	category: string
}

interface PastPurchasesCardProps {
	purchases: PastPurchase[]
}

export function PastPurchasesCard({ purchases }: PastPurchasesCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Past Purchases</CardTitle>
			</CardHeader>
			<CardContent>
				{purchases && purchases.length > 0 ? (
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead>
								<tr className='border-b'>
									<th className='text-left py-2'>Product</th>
									<th className='text-left py-2'>Category</th>
									<th className='text-left py-2'>Date</th>
									<th className='text-right py-2'>Price</th>
								</tr>
							</thead>
							<tbody>
								{purchases.map((purchase) => (
									<tr key={purchase.id} className='border-b'>
										<td className='py-2 flex items-center'>
											<Package className='mr-2 h-4 w-4' />
											{purchase.name}
										</td>
										<td className='py-2'>{purchase.category}</td>
										<td className='py-2'>{purchase.date}</td>
										<td className='py-2 text-right'>
											${purchase.price.toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>No past purchases available.</p>
				)}
			</CardContent>
		</Card>
	)
}
