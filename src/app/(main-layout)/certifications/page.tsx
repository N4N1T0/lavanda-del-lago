// Types Imports
import { certifications } from '@/lib/queries'
import type { Certifications } from '@/types'
import { sanityClientRead } from '@sanity-studio/lib/client'
import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'

// Metadata for this page
export const metadata: Metadata = {
	title: 'Certificaciones',
	description:
		'Las Certificaciones obtenidas por nuestra marca a lo largo de una exitosa carrera',
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const CertificationsPage = async (): Promise<JSX.Element> => {
	const response: Certifications = await sanityClientRead.fetch(certifications)

	return (
		<section
			id='CertificationsPage'
			className='mx-auto max-w-screen-lg px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 text-balance items-center'
		>
			<h1 className='text-xl md:text-5xl text-accent'>{response.title}</h1>
			<section id='certifications index' className='w-full'>
				<h2 className='text-2xl'>Indice de Certificaciones</h2>
				<ol className='w-full mt-5'>
					{response.certificationsBlocks.map((certification, index) => (
						<li key={certification.title}>
							<a
								href={`#${certification.title}`}
								className='text-accent text-lg hover:text-black transition-colors duration-150 ease-out mt-1'
							>
								{index + 1}. {certification.title}
							</a>
						</li>
					))}
				</ol>
			</section>
			{response.certificationsBlocks.map((certification) => (
				<section
					id={certification.title}
					key={certification.title}
					className='w-full mt-5'
				>
					<h2 className='text-2xl text-accent'>{certification.title}</h2>
					<div className='[&>p]:text-lg [&>p]:mt-5 [&>p:first-child]:mt-0'>
						<PortableText value={certification.description} />
					</div>
				</section>
			))}
		</section>
	)
}

export default CertificationsPage
