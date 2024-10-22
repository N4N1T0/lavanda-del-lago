import { shippingCountries } from '@/constants/site-data'

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
      type: 'image',
      description: 'La url de la imagen del usuario'
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
              { title: 'NIE', value: 'NIE' },
              { title: 'NIF', value: 'NIF' }
            ]
          }
        },
        {
          name: 'value',
          title: 'Valor del Documento',
          type: 'string',
          description: 'El DNI o NIE del usuario'
        }
      ]
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      description: 'El teléfono del usuario'
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
          title: 'Numero',
          type: 'string',
          description: 'El piso del usuario'
        },
        {
          name: 'reference',
          title: 'Referencia',
          type: 'string',
          description: 'referencia de la dirección'
        },
        {
          name: 'country',
          title: 'Países',
          type: 'string',
          options: {
            list: [
              ...shippingCountries.map((country) => ({
                title: country,
                value: country
              }))
            ]
          }
        },
        {
          name: 'postal_code',
          title: 'Código Postal',
          type: 'string',
          description: 'El código postal del usuario'
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
      name: 'shippingAddress',
      title: 'Direcciones de Envío',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'shippingAddress' } }],
      description: 'Direcciones de envío'
    },
    {
      name: 'reseller',
      title: 'Perfil de Revendedor',
      type: 'boolean',
      description:
        'Indica si el usuario es un revendedor (IMPORTANTE SOLO ACTIVAR DESPUÉS DE REVISAR LA INFO DEL FORMULARIO DE REVENDEDOR CON EL MISMO EMAIL QUE ESTE USANDO EN LA APP)',
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
      subtitle: 'email',
      media: 'image'
    }
  }
}
