'use client'

// UI Imports
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'

// Type imports
import type { Product } from '@/types'

// Project component imports
import { ProductCard } from '@/components/products/product-card'

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
  productList
}: {
  productList: Product[]
}): JSX.Element => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      opts={{
        loop: true,
        align: 'start'
      }}
      className='mx-auto w-[93%]'
    >
      <CarouselContent className='-ml-2'>
        {productList.map((product, index: number) => (
          <CarouselItem
            key={product.id}
            className='basis-1/2 pl-2 md:basis-1/3 md:pl-4 xl:basis-1/4 xl:pl-4'
          >
            <ProductCard product={product} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden bg-accent text-white transition-colors duration-150 hover:bg-white hover:text-accent md:flex' />
      <CarouselNext className='hidden bg-accent text-white transition-colors duration-150 hover:bg-white hover:text-accent md:flex' />
    </Carousel>
  )
}

export default ProductCarousel
