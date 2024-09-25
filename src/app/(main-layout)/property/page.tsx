// Types Imports
import type { Property } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { property } from '@/lib/queries'
import Image from 'next/image'
import { badges } from '@/constants/site-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PortableText } from 'next-sanity'
import { buttonVariants } from '@/components/ui/button'
import { urlize } from '@/lib/utils'
import Link from 'next/link'

// Function to genarte Metadata for this page
export async function generateMetadata(): Promise<Metadata> {
	const response: Property = await sanityClientRead.fetch(property)

	return {
		title: response.title,
		description: response.product.descripcion,
	}
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the property page.
 */
const ProperyPage = async (): Promise<JSX.Element> => {
	const response: Property = await sanityClientRead.fetch(property)

	return (
		<section
			id='ProperyPage'
			className='mx-auto max-w-screen-lg px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12 text-balance text-center items-center'
		>
			<h1 className='text-xl md:text-5xl text-accent'>{response.title}</h1>
			<div className='w-full grid md:grid-cols-3'>
				<div className='col-span-2 flex flex-col justify-center gap-5'>
					<p className='text-xl tracking-wide leading-relaxed'>
						{response.product.descripcion}
					</p>
					<div className='w-full flex-wrap flex gap-5 justify-center items-center'>
						{badges.map((badge) => (
							<Avatar key={badge.alt} className='w-16 h-16 mb-4 border-2'>
								<AvatarImage
									src={badge.src.src}
									alt={badge.alt}
									title={badge.title}
								/>
								<AvatarFallback>
									{badge.title
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>
						))}
					</div>
					<br />
				</div>
				<Image
					src={response.product.image}
					alt={response.title}
					title={response.title}
					width={500}
					height={500}
					className='col-span-1'
				/>
			</div>
			<Image
				src={response.featuredImage}
				alt={response.title}
				title={response.title}
				width={1920}
				height={1080}
			/>
			<div className='[&>p]:text-lg [&>p]:mt-5 [&>p:first-child]:mt-0'>
				<PortableText value={response.content} />
			</div>
			<Link
				href={
					response.product.nombre && response.product.categoria
						? `/products/${urlize(response.product.nombre)}?category=${response.product.categoria}`
						: '/products'
				}
				className={`${buttonVariants({ variant: 'cart' })} w-fit uppercase`}
			>
				Comprar Ahora
			</Link>
		</section>
	)
}

export default ProperyPage
