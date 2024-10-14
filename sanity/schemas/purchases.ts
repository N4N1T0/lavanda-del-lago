export default {
  name: 'purchase',
  title: 'Ventas',
  type: 'document',
  fields: [
    {
      name: 'userEmail',
      title: 'Correo Electrónico del Usuario',
      type: 'reference',
      to: [{ type: 'user' }],
      description:
        'Referencia al correo electrónico del usuario asociado a esta compra.'
    },
    {
      name: 'reseller',
      title: 'Revendedor',
      type: 'boolean',
      description: 'Indica si el usuario es un revendedor.',
      readonly: true
    },
    {
      name: 'products',
      title: 'Productos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Producto',
              type: 'reference',
              to: [{ type: 'product' }],
              description: 'El producto comprado.'
            },
            {
              name: 'quantity',
              title: 'Cantidad',
              type: 'number',
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              validation: (Rule: any) => Rule.min(1),
              description: 'Cantidad del producto comprado.'
            }
          ],
          preview: {
            select: {
              title: 'product.nombre',
              subtitle: 'quantity',
              media: 'product.fotoPrincipal'
            },
            prepare(selection: {
              title: string
              subtitle: string
              media: string
            }) {
              const { title, subtitle, media } = selection
              return {
                title: title,
                subtitle: `Cantidad: ${subtitle}`,
                media: media
              }
            }
          }
        }
      ],
      description:
        'Lista de productos comprados y sus cantidades en esta transacción.'
    },
    {
      name: 'totalAmount',
      title: 'Monto Total',
      type: 'number',
      description: 'El monto total de la compra.'
    },
    {
      name: 'purchaseDate',
      title: 'Fecha de Compra',
      type: 'datetime',
      description: 'Fecha y hora en que se realizó la compra.',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Hoy'
      },
      readonly: true
    },
    {
      name: 'paymentMethod',
      title: 'Método de Pago',
      type: 'string',
      description: 'El método de pago utilizado para la compra.'
    },
    {
      name: 'status',
      title: 'Estado de la Compra',
      type: 'string',
      options: {
        list: [
          { title: 'Pendiente', value: 'pendiente' },
          { title: 'Completado', value: 'completado' },
          { title: 'Cancelado', value: 'cancelado' },
          { title: 'Procesando', value: 'procesando' },
          { title: 'Enviado', value: 'enviado' },
          { title: 'Entregado', value: 'entregado' }
        ]
      },
      description: 'El estado actual de la compra.'
    }
  ],
  preview: {
    select: {
      title: 'userEmail.name',
      subtitle: 'purchaseDate',
      media: 'userEmail.image'
    },
    prepare(selection: { title: string; subtitle: string; media: string }) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: new Date(subtitle).toLocaleString('es-ES'),
        media: media
      }
    }
  }
}
