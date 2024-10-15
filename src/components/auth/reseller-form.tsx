'use client'

// React Imports
import React, { useCallback } from 'react'

// React Hook Form and Zod Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// UI Imports
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormFieldComponent from '@/components/shared/form-fields'

// Next.js Imports
import { useRouter } from 'next/navigation'

// Types and Schemas Imports
import {
  type ResellerFormSchemaType,
  resellerFormSchema
} from '@/lib/forms/form-schemas'

// Assets Imports
import { Loader2 } from 'lucide-react'
import { localities, jobType } from '@/constants/site-data'

// Axiom Imports
import { useLogger } from 'next-axiom'

const ResellerForm = () => {
  // Initialize the router
  const router = useRouter()

  // Axiom Init
  const log = useLogger()

  // Form State definition
  const form = useForm<ResellerFormSchemaType>({
    resolver: zodResolver(resellerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      nie: '',
      province: '',
      phone: '',
      birthDate: '',
      privacyPolicy: false,
      jobType: '',
      companyFile: undefined
    }
  })

  const onSubmit = useCallback(
    async (values: ResellerFormSchemaType) => {
      try {
        // Crear una instancia de FormData
        const formData = new FormData()

        // Añadir cada campo del formulario a FormData
        for (const key in values) {
          if (
            key === 'companyFile' &&
            values[key] instanceof FileList &&
            values[key].length > 0
          ) {
            // Si el campo es un archivo, añadirlo correctamente a FormData
            formData.append(key, values[key][0])
          } else {
            formData.append(key, values[key as keyof typeof values])
          }
        }
        // Enviar los datos al endpoint
        const response = await fetch('/api/create-reseller-form', {
          method: 'POST',
          body: formData // Usamos FormData aquí
        })

        const data = await response.json()

        if (data.success) {
          form.reset()

          if (data.already) {
            router.push('/?security=form_already-ok')
            return
          }

          router.push('/?security=form_send-ok')
        } else {
          log.debug('Form submission failed', { data: data.message })
        }
      } catch (error) {
        log.debug('Error occurred during form submission:', {
          data: error
        })
      }
    },
    [form, router, log]
  )

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
        {/* First Name */}
        <FormFieldComponent
          control={form.control}
          name='firstName'
          label='Nombre'
          placeholder='Juan'
          isSubmitting={isSubmitting}
        />

        {/* Last Name */}
        <FormFieldComponent
          control={form.control}
          name='lastName'
          label='Apellido'
          placeholder='Perez'
          isSubmitting={isSubmitting}
        />

        {/* Email */}
        <FormFieldComponent
          control={form.control}
          name='email'
          label='Correo Electrónico'
          placeholder='juan@perez.es'
          isSubmitting={isSubmitting}
        />

        {/* NIE */}
        <FormFieldComponent
          control={form.control}
          name='nie'
          label='NIE'
          placeholder='Z1186708F'
          isSubmitting={isSubmitting}
        />

        {/* Province of Residence */}
        <FormFieldComponent
          control={form.control}
          name='province'
          label='Provincia de Residencia'
          placeholder='Selecciona un lugar'
          type='select'
          options={localities}
          isSubmitting={isSubmitting}
        />

        {/* Phone */}
        <FormFieldComponent
          control={form.control}
          name='phone'
          label='Teléfono'
          placeholder='+34 123 456 789'
          isSubmitting={isSubmitting}
        />

        {/* Birth Date */}
        <FormFieldComponent
          control={form.control}
          name='birthDate'
          label='Fecha de Nacimiento'
          placeholder=''
          type='date'
          isSubmitting={isSubmitting}
        />

        {/* Job Type (Radio Group) */}
        <FormFieldComponent
          control={form.control}
          name='jobType'
          label='Tipo de Trabajo'
          placeholder=''
          type='radio'
          options={jobType} // Using jobType from site-data
          isSubmitting={isSubmitting}
        />

        {/* File Upload */}
        <FormFieldComponent
          control={form.control}
          name='companyFile'
          label='Adjuntar archivo que sustente la identificación de su empresa o su NIF en caso de autónomo'
          placeholder=''
          type='file'
          isSubmitting={isSubmitting}
        />

        {/* Privacy Policy Checkbox */}
        <FormFieldComponent
          control={form.control}
          name='privacyPolicy'
          label='He Leído las Privacy Policy'
          placeholder=''
          type='checkbox'
          isSubmitting={isSubmitting}
        />

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Enviar'
          )}
        </Button>
      </form>
    </Form>
  )
}

export default ResellerForm
