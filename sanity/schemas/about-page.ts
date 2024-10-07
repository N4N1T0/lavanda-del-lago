export default {
  name: 'aboutPage',
  title: 'Pagina sobre nosotros',
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
      title: 'Descripcion',
      type: 'text',
      description: 'La descripción de la página'
    },
    {
      name: 'stats',
      title: 'Estadisticas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titulo',
              type: 'string',
              description: 'El título de la estadística'
            },
            {
              name: 'value',
              title: 'Valor',
              type: 'string',
              description: 'El valor de la estadística'
            },
            {
              name: 'description',
              title: 'Descripción',
              type: 'string',
              description: 'La descripción de la estadística'
            }
          ]
        }
      ],
      description: 'La lista de estadisticas'
    },
    {
      name: 'stats_image',
      title: 'Imagen de estadisticas',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'La imagen que se mostrará en la sección de estadisticas'
    },
    {
      name: 'second_section_title',
      title: 'Titulo de la Segunda sección',
      type: 'string',
      description: 'El título de la segunda sección'
    },
    {
      name: 'second_section_description',
      title: 'Descripción de la segunda sección',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      description: 'La descripción de la segunda sección'
    },
    {
      name: 'teams_section_title',
      title: 'Titulo de la sección de equipos',
      type: 'string',
      description: 'El título de la sección de equipos'
    },
    {
      name: 'teams_section_description',
      title: 'Descripción de la sección de equipos',
      type: 'text',
      description: 'La descripción de la sección de equipos'
    },
    {
      name: 'teams',
      title: 'Equipos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'teams' }
        }
      ],
      description: 'La lista de equipos'
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'stats_image'
    }
  }
}
