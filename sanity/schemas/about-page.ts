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
	],
}
