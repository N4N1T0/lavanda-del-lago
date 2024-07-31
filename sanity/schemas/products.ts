// schemas/product.js

export default {
	name: 'product',
	title: 'Producto',
	type: 'document',
	fields: [
		{
			name: 'nombre',
			title: 'Nombre del producto',
			type: 'string',
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'descripcion',
			title: 'Descripción',
			type: 'text',
		},
		{
			name: 'usabilidad',
			title: 'Usabilidad',
			type: 'text',
		},
		{
			name: 'composicion',
			title: 'Composición (Ingredientes y otros detalles)',
			type: 'text',
		},
		{
			name: 'slogan',
			title: 'Slogan del producto en una frase',
			type: 'string',
		},
		{
			name: 'codigoReferencia',
			title: 'Código de referencia',
			type: 'string',
		},
		{
			name: 'codigoBarras',
			title: 'Código de Barras o EAN',
			type: 'string',
		},
		{
			name: 'precio',
			title: 'Precio',
			type: 'number',
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'medidas',
			title: 'Medidas',
			type: 'object',
			fields: [
				{
					name: 'ancho',
					title: 'Ancho',
					type: 'number',
				},
				{
					name: 'alto',
					title: 'Alto',
					type: 'number',
				},
				{
					name: 'profundidad',
					title: 'Profundidad',
					type: 'number',
				},
				{
					name: 'peso',
					title: 'Peso',
					type: 'number',
				},
			],
		},
		{
			name: 'fotoPrincipal',
			title: 'Foto principal',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'fotosVarias',
			title: 'Fotos varias',
			type: 'array',
			of: [{ type: 'image' }],
		},
		{
			name: 'fichaTecnica',
			title: 'Ficha técnica del producto descargable',
			type: 'file',
		},
		{
			name: 'stock',
			title: 'Stock del producto',
			type: 'number',
		},
		{
			name: 'categoria',
			title: 'Categoría o Familia del producto',
			type: 'string',
		},
		{
			name: 'certificacion',
			title: 'Certificación del producto',
			type: 'string',
		},
	],
}
