import { aboutUsPage } from '@/lib/queries'
import type { AboutsPageType } from '@/types'
import { sanityClient } from '@sanity-studio/lib/client'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const AboutUsPage = async () => {
	const aboutUsPageResponse: AboutsPageType =
		await sanityClient.fetch(aboutUsPage)

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
	} = aboutUsPageResponse

	return (
		<section
			id='about-us'
			className='inline-flex flex-col items-start gap-10 md:gap-20 px-5 lg:px-10 2xl:px-20 py-10 2xl:py-20 w-full font-light'
		>
			{/* Header Section */}
			<div className='w-full space-y-3 max-w-3xl'>
				<span>Lavanda del Lago</span>
				<h1 className='text-3xl font-bold'>{title}</h1>
				<p>{description}</p>
			</div>

			{/* Stats Section */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				<ul className='col-span-1 grid grid-cols-2 gap-5 p-5'>
					{stats.map((stat) => (
						<li
							key={stat._key}
							className='flex flex-col gap-3 justify-center items-center text-center'
						>
							<p className='text-3xl md:text-5xl font-bold text-accent'>
								{stat.value}
							</p>
							<p className='font-bold'>{stat.title}</p>
							<p className='text-sm'>{stat.description}</p>
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
				/>
			</div>

			{/* Second Section */}
			<div className='w-full space-y-3'>
				<h2 className='text-3xl font-bold'>{second_section_title}</h2>
				<PortableText value={second_section_description} />
			</div>

			{/* Teams Section */}
			<div className='w-full space-y-5 md:space-y-10'>
				<div className='w-full space-y-3 max-w-3xl'>
					<h2 className='text-3xl font-bold'>{teams_section_title}</h2>
					<p>{teams_section_description}</p>
				</div>
				<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid.cols-4 xl:grid-cols-5 gap-5'>
					{teams.map((team) => (
						<li
							key={team._key}
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
							<p>{team.description}</p>
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
