// Next.js Imports
import Image from 'next/image'

// Project components imports
import Related from '@/components/blog/related'
import Prefooter from '@/components/home/prefooter'
import Newsletter from '@/components/shared/newsletter'
import { ServerFetchError } from '@/components/shared/server-fetch-error'

// Types imports
import type { Posts } from '@/types'
import type { Metadata } from 'next'

// Sanity Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { blogArticleById } from '@/lib/queries'
import { PortableText } from 'next-sanity'

// function to generate metadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post: Posts = await sanityClientRead.fetch(blogArticleById, {
    slug: params.slug
  })

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: post.image
    }
  }
}

/**
 * Fetches a blog article from the JSONPlaceholder API based on the provided ID and renders its content.
 *
 * @param {{ params: { id: string } }} params - The ID of the blog article to fetch.
 * @return {Promise<JSX.Element>} The JSX element representing the blog article content.
 */
const BlogArticlePage = async (
  { params }: { params: { slug: string } }
): Promise<JSX.Element> => {
  try {
    const post: Posts = await sanityClientRead.fetch(blogArticleById, {
      slug: params.slug
    })

    return (
      <>
        <section
          id={post.title}
          className='mx-auto flex h-auto max-w-screen-2xl flex-col items-center gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-20'
        >
          {/* Display the title of the blog post */}
          <div className='w-full space-y-5 text-center md:w-3/4'>
            <h1 className='text-5xl'>{post.title}</h1>
            {/* Display the first 20 words of the blog post's content */}
            <p className='text-lg text-gray-600'>{post.description}</p>
          </div>
          {/* Display the main image of the blog post */}
          <Image
            src={post.image}
            alt={post.title}
            title={post.title}
            width={1800}
            height={1800}
            className='rounded-md shadow-md'
            priority
          />
          {/* Display the rest of the blog post's content */}
          <div className='w-full space-y-7 text-left md:w-3/4'>
            <PortableText value={post.content} />
          </div>
          <Related category={post.categories[0]} />
        </section>
        <Newsletter />
        <Prefooter />
      </>
    )
  } catch (error) {
    return <ServerFetchError error={error} />
  }
}

export default BlogArticlePage
