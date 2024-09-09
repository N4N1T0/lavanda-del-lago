// Type Imports
import type { Posts } from '@/types'

// Proyect Components Imports
import { ArticleListCard } from '@/components/blog/article-card'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Queries Imports
import { allBlogArticles } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

/**
 * Fetches and displays a list of all blog articles.
 *
 * @return {Promise<JSX.Element>} A JSX element containing the list of articles.
 */
const ArticleList = async (): Promise<JSX.Element> => {
	try {
		const articles = await sanityClientRead.fetch(allBlogArticles)

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
				{/* TODO Add Pagination */}
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default ArticleList
