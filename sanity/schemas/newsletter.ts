export default {
  name: 'newsletter',
  title: 'Subscriptor al Newsletter',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Email del subscriptor al newsletter'
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Fecha del subscriptor al newsletter'
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'date'
    },
    prepare(selection: { title: string; subtitle: string }) {
      const { title, subtitle } = selection
      return {
        title: title,
        subtitle: new Date(subtitle).toLocaleString('es-ES')
      }
    }
  }
}
