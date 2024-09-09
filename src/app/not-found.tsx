'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Assets Imports
import { Image404 } from '@/assets'

// Types Imports
import type { Metadata } from 'next'
import type { NotFoundPage } from '@/types'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { errorPages } from '@/lib/queries'

// Metadata for the error page
export const metadata: Metadata = {
	title: 'Error 404',
	description: 'Pagina No Encontrada',
}

export default function NotFound() {
	// initialize router
	const router = useRouter()

	// State for the Page info from Sanity
	const [pageInfo, setPageInfo] = useState<NotFoundPage | null>(null)

	// Fetch Page info from Sanity
	useEffect(() => {
		const getPageInfo = async () => {
			try {
				const response = await sanityClientRead.fetch(errorPages('not-found'))
				setPageInfo(response)
			} catch (err) {
				console.error('Error fetching error page info:', err)
			}
		}

		getPageInfo()
	}, [])

	return (
		<section className='bg-white '>
			<div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
				<div className='wf-ull lg:w-1/2'>
					<p className='font-medium text-accent text-5xl uppercase'>
						Error 404
					</p>
					<h1 className='mt-3 text-xl md:text-2xl font-bold text-gray-800'>
						´{pageInfo?.digest}
					</h1>

					<div className='flex items-center mt-6 gap-x-3'>
						<button
							type='button'
							className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border border-accent rounded-lg gap-x-2 sm:w-auto hover:bg-accent hover:text-white'
							onClick={() => router.back()}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-5 h-5 rtl:rotate-180'
							>
								<title>Volver</title>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
								/>
							</svg>

							<span>Volver</span>
						</button>

						<Link
							href='/'
							className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-accent rounded-lg shrink-0 sm:w-auto hover:bg-accent/70'
						>
							Pagina Principal
						</Link>
					</div>

					<p className='mt-5'>Puedes usar estos links alternativos</p>

					<div className='mt-5 space-y-6'>
						{pageInfo?.links.map((link) => (
							<div key={link}>
								<Link
									href={link}
									className='inline-flex items-center text-sm text-accent gap-x-2 hover:underline'
								>
									<span>
										{link
											.replace(/\/$/, '')
											.replace(/^[a-z]/, (m) => m.toUpperCase())}{' '}
									</span>

									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-5 h-5 rtl:rotate-180'
									>
										<title>Flecha Derecha</title>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
										/>
									</svg>
								</Link>
							</div>
						))}
					</div>
				</div>

				<div className='relative w-full mt-8 lg:w-1/2 lg:mt-0'>
					<Image
						className='w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover '
						src={pageInfo?.imageUrl || Image404}
						width={500}
						height={500}
						alt='Imagen Lavanda 404'
						title='Imagen Lavanda 404'
						priority
					/>
				</div>
			</div>
		</section>
	)
}
