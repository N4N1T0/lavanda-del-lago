// Next.js Imports
import Image from 'next/image'

// Type imports
import type { InfoCard as InfoCardProps } from '@/types'

/**
 * Renders the Info section with InfoCards for free shipping, secure payment methods, and customer satisfaction.
 *
 * @return {JSX.Element} The rendered Info section.
 */
export const Info = ({
	infoCards,
}: { infoCards: InfoCardProps[] }): JSX.Element => (
	<section
		id='info'
		className='flex flex-col items-center justify-center gap-2.5 py-10 2xl:py-20 bg-accent text-white'
	>
		<div className='h-full flex flex-col md:flex-row justify-center items-center w-[80%] gap-5'>
			{infoCards.map((infoCard: InfoCardProps) => (
				<InfoCard key={infoCard.id} {...infoCard} />
			))}
		</div>
	</section>
)

/**
 * Renders an InfoCard component with the provided image, title, and text.
 *
 * @param {string} description - The text content for the InfoCard.
 * @param {any} icon - The image for the InfoCard.
 * @param {string} title - The title for the InfoCard.
 * @return {JSX.Element} The rendered InfoCard component.
 */
const InfoCard = ({ description, icon, title }: InfoCardProps): JSX.Element => (
	<div className='space-y-5 flex-1 px-5'>
		<Image alt={title} src={icon} width={35} height={35} />
		<h3 className='text-xl uppercase'>{title}</h3>
		<p className='font-light'>{description}</p>
	</div>
)

export default Info
