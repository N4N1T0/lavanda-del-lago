// Type Imports
import type { Posts } from '@/types'

// Proyect Components Imports
import { ArticleListCard } from '@/components/blog/article-card'

const ArticleList = ({ articles }: { articles: Posts[] }) => {
	return (
		<section id='articles-list' className='w-full mt-10'>
			<h2 className='text-3xl'>Todos los Posts</h2>
			<ul className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 w-full gap-10 mt-10'>
				{articles.map((article: Posts) => (
					<li key={article.id}>
						<ArticleListCard article={article} />
					</li>
				))}
			</ul>
			{/* Add Pagination */}
		</section>
	)
}

export default ArticleList
