// Types Imports
import type { Remedies } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { remedies } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'
import Image from 'next/image'

// Metadata for this page
export const metadata: Metadata = {
	title: 'Nuestos Remedios',
	description:
		'La Lavanda es conocida desde la antigüedad por sus propiedades; es un antiséptico, cicatrizante y bactericida natural.',
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const RemediesPage = async (): Promise<JSX.Element> => {
	const response: Remedies = await sanityClientRead.fetch(remedies)

	return (
		<section
			id='RemediesPage'
			className='mx-auto max-w-screen-lg px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 text-balance text-center items-center'
		>
			<h1 className='text-xl md:text-5xl text-accent'>{response.title}</h1>
			<p>{response.firstDescription}</p>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				{response.dualImage.map((image) => (
					<Image
						src={image}
						alt={response.title}
						title={response.title}
						key={image}
						width={500}
						height={500}
						priority
						className='aspect-square col-span-1 rounded-sm'
					/>
				))}
			</div>
			<p>{response.secodDescription}</p>
			<ul className='flex flex-col justify-center gap-10 w-full md:w-[80%]'>
				{response.benefits.map((benefit) => (
					<li
						key={benefit.description.split(' ').slice(0, 3).join(' ')}
						className='flex justify-center items-center gap-5'
					>
						<Image
							src={benefit.image}
							alt={benefit.description}
							title={benefit.description}
							width={100}
							height={100}
							className='aspect-square w-20 h-20'
						/>
						<h2 className='text-lg text-left'>{benefit.description}</h2>
					</li>
				))}
			</ul>
		</section>
	)
}

export default RemediesPage
