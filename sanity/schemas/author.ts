export default {
	name: 'author',
	title: 'Autores',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Description',
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
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'description',
			image: 'image',
		},
	}
}
