// Types Imports
import type { Posts, Product, SeoMetaTags } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { seo } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Assets Imports
import { MainLogo } from '@/assets'

export async function seoMetatags(): Promise<Metadata> {
  const response: SeoMetaTags = await sanityClientRead.fetch(
    seo,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  return {
    title: {
      template: response?.titleTemplate || '%s  |  Lavanda del Lago',
      default:
        response?.defaultTitle || 'Lavanda del Lago | Productos de Lavanda'
    },
    description:
      response?.description ||
      'Lavanda del Lago ofrece productos de lavanda de alta calidad directamente desde nuestras granjas hasta tu hogar.',
    authors: [
      { name: 'Adrian Alvarez', url: 'https://www.adrian-alvarez.dev/es/' }
    ],
    generator: 'Next.js',
    applicationName: 'Lavanda del Lago',
    referrer: 'origin-when-cross-origin',
    keywords: response?.keywords || [
      'lavanda',
      'productos de lavanda',
      'lavender products',
      'nextjs',
      'boilerplate'
    ],
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png'
    },
    creator: 'Adrian Alvarez',
    publisher: 'Lavanda del Lago',
    category: 'E-commerce, Productos de Lavanda, Salud y Belleza',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
      date: true,
      url: true
    },
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title:
        response?.defaultTitle || 'Lavanda del Lago | Productos de Lavanda',
      description:
        response?.description ||
        'Descubre productos de lavanda premium en Lavanda del Lago.',
      url: response?.openGraph?.url || 'https://www.lavandadellago.com',
      siteName: response?.dominio || 'Lavanda del Lago',
      images: response?.openGraph?.images?.map((image) => ({
        url: image.imageUrl || 'https://www.lavandadellago.com/og-image.jpg',
        width: image.width || 1200,
        height: image.height || 630,
        alt: image.alt || 'Lavanda del Lago'
      })) || [
        {
          url: 'https://www.lavandadellago.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Lavanda del Lago'
        }
      ],
      locale: 'es_ES',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@lavandadellago',
      creator: '@adrian_alvarez',
      title: 'Lavanda del Lago | Productos de Lavanda',
      description: 'Descubre productos de lavanda premium en Lavanda del Lago.',
      images: response?.twitter?.images?.map((image) => image.imageUrl) || [
        'https://www.lavandadellago.com/og-image.jpg'
      ]
    }
  }
}

export const jldProduct = (product: Product | null) => {
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': product?.nombre || 'Product Name',
    'image':
      product?.fotosVarias && product?.fotosVarias.length > 0
        ? product?.fotosVarias.map((img) => img.image)
        : [product?.image],

    'description': product?.descripcion,
    'brand': {
      '@type': 'Brand',
      'name': 'Lavanda del Lago'
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldProductList = (products: Product[]) => {
  console.log(products[0])
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': [
      ...products.map((product) => ({
        '@type': 'Product',
        'name': product?.nombre || 'Product Name',
        'image': [product.image],
        'description': product?.descripcion
      }))
    ]
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldBlogArticle = (article: Posts) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'image': article.image,
    'description': article.description,
    'author': {
      '@type': 'Person',
      'name': article.author.name
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Lavanda del Lago',
      'logo': {
        '@type': 'ImageObject',
        'url': MainLogo.src
      }
    },
    'datePublished': article.createdAt
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// TODO info
export const jldHomePage = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Lavanda del Lago',
    'url': process.env.CI
      ? 'http://localhost:3000'
      : 'https://www.lavandadellago.es',
    'logo': MainLogo.src,
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-800-555-1234',
      'contactType': 'Customer Service'
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export const jldAboutUs = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'Lavanda del Lagoo',
      'description':
        'Somos una empresa joven que viaja rápido. Con una flor queremos hacer todo y lo estamos logrando. Es un mundo nuevo que huele a lavanda.'
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
