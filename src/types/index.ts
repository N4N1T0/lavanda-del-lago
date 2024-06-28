export interface Product {
	id: number
	title: string
	price: string
	category: string
	description: string
	image: string
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
