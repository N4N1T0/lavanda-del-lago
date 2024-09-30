// Next.js Imports
import Image from 'next/image'

// Assets Imports
import { Puzzle } from '@/assets'

// Type imports
import type { InfoCard as InfoCardProps } from '@/types'

/**
 * Renders the Info section with InfoCards for free shipping, secure payment methods, and customer satisfaction.
 *
 * @return {JSX.Element} The rendered Info section.
 */
export const Info = (
  { infoCards }: { infoCards: InfoCardProps[] }
): JSX.Element => (
  <section
    id='info'
    className='flex flex-col items-center justify-center gap-2.5 bg-accent py-10 text-white 2xl:py-20'
  >
    <div className='flex h-full w-[80%] flex-col items-center justify-center gap-5 md:flex-row'>
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
  <div className='flex-1 space-y-5 px-5'>
    <Image
      alt={title}
      title={title}
      src={icon || Puzzle}
      width={35}
      height={35}
      className='aspect-square'
    />
    <h3 className='text-xl uppercase'>{title}</h3>
    <p className='font-light'>{description}</p>
  </div>
)

export default Info
