export default {
	name: 'teams',
	title: 'Miembros del Equipo',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Nombre',
			type: 'string',
		},
		{
			name: 'description',
			title: 'descripcion',
			type: 'text',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'role',
			title: 'Puesto',
			type: 'string',
		},
		{
			name: 'links',
			title: 'Links',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'url',
							title: 'Url',
							type: 'url',
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role',
			media: 'image',
		},
	}
}
