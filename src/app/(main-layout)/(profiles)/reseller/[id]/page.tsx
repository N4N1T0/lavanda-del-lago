// Project Components Imports
import ResellerLayout from '@/components/profile/reseller-layout'

// Queries Imports
import { allProducts, userById } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { Product, User } from '@/types'

const ResellerPage = async ({ params }: { params: { id: string } }) => {
	// Fetch user data
	const response: User = await sanityClientRead.fetch(userById, {
		id: params.id,
	})

	// Fetch products
	const products: Product[] = await sanityClientRead.fetch(allProducts)

	if (response.reseller !== true) {
		return (
			<div className='container mx-auto p-4 uppercase text-red-500 text-center text-3xl py-10'>
				No tienes permiso para usar la plataforma de Revendedor
			</div>
		)
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6 uppercase text-accent'>
				Perfil de Revendedor
			</h1>
			<ResellerLayout user={response} products={products} />
		</div>
	)
}

export default ResellerPage
