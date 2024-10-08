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
    documentType: z.enum(['dni', 'nie'], {
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

// Reseller Form Validation Schema
export const resellerFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email().min(5),
  nie: z.string().min(9).max(9), // NIE validation can be adjusted
  province: z.string().min(1, 'Por favor selecciona una provincia'),
  phone: z.string().min(9).max(15), // Adjust depending on validation needs
  birthDate: z.string(),
  birthPlace: z.string().optional(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar la política de privacidad'
  })
})

export type ResellerFormSchemaType = z.infer<typeof resellerFormSchema>
