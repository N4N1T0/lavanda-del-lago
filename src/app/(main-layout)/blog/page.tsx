// Project Components Imports
import ArticleList from '@/components/blog/article-list'
import FeaturedBlogArticles from '@/components/blog/featured'

// Type imports
import type { Metadata } from 'next'

// Metdata Configuration for this page
export const metadata: Metadata = {
	title: 'Blog',
	description:
		'Encuentra tips y trucos sobre el cuidado personal, la salud y el bienestar en nuestro blog. En Lavanda del Lago te ofrecemos productos naturales y artesanales de alta calidad, elaborados con aceites esenciales de lavanda y otras plantas medicinales. Descubre nuestros consejos y recomendaciones para una vida mas saludable y sostenible.',
}

/**
 * Fetches blog posts from the JSONPlaceholder API and renders the featured articles.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the featured articles section.
 */
const BlogPage = async (): Promise<JSX.Element> => {
	return (
		<section
			id='blog'
			className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12'
		>
			<FeaturedBlogArticles />
			<ArticleList />
		</section>
	)
}

export default BlogPage
