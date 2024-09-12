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
		{
			name: 'phone',
			title: 'Telefono',
			type: 'string',
			description: 'El telefono del usuario',
		},
		{
			name: 'address',
			title: 'Dirección',
			type: 'string',
			description: 'La dirección del usuario',
		},
		{
			name: 'reseller',
			title: 'Perfil de Revenedor',
			type: 'boolean',
			description:
				'Indica si el usuario es un revendedor (IMPORTANTE SOLO ACTIVAR DESPUES DE REVISAR LA INFO DEL FORMULARIO DE REVENDEDOR CON EL MISMO  EMAIL QUE ESTE USANDO EN LA APP)',
		},
	],
	initialValue: {
		reseller: false,
	},
	preview: {
		select: {
			title: 'name',
			subtitle: 'email',
		},
	},
}
