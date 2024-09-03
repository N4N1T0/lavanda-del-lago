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
		{
		name: "SEO",
		title: "SEO",
		type: "object",
		fields: [
			{
				name: "metaTitle",
				title: "Meta Title",
				type: "string",
				description: "El título que aparecerá en la pestaña del navegador y en los resultados de búsqueda.",
				validation: (Rule: { max: (arg0: number) => { (): any; new(): any; warning: { (arg0: string): any; new(): any; }; }; }) => Rule.max(60).warning('El título debe tener menos de 60 caracteres.')
			},
			{
				name: "metaDescription",
				title: "Meta Description",
				type: "text",
				description: "Una breve descripción de la página para los motores de búsqueda. Generalmente entre 50-160 caracteres.",
				validation: (Rule: { max: (arg0: number) => { (): any; new(): any; warning: { (arg0: string): any; new(): any; }; }; }) => Rule.max(160).warning('La descripción debe tener menos de 160 caracteres.')
			},
			{
				name: "metaKeywords",
				title: "Meta Keywords",
				type: "array",
				of: [{ type: "string" }],
				options: {
					layout: "tags"
				},
				description: "Palabras clave para esta página. No son tan importantes hoy en día, pero pueden ayudar con la relevancia."
			},
			{
				name: "openGraphImage",
				title: "Open Graph Image",
				type: "image",
				description: "La imagen que se compartirá cuando esta página se enlace en redes sociales.",
				options: {
					hotspot: true
				}
			},
			{
				name: "twitterCard",
				title: "Twitter Card",
				type: "string",
				options: {
					list: [
						{ title: "Summary", value: "summary" },
						{ title: "Summary with Large Image", value: "summary_large_image" },
					],
					layout: "radio"
				},
				description: "El tipo de tarjeta que se usará en Twitter cuando se comparta esta página."
			}
		]
	}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'mainImage',
		}
	},
	initialValue: {
		featured: false,
	},
}
