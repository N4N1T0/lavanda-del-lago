export default {
  name: 'salesPolicy',
  title: 'Politica de Compra y Ventas',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description: 'El título que se mostrará en la página'
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Una breve descripción de la política de compra y ventas'
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      description: 'El contenido de la política de compra y ventas'
    }
  ]
}
