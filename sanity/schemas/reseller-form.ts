export default {
  name: 'resellerForm',
  title: 'Formulario de Revendedor',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
      description: 'El primer nombre del revendedor.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
      description: 'El apellido del revendedor.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Correo electrónico',
      type: 'email',
      description:
        'La dirección de correo electrónico del revendedor para contacto y notificaciones.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'nie',
      title: 'NIE',
      type: 'string',
      description:
        'Número de Identidad de Extranjero, necesario para la identificación legal.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'province',
      title: 'Provincia de residencia',
      type: 'string',
      options: {
        list: [
          { title: '-', value: '-' },
          { title: 'Álava', value: 'Álava' },
          { title: 'Albacete', value: 'Albacete' },
          { title: 'Alicante', value: 'Alicante' },
          { title: 'Almería', value: 'Almería' },
          { title: 'Asturias', value: 'Asturias' },
          { title: 'Ávila', value: 'Ávila' },
          { title: 'Badajoz', value: 'Badajoz' },
          { title: 'Baleares', value: 'Baleares' },
          { title: 'Barcelona', value: 'Barcelona' },
          { title: 'Burgos', value: 'Burgos' },
          { title: 'Cáceres', value: 'Cáceres' },
          { title: 'Cádiz', value: 'Cádiz' },
          { title: 'Cantabria', value: 'Cantabria' },
          { title: 'Castellón', value: 'Castellón' },
          { title: 'Ceuta', value: 'Ceuta' },
          { title: 'Ciudad Real', value: 'Ciudad Real' },
          { title: 'Córdoba', value: 'Córdoba' },
          { title: 'Cuenca', value: 'Cuenca' },
          { title: 'Gerona', value: 'Gerona' },
          { title: 'Granada', value: 'Granada' },
          { title: 'Guadalajara', value: 'Guadalajara' },
          { title: 'Guipúzcoa', value: 'Guipúzcoa' },
          { title: 'Huelva', value: 'Huelva' },
          { title: 'Huesca', value: 'Huesca' },
          { title: 'Jaén', value: 'Jaén' },
          { title: 'La Coruña', value: 'La Coruña' },
          { title: 'La Rioja', value: 'La Rioja' },
          { title: 'Las Palmas', value: 'Las Palmas' },
          { title: 'León', value: 'León' },
          { title: 'Lérida', value: 'Lérida' },
          { title: 'Lugo', value: 'Lugo' },
          { title: 'Madrid', value: 'Madrid' },
          { title: 'Málaga', value: 'Málaga' },
          { title: 'Melilla', value: 'Melilla' },
          { title: 'Murcia', value: 'Murcia' },
          { title: 'Navarra', value: 'Navarra' },
          { title: 'Orense', value: 'Orense' },
          { title: 'Palencia', value: 'Palencia' },
          { title: 'Pontevedra', value: 'Pontevedra' },
          { title: 'Salamanca', value: 'Salamanca' },
          { title: 'Santa Cruz de Tenerife', value: 'Santa Cruz de Tenerife' },
          { title: 'Segovia', value: 'Segovia' },
          { title: 'Sevilla', value: 'Sevilla' },
          { title: 'Soria', value: 'Soria' },
          { title: 'Tarragona', value: 'Tarragona' },
          { title: 'Teruel', value: 'Teruel' },
          { title: 'Toledo', value: 'Toledo' },
          { title: 'Valencia', value: 'Valencia' },
          { title: 'Valladolid', value: 'Valladolid' },
          { title: 'Vizcaya', value: 'Vizcaya' },
          { title: 'Zamora', value: 'Zamora' },
          { title: 'Zaragoza', value: 'Zaragoza' }
        ]
      },
      description: 'La provincia donde reside el revendedor.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      description: 'Número de teléfono de contacto del revendedor.'
    },
    {
      name: 'birthDate',
      title: 'Fecha de nacimiento',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      description:
        'Fecha de nacimiento del revendedor, necesaria para verificar la elegibilidad.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'birthPlace',
      title: 'Lugar de nacimiento',
      type: 'string',
      description: 'Ciudad o localidad donde nació el revendedor.'
    },
    {
      name: 'privacyPolicy',
      title: 'He visto el Privacy Policy',
      type: 'boolean',
      description:
        'Confirmación de que el revendedor ha leído y aceptado la política de privacidad.',
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      validation: (Rule: any) =>
        Rule.required().error('Debes aceptar la política de privacidad.')
    }
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email'
    }
  }
}
