// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Assets Imports
import { Condimento1, Hero1, Sapone } from '@/assets'

// Types Imports
import type { BentoThreeImage, BentofeaturedCategory, Product } from '@/types'

// Queries Imports
import { productsByCategory } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

export const Hero = async ({
	bentoThreeImages,
	bentoFeaturedProducto,
	bentofeaturedCategory,
}: {
	bentoThreeImages: BentoThreeImage[]
	bentoFeaturedProducto: Product
	bentofeaturedCategory: BentofeaturedCategory
}) => {
	const response: Product[] = await sanityClientRead.fetch(
		productsByCategory(bentofeaturedCategory.title),
	)
	const featuredProducts = response.slice(0, 2).map((product) => {
		return {
			name: product.nombre,
			id: product.id,
			image: product.image,
			categoria: product.categoria,
		}
	})

	return (
		<section id='hero' className='bg-white pt-4'>
			<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4'>
				{bentoThreeImages.map(({ image }, index) => (
					<div
						key={uuidv4()}
						className={`col-span-1 ${index > 0 ? 'hidden md:block' : ''}`}
					>
						<Image
							src={image || Hero1}
							alt='Lavanda Del Lago'
							className='w-full h-auto object-cover aspect-square'
							width={500}
							height={500}
							priority
						/>
					</div>
				))}
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4'>
				<div className='col-span-1'>
					<div className='flex flex-col items-center justify-center gap-4 p-10 text-center'>
						<h2 className='uppercase text-3xl md:text-5xl text-wrap'>
							{bentofeaturedCategory.title}
						</h2>
						<p className='w-[80%] md:w-[50%] text-gray-600'>
							{bentofeaturedCategory.description}
						</p>
					</div>
					<div className='grid grid-cols-2'>
						{featuredProducts.map((product, index) => (
							<div
								className={`col-span-1 flex justify-center items-center p-10 group overflow-hidden ${
									index > 0 ? 'bg-secondary' : 'bg-gray-200'
								}`}
								key={product.id}
							>
								<Link
									href={`/products/${product.id}?category=${product.categoria}`}
									prefetch
								>
									<Image
										src={product.image || Condimento1}
										alt={product.name}
										width={200}
										height={200}
										priority
										className='group-hover:scale-110 transition-transform duration-200 w-auto h-auto'
									/>
								</Link>
							</div>
						))}
					</div>
				</div>
				<div className='col-span-1 grid-cols-2 bg-accent text-white overflow-hidden md:grid hidden'>
					<div className='col-span-1 flex justify-center items-start flex-col p-10 gap-5'>
						<h2 className='uppercase text-5xl'>
							{bentoFeaturedProducto.nombre}
						</h2>
						<p className='text-gray-100'>
							{`${bentoFeaturedProducto.descripcion
								.split(' ')
								.slice(0, 10)
								.join(' ')}...`}
						</p>
						<Button>Comprar</Button>
					</div>
					<div className='col-span-1 relative'>
						<Image
							src={bentoFeaturedProducto.image || Sapone}
							alt={bentoFeaturedProducto.nombre}
							height={1500}
							width={1500}
							priority
							className='w-full h-auto absolute inset-0 object-cover translate-y-1/4'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
