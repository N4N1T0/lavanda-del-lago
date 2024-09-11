'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { FotosVarias } from '@/types'

export default function ImageGallery({ images }: { images: FotosVarias[] }) {
	const [mainImage, setMainImage] = useState(images[0])

	return (
		<div className='space-y-4 h-full w-full'>
			<Dialog>
				<DialogTrigger asChild>
					<div className='relative aspect-square w-full cursor-pointer'>
						<Image
							src={mainImage.image}
							alt='Main product image'
							layout='fill'
							objectFit='cover'
							className='rounded-lg'
						/>
					</div>
				</DialogTrigger>
				<DialogContent className='max-w-screen-md h-auto aspect-square'>
					<div className='relative aspect-square h-full w-full'>
						<Image
							src={mainImage.image}
							alt='Full size product image'
							layout='fill'
							objectFit='contain'
						/>
					</div>
				</DialogContent>
			</Dialog>
			<div className='flex gap-2 justify-center items-center overflow-x-auto p-2 w-full'>
				{images.map((item) => (
					<button
						type='button'
						key={item.key}
						onClick={() => setMainImage(item)}
						className='w-20 h-20 flex-shrink-0 aspect-square'
					>
						<Image
							src={item.image}
							alt={item.key}
							width={80}
							height={80}
							className={`rounded-md w-full h-full object-cover ${
								mainImage.key === item.key ? 'ring-2 ring-accent' : ''
							}`}
						/>
					</button>
				))}
			</div>
		</div>
	)
}
