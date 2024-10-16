// Type Imports
import type { Posts } from '@/types'

// Project Components Imports
import ServerFetchError from '@/components/shared/server-fetch-error'

import { ArticleListCard } from '@/components/blog/article-card'
import NoData from '@/components/shared/no-data'

// Queries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { relatedArticlesByCategory } from '@sanity-studio/queries'

// Axiom Imports
import { Logger } from 'next-axiom'

/**
 * Fetches and renders related articles based on the provided category.
 *
 * @param {string} category - The category of articles to fetch.
 * @return {Promise<JSX.Element>} A section containing a list of related article cards.
 */
const Related = async ({
  category
}: {
  category: string
}): Promise<JSX.Element> => {
  // Axiom Init
  const log = new Logger()
  try {
    const response = await sanityClientRead.fetch(
      relatedArticlesByCategory,
      {
        category
      },
      {
        next: { revalidate: 60 }
      }
    )

    if (response.length === 0) {
      return <NoData data='No hay Artículos relacionados' />
    }

    return (
      <section id='related-articles' className='h-auto w-full'>
        <h2 className='text-3xl'>Artículos Relacionados</h2>
        <ul className='mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {response.slice(0, 3).map((post: Posts) => (
            <li key={post.id}>
              <ArticleListCard article={post} />
            </li>
          ))}
        </ul>
      </section>
    )
  } catch (error) {
    log.info('Error fetching in the blog related component', { data: error })

    await log.flush()
    return <ServerFetchError error={error} />
  }
}

export default Related
