export default {
	name: 'aboutPage',
	title: 'Pagina sobre nosotros',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
			description: 'El título que se mostrará en la página',
		},
		{
			name: 'description',
			title: 'Descripcion',
			type: 'text',
			description: 'La descripción de la página',
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
							description: 'El título de la estadística',
						},
						{
							name: 'value',
							title: 'Valor',
							type: 'string',
							description: 'El valor de la estadística',
						},
						{
							name: 'description',
							title: 'Descripción',
							type: 'string',
							description: 'La descripción de la estadística',
						},
					],
				},
			],
			description: 'La lista de estadisticas',
		},
		{
			name: 'stats_image',
			title: 'Imagen de estadisticas',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'La imagen que se mostrará en la sección de estadisticas',
		},
		{
			name: 'second_section_title',
			title: 'Titulo de la Segunda sección',
			type: 'string',
			description: 'El título de la segunda sección',
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
			description: 'La descripción de la segunda sección',
		},
		{
			name: 'teams_section_title',
			title: 'Titulo de la sección de equipos',
			type: 'string',
			description: 'El título de la sección de equipos',
		},
		{
			name: 'teams_section_description',
			title: 'Descripción de la sección de equipos',
			type: 'text',
			description: 'La descripción de la sección de equipos',
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
			description: 'La lista de equipos',
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
			media: 'stats_image',
		},
	},
}
