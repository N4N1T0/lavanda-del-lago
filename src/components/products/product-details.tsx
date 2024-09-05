// Next.js Imports
import Image from 'next/image'

// Uitility Imports
import { eurilize } from '@/lib/utils'

// Type imports
import type { Product } from '@/types'

// UI Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Component Imports
import { Quantity } from '@/components/shared/quantity'

// Data Import
import { badges } from '@/constants/site-data'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

/**
 * Renders the details of a product including title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, and image
 * @return {JSX.Element} The JSX element representing the product details
 */
const ProductDetails = ({ product }: { product: Product }): JSX.Element => {
	const { nombre, precio, descripcion, image, usabilidad } = product

	return (
		<article className='flex-[80%] grid grid-cols-2 mt-10 gap-10'>
			<Image
				src={image}
				alt={nombre}
				title={nombre}
				width={500}
				height={500}
				className='aspect-square w-full h-auto'
			/>
			<section id='product-details' className='space-y-7'>
				<h1 className='text-4xl text-accent'>{nombre}</h1>
				<p className='text-3xl font-bold'>{eurilize(Number(precio))}</p>
				<Tabs defaultValue='description' className='w-full mt-2'>
					<TabsList className='w-full bg-transparent flex justify-between items-center gap-10 mb-3'>
						<TabsTrigger
							value='description'
							className='flex-1 border border-accent/50 rounded-lg py-3'
						>
							Descripción
						</TabsTrigger>
						<TabsTrigger
							value='use'
							className='flex-1 border border-accent/50 rounded-lg py-3'
						>
							Sustancias y Uso
						</TabsTrigger>
					</TabsList>
					<TabsContent value='description' className='text-center px-5 py-3'>
						<p className='text-lg text-gray-600'>{descripcion}</p>{' '}
					</TabsContent>
					<TabsContent value='use' className='text-center px-5 py-3'>
						<p className='text-lg text-gray-600'>{usabilidad}</p>{' '}
					</TabsContent>
				</Tabs>
				<Quantity prduct={product} />
				<div className='flex w-full justify-between items-center'>
					{badges.map((badge) => (
						<Image
							key={uuidv4()}
							src={badge.src}
							alt={badge.alt}
							title={badge.title}
							width={100}
							height={100}
							className='w-24 h-auto'
						/>
					))}
				</div>
			</section>
		</article>
	)
}

export default ProductDetails
