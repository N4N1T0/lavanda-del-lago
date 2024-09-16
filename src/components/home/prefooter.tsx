// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import { PrefooterImage } from '@/assets'

// Types Imports
import type { Prefooter as PrefooterProps } from '@/types'

// Queries Imports
import { prefooter } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

/**
 * Renders the Prefooter component.
 *
 * @return {Promise<JSX.Element>} The rendered prefooter section.
 */
const Prefooter = async (): Promise<JSX.Element> => {
	const response: PrefooterProps = await sanityClientRead.fetch(prefooter)

	const { imageUrl, link } = response

	return (
		<section id='prefooter' className='w-full'>
			<Link href={link} target='_blank'>
				<Image
					alt='prefooter'
					src={imageUrl || PrefooterImage}
					width={1800}
					height={900}
					title='prefooter'
					className='w-full object-fill'
				/>
			</Link>
		</section>
	)
}

export default Prefooter
