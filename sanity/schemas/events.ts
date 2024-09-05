export default {
	name: 'events',
	title: 'Eventos',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
			description: 'El título del evento',
		},
		{
			name: 'date',
			title: 'Fecha',
			type: 'date',
			description: 'La fecha del evento',
		},
		{
			name: 'description',
			title: 'Descripción',
			type: 'string',
			description: 'La descripción del evento',
		},
		{
			name: 'image',
			title: 'Imagen Destacada',
			type: 'image',
			description: 'La imagen destacada del evento',
		},
		{
			name: 'urls',
			title: 'Urls de Calendario',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'calendarName',
							title: 'Nombre del Calendario',
							type: 'string',
							description: 'El nombre del calendario',
						},
						{
							name: 'calendarUrl',
							title: 'Url del Calendario',
							type: 'url',
							description: 'La url del calendario',
						},
					],
				},
			],
			description: 'La lista de urls de calendarios del evento',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'date',
			media: 'image',
		},
	},
}
