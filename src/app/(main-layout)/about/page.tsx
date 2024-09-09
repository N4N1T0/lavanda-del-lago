// Next.js Imports
import Image from 'next/image'

// Sanity Imports
import { PortableText } from 'next-sanity'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { aboutUsPage } from '@/lib/queries'

// Types Imports
import type { AboutsPageType } from '@/types'
import type { Metadata } from 'next'

// Metdata Configuration for this page
export const metadata: Metadata = {
	title: 'Sobre Nosotros',
	description:
		'Conoce a nuestro equipo y nuestra mision. En Lavanda del Lago, estamos comprometidos en brindarte la mejor experiencia de compra en l nea, con nuestros productos de alta calidad y nuestro excelente servicio al cliente.',
}

/**
 * Fetches and renders the About Us page data from the Sanity client.
 *
 * @return {Promise<JSX.Element>} The About Us page component.
 */
const AboutUsPage = async (): Promise<JSX.Element> => {
	// Get About Us Page Data
	const response: AboutsPageType = await sanityClientRead.fetch(aboutUsPage)

	// deconstruct data
	const {
		title,
		description,
		statImage,
		stats,
		teams,
		teams_section_title,
		teams_section_description,
		second_section_description,
		second_section_title,
	} = response

	return (
		<section
			id='about-us'
			className='inline-flex flex-col items-start gap-10 md:gap-20 px-5 lg:px-10 2xl:px-20 py-10 2xl:py-20 w-full'
		>
			{/* Header Section */}
			<div className='w-full space-y-3 max-w-3xl'>
				<span className='font-light'>Lavanda del Lago</span>
				<h1 className='text-3xl font-bold'>{title}</h1>
				<p className='text-gray-600'>{description}</p>
			</div>

			{/* Stats Section */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				<ul className='col-span-1 grid grid-cols-2 gap-5 p-5'>
					{stats.map((stat) => (
						<li
							key={stat._key}
							className='flex flex-col gap-2 justify-center items-center text-center'
						>
							<p className='text-3xl md:text-5xl font-bold text-accent'>
								{stat.value}
							</p>
							<p className='font-bold text-lg'>{stat.title}</p>
							<p className='text-sm text-gray-600'>{stat.description}</p>
						</li>
					))}
				</ul>
				<Image
					src={statImage}
					alt='Stats Image'
					title='Stats Image'
					className='object-cover col-span-1 aspect-square'
					width={1500}
					height={1500}
					priority
				/>
			</div>

			{/* Second Section */}
			<div className='w-full space-y-3'>
				<h2 className='text-3xl font-bold'>{second_section_title}</h2>
				<div className='text-gray-600'>
					<PortableText value={second_section_description} />
				</div>
			</div>

			{/* Teams Section */}
			<div className='w-full space-y-5 md:space-y-10'>
				<div className='w-full space-y-3 max-w-3xl'>
					<h2 className='text-3xl font-bold'>{teams_section_title}</h2>
					<p className='text-gray-600'>{teams_section_description}</p>
				</div>
				<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid.cols-4 xl:grid-cols-5 gap-5'>
					{teams.map((team) => (
						<li
							key={team.id}
							className='flex flex-col gap-3 justify-center items-start text-sm'
						>
							<Image
								src={team.image}
								alt={team.name}
								title={team.name}
								width={300}
								height={300}
								className='aspect-square'
							/>
							<div>
								<h3 className='text-base'>{team.name}</h3>
								<p className='font-bold text-accent'>{team.role}</p>
							</div>
							<p className='text-gray-600'>{team.description}</p>
							<ul>
								{team.links.map((link) => (
									<li key={link._key}>
										<a
											href={link.url}
											target='_blank'
											rel='noreferrer'
											className='text-accent hover:underline'
										>
											{link.title}
										</a>
									</li>
								))}
							</ul>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}

export default AboutUsPage
