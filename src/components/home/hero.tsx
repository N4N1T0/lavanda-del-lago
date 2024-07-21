import { Hero1, Hero2, Hero3, Sapone, Condimento1, Condimento2 } from '@/assets'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'
import type { BentoThreeImage } from '@/types'

/**
 * Renders the Hero component which displays a grid of images and information about
 * two products: Condimentos Naturales and Jabón en frío Depurativo.
 *
 * @return {JSX.Element} The Hero component.
 */
export const Hero = ({
	bentoThreeImages,
}: { bentoThreeImages: BentoThreeImage[] }): JSX.Element => {
	return (
		<section id='hero' className='bg-white pt-4'>
			<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4'>
				{bentoThreeImages.map(({ image }, index) => (
					<div
						key={uuidv4()}
						className={`col-span-1 ${index > 0 ? 'hidden md:block' : ''}`}
					>
						<Image
							src={image}
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
						<h2 className='uppercase text-3xl md:text-5xl'>
							Condimentos <br /> Naturales
						</h2>
						<p className='w-[80%] md:w-[50%] text-gray-700 font-light'>
							Mezcla de hierbas aromáticas ideal como condimento para nuestras
							comidas. Ideal para todo tipo de carnes: a la plancha, hervidas o
							cocidas en una olla.
						</p>
					</div>
					<div className='grid grid-cols-2'>
						<div className='col-span-1 flex justify-center items-center p-10 group bg-gray-200 overflow-hidden'>
							<Link href='/products' prefetch>
								<Image
									src={Condimento1}
									alt='Condiments'
									priority
									className='group-hover:scale-110 transition-transform duration-200'
								/>
							</Link>
						</div>
						<div className='col-span-1 flex justify-center items-center p-10 group bg-secondary overflow-hidden'>
							<Link href='/products' prefetch>
								<Image
									src={Condimento2}
									alt='Condiments'
									priority
									className='group-hover:scale-110 transition-transform duration-200'
								/>
							</Link>
						</div>
					</div>
				</div>
				<div className='col-span-1 grid-cols-2 bg-accent text-white overflow-hidden md:grid hidden'>
					<div className='col-span-1 flex justify-center items-start flex-col p-10 gap-5'>
						<h2 className='uppercase text-5xl'>
							Jabón en frío <br /> Depurativo
						</h2>
						<p className='text-gray-100 font-light'>
							Jabón en frío con función cicatrizante, emoliente y elastizante.
						</p>
						<Button>Comprar</Button>
					</div>
					<div className='col-span-1 relative'>
						<Image
							src={Sapone}
							alt='Sapone'
							priority
							className='w-full h-auto absolute bottom-0 top-0 right-0'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Hero
