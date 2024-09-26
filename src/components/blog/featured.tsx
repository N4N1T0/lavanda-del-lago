// Project Components Imports
import { ArticleCard } from '@/components/blog/article-card'

// Types Imports
import type { Posts } from '@/types'

/**
 * Renders a section containing featured blog articles.
 *
 * @param {Object} props - The properties object.
 * @param {Posts[]} props.articles - An array of blog articles to be rendered.
 * @return {JSX.Element} A section containing a grid of featured blog articles.
 */
const FeaturedBlogArticles = ({
	articles,
}: {
	articles: Posts[]
}): JSX.Element => {
	return (
		<section id='featured' className='container mx-auto px-4 py-12'>
			<h2 className='text-3xl font-bold mb-8 text-center'>
				Articulos Destacados
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{articles.map((article, index) => (
					<ArticleCard key={article.id} article={article} index={index} />
				))}
			</div>
		</section>
	)
}

export default FeaturedBlogArticles
