export default {
	name: 'author',
	title: 'Autores',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			description: 'El nombre del autor',
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'Una breve descripción del autor',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'image',
			options: {
				hotspot: true,
			},
			description: 'La imagen del autor',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'description',
			image: 'image',
		},
	},
}
