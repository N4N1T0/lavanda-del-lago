// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import { FooterLogo } from '@/assets'

// Data Imports
import { footerLinks, socialLinks, badges } from '@/constants/site-data'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

// Queries Imports
import { sanityClient } from '@sanity-studio/lib/client'
import { footer } from '@/lib/queries'

// Types Imports
import type { Footer as FooterProps } from '@/types'

const Footer = async (): Promise<JSX.Element> => {
	const response: FooterProps = await sanityClient.fetch(footer)

	const findSocialMedia = (name: string) => {
		return socialLinks.find((item) => item.name === name)?.svg
	}

	const { contactInfo, copyright, socialMedia, subtitle } = response

	return (
		<footer className='bg-accent'>
			<div className='mx-auto max-w-screen-2xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-24 text-white'>
				<div className='flex flex-col justify-between gap-8 sm:flex-row'>
					<div>
						{/* Image of the footer */}
						<div className='flex justify-center text-teal-600 sm:justify-start'>
							<Image src={FooterLogo} alt='Footer Logo' title='Footer Logo' />
						</div>
						<p className='mt-6 max-w-md text-center leading-relaxedsm:max-w-xs sm:text-left'>
							{subtitle}
						</p>
						{/* Social media links */}
						<ul className='mt-8 flex justify-center gap-6 sm:justify-start md:gap-8'>
							{socialMedia.map(({ id, link, platformName }) => {
								const svg = findSocialMedia(platformName)
								return (
									<li key={id}>
										<Link
											href={link}
											rel='noreferrer'
											target='_blank'
											className='hover:text-gray-400 transition-colors duration-1505'
										>
											<span className='sr-only'>{platformName}</span>
											{svg}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>

					{/* Footer links */}
					<div className='flex flex-col'>
						<div className='flex gap-6'>
							<div className='text-center sm:text-left grid place-content-center'>
								<p className='text-lg font-medium'>Servicios</p>
								<ul className='mt-8 space-y-4 text-sm'>
									{footerLinks.map(({ name, href }) => (
										<li key={name}>
											<Link
												className='hover:text-gray-400 transition-colors duration-150'
												href={href}
											>
												{name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className='text-center sm:text-left grid place-content-center'>
								<p className='text-lg font-medium'>Contacto</p>
								<ul className='mt-8 space-y-4 text-sm'>
									{Object.entries(contactInfo).map(([key, value]) => {
										const link =
											key === 'email' ? `mailto:${value}` : `tel:${value}`
										return (
											<li key={uuidv4()}>
												<Link
													className='hover:text-gray-400 transition-colors duration-150'
													href={link}
												>
													{value}
												</Link>
											</li>
										)
									})}
								</ul>
							</div>
						</div>

						{/* Badges */}
						<ul className='flex gap-3 mt-5'>
							{badges.map(({ src, alt, title }) => (
								<li key={uuidv4()}>
									<Image
										src={src}
										alt={alt}
										title={title}
										width={50}
										height={50}
										className='h-auto w-auto'
									/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='mt-12 pt-6'>
					<div className='text-center border-b border-white/20 pb-2'>
						<small className='text-xs md:text-sm'>{copyright}</small>
					</div>

					{/* Designer and developer */}
					<div className='text-center pt-2 text-gray-300'>
						<small className='text-xs'>
							Created with <span className='text-red-500'>❤️</span>, powered by{' '}
							<Link
								href='https://nextjs.org/'
								className='underline'
								target='_blank'
							>
								Next.js
							</Link>{' '}
							and made by{' '}
							<Link
								href='https://www.adrian-alvarez.dev/es/'
								className='underline'
								target='_blank'
							>
								Adrian
							</Link>
						</small>
					</div>
				</div>
			</div>
		</footer>
	)
}
export default Footer
