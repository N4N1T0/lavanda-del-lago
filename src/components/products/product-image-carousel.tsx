import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import type { FotosVarias } from '@/types'
import Image from 'next/image'

const ProductImageCarousel = ({ images }: { images: FotosVarias[] }) => {
	return (
		<Carousel
			className='w-[90%]'
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{images.map((image) => (
					<CarouselItem
						key={image.key}
						className='w-full aspect-square flex justify-center items-center'
					>
						<Image
							src={image.image}
							alt={image.key}
							width={500}
							height={500}
							className='object-cover aspect-square'
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-150 hidden md:flex' />
			<CarouselNext className='bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-150 hidden md:flex' />
		</Carousel>
	)
}
export default ProductImageCarousel
