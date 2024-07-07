import type { Posts } from '@/types'
import { ServerFetchError } from '../shared/server-fetch-error'
import { ArticleListCard } from './article-card'

const Related = async ({ category }: { category: string }) => {
	// ??? Use the category to fetch the related articles
	try {
		const response = await fetch('https://jsonplaceholder.org/posts')
		const posts: Posts[] = await response.json()
		return (
			<section id='related-articles' className='w-full h-auto'>
				<h2 className='text-3xl'>Articulos Relacionados</h2>
				<ul className='gap-5 mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
					{posts.slice(0, 3).map((post: Posts) => (
						<li key={post.id}>
							<ArticleListCard article={post} />
						</li>
					))}
				</ul>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default Related
