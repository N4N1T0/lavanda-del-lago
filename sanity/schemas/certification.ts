export default {
  name: 'certifications',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'certificationsBlocks',
      title: 'Bloques de Certificaciones',
      type: 'array',
      of: [
        {
          name: 'certificationBlock',
          title: 'Bloque de Certificación',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Título',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Descripción',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        }
      ],
    }
  ], 
}