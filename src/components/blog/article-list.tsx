// Type Imports
import type { Posts } from '@/types'

// Proyect Components Imports
import { ArticleListCard } from '@/components/blog/article-card'

/**
 * Fetches and displays a list of all blog articles.
 *
 * @return {Promise<JSX.Element>} A JSX element containing the list of articles.
 */
const ArticleList = async (
  { articles }: { articles: Posts[] }
): Promise<JSX.Element> => {
  return (
    <section id='article-list' className='container mx-auto px-4 py-12'>
      <h2 className='mb-8 text-center text-3xl font-bold'>
        Lista de Articulos
      </h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {articles.map((article) => (
          <ArticleListCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default ArticleList
