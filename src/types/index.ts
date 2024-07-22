export interface Product {
	id: number
	title: string
	price: string
	category: string
	description: string
	image: string
}

export interface CartItem extends Product {
	quantity: number
}

export interface InfoCardProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	image: any
	title: string
	text: string
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
	bentoThreeImages: BentoThreeImage[]
	bentoFeaturedProducto: string
	newProducts: boolean
	topSellingProducts: boolean
	featuredCategories: string[]
	productsWithOffer: boolean
	bentofeaturedCategory: string
	featuredEvent: Event
}

export interface BentoThreeImage {
	image: string
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
