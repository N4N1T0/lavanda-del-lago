export default {
  name: 'cookiePolicy',
  title: 'Politica de Cookies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
}