export default {
	name: 'user',
	title: 'Usuario',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Nombre',
			type: 'string',
			description: 'El nombre del usuario',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
			description: 'El email del usuario',
		},
		{
			name: 'image',
			title: 'Imagen',
			type: 'string',
			description: 'La url de la imagen del usuario',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'email',
		},
	},
}
