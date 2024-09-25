export default {
  name: 'remedies',
  title: 'Remedios',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'firstDescription',
      title: 'Primera Descripción',
      type: 'text',
    },
    {
      name: 'dualImage',
      title: 'Imagen Duales',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required().max(2),
    },
    {
      name: 'secodDescription',
      title: 'Segunda Descripción',
      type: 'text',
    },
    {
      name: 'benefits',
      title: 'Beneficios',
      type: 'array',
      of: [
        {
          name: 'benefit',
          title: 'Beneficio',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              title: 'Descripción',
              type: 'text',
            },
          ],
        }
      ]
    }
  ]
}