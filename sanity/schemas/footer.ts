export default {
	name: 'footer',
	title: 'Footer',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Titulo',
			type: 'string',
			description: 'El titulo que se mostrara en la parte superior del footer',
		},
		{
			name: 'subtitle',
			title: 'Subtitulo',
			type: 'text',
			description:
				'El subtitulo que se mostrara en la parte superior del footer',
		},
		{
			name: 'socialMedia',
			title: 'Social Media',
			type: 'array',
			of: [
				{
					name: 'platform',
					title: 'Platform',
					type: 'object',
					fields: [
						{
							name: 'platformName',
							title: 'Nombre de la PLatforma',
							type: 'string',
							options: {
								list: [
									{ title: 'Twitter', value: 'twitter' },
									{ title: 'Instagram', value: 'instagram' },
									{ title: 'Facebook', value: 'facebook' },
									{ title: 'YouTube', value: 'youtube' },
								],
								layout: 'radio',
							},
							description: 'El nombre de la plataforma de redes sociales',
						},
						{
							name: 'link',
							title: 'Link',
							type: 'url',
							allowRelative: false,
							scheme: ['https'],
							description: 'El enlace a la plataforma de redes sociales',
						},
					],
				},
			],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			validation: (Rule: any) => Rule.required().min(1).max(4),
			description:
				'La lista de enlaces a redes sociales que se mostrara en el footer',
		},
		{
			name: 'contactInfo',
			title: 'Contact Info',
			type: 'object',
			fields: [
				{
					name: 'email',
					title: 'Email',
					type: 'email',
					description: 'El correo electronico de contacto',
				},
				{
					name: 'phone',
					title: 'Phone',
					type: 'string',
					description: 'El numero de telefono de contacto',
				},
				{
					name: 'address',
					title: 'Address',
					type: 'string',
					description: 'La direccion de contacto',
				},
			],
			description: 'La informacion de contacto que se mostrara en el footer',
		},
		{
			name: 'copyright',
			title: 'Copyright',
			type: 'string',
			description: 'El texto de copyright que se mostrara en el footer',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
	},
}
