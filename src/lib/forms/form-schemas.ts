import { jobType, localities } from '@/constants/site-data'
import { z } from 'zod'

// Checkout Validation Schema with New User
export const userSchema = z
  .object({
    name: z.string().min(2, { message: 'El nombre es necesario' }),
    email: z.string().email({ message: 'El email es inválido' }),
    phone: z.string().min(2, { message: 'El teléfono es necesario' }),
    password: z
      .string()
      .regex(/^(?=.*\d).{8,}$/, {
        message:
          'La contraseña debe tener al menos 8 caracteres e incluir al menos un dígito.'
      })
      .optional(),
    confirmPassword: z.string().optional(),
    street: z.string().min(2, { message: 'La Calle es necesaria' }),
    floor: z.string().min(2, { message: 'El Piso es necesario' }),
    postal_code: z
      .string()
      .min(2, { message: 'El Código Postal es necesario' }),
    locality: z.string().min(2, { message: 'La Localidad es necesaria' }),
    documentType: z.enum(['DNI', 'NIE'], {
      message: 'Seleccione un tipo de documento'
    }),
    documentNumber: z
      .string()
      .min(1, { message: 'El número del documento es necesario' })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })

export type UserSchemaType = z.infer<typeof userSchema>

export const resellerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder los 50 caracteres')
    .min(1, 'El nombre es requerido'),
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no debe exceder los 50 caracteres')
    .min(1, 'El apellido es requerido'),
  email: z
    .string()
    .email('Correo electrónico inválido')
    .min(5, 'El correo debe tener al menos 5 caracteres')
    .min(1, 'El correo electrónico es requerido'),
  nie: z
    .string()
    .min(9, 'El NIE debe tener exactamente 9 caracteres')
    .max(9, 'El NIE debe tener exactamente 9 caracteres')
    .min(1, 'El NIE es requerido'),
  province: z.enum(['Ninguno de los anteriores', ...localities], {
    required_error: 'Debes seleccionar una localidad'
  }),
  phone: z
    .string()
    .min(9, 'El teléfono debe tener al menos 9 dígitos')
    .max(15, 'El teléfono no debe exceder los 15 dígitos')
    .min(1, 'El teléfono es requerido'),
  birthDate: z.string().min(1, 'La fecha de nacimiento es requerida'),
  birthPlace: z.enum(['Ninguno de los anteriores', ...localities], {
    required_error: 'Debes seleccionar una localidad'
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la política de privacidad'
  }),
  jobType: z.enum(['Ninguno de los anteriores', ...jobType], {
    required_error: 'Debes seleccionar un tipo de trabajo'
  }),
  companyFile: z.any().refine((file) => file instanceof File, {
    message:
      'Debes adjuntar un archivo válido para la identificación de la empresa o NIF'
  })
})

export type ResellerFormSchemaType = z.infer<typeof resellerFormSchema>
