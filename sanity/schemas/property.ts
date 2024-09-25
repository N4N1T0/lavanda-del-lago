export default {
  name: 'property',
  title: 'Propiedad',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description: 'El titulo para la pagina'
    },
    {
      name: 'featuredProduct',
      title: 'Producto Destacado',
      type: 'reference',
      to: [{ type: 'product' }]
    },
    {
      name: 'featuredImage',
      title: 'Image Destacada',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{ type: 'block' }]
    }
  ]
}