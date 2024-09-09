export default {
	name: 'prefooter',
	title: 'Prefooter',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Título',
			type: 'string',
			description: 'El título que se mostrará en el prefooter',
		},
		{
			name: 'description',
			title: 'Descripción',
			type: 'string',
			description: 'Una breve descripción que se mostrará en el prefooter',
		},
		{
			name: 'image',
			title: 'Imagen del Prefooter',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'La imagen que se mostrará en el prefooter',
		},
		{
			name: 'link',
			title: 'Link del Prefooter',
			type: 'string',
			description: 'El enlace que se mostrará en el prefooter',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'image',
		},
	},
}
