import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import type { FotosVarias } from '@/types'
import Image from 'next/image'

const ProductImageCarousel = ({ images }: { images: FotosVarias[] }) => {
  return (
    <Carousel
      className='w-[90%]'
      opts={{
        loop: true
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem
            key={image.key}
            className='flex aspect-square w-full items-center justify-center'
          >
            <Image
              src={image.image}
              alt={image.key}
              width={500}
              height={500}
              className='aspect-square object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden bg-accent text-white transition-colors duration-150 hover:bg-white hover:text-accent md:flex' />
      <CarouselNext className='hidden bg-accent text-white transition-colors duration-150 hover:bg-white hover:text-accent md:flex' />
    </Carousel>
  )
}
export default ProductImageCarousel
