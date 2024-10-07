export default {
  name: 'blog-articles',
  title: 'Articulos del Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description:
        'El título del artículo, que se mostrará en la página y en los resultados de búsqueda.',
      options: {
        maxLength: 60
      }
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'El slug es el nombre corto y amigable que se usará en la URL del artículo.',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      description: 'El autor del artículo, que se mostrará en la página.',
      to: { type: 'author' }
    },
    {
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description:
        'La imagen principal del artículo, que se mostrará en la página.',
      options: {
        hotspot: true
      }
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      description: 'El contenido del artículo, que se mostrará en la página.',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          description: 'La imagen que se mostrará en la página.',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'description',
      title: 'Extracto',
      type: 'text',
      description:
        'El extracto del artículo, que se mostrará en los resultados de búsqueda.',
      options: {
        maxLength: 160
      }
    },
    {
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      description:
        'Las categorías del artículo, que se mostrarán en la página.',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      description: 'Si el artículo debe ser destacado en la página principal.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'mainImage'
    }
  },
  initialValue: {
    featured: false
  }
}
