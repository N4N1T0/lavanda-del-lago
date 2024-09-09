export default {
	name: 'notFoundPage',
	title: 'Pagina de error 404',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Título',
			description: 'Título que se mostrará en la página de 404',
			type: 'string',
		},
		{
			name: 'description',
			title: 'Descripción',
			description: 'Descripción breve del 404',
			type: 'string',
		},
		{
			name: 'digest',
			title: 'Label del 404',
			description: 'Label o código del 404',
			type: 'string',
		},
		{
			name: 'image',
			title: 'Imagen',
			description: 'Imagen que se mostrará en la página de 404',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'links',
			title: 'Links a Paginas',
			description: 'Links que se mostrarán en la página de 404',
			type: 'array',
			of: [
				{
					type: 'string',
					name: 'page',
					title: 'Pagina',
					description: 'Paginas a mostrar como via alternativas',
					options: {
						list: [
							{
								title: 'Productos',
								value: '/products',
								description: 'Listado de todos los productos',
							},
							{
								title: 'Blog',
								value: '/blog',
								description: 'Listado de todos los articulos del blog',
							},
							{
								title: 'Eventos',
								value: '/events',
								description: 'Listado de todos los eventos',
							},
						],
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'digest',
			media: 'image',
		},
	},
}
