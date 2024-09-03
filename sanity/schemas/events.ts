export default {
	name: 'events',
	title: 'Eventos',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
		},
		{
			name: 'date',
			title: 'Fecha',
			type: 'date',
		},
		{
			name: 'description',
			title: 'Descripción',
			type: 'string',
		},
		{
			name: 'image',
			title: 'Imagen Destacada',
			type: 'image',
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
						},
						{
							name: 'calendarUrl',
							title: 'Url del Calendario',
							type: 'url',
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'date',
			media: 'image'
		},
	}
}
