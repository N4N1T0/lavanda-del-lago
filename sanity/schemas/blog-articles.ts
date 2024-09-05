export default {
	name: 'blog-articles',
	title: 'Articulos del Blog',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
			description:
				'El título del artículo, que se mostrará en la página y en los resultados de búsqueda.',
			options: {
				maxLength: 60,
			},
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			description:
				'El slug es el nombre corto y amigable que se usará en la URL del artículo.',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
			name: 'author',
			title: 'Autor',
			type: 'reference',
			description: 'El autor del artículo, que se mostrará en la página.',
			to: { type: 'author' },
		},
		{
			name: 'mainImage',
			title: 'Imagen Principal',
			type: 'image',
			description:
				'La imagen principal del artículo, que se mostrará en la página.',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'content',
			title: 'Contenido',
			type: 'array',
			description: 'El contenido del artículo, que se mostrará en la página.',
			of: [
				{
					type: 'block',
				},
				{
					type: 'image',
					description: 'La imagen que se mostrará en la página.',
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
			description:
				'El extracto del artículo, que se mostrará en los resultados de búsqueda.',
			options: {
				maxLength: 160,
			},
		},
		{
			name: 'categories',
			title: 'Categorias',
			type: 'array',
			description:
				'Las categorías del artículo, que se mostrarán en la página.',
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
			description: 'Si el artículo debe ser destacado en la página principal.',
		},
		{
			name: 'SEO',
			title: 'SEO',
			type: 'object',
			fields: [
				{
					name: 'metaTitle',
					title: 'Meta Title',
					type: 'string',
					description:
						'El título que aparecerá en la pestaña del navegador y en los resultados de búsqueda.',
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					validation: (Rule: any) =>
						Rule.max(60).warning(
							'El título debe tener menos de 60 caracteres.',
						),
				},
				{
					name: 'metaDescription',
					title: 'Meta Description',
					type: 'text',
					description:
						'Una breve descripción de la página para los motores de búsqueda. Generalmente entre 50-160 caracteres.',
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					validation: (Rule: any) =>
						Rule.max(160).warning(
							'La descripción debe tener menos de 160 caracteres.',
						),
				},
				{
					name: 'metaKeywords',
					title: 'Meta Keywords',
					type: 'array',
					of: [{ type: 'string' }],
					options: {
						layout: 'tags',
					},
					description:
						'Palabras clave para esta página. No son tan importantes hoy en día, pero pueden ayudar con la relevancia.',
				},
				{
					name: 'openGraphImage',
					title: 'Open Graph Image',
					type: 'image',
					description:
						'La imagen que se compartirá cuando esta página se enlace en redes sociales.',
					options: {
						hotspot: true,
					},
				},
				{
					name: 'twitterCard',
					title: 'Twitter Card',
					type: 'string',
					options: {
						list: [
							{ title: 'Summary', value: 'summary' },
							{
								title: 'Summary with Large Image',
								value: 'summary_large_image',
							},
						],
						layout: 'radio',
					},
					description:
						'El tipo de tarjeta que se usará en Twitter cuando se comparta esta página.',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'mainImage',
		},
	},
	initialValue: {
		featured: false,
	},
}
