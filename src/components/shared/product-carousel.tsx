'use client'

// UI Imports
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

// Type imports
import type { Product } from '@/types'

// Project component imports
import ProductCard from '@/components/shared/product-card'

// Packages imports
import Autoplay from 'embla-carousel-autoplay'

/**
 * Renders a carousel of products.
 *
 * @param {Object} props - The component props.
 * @param {Product[]} props.productList - The list of products to display in the carousel.
 * @return {JSX.Element} The rendered carousel component.
 */
const ProductCarousel = ({
	productList,
}: { productList: Product[] }): JSX.Element => {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			opts={{
				loop: true,
			}}
			className='w-full'
		>
			<CarouselContent className='gap-5'>
				{productList.map((product) => (
					<CarouselItem
						key={product.id}
						className='md:basis-1/2 lg:basis-1/3 2xl:basis-1/4 px-14 md:px-10 lg:px-8 2xl:px-6'
					>
						<ProductCard product={product} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-150 hidden md:block' />
			<CarouselNext className='bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-150 hidden md:block' />
		</Carousel>
	)
}

export default ProductCarousel
