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
      validation: (Rule: any) => Rule.required().min(2).max(50)
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'El email del usuario',
      validation: (Rule: any) => Rule.required().email()
    },
    {
      name: 'password',
      title: 'Contraseña',
      type: 'string',
      description: 'La contraseña del usuario'
    },
    {
      name: 'image',
      title: 'Imagen',
      type: 'string',
      description: 'La url de la imagen del usuario',
      validation: (Rule: any) => Rule.uri({ allowRelative: false })
    },
    {
      name: 'idDocument',
      title: 'Documento de Identidad',
      type: 'object',
      fields: [
        {
          name: 'type',
          title: 'Tipo de Documento',
          type: 'string',
          options: {
            list: [
              { title: 'DNI', value: 'DNI' },
              { title: 'NIE', value: 'NIE' }
            ]
          }
        },
        {
          name: 'value',
          title: 'Valor del Documento',
          type: 'string',
          description: 'El DNI o NIE del usuario',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              if (!value) return true // Allow field to be optional

              const type = context.document.idDocument.type || {}
              const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/
              const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/

              if (type === undefined) {
                return 'Tipo de documento no especificado'
              }

              if (type === 'DNI' && dniRegex.test(value)) return true
              if (type === 'NIE' && nieRegex.test(value)) return true

              return 'Debe ser un DNI o un NIE válido'
            })
        }
      ]
    },
    {
      name: 'phone',
      title: 'Telefono',
      type: 'string',
      description: 'El telefono del usuario'
    },
    {
      name: 'address',
      title: 'Dirección',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Calle',
          type: 'string',
          description: 'La calle del usuario'
        },
        {
          name: 'floor',
          title: 'Piso',
          type: 'string',
          description: 'El piso del usuario'
        },
        {
          name: 'postal_code',
          title: 'Código Postal',
          type: 'string',
          description: 'El código postal del usuario',
          validation: (Rule: any) =>
            Rule.length(5).regex(/^\d{5}$/, {
              name: 'postal',
              inverse: true,
              message: 'El código postal debe tener 5 dígitos.'
            })
        },
        {
          name: 'locality',
          title: 'Localidad',
          type: 'string',
          description: 'La localidad del usuario'
        }
      ]
    },
    {
      name: 'reseller',
      title: 'Perfil de Revendedor',
      type: 'boolean',
      description:
        'Indica si el usuario es un revendedor (IMPORTANTE SOLO ACTIVAR DESPUES DE REVISAR LA INFO DEL FORMULARIO DE REVENDEDOR CON EL MISMO EMAIL QUE ESTE USANDO EN LA APP)',
      initialValue: false
    },
    {
      name: 'discount',
      title: 'Descuento del Revendedor',
      type: 'number',
      description: 'El descuento del revendedor'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email'
    }
  }
}
