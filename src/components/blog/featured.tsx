// Type imports
import type { Posts } from '@/types'

// Proyect Components Imports
import { ArticleCard } from '@/components/blog/article-card'

/**
 * Renders a section containing featured blog articles.
 *
 * @param {Object} props - The properties object.
 * @param {Posts[]} props.articles - An array of blog articles to be rendered.
 * @return {JSX.Element} A section containing a grid of featured blog articles.
 */
const FeaturedBlogArticles = ({
	articles,
}: { articles: Posts[] }): JSX.Element => {
	return (
		<section id='featured' className='w-full'>
			<ul className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 w-full gap-5'>
				{articles.map((article: Posts, index: number) => (
					<ArticleCard key={article.id} article={article} index={index} />
				))}
			</ul>
		</section>
	)
}

export default FeaturedBlogArticles
