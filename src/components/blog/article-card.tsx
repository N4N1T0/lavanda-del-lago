// Type Imports
import type { Posts } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

const ArticleCard = ({
	article,
	index = 1,
}: { article: Posts; index?: number }): JSX.Element => {
	return (
		<Link
			key={article.id}
			href={`/blog/${article.slug}`}
			className={`group relative overflow-hidden rounded-lg ${
				index === 0 ? 'md:col-span-2 md:row-span-2' : ''
			}`}
		>
			<Image
				src={article.image}
				alt={article.title}
				width={index === 0 ? 600 : 400}
				height={index === 0 ? 400 : 300}
				className='object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 opacity-95'
			/>
			<div className='absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent' />
			<div className='absolute bottom-0 left-0 right-0 p-6'>
				{index === 0 &&
					article.categories.map((category) => (
						<span
							key={category}
							className='inline-block px-3 py-1 mb-2 text-xs font-semibold text-white bg-primary rounded-full'
						>
							{category}
						</span>
					))}
				<h3 className='text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-200 ease-in-out'>
					{article.title}
				</h3>
				<p className='text-sm text-gray-100 mb-2 line-clamp-2'>
					{article.description}
				</p>
				<span className='text-xs text-gray-100'>
					{index === 0 &&
						new Date(article.createdAt).toLocaleDateString('es-ES')}
				</span>
			</div>
		</Link>
	)
}

const ArticleListCard = ({ article }: { article: Posts }) => {
	return (
		<article className='overflow-hidden group'>
			<Link href={`/blog/${article.slug}`}>
				<Image
					src={article.image}
					alt={article.title}
					width={500}
					height={300}
					className='object-cover aspect-video'
				/>
				<div className='p-2 mt-3 space-y-2'>
					<h3 className='text-lg font-semibold leading-none tracking-tight text-accent'>
						{article.title}
					</h3>
				</div>
				<div>
					<p className='text-sm text-muted-foreground line-clamp-2'>
						{article.description}
					</p>
				</div>
				<div>
					<span className='text-sm font-semibold text-primary group-hover:text-accent transition-colors duration-200 ease-in-out'>
						Leer Mas
					</span>
				</div>
			</Link>
		</article>
	)
}

export { ArticleCard, ArticleListCard }
