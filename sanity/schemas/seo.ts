export default {
  name: 'seoMetatags',
  title: 'SEO Metatags',
  type: 'document',
  fields: [
    {
      name: 'titleTemplate',
      title: 'Título (Template)',
      type: 'string',
      description: 'Plantilla para el título, e.g. "%s | Lavanda del Lago"'
    },
    {
      name: 'defaultTitle',
      title: 'Título (Por Defecto)',
      type: 'string',
      description:
        'Título por defecto para la página, e.g. "Lavanda del Lago | Productos de Lavanda"'
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description:
        'Descripción para SEO, e.g. "Lavanda del Lago ofrece productos de lavanda..."'
    },
    {
      name: 'keywords',
      title: 'Palabras Clave',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Palabras clave separadas por comas para SEO'
    },
    {
      name: 'dominio',
      title: 'Dominio',
      type: 'url',
      description:
        'Dominio principal del sitio web, e.g. "https://www.lavandadellago.com"'
    },
    {
      name: 'openGraph',
      title: 'Open Graph',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'URL principal para Open Graph'
        },
        {
          name: 'images',
          title: 'Imágenes',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Texto Alternativo',
                  type: 'string',
                  description: 'Descripción de la imagen para SEO'
                },
                {
                  name: 'width',
                  title: 'Ancho',
                  type: 'number',
                  description: 'Ancho de la imagen (en píxeles)'
                },
                {
                  name: 'height',
                  title: 'Alto',
                  type: 'number',
                  description: 'Alto de la imagen (en píxeles)'
                }
              ]
            }
          ],
          description: 'Imágenes asociadas a Open Graph'
        }
      ]
    },
    {
      name: 'twitter',
      title: 'Twitter',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Imágenes',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Texto Alternativo',
                  type: 'string',
                  description: 'Descripción de la imagen para Twitter'
                }
              ]
            }
          ],
          description: 'Imágenes asociadas a Twitter'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'defaultTitle',
      subtitle: 'description',
      media: 'openGraph.images.0'
    }
  }
}
