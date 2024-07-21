export default {
	name: 'blog-articles',
	title: 'Articulos del Blog',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
			options: {
				maxLength: 60,
			},
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
			name: 'author',
			title: 'Autor',
			type: 'reference',
			to: { type: 'author' },
		},
		{
			name: 'mainImage',
			title: 'Imagen Principal',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'content',
			title: 'Contenido',
			type: 'array',
			of: [
				{
					type: 'block',
				},
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
		},
		{
			name: 'description',
			title: 'Extracto',
			type: 'text',
			options: {
				maxLength: 160,
			},
		},
		{
			name: 'categories',
			title: 'Categorias',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
		},
		{
			name: 'featured',
			title: 'Destacado',
			type: 'boolean',
		},
	],
	initialValue: {
		featured: false,
	},
}
