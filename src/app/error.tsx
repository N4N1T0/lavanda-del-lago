'use client'

// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Assets Imports
import { Image500 } from '@/assets'
import { contactLinks } from '@/constants/site-data'
import { v4 as uuidv4 } from 'uuid'

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const router = useRouter()
	return (
		<section className='bg-white '>
			<div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:flex-row-reverse lg:items-center lg:gap-12'>
				<div className='w-full lg:w-1/2'>
					<p className='font-medium text-secondary text-5xl uppercase'>
						Error 500
					</p>
					<h1 className='mt-3 text-xl md:text-2xl font-semibold text-gray-800'>
						Error Interno
					</h1>
					<h2 className='mt-3'>
						Perdon por las molestias! hemos tenido un error! <br /> puedes
						comunicarte con nosotros a travez de estos links:
					</h2>
					<ul className='mt-3 space-y-1'>
						{contactLinks.map((link) => (
							<li key={uuidv4()}>
								<Link
									href={link.link}
									target='_blank'
									rel='noreferrer'
									className='text-secondary underline'
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>

					<div className='flex items-center mt-6 gap-x-3'>
						<button
							type='button'
							className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border border-secondary rounded-lg gap-x-2 sm:w-auto hover:bg-secondary hover:text-white'
							onClick={() => router.back()}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='currentColor'
								className='w-5 h-5 rtl:rotate-180'
							>
								<title>Volver</title>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
								/>
							</svg>

							<span>Volver</span>
						</button>

						<Link
							href='/'
							className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-secondary rounded-lg shrink-0 sm:w-auto hover:bg-secondary/70'
						>
							Pagina Principal
						</Link>

						<button
							type='button'
							className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border border-secondary rounded-lg gap-x-2 sm:w-auto hover:bg-secondary hover:text-white'
							onClick={() => reset()}
						>
							<span>Reintentar</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='1.5'
								stroke='currentColor'
								className='w-5 h-5 rotate-180'
							>
								<title>Reintentar</title>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
								/>
							</svg>
						</button>
					</div>
				</div>

				<div className='relative w-full mt-8 lg:w-1/2 lg:mt-0'>
					<Image
						className='w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover '
						src={Image500}
						alt='Imagen Lavanda 404'
						title='Imagen Lavanda 404'
					/>
				</div>
			</div>
		</section>
	)
}
