export default {
	name: 'homePage',
	title: 'Pagina principal',
	type: 'document',
	fields: [
		{
      name: 'title',
      title: 'Titulo de la Pagina',
      type: 'string',
			initialValue: 'Pagina Principal / Home Page',
    },
		{
			name: 'bentoThreeImages',
			title: 'Tres Imagenes del Bento',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
				},
			],
		},
		{
			name: 'bentofeaturedCategory',
			title: 'Categoria Destacada del Bento',
			type: 'object',
			fields: [
				{	
					name: 'title',
					title: 'Titulo de la Categoria',
					type: 'string',
					initialValue: 'Bienestar',
					options: {
						list: [
							{ title: 'Bienestar', value: 'Bienestar' },
							{ title: 'Cosmética', value: 'Cosmética' },
							{ title: 'Cosmética corporal',  value: 'Cosmética corporal' },
							{ title: 'Cosmética facial',  value: 'Cosmética facial' },
							{ title: 'Hogar y ambiente',  value: 'Hogar y ambiente' },
						],
					}
				},
				{
					name: 'description',
					title: 'Pequeña Descripción de la Categoria',
					type: 'string',
				}
			]
		},
		{
			name: 'bentoFeaturedProducto',
			title: 'Producto Destacado del Bento',
			type: 'reference',
			to: { type: 'product' },
		},
		{
			name: 'InfoCards',
			title: 'Tarjetas de Informacion',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'icon',
							title: 'Icono',
							type: 'image',
						},
						{
							name: 'title',
							title: 'Titulo',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Descripción',
							type: 'string',
						}
					]
				},
			],
		},
		{
			name: 'carousel1',
			title: 'Carousel 1',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titulo del Carousel',
					type: 'string',
				},
				{
					name: 'category',
					title: 'Categoría',
					type: 'string',
					initialValue: 'Bienestar',
					options: {
						list: [
							{ title: 'Bienestar', value: 'Bienestar' },
							{ title: 'Cosmética', value: 'Cosmética' },
							{ title: 'Cosmética corporal',  value: 'Cosmética corporal' },
							{ title: 'Cosmética facial',  value: 'Cosmética facial' },
							{ title: 'Hogar y ambiente',       value: 'Hogar y ambiente' },
						],
					}
				}
			]		
		},
		{
			name: 'carousel2',
			title: 'Carousel 2',
			type: 'object',
			fields: [
				{
					name: 'title',
					title: 'Titulo del Carousel',
					type: 'string',
				},
				{
					name: 'category',
					title: 'Categoría',
					type: 'string',
					initialValue: 'Bienestar',
					options: {
						list: [
							{ title: 'Bienestar', value: 'Bienestar' },
							{ title: 'Cosmética', value: 'Cosmética' },
							{ title: 'Cosmética corporal',  value: 'Cosmética corporal' },
							{ title: 'Cosmética facial',  value: 'Cosmética facial' },
							{ title: 'Hogar y ambiente',       value: 'Hogar y ambiente' },
						],
					}
				}
			]		
		},
		{
			name: 'featuredEvent',
			title: 'Evento Destacado',
			type: 'reference',
			to: { type: 'events' },
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
			subtitle: 'bentofeaturedCategory.title',
			media: 'bentoThreeImages[0]',
    }
  }
}
