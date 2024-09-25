// Types Imports
import type { Metadata } from 'next'
import type { JustAFlower } from '@/types'

// Queries Imports
import { jusAFLower } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'
import Image from 'next/image'
import { QuoteIcon } from 'lucide-react'

// Metadata for this page
export const metadata: Metadata = {
	title: 'Solo una Flor',
	description:
		'Creemos que cuidar nuestros productos, siguiendo cada etapa de procesamiento paso a paso, marca la diferencia. Todo comienza desde la flor de Lavanda y llega a tus manos',
}

/**
 * Fetches data from the Sanity API and renders the JustAFlower page.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the Events page content.
 */
const JustAFlowerPage = async (): Promise<JSX.Element> => {
	const response: JustAFlower = await sanityClientRead.fetch(jusAFLower)

	return (
		<section
			id='just-a-flower'
			className='mx-auto max-w-screen-lg px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 text-balance text-center'
		>
			<h1 className='sr-only'>Con solo una Flor</h1>
			<Image
				src={response.mainImage}
				alt={response.title || 'Con solo una Flor'}
				title={response.title || 'Con solo una Flor'}
				priority
				width={1920}
				height={1080}
			/>
			<h2 className='text-xl xl:text-5xl text-accent mx-w-[90%]'>
				<QuoteIcon className='inline-block mr-3 h-10 w-10 md:w-14 md:h-14' />
				{response.quote}
				<QuoteIcon className='inline-block ml-3 h-10 w-10 md:w-14 md:h-14' />
			</h2>
			<p className='text-lg tracking-wide'>{response.text}</p>
			<Image
				src={response.secondaryImage}
				alt={response.title || 'Con solo una Flor'}
				title={response.title || 'Con solo una Flor'}
				width={1920}
				height={1080}
			/>
			<p className='text-lg tracking-wide'>{response.secondaryText}</p>
		</section>
	)
}

export default JustAFlowerPage
