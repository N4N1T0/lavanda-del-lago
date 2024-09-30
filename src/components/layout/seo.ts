// Types Imports
import type { SeoMetaTags } from '@/types'
import type { Metadata } from 'next'

// Queries Imports
import { seo } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

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
