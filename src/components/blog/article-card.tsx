// Type Imports
import type { Posts } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

const ArticleCard = ({
  article,
  index = 1
}: {
  article: Posts
  index?: number
}): JSX.Element => {
  return (
    <Link
      key={article.id}
      href={`/blog/${article.slug}`}
      className={`group relative overflow-hidden rounded-lg ${
        index === 0 ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Image
        src={article.image}
        alt={article.title}
        width={index === 0 ? 600 : 400}
        height={index === 0 ? 400 : 300}
        className='h-full w-full object-cover opacity-95 transition-transform duration-300 ease-in-out group-hover:scale-105'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent' />
      <div className='absolute bottom-0 left-0 right-0 p-6'>
        {index === 0 &&
          article.categories.map((category) => (
            <span
              key={category}
              className='bg-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold text-white'
            >
              {category}
            </span>
          ))}
        <h3 className='mb-2 text-xl font-bold text-white transition-colors duration-200 ease-in-out group-hover:text-secondary md:text-2xl'>
          {article.title}
        </h3>
        <p className='mb-2 line-clamp-2 text-sm text-gray-100'>
          {article.description}
        </p>
        <span className='text-xs text-gray-100'>
          {index === 0 &&
            new Date(article.createdAt).toLocaleDateString('es-ES')}
        </span>
      </div>
    </Link>
  )
}

const ArticleListCard = ({ article }: { article: Posts }) => {
  return (
    <article className='group overflow-hidden'>
      <Link href={`/blog/${article.slug}`}>
        <Image
          src={article.image}
          alt={article.title}
          width={500}
          height={300}
          className='aspect-video object-cover'
        />
        <div className='mt-3 space-y-2 p-2'>
          <h3 className='text-lg font-semibold leading-none tracking-tight text-accent'>
            {article.title}
          </h3>
        </div>
        <div>
          <p className='text-muted-foreground line-clamp-2 text-sm'>
            {article.description}
          </p>
        </div>
        <div>
          <span className='text-primary text-sm font-semibold transition-colors duration-200 ease-in-out group-hover:text-accent'>
            Leer Mas
          </span>
        </div>
      </Link>
    </article>
  )
}

export { ArticleCard, ArticleListCard }
