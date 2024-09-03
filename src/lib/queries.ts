import { groq } from 'next-sanity'

// SANITY QUERIES
export const featuredBlogArticles = groq`
*[_type == "blog-articles" && featured]{
  categories,
  "image": mainImage.asset->url,
  title,
  description,
  author->{
    name
  },
  "id":_id,
  "slug": slug.current,
  "createdAt":_createdAt
}`

export const allBlogArticles = groq`
*[_type == "blog-articles"]{
  categories,
  "image": mainImage.asset->url,
  title,
  description,
  author->{
    name
  },
  "id":_id,
  "slug": slug.current,
  "createdAt":_createdAt
}`

export const blogArticleById = (slug: string) => {
	return groq`
  *[_type == "blog-articles" && slug.current == "${slug}"][0]{
  categories,
  "image": mainImage.asset->url,
  title,
  description,
  author->{
    name
  },
  content,
  "createdAt":_createdAt
}
  `
}

export const relatedArticulesByCategory = (category: string) => {
	return groq`
  *[_type == "blog-articles" && "${category}" in categories]{
  categories,
  "image": mainImage.asset->url,
  title,
  description,
  author->{
    name
  },
  "id":_id,
  "slug": slug.current,
  "createdAt":_createdAt
}
  `
}

export const aboutUsPage = groq`
*[_type == "aboutPage"][0]{
  title,
  description,
  stats,
  "statImage":stats_image.asset->url,
  second_section_title,
  second_section_description,
  teams_section_title,
  teams_section_description,
  teams[]->{
    name,
    description,
    "image": image.asset->url,
    role,
    links,
    "id": _id
  }
}
`

export const homePage = groq`
*[_type == "homePage"]{
  bentoThreeImages[]{
    "image": asset->url
  },
  featuredEvent->{
    date,
    title,
    "image": image.asset->url,
    description,
    urls[]{
      "id": _key,
      calendarName,
      calendarUrl
    }
  },
  carousel1,
  carousel2,
  InfoCards[][]{
    "id": _key,
    title,
    description,
    "icon": icon.asset->url
 },
  bentofeaturedCategory,
  bentoFeaturedProducto->{
    nombre,
    descripcion,
    categoria,
    "id": _id,
    "image": fotoPrincipal.asset->url,
  }
}[0]
`
export const events = groq`
*[_type == "events"]{
  "id": _id,
  date,
  title,
  "image": image.asset->url,
  description,
  urls[]{
    "id": _key,
    calendarName,
    calendarUrl
  }
}
`
export const categories = groq`
*[_type == "product"]{
  categoria
} | order(categoria)
`

export const allProducts = groq`
*[_type == "product"]{
  "id": _id,
  nombre,
  descripcion,
  precio,
  "image": fotoPrincipal.asset->url,
  categoria
}
`

export const productsByCategory = (category: string) => {
	return groq`
  *[_type == "product" && categoria == "${category}"]{
  "id": _id,
  nombre,
  descripcion,
  precio,
  "image": fotoPrincipal.asset->url,
  categoria
}
  `
}

export const cookiePolicy = groq`
*[_type == "cookiePolicy"][0]
`

export const privacyPolicy = groq`
*[_type == "privacyPolicy"][0]
`
