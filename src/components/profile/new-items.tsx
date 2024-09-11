import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'

interface CategoryItem {
	id: number
	name: string
	price: number
}

interface CategoryItemsCardProps {
	category: {
		name: string
		items: CategoryItem[]
	}
}

export function CategoryItemsCard({ category }: CategoryItemsCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{category.name}</CardTitle>
			</CardHeader>
			<CardContent>
				{category.items && category.items.length > 0 ? (
					<ul className='space-y-2'>
						{category.items.map((item) => (
							<li key={item.id} className='flex justify-between items-center'>
								<span className='flex items-center'>
									<ShoppingBag className='mr-2 h-4 w-4' />
									{item.name}
								</span>
								<span className='font-semibold'>${item.price.toFixed(2)}</span>
							</li>
						))}
					</ul>
				) : (
					<p>No items available in this category.</p>
				)}
			</CardContent>
		</Card>
	)
}
