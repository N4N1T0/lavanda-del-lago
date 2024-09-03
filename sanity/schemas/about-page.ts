export default {
	name: 'aboutPage',
	title: 'Pagina sobre nosotros',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Descripcion',
			type: 'text',
		},
		{
			name: 'stats',
			title: 'Estadisticas',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Titulo',
							type: 'string',
						},
						{
							name: 'value',
							title: 'Valor',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Descripción',
							type: 'string',
						},
					],
				},
			],
		},
		{
			name: 'stats_image',
			title: 'Imagen de estadisticas',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'second_section_title',
			title: 'Titulo de la Segunda sección',
			type: 'string',
		},
		{
			name: 'second_section_description',
			title: 'Descripción de la segunda sección',
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
			name: 'teams_section_title',
			title: 'Titulo de la sección de equipos',
			type: 'string',
		},
		{
			name: 'teams_section_description',
			title: 'Descripción de la sección de equipos',
			type: 'text',
		},
		{
			name: 'teams',
			title: 'Equipos',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: { type: 'teams' },
				},
			],
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
			media: "stats_image"
		},
	}
}
