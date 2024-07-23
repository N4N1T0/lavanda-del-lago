'use client'

// Next.js Imports
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Assets Imports
import { Image404 } from '@/assets'

export default function NotFound() {
	const router = useRouter()
	return (
		<section className='bg-white '>
			<div className='container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12'>
				<div className='wf-ull lg:w-1/2'>
					<p className='font-medium text-accent text-5xl uppercase'>
						Error 404
					</p>
					<h1 className='mt-3 text-xl md:text-2xl font-bold text-gray-800'>
						Hemos perdido esta Pagina
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
									stroke-linecap='round'
									stroke-linejoin='round'
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

					<div className='mt-10 space-y-6'>
						<div>
							<Link
								href='/products'
								className='inline-flex items-center text-sm text-accent gap-x-2 hover:underline'
							>
								<span>Productos</span>

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
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
									/>
								</svg>
							</Link>

							<p className='mt-2 text-sm text-gray-500'>
								Explora nuestra colección de productos.
							</p>
						</div>

						<div>
							<Link
								href='/ofertas'
								className='inline-flex items-center text-sm text-accent gap-x-2 hover:underline'
							>
								<span>Nuevas Ofertas</span>

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
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
									/>
								</svg>
							</Link>

							<p className='mt-2 text-sm text-gray-500'>
								Encuentra las mejores ofertas.
							</p>
						</div>

						<div>
							<Link
								href='/blog'
								className='inline-flex items-center text-sm text-accent gap-x-2 hover:underline'
							>
								<span>Nuestro Blog </span>

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
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
									/>
								</svg>
							</Link>

							<p className='mt-2 text-sm text-gray-500'>
								Explora lo mejor de nuestros articulos
							</p>
						</div>
					</div>
				</div>

				<div className='relative w-full mt-8 lg:w-1/2 lg:mt-0'>
					<Image
						className='w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover '
						src={Image404}
						alt='Imagen Lavanda 404'
						title='Imagen Lavanda 404'
					/>
				</div>
			</div>
		</section>
	)
}
