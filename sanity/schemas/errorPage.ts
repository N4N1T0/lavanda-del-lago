export default {
  name: 'errorPage',
  title: 'Pagina de error',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      description: 'Título que se mostrará en la página de error',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Descripción',
      description: 'Descripción breve del error',
      type: 'string'
    },
    {
      name: 'digest',
      title: 'Label del error',
      description: 'Label o código del error',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Imagen',
      description: 'Imagen que se mostrará en la página de error',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'contacts',
      title: 'Contactos',
      description: 'Contactos que se mostrarán en la página de error',
      type: 'array',
      of: [
        {
          name: 'contact',
          title: 'Contacto',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              description: 'Label o nombre del contacto',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              description:
                'Link del contacto, puede ser una URL o un correo electrónico',
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'digest',
      media: 'image'
    }
  }
}
