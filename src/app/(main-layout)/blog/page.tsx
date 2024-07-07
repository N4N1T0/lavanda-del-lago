// Project Components Imports
import ArticleList from '@/components/blog/article-list'
import FeaturedBlogArticles from '@/components/blog/featured'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Type imports
import type { Posts } from '@/types'

/**
 * Fetches blog posts from the JSONPlaceholder API and renders the featured articles.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the featured articles section.
 */
const BlogPage = async (): Promise<JSX.Element> => {
	try {
		const response = await fetch('https://jsonplaceholder.org/posts')
		const posts: Posts[] = await response.json()

		return (
			<section
				id='blog'
				className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12'
			>
				<FeaturedBlogArticles articles={posts.slice(0, 3)} />
				<ArticleList articles={posts.slice(3, 10)} />
			</section>
		)
	} catch (error) {
		console.error(error)
		return <ServerFetchError error={error} />
	}
}

export default BlogPage
