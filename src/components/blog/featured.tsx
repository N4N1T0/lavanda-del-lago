// Type imports
import type { Posts } from '@/types'

// Proyect Components Imports
import { ArticleCard } from '@/components/blog/article-card'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Queries Imports
import { featuredBlogArticles } from '@/lib/queries'
import { sanityClient } from '@sanity-studio/lib/client'

/**
 * Renders a section containing featured blog articles.
 *
 * @param {Object} props - The properties object.
 * @param {Posts[]} props.articles - An array of blog articles to be rendered.
 * @return {Promise<JSX.Element>} A section containing a grid of featured blog articles.
 */
const FeaturedBlogArticles = async (): Promise<JSX.Element> => {
	try {
		const articles = await sanityClient.fetch(featuredBlogArticles)

		return (
			<section id='featured' className='w-full'>
				<ul className='grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 w-full gap-5'>
					{articles.map((article: Posts, index: number) => (
						<ArticleCard key={article.id} article={article} index={index} />
					))}
				</ul>
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default FeaturedBlogArticles
