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
 mainListCategories,
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
  categoria,
  stock,
  "createdAt": _createdAt
}
`

export const productByName = (name: string) => {
	return groq`
  *[_type == "product" && nombre == "${name}"]{
  "id": _id,
  nombre,
  descripcion,
  precio,
  "image": fotoPrincipal.asset->url,
  categoria,
  stock,
  "createdAt": _createdAt,
  usabilidad,
  subcategoria,
  codigoReferencia,
  certificacion,
  medidas,
  codigoBarras,
  slogan,
  "fichaTecnica": fichaTecnica.asset->url,
  fotosVarias[]{
    "image": asset->url,
    "key": _key
  }
}[0]
  `
}

export const productsByCategory = (category: string) => {
	return groq`
  *[_type == "product" && categoria == "${category}"]{
  "id": _id,
  nombre,
  descripcion,
  precio,
  "image": fotoPrincipal.asset->url,
  categoria,
  stock,
  "createdAt": _createdAt
}
  `
}

export const footer = groq`
*[_type == "footer"]{
  subtitle,
  socialMedia[]{
    link,
    platformName,
    "id": _key
  },
  contactInfo,
  copyright
}[0]
`

export const policiesPages = (name: 'cookie' | 'privacy' | 'sales') => {
	switch (name) {
		case 'cookie':
			return groq`*[_type == "cookiePolicy"]{
        title,
        description,
        content
      }[0]
      `
		case 'privacy':
			return groq`*[_type == "privacyPolicy"]{
        title,
        description,
        content
      }[0]
      `
		case 'sales':
			return groq`*[_type == "salesPolicy"]{
        title,
        description,
        content
      }[0]
      `
	}
}

export const errorPages = (name: 'error' | 'not-found') => {
	return name === 'error'
		? groq`*[_type == "errorPage"]{
      title,
      description,
      digest,
      "imageUrl": image.asset->url,
      contacts[]{
        label,
        link
      }
    }[0]
    `
		: groq`*[_type == "notFoundPage"]{
      title,
      description,
      digest,
      "imageUrl": image.asset->url,
      links
    }[0]
    `
}

export const prefooter = groq`*[_type == "prefooter"]{
  title,
  description,
  "imageUrl": image.asset->url,
  link
}[0]`

export const seo = groq`*[_type == "seoMetatags"]{
  titleTemplate,
  defaultTitle,
  description,
  keywords[],
  dominio,
  "openGraph": {
    url,
    images[]{
      "imageUrl": asset->url,
      alt,
      width,
      height
    }
  },
  "twitter": {
    images[]{
      "imageUrl": asset->url,
      alt
    }
  }
}[0]
`

export const userById = (id: string) => {
	return groq`
  *[_type == "user" && _id == "${id}"]{
  "id": _id,
  email,
  image,
  name,
  phone,
  address,
  reseller,
  "pastPurchases": *[_type == "purchase" && userEmail._ref == ^._id]{
    "id": _id,
    products[]->{
      "id": _id,
      nombre,
      "image": fotoPrincipal.asset->url,
      categoria
    },
    totalAmount,
    purchaseDate,
    paymentMethod,
    status,
    reseller
  }
}[0]
  `
}
