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
    },
    {
      name: 'shippingAddress',
      title: 'Dirección de Envío',
      type: 'reference',
      to: [{ type: 'shippingAddress' }],
      description:
        'La dirección de envío de la compra.SI EL CAMPO ESTA VACIO PUES LA DIRECCION DE ENVIO ES LA DEL USUARIO'
    },
    {
      name: 'currier',
      title: 'Transportista',
      type: 'string',
      options: {
        list: [
          { title: 'Correos', value: 'correos' },
          { title: 'Nacex', value: 'nacex' }
        ]
      },
      description: 'El transportista utilizado para la compra.',
      validation: (Rule: any): any =>
        Rule.custom((currier: string, context: any) => {
          if (context.parent.status === 'enviado' && !currier) {
            return 'El transportista es requerido si la compra ha sido enviada.'
          }
          return true
        })
    },
    {
      name: 'currierCode',
      title: 'Código de Transporte',
      type: 'string',
      description: 'El código de transporte utilizado para la compra.',
      validation: (Rule: any): any =>
        Rule.custom((currierCode: string, context: any) => {
          if (context.parent.currier && !currierCode) {
            return 'El código de transporte es requerido si se selecciona un transportista.'
          }
          return true
        })
    },
    {
      name: 'expectedDeliveryDate',
      title: 'Fecha de Entrega Estimada',
      type: 'datetime',
      description: 'Fecha estimada de entrega de la compra.',
      validation: (Rule: any): any =>
        Rule.custom((expectedDeliveryDate: string, context: any) => {
          if (context.parent.currier && !expectedDeliveryDate) {
            return 'La fecha de entrega estimada es requerida si se selecciona un transportista.'
          }
          return true
        })
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
