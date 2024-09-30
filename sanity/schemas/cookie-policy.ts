export default {
  name: 'cookiePolicy',
  title: 'Politica de Cookies',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulo',
      type: 'string',
      description:
        'El título que se mostrará en la página de la política de cookies'
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Una breve descripción de la política de cookies'
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}
