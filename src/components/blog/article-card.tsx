// Type Imports
import type { Posts } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

const ArticleCard = ({
	article,
	index = 1,
}: { article: Posts; index?: number }): JSX.Element => {
	return (
		<li
			className={`col-span-1 flex gap-3 ${
				index === 0 ? 'row-span-2 flex-col' : 'row-span-1 flex-row'
			}`}
		>
			<Link
				href={`/blog/${article.slug}`}
				className='group overflow-hidden rounded-md'
			>
				<Image
					src={article.image}
					alt={article.title}
					title={article.title}
					className={`${
						index !== 0 ? 'aspect-square' : 'w-full h-full flex-1'
					} group-hover:scale-110 transition-all duration-300 ease-in-out object-cover`}
					width={300}
					height={300}
					priority
				/>
			</Link>
			<div className='flex-1 space-y-3 flex flex-col justify-between items-start py-5 px-2'>
				<small className='text-accent'>
					{article.author.name} -{' '}
					{new Date(article.createdAt).toLocaleDateString('es-ES')}
				</small>
				<Link
					href={`/blog/${article.slug}`}
					className='text-xl hover:text-accent transition-colors duration-200 ease-in-out'
				>
					{article.title}
				</Link>
				<p className='text-gray-600'>{article.description}</p>
				<ul className='text-tertiary flex gap-2'>
					{article.categories.map((category) => (
						<li key={uuidv4()} className='text-sm'>
							{category}
						</li>
					))}
				</ul>
			</div>
		</li>
	)
}

const ArticleListCard = ({ article }: { article: Posts }) => {
	return (
		<article className='col-span-1 w-full h-auto'>
			<Link
				href={`/blog/${article.slug}`}
				className='group overflow-hidden w-full h-full block rounded-md'
			>
				<Image
					src={article.image}
					alt={article.title}
					title={article.title}
					className='group-hover:scale-110 transition-all duration-300 ease-in-out h-full min-w-full'
					width={300}
					height={300}
				/>
			</Link>
			<div className='flex-1 space-y-3 flex flex-col justify-between items-start py-5 px-2'>
				<small className='text-accent'>
					{article.author.name} -{' '}
					{new Date(article.createdAt).toLocaleDateString('es-ES')}
				</small>
				<Link
					href={`/blog/${article.slug}`}
					className='text-xl hover:text-accent transition-colors duration-200 ease-in-out'
				>
					<h1>{article.title}</h1>
				</Link>
				<p className='text-gray-600'>{article.description}</p>
				<ul className='text-tertiary flex gap-2'>
					{article.categories.map((category) => (
						<li key={uuidv4()} className='text-sm'>
							{category}
						</li>
					))}
				</ul>
			</div>
		</article>
	)
}

export { ArticleCard, ArticleListCard }
