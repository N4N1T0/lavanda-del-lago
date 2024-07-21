'use client'

// React Imports
import { useState } from 'react'

// UI Imports
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

// Project Components Imports
import { ProductCard } from '@/components/shared/product-card'

// Types Imports
import type { Product } from '@/types'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Constants Imports
import { productsFilers } from '@/constants/site-data'

const ClientProductPage = ({ products }: { products: Product[] }) => {
	// TODO: Add Filter Logic
	const [filter, setfilter] = useState('')

	return (
		<>
			<ProductPageHeader
				productsLength={products.length}
				setFilter={setfilter}
			/>
			<section id='products-list'>
				<ul className='w-full grid content-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6 2xl:gap-10'>
					{products.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</ul>
			</section>
		</>
	)
}

const ProductPageHeader = ({
	productsLength,
	setFilter,
}: {
	productsLength: number
	setFilter: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
	return (
		<header className='w-full flex flex-row-reverse md:flex-row items-center justify-between px-2 py-4'>
			<p className='font-light text-sm md:text-base'>
				Total de Productos{' '}
				<span className='text-accent font-medium text-lg'>
					{productsLength}
				</span>
			</p>
			<Select>
				<SelectTrigger className='w-[160px] md:w-[190px] border-accent font-light'>
					<SelectValue placeholder='Ordenar por...' />
				</SelectTrigger>
				<SelectContent>
					{productsFilers.map((filter) => (
						<SelectItem
							key={uuidv4()}
							value={filter.value}
							className='pl-3'
							onClick={() => setFilter(filter.value)}
						>
							{filter.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</header>
	)
}

export default ClientProductPage
