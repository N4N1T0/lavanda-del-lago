export default {
	name: 'teams',
	title: 'Miembros del Equipo',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Nombre',
			type: 'string',
			description: 'El nombre del miembro del equipo',
		},
		{
			name: 'description',
			title: 'descripcion',
			type: 'text',
			description: 'Una breve descripción del miembro del equipo',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'La imagen del miembro del equipo',
		},
		{
			name: 'role',
			title: 'Puesto',
			type: 'string',
			description: 'El puesto del miembro del equipo',
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
							description: 'El título del enlace',
						},
						{
							name: 'url',
							title: 'Url',
							type: 'url',
							description: 'La url del enlace',
						},
					],
				},
			],
			description: 'Los enlaces del miembro del equipo',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'role',
			media: 'image',
		},
	},
}
