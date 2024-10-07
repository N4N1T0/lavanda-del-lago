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
} from '@/lib/form-schemas'

// Assets Imports
import { Loader2 } from 'lucide-react'
import { localities } from '@/constants/site-data'

const ResellerForm = () => {
  // Initialize the router
  const router = useRouter()

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
      birthPlace: '',
      privacyPolicy: false
    }
  })

  // OnSubmit function
  const onSubmit = useCallback(
    async (values: ResellerFormSchemaType) => {
      try {
        const response = await fetch('/api/create-reseller-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
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
          // Handle failure case if the form submission is unsuccessful
          console.error('Form submission failed:', data.message)
        }
      } catch (error) {
        console.error('Error occurred during form submission:', error)
      }
    },
    [form, router]
  )
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-4'>
        <FormFieldComponent
          control={form.control}
          name='firstName'
          label='Nombre'
          placeholder='Juan'
          isSubmitting={isSubmitting}
        />
        <FormFieldComponent
          control={form.control}
          name='lastName'
          label='Apellido'
          placeholder='Perez'
          isSubmitting={isSubmitting}
        />
        <FormFieldComponent
          control={form.control}
          name='email'
          label='Correo Electrónico'
          placeholder='juan@perez.es'
          isSubmitting={isSubmitting}
        />
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

        <FormFieldComponent
          control={form.control}
          name='phone'
          label='Teléfono'
          placeholder='+34 123 456 789'
          isSubmitting={isSubmitting}
        />
        <FormFieldComponent
          control={form.control}
          name='birthDate'
          label='Fecha de Nacimiento'
          placeholder=''
          type='date'
          isSubmitting={isSubmitting}
        />

        {/* Birth Place */}
        <FormFieldComponent
          control={form.control}
          name='birthPlace'
          label='Lugar de Nacimiento'
          placeholder='Selecciona un lugar'
          type='select'
          options={localities}
          isSubmitting={isSubmitting}
        />

        {/* Privacy Policy Checkbox */}
        <FormFieldComponent
          control={form.control}
          name='privacyPolicy'
          label='He visto el Privacy Policy'
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
