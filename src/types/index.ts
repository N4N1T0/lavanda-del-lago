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
	id: number
	slug: string
	url: string
	title: string
	content: string
	image: string
	thumbnail: string
	status: string
	category: string
	publishedAt: string
	updatedAt: string
	userId: number
}
