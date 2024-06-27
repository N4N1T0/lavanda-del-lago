// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Assets Imports
import { FooterLogo } from '@/assets'

// Data Imports
import { footerLinks, socialLinks } from '@/constants/site-data'

/**
 * Renders a footer component with a logo, social links, services list, contact information, and copyright notice.
 *
 * @return {JSX.Element} The footer component.
 */
const Footer = (): JSX.Element => {
	return (
		<footer className='bg-accent'>
			<div className='mx-auto max-w-screen-2xl px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pt-24 text-white'>
				<div className='flex flex-col justify-between gap-8 sm:flex-row'>
					<div>
						<div className='flex justify-center text-teal-600 sm:justify-start'>
							<Image src={FooterLogo} alt='Footer Logo' title='Footer Logo' />
						</div>
						<p className='mt-6 max-w-md text-center leading-relaxedsm:max-w-xs sm:text-left'>
							A pesar de que la empresa es relativamente joven, los valores en
							los que se basa son sólidos, verdaderos, de otros tiempos.
						</p>
						<ul className='mt-8 flex justify-center gap-6 sm:justify-start md:gap-8'>
							{socialLinks.map(({ name, link, svg }) => (
								<li key={name}>
									<Link
										href={link}
										rel='noreferrer'
										target='_blank'
										className='hover:text-gray-400 transition-colors duration-1505'
									>
										<span className='sr-only'>{name}</span>
										{svg}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className='flex gap-6'>
						<div className='text-center sm:text-left grid place-content-center'>
							<p className='text-lg font-medium'>Servicios</p>
							<ul className='mt-8 space-y-4 text-sm'>
								{footerLinks.services.map(({ name, href }) => (
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
								{footerLinks.contact.map(({ name, href }) => (
									<li key={name}>
										<Link
											className='hover:text-gray-400 transition-colors duration-150'
											target='_blank'
											rel='noreferrer'
											href={href}
										>
											<span className='flex-1'>{name}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className='mt-12 pt-6'>
					<div className='text-center border-b border-white/20 pb-2'>
						<small className='text-xs md:text-sm'>
							© 2018 | P.IVA 03118210982 - Registro delle imprese di Brescia -
							REA: BS-506532 - Capitale sociale i.v.: 10.000,00 - Pec:
							livinggiardini@legalmail.it
						</small>
					</div>
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
