export interface Product {
  id: string
  categoria: string
  subcategoria: string
  codigoBarras: string
  nombre: string
  descripcion: string
  image: string
  createdAt: string
  codigoReferencia: string
  stock: number
  usabilidad: string
  certificacion: string
  medidas: Medidas
  precio: number
  slogan: string
  fichaTecnica: string
  fotosVarias: FotosVarias[]
}

export interface FotosVarias {
  image: string
  key: string
}

export interface Medidas {
  ancho: number
  profundidad: number
  alto: number
  volumen: number
}

export interface CartItem extends Product {
  quantity: number
}

export interface Breadcrumb {
  name: string
  path: string
}

export type Breadcrumbs = Array<Breadcrumb>

export interface Posts {
  id: string
  slug: string
  categories: string[]
  image: string
  title: string
  description: string
  author: Author
  content: Content[]
  createdAt: string
  featured: boolean
}

export interface Author {
  name: string
}

export interface Policies {
  _id: string
  _type: 'cookiePolicy'
  title: string
  description: string
  content: Content[]
}

export interface Content {
  children: Child[]
  _type: ContentType
  style: Style
  _key: string
  markDefs: unknown[]
  listItem?: ListItem
  level?: number
}

export type ContentType = 'block'

export interface Child {
  marks: Mark[]
  text: string
  _key: string
  _type: ChildType
}

export type ChildType = 'span'

export type Mark = 'strong'

export type ListItem = 'bullet'

export type Style = 'normal'

export interface AboutsPageType {
  title: string
  description: string
  second_section_title: string
  teams_section_title: string
  teams_section_description: string
  stats: Stat[]
  statImage: string
  second_section_description: Content[]
  teams: Team[]
}

export interface Stat {
  description: string
  _key: string
  title: string
  value: string
}

export interface Team {
  role: string
  links: Link[]
  name: string
  description: string
  image: string
  id: string
}

export interface Link {
  _key: string
  title: string
  url: string
}

export interface HomePageType {
  featuredEvent: Event
  carousel1: Carousel
  carousel2: Carousel
  InfoCards: InfoCard[]
  bentofeaturedCategory: BentofeaturedCategory
  bentoFeaturedProducto: Product
  bentoThreeImages: BentoThreeImage[]
  mainListCategories: string[]
}

export interface BentoThreeImage {
  image: string
}

export interface BentofeaturedCategory {
  title: string
  description: string
}

export interface Carousel {
  category: string
  title: string
}

export interface InfoCard {
  id: string
  title: string
  description: string
  icon: string
}

export interface Event {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _def: any
  description: string
  urls: URL[]
  id: string
  date: Date
  image: string
  title: string
}

export interface URL {
  id: string
  calendarName: string
  calendarUrl: string
}

export interface CategoriesList {
  categoria: string
}

export interface Footer {
  subtitle: string
  socialMedia: SocialMedia[]
  contactInfo: ContactInfo
  copyright: string
  logo: string
}

export interface ContactInfo {
  email: string
  phone: string
}

export interface SocialMedia {
  link: string
  platformName: string
  id: string
}

export interface ErrorPage {
  contacts: Contact[]
  title: string
  description: string
  digest: string
  imageUrl: string
}

export interface Contact {
  label: string
  link: string
}

export interface NotFoundPage {
  imageUrl: string
  links: string[]
  title: string
  description: string
  digest: string
}

export interface Prefooter {
  title: string
  description: string
  imageUrl: string
  link: string
}

export interface SeoMetaTags {
  titleTemplate: string
  defaultTitle: string
  description: string
  keywords: string[]
  dominio: string
  openGraph: {
    url: string
    images: {
      imageUrl: string
      alt: string
      width?: number
      height?: number
    }[]
  }
  twitter: {
    images: {
      imageUrl: string
      alt: string
    }[]
  }
}

export interface User {
  name: string
  phone: string | null
  address: {
    street: string | null
    floor: string | null
    postal_code: string | null
    locality: string | null
  } | null
  reseller?: boolean | null
  idDocument: {
    type: 'dni' | 'nie'
    value: string | null
  } | null
  pastPurchases?: PastPurchase[]
  id?: string
  email: string
  password?: string | null
  image?: string
  discount?: number
}

export interface PastPurchase {
  id: string
  products: CartItem[]
  totalAmount: number
  purchaseDate: string
  paymentMethod: string
  status: string
  reseller: null
}

export interface JustAFlower {
  secondaryText: string
  quote: string
  mainImage: string
  secondaryImage: string
  text: string
  title: string
}

export interface Property {
  title: string
  content: Content[]
  product: Product
  featuredImage: string
}

export interface Remedies {
  title: string
  firstDescription: string
  dualImage: string[]
  secodDescription: string
  benefits: Benefit[]
}

export interface Benefit {
  image: string
  description: string
}

export interface Certifications {
  title: string
  certificationsBlocks: CertificationsBlock[]
}

export interface CertificationsBlock {
  title: string
  description: Content[]
}
