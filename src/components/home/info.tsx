// Next.js Imports
import Image from 'next/image'

// Assets Imports
import { Lock, Puzzle, Speech } from '@/assets'

// Type imports
import type { InfoCardProps } from '@/types'

/**
 * Renders the Info section with InfoCards for free shipping, secure payment methods, and customer satisfaction.
 *
 * @return {JSX.Element} The rendered Info section.
 */
export const Info = (): JSX.Element => (
	<section
		id='info'
		className='flex flex-col items-center justify-center gap-2.5 py-10 2xl:py-20 bg-accent text-white'
	>
		<div className='h-full flex flex-col md:flex-row justify-center items-center w-[80%] gap-5'>
			<InfoCard
				image={Puzzle}
				title='Free shipping'
				text='Free shipping to national area in 24/48 hours. For other areas, check shipping price.'
			/>
			<InfoCard
				image={Lock}
				title='100% secure payment methods'
				text='Payment through bank transfer, credit/debit card and PayPal.'
			/>
			<InfoCard
				image={Speech}
				title='100% customer satisfaction'
				text='If any issue? We take care of it. Our goal: 100% customer satisfaction.'
			/>
		</div>
	</section>
)

/**
 * Renders an InfoCard component with the provided image, title, and text.
 *
 * @param {any} image - The image for the InfoCard.
 * @param {string} props.title - The title for the InfoCard.
 * @param {string} props.text - The text content for the InfoCard.
 * @return {JSX.Element} The rendered InfoCard component.
 */
const InfoCard = ({ image, title, text }: InfoCardProps): JSX.Element => (
	<div className='space-y-5 flex-1 px-5'>
		<Image alt={title} src={image} />
		<h3 className='text-xl uppercase'>{title}</h3>
		<p className='font-light'>{text}</p>
	</div>
)

export default Info
