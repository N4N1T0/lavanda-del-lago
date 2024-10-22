import { shippingCountries } from '@/constants/site-data'

export default {
  name: 'shippingAddress',
  title: 'Dirección de Envío',
  type: 'document',
  fields: [
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
    }
  ],
  preview: {
    select: {
      title: 'address.country',
      subtitle: 'address.street'
    }
  }
}
