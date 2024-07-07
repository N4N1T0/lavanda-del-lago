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
		<li
			className={`col-span-1 flex gap-3 ${
				index === 0 ? 'row-span-2 flex-col' : 'row-span-1 flex-row'
			}`}
		>
			<Link href={`/blog/${article.id}`} className='group overflow-hidden'>
				<Image
					src={article.image}
					alt={article.title}
					title={article.title}
					className={`${
						index !== 0 ? 'aspect-square' : 'w-full h-full object-cover flex-1'
					} group-hover:scale-110 transition-all duration-300 ease-in-out`}
					width={300}
					height={300}
				/>
			</Link>
			<div className='flex-1 space-y-3 flex flex-col justify-between items-start py-5 px-2'>
				<small className='text-accent'>
					Jose Perez - {article.publishedAt}
				</small>
				<Link
					href={`/blog/${article.id}`}
					className='text-xl hover:text-accent transition-colors duration-200 ease-in-out'
				>
					{article.title}
				</Link>
				<p className='text-gray-600'>
					{article.content.split(' ').slice(0, 20).join(' ')}
				</p>
				<ul className='text-tertiary flex gap-2'>
					{Array.from({ length: 3 })
						.fill(article.category)
						.map((item, index) => (
							<li key={`${item}-${index + 1}`}>{item as string}</li>
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
				href={`/blog/${article.id}`}
				className='group overflow-hidden w-full h-full block'
			>
				<Image
					src={article.image}
					alt={article.title}
					title={article.title}
					className='group-hover:scale-110 transition-all duration-300 ease-in-out h-full w-full'
					width={300}
					height={300}
				/>
			</Link>
			<div className='flex-1 space-y-3 flex flex-col justify-between items-start py-5 px-2'>
				<small className='text-accent'>
					Jose Perez - {article.publishedAt}
				</small>
				<Link
					href={`/blog/${article.id}`}
					className='text-xl hover:text-accent transition-colors duration-200 ease-in-out'
				>
					<h1>{article.title}</h1>
				</Link>
				<p className='text-gray-600'>
					{article.content.split(' ').slice(0, 20).join(' ')}
				</p>
				<ul className='text-tertiary flex gap-2'>
					{Array.from({ length: 3 })
						.fill(article.category)
						.map((item, index) => (
							<li key={`${item}-${index + 1}`}>{item as string}</li>
						))}
				</ul>
			</div>
		</article>
	)
}

export { ArticleCard, ArticleListCard }
