export interface Product {
	id: string
	nombre: string
	descripcion: string
	precio: number
	image: string
	categoria: string
}

export interface CartItem extends Product {
	quantity: number
}

export interface Breadcrumb {
	name: string
	path: string
}

export interface Breadcrumbs extends Array<Breadcrumb> {}

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
}

export interface Author {
	name: string
}

export interface Policies {
	_id: string // Assuming the document has an ID
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
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	markDefs: any[]
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
	readonly categoria: null | string
}
