// Next Imports
import Link from 'next/link'

// UI Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

// Utils Imports
import { getStatusColor, urlize } from '@/lib/utils'

// Type Imports
import type { User } from '@/types'

// Assets Imports
import { Package } from 'lucide-react'

/**
 * A card component to display a user's past purchases.
 *
 * @param {User['pastPurchases']} purchases - A list of past purchases made by the user.
 * @return {JSX.Element} A JSX element representing the PastPurchasesCard component.
 */
const PastPurchasesCard = ({
	purchases,
}: {
	purchases: User['pastPurchases']
}): JSX.Element => {
	return (
		<Card className='border-accent/70 border'>
			<CardHeader>
				<CardTitle>Compras pasadas</CardTitle>
			</CardHeader>
			<CardContent>
				{purchases && purchases.length > 0 ? (
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead>
								<tr className='border-b border-accent/50'>
									<th className='text-left py-2'>Fecha</th>
									<th className='text-left py-2'>Productos</th>
									<th className='text-right py-2'>Total</th>
									<th className='text-right py-2'>Estatus</th>
								</tr>
							</thead>
							<tbody>
								{purchases.map((purchase) => {
									return (
										<tr key={purchase.id} className='border-b border-accent/50'>
											<td className='py-2'>
												<span className='flex gap-1'>
													<Package className='mr-2 h-4 w-4' />
													{new Date(purchase.purchaseDate).toLocaleDateString()}
												</span>
											</td>
											<td className='py-2'>
												<ul className='flex items-center gap-3'>
													{purchase.products.map((product) => (
														<Link
															key={product.nombre}
															className='w-fit h-fit'
															href={
																product.nombre && product.categoria
																	? `/products/${urlize(product.nombre)}?category=${product.categoria}`
																	: '/products'
															}
														>
															<Avatar
																className='w-12 h-12 mb-4 border border-white hover:border-accent transition-colors duration-150'
																title={`${product.nombre} - CANTIDAD ${product.quantity}`}
															>
																<AvatarImage
																	src={product.image}
																	alt={product.nombre || 'Imagen de usuario'}
																/>
																<AvatarFallback>
																	{product.nombre
																		.split(' ')
																		.map((n) => n[0])
																		.join('')}
																</AvatarFallback>
															</Avatar>
														</Link>
													))}
												</ul>
											</td>
											<td className='py-2 text-right'>
												${purchase.totalAmount.toFixed(2)}
											</td>
											<td
												className='py-2 text-right uppercase'
												style={{ color: getStatusColor(purchase.status) }}
											>
												{purchase.status || 'Sin estatus'}
											</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
				) : (
					<p>No hay compras pasadas disponibles.</p>
				)}
			</CardContent>
		</Card>
	)
}

export default PastPurchasesCard
