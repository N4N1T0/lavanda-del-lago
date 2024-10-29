export default {
  name: 'coupon',
  title: 'Cupon de Descuento',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Código del Cupón',
      type: 'string',
      description: 'El código único del cupón de descuento'
    },
    {
      name: 'discount',
      title: 'Descuento',
      type: 'number',
      description:
        'El porcentaje de descuento que se aplicará al total de la compra'
    },
    {
      name: 'uses',
      title: 'Usos',
      type: 'number',
      description: 'El número de veces que el cupón ha sido utilizado',
      initialValue: 0
    },
    {
      name: 'users',
      title: 'Usuarios que lo han utilizado',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }]
        }
      ]
    },
    {
      name: 'validFrom',
      title: 'Válido desde',
      type: 'datetime',
      description: 'La fecha y hora en la que el cupón comienza a ser válido'
    },
    {
      name: 'validTo',
      title: 'Válido hasta',
      type: 'datetime',
      description: 'La fecha y hora en la que el cupón deja de ser válido'
    }
  ]
}
