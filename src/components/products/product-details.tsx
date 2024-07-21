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
	// Extract properties from the product object
	const { title, price, description, image } = product

	// Return a JSX element representing the product details
	return (
		<article className='flex-[80%] grid grid-cols-2 mt-10 gap-10'>
			{/* Display the product image */}
			<Image
				src={image}
				alt={title}
				title={title}
				width={500}
				height={500}
				className='aspect-square w-full h-auto'
			/>
			{/* Display the product details */}
			<section id='product-details' className='space-y-7'>
				{/* Display the product title */}
				<h1 className='text-4xl text-accent'>{title}</h1>
				{/* Display the product price */}
				<p className='text-3xl font-bold'>{eurilize(Number(price))}</p>
				{/* Display a tabbed interface for the product description */}
				<Tabs defaultValue='description' className='w-full mt-2'>
					<TabsList className='w-full bg-transparent flex justify-between items-center gap-10 mb-3'>
						{/* Tab for the product description */}
						<TabsTrigger
							value='description'
							className='flex-1 border border-accent/50 rounded-lg py-3'
						>
							Descripción
						</TabsTrigger>
						{/* Tab for the product usage */}
						<TabsTrigger
							value='use'
							className='flex-1 border border-accent/50 rounded-lg py-3'
						>
							Sustancias y Uso
						</TabsTrigger>
					</TabsList>
					{/* Content for the product description tab */}
					<TabsContent value='description' className='text-center px-5 py-3'>
						<p className='text-lg font-light'>{description}</p>{' '}
					</TabsContent>
					{/* Content for the product usage tab */}
					<TabsContent value='use' className='text-center px-5 py-3'>
						<p className='text-lg font-light'>{description}</p>{' '}
					</TabsContent>
				</Tabs>
				{/* Display the product quantity */}
				<Quantity prduct={product} />
				<div className='flex w-full justify-between items-center'>
					{/* Display the product badges */}
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
