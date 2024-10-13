import { localities, jobType } from '@/constants/site-data'

export default {
  name: 'resellerForm',
  title: 'Formulario de Revendedor',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'Nombre',
      type: 'string',
      description: 'El primer nombre del revendedor.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
      description: 'El apellido del revendedor.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'email',
      title: 'Correo electrónico',
      type: 'email',
      description:
        'La dirección de correo electrónico del revendedor para contacto y notificaciones.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'nie',
      title: 'NIE',
      type: 'string',
      description:
        'Número de Identidad de Extranjero, necesario para la identificación legal.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'province',
      title: 'Provincia de residencia',
      type: 'string',
      options: {
        list: localities.map((local) => ({ title: local, value: local }))
      },
      description: 'La provincia donde reside el revendedor.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
      description: 'Número de teléfono de contacto del revendedor.'
    },
    {
      name: 'birthDate',
      title: 'Fecha de nacimiento',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD'
      },
      description:
        'Fecha de nacimiento del revendedor, necesaria para verificar la elegibilidad.',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'birthPlace',
      title: 'Lugar de nacimiento',
      type: 'string',
      description: 'Ciudad o localidad donde nació el revendedor.'
    },
    {
      name: 'privacyPolicy',
      title: 'He visto el Privacy Policy',
      type: 'boolean',
      description:
        'Confirmación de que el revendedor ha leído y aceptado la política de privacidad.',
      validation: (Rule: any) =>
        Rule.required().error('Debes aceptar la política de privacidad.')
    },

    // New Fields

    {
      name: 'jobType',
      title: 'Tipo de Trabajo',
      type: 'string',
      description: 'La ocupación o tipo de trabajo del revendedor.',
      options: {
        list: jobType.map((job) => ({ title: job, value: job }))
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'file',
      title: 'Documento de Identificación',
      type: 'file',
      description:
        'Adjuntar archivo que sustente la identificación de su empresa o su NIF en caso de autónomo.',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'email'
    }
  }
}
