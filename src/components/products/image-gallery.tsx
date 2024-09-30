'use client'

// React Imports
import { useState } from 'react'

// Next.js Imports
import Image from 'next/image'

// Project Components Imports
import ProductImageCarousel from '@/components/products/product-image-carousel'

// UI Imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

// Types Imports
import type { FotosVarias } from '@/types'

/**
 * A component that displays a gallery of images with a main image and a carousel of thumbnails.
 *
 * @param {FotosVarias[]} images - An array of image objects to be displayed in the gallery.
 * @return {JSX.Element} The JSX element representing the image gallery.
 */
const ImageGallery = ({ images }: { images: FotosVarias[] }): JSX.Element => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className='h-full w-full space-y-4'>
      <Dialog>
        <DialogTitle>Product Image Carousel</DialogTitle>
        <DialogDescription>Product Image Carousel</DialogDescription>
        <DialogTrigger asChild>
          <div className='relative aspect-square w-full cursor-pointer'>
            <Image
              src={mainImage.image}
              alt='Main product image'
              width={1500}
              height={1500}
              priority
              className='aspect-square object-cover'
            />
          </div>
        </DialogTrigger>
        <DialogContent className='flex h-auto max-w-screen-md items-center justify-center'>
          <ProductImageCarousel images={images} />
        </DialogContent>
      </Dialog>
      <div className='flex w-full items-center justify-center gap-2 overflow-x-auto p-2 pl-24 md:pl-0'>
        {images.map((item) => (
          <button
            type='button'
            key={item.key}
            onClick={() => setMainImage(item)}
            className='aspect-square h-20 w-20 flex-shrink-0'
          >
            <Image
              src={item.image}
              alt={item.key}
              width={80}
              height={80}
              className={`h-full w-full rounded-md object-cover ${
                mainImage.key === item.key ? 'ring-2 ring-accent' : ''
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
