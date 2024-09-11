// Next.js Imports
import Image from 'next/image'

// Uitility Imports
import { eurilize, isNew } from '@/lib/utils'

// Type imports
import type { Product } from '@/types'

// UI Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Component Imports
import { Quantity } from '@/components/shared/quantity'
import ProductCaracteristics from '@/components/products/product-caracteristics'

// Data Import
import { badges } from '@/constants/site-data'

// Assets Imports
import { MainLogo } from '@/assets'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'
import ImageGallery from './image-gallery'

/**
 * Renders the details of a product including title, price, description, and image.
 *
 * @param {Product} product - The product object containing title, price, description, and image
 * @return {JSX.Element} The JSX element representing the product details
 */
const ProductDetails = ({ product }: { product: Product }): JSX.Element => {
	const {
		nombre,
		precio,
		descripcion,
		image,
		usabilidad,
		categoria,
		createdAt,
		fotosVarias,
	} = product

	const imageGallery =
		fotosVarias.length > 0
			? [{ image: image, key: uuidv4() }, ...fotosVarias]
			: []

	return (
		<article className='flex-[80%] grid grid-cols-1 md:grid-cols-2 mt-7 gap-10'>
			{imageGallery.length > 0 ? (
				<ImageGallery images={imageGallery} />
			) : (
				<Image
					src={image || MainLogo}
					alt={nombre || 'Logo Principal de Lavanda del Lago'}
					title={nombre || 'Logo Principal de Lavanda del Lago'}
					width={500}
					height={500}
					priority
					className='object-cover aspect-square'
				/>
			)}
			<section id='product-details' className='space-y-4'>
				<div className='w-full flex justify-between items-center'>
					<h1 className='text-xl md:text-4xl text-accent'>
						{nombre || 'Estamos trabajando en una nombre'}
					</h1>
					{isNew(createdAt) && (
						<span className='bg-tertiary px-3 md:px-5 py-1 md:py-2 text-sm md:text-base rounded-md text-white'>
							Nuevo
						</span>
					)}
				</div>
				<h2 className='uppercase text-lg !-mt-1'>{categoria || 'Bienestar'}</h2>
				<p className='text-3xl font-bold'>{eurilize(Number(precio || '0'))}</p>
				<Tabs defaultValue='description' className='w-full mt-2'>
					<TabsList className='w-full bg-transparent flex justify-between items-center gap-5 md:gap-10 mb-3'>
						<TabsTrigger
							value='description'
							className='flex-1 border border-accent/50 rounded-lg py-3 text-xs md:text-base'
						>
							Descripción
						</TabsTrigger>
						<TabsTrigger
							value='use'
							className='flex-1 border border-accent/50 rounded-lg py-3 text-xs md:text-base'
						>
							<span className='hidden md:inline'>Sustancias y Uso</span>
							<span className='inline md:hidden'>Sustancias</span>
						</TabsTrigger>
						<TabsTrigger
							value='caracteristics'
							className='flex-1 border border-accent/50 rounded-lg py-3 text-xs md:text-base'
						>
							Caracteristicas
						</TabsTrigger>
					</TabsList>
					<TabsContent value='description' className='text-center px-5 py-3'>
						<p className='text-lg text-gray-600'>
							{descripcion ||
								'Estamos trabajando en una descripcion detallada para usted'}
						</p>{' '}
					</TabsContent>
					<TabsContent value='use' className='text-center px-5 py-3'>
						<p className='text-lg text-gray-600'>
							{usabilidad ||
								'Estamos trabajando en una usabilidad detallada para usted'}
						</p>{' '}
					</TabsContent>
					<TabsContent value='caracteristics' className='text-center px-5 py-3'>
						<ProductCaracteristics product={product} />
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
