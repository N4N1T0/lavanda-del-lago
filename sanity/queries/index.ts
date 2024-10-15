import { groq } from 'next-sanity'

// PAGES
export const aboutUsPage = groq`
*[_type == "aboutPage"][0]{
  title,
  description,
  stats,
  "statImage":stats_image.asset->{
    url,
    "blur": metadata.lqip
  },
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
    "id": _key,
    "image": bentoImage.asset->{
      url,
      "blur": metadata.lqip
    },
    "link": imageLink
  },
  featuredEvent->{
    date,
    title,
    "image": image.asset->{
      url,
      "blur": metadata.lqip
    },
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

export const cookiePolicy = groq`
  *[_type == "cookiePolicy"]{
    title,
    content
  }[0]
`

export const privacyPolicy = groq`
  *[_type == "privacyPolicy"]{
    title,
    content
  }[0]
`

export const salesPolicy = groq`
  *[_type == "salesPolicy"]{
    title,
    content
  }[0]
`

export const errorPage = groq`
  *[_type == "errorPage"]{
    digest,
    "imageUrl": image.asset->url,
    contacts[] {
      label,
      link
    }
  }[0]
`

export const notFoundPage = groq`
  *[_type == "notFoundPage"]{
    digest,
    "imageUrl": image.asset->url,
    links
  }[0]
`

export const prefooter = groq`*[_type == "prefooter"]{
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

export const jusAFLower = groq`*[_type == "justAFlower"]{
   "mainImage": mainImage.asset->{
     url,
     "blur": metadata.lqip
   },
   "secondaryImage": secondaryImage.asset->{
     url,
     "blur": metadata.lqip
   },
   text,
   secondaryText,
   quote,
   title
 }[0]
`

export const property = groq`*[_type == "property"]{
  title,
  content,
  "product": featuredProduct->{
     nombre,
    descripcion,
    precio,
    "image": fotoPrincipal.asset->url,
    categoria,
    stock,
    usabilidad,
  },
  "featuredImage": featuredImage.asset->{
     url,
     "blur": metadata.lqip
   }
}[0]
`

export const remedies = groq`*[_type == "remedies"]{
  title,
  firstDescription,
  "dualImage": dualImage[].asset->{
     url,
     "blur": metadata.lqip
   },
  secodDescription,
  benefits[]{
    "image": image.asset->url,
    description
  }
}[0]
`

export const certifications = groq`*[_type == 'certifications']{
  title,
  certificationsBlocks[]{
    title, 
    description
  }
}[0]`

// BLOG
export const allBlogArticles = groq`
*[_type == "blog-articles"]{
  categories,
  "image": mainImage.asset->{
    url,
    "blur": metadata.lqip
  },
  title,
  description,
  "id":_id,
  "slug": slug.current,
  "createdAt":_createdAt,
  featured
}`

export const blogArticleById = groq`
  *[_type == "blog-articles" && slug.current == $slug][0]{
    categories,
    "image": mainImage.asset->{
    url,
    "blur": metadata.lqip
  },
    title,
    description,
    author->{
      name
    },
    content,
    "createdAt":_createdAt
  }
`

export const relatedArticlesByCategory = groq`
  *[_type == "blog-articles" && $category in categories]{
    categories,
    "image": mainImage.asset->{
    url,
    "blur": metadata.lqip
  },
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

// PRODUCTS
export const categories = groq`
*[_type == "product"]{
  categoria
} | order(categoria)
`

export const allProducts = groq`
*[_type == "product" && stock > 0] {
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

export const productByName = groq`
  *[_type == "product" && nombre in $name]{
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
    composicion,
    certificacion,
    medidas,
    codigoBarras,
    slogan,
    "fichaTecnica": fichaTecnica.asset->url,
    fotosVarias[] {
      "image": asset->url,
      "key": _key
    }
  }[0]
`

export const productsByCategory = groq`
  *[_type == "product" && categoria == $category && stock > 0]{
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

export const oramaIndexDeployUpdatedProducts = groq`
*[_type == "product" && dateTime(_updatedAt) >= dateTime(now()) - 60*60*24] {
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
    fotosVarias[] {
      "image": asset->url,
      "key": _key
    }
}
`

// AUTH
export const userByIdCompleted = groq`
  *[_type == "user" && _id == $id][0] {
  "id": _id,
  email,
  "image": image.asset->url,
  name,
  phone,
  address,
  reseller,
  discount,
  "idDocument": {
    "type": idDocument.type,
    "value": idDocument.value
  },
  "pastPurchases": *[_type == "purchase" && userEmail._ref == ^._id] {
    "id": _id,
    products[] {
      product-> {
        "id": _id,
        nombre,
        "image": fotoPrincipal.asset->url,
        categoria,
        precio
      },
      quantity
    },
    totalAmount,
    purchaseDate,
    paymentMethod,
    status,
    reseller
  }
}
`

export const userByIdPartial = groq`
  *[_type == "user" && _id == $id][0] {
  "id": _id,
  email,
  "image": image.asset->url,
  name,
  phone,
  address,
  reseller,
  discount,
  "idDocument": {
    "type": idDocument.type,
    "value": idDocument.value
  },
}
`

export const discountOfReseller = groq`
 *[_type == "user" && _id == $userId][0] {
  discount
}
`

// MISC
export const events = groq`
*[_type == "events"]{
  "id": _id,
  date,
  title,
  "image": image.asset->{
      url,
      "blur": metadata.lqip
    },
  description,
  urls[]{
    "id": _key,
    calendarName,
    calendarUrl
  }
}
`

// TODO Partial Product Query
