export default {
	name: 'homePage',
	title: 'Pagina principal',
	type: 'document',
	fields: [
		{
			name: 'bentoThreeImages',
			title: 'Tres Imagenes del Bento',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
				},
			],
		},
		{
			name: 'bentofeaturedCategory',
			title: 'Categoria Destacada del Bento',
			type: 'string',
		},
		{
			name: 'bentoFeaturedProducto',
			title: 'Producto Destacado del Bento',
			type: 'string',
		},
		{
			name: 'featuredCategories',
			title: 'Categorias Destacadas',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
		},
		{
			name: 'featuredMarquee',
			title: 'Marquee Destacado',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'image',
							title: 'Imagen',
							type: 'image',
							options: {
								hotspot: true,
							},
						},
						{
							name: 'title',
							title: 'Titulo',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Descripcion',
							type: 'string',
						},
					],
				},
			],
		},
		{
			name: 'newProducts',
			title: 'Productos Nuevos',
			type: 'boolean',
		},
		{
			name: 'topSellingProducts',
			title: 'Productos mas vendidos',
			type: 'boolean',
		},
		{
			name: 'productsWithOffer',
			title: 'Products con oferta',
			type: 'boolean',
		},
		{
			name: 'featuredEvent',
			title: 'Evento Destacado',
			type: 'reference',
			to: { type: 'events' },
		},
	],
	initialValue: {
		newProducts: true,
		topSellingProducts: true,
		productsWithOffer: false,
	},
}
