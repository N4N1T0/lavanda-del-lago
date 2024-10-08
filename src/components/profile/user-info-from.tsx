'use client'

// Next.js Imports
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

// Forms Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// UI Imports
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import PasswordCheck from '@/components/checkout/password-check'
import FormFieldComponent from '@/components/shared/form-fields'

// Assets Imports
import { Loader2, Pencil } from 'lucide-react'

// Types Imports
import type { User } from '@/types'
import { userSchema, type UserSchemaType } from '@/lib/forms/form-schemas'

// Data Imports
import { localities } from '@/constants/site-data'

export const UserProfileFormDialog = ({ user }: { user: User | null }) => {
  // TODO OPEN and CLOSE Dialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mt-4 w-full' variant='cart'>
          <Pencil className='mr-2 h-4 w-4' />
          Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby='Editar Perfil'
        className='max-h-[90%] max-w-xs overflow-y-scroll sm:max-w-xl md:max-w-2xl'
      >
        <DialogHeader>
          <DialogTitle className='sr-only'>Editar Perfil</DialogTitle>
          <DialogDescription className='sr-only'>
            Editar Perfil
          </DialogDescription>
        </DialogHeader>
        <UserProfileForm user={user} />
      </DialogContent>
    </Dialog>
  )
}

export const UserProfileForm = ({ user }: { user: User | null }) => {
  // initialize the Router & Pathname
  const router = useRouter()
  const path = usePathname()

  // Form State definition
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      documentType: user?.idDocument?.type || 'dni',
      documentNumber: user?.idDocument?.value || '',
      street: user?.address?.street || '',
      floor: user?.address?.floor || '',
      postal_code: user?.address?.postal_code || '',
      locality: user?.address?.locality || '',
      password: user?.password || '',
      confirmPassword: user?.password || ''
    }
  })

  const isDirty = Object.values(form.formState.dirtyFields).length > 0

  // UseEffect para actualizar valores cuando newUser cambie
  useEffect(() => {
    form.setValue('password', user ? '12345678a' : '')
    form.setValue('confirmPassword', user ? '12345678a' : '')
  }, [user, form])

  // Form submit handler.
  async function onSubmit(values: UserSchemaType) {
    const response = await fetch('/api/update-user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'new-user': user ? 'false' : 'true'
      },
      body: JSON.stringify(values)
    })

    const data = await response.json()

    if (data.success) {
      form.reset()

      if (path === '/checkout') {
        setTimeout(() => {
          router.push(`/checkout/review?userId=${data.data}`)
        }, 500)
      } else {
        router.push(path)
      }
    } else {
      router.push(`${path}?security=${data.data[0].code}`)
    }
  }

  const {
    formState: { isSubmitting }
  } = form

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <fieldset className='space-y-4'>
          <legend className='w-full border-b text-lg text-accent'>
            Informacio Personal
          </legend>
          <FormFieldComponent
            control={form.control}
            name='name'
            label='Nombre'
            placeholder='Juan Perez'
            isSubmitting={isSubmitting}
          />
          <FormFieldComponent
            control={form.control}
            name='email'
            type='email'
            label='Correo Electrónico'
            placeholder='juan.perez@example.com'
            isSubmitting={isSubmitting}
          />
          <FormFieldComponent
            control={form.control}
            name='phone'
            label='Teléfono'
            placeholder='+34 123456789'
            isSubmitting={isSubmitting}
          />
          <div className='grid w-full grid-cols-4 space-x-4 pt-2'>
            <FormFieldComponent
              control={form.control}
              name='documentType'
              type='select'
              label=''
              placeholder='DNI'
              isSubmitting={isSubmitting}
              options={['DNI', 'NIE']}
              className='col-span-1'
            />
            <FormFieldComponent
              control={form.control}
              name='documentNumber'
              label=''
              placeholder='Número del Documento...'
              isSubmitting={isSubmitting}
              className='col-span-3'
            />
          </div>
        </fieldset>

        <fieldset className='space-y-4'>
          <legend className='w-full border-b text-lg text-accent'>
            Direccion
          </legend>
          <FormFieldComponent
            control={form.control}
            name='street'
            label='Calle'
            placeholder='Calle Falsa 123'
            isSubmitting={isSubmitting}
          />
          <FormFieldComponent
            control={form.control}
            name='floor'
            label='Piso'
            placeholder='Piso 1, 1zq'
            isSubmitting={isSubmitting}
          />
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
            <FormFieldComponent
              control={form.control}
              name='postal_code'
              label='Codigo Postal'
              placeholder='22345'
              isSubmitting={isSubmitting}
            />
            <FormFieldComponent
              control={form.control}
              name='locality'
              label='Localidad'
              placeholder=''
              type='select'
              options={localities}
              isSubmitting={isSubmitting}
            />
          </div>
        </fieldset>

        {!user && (
          <fieldset className='space-y-4'>
            <legend className='w-full border-b text-sm text-accent'>
              Crea tu contraseña y date de alta en Lavanda del Lago España.
            </legend>
            <PasswordCheck form={form} />
          </fieldset>
        )}
        {isDirty ? (
          <Button
            type='submit'
            variant='cart'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Guardar Cambios'
            )}
          </Button>
        ) : (
          <Link
            className={buttonVariants({ variant: 'cart' })}
            href={`/checkout/review?userId=${user?.id}`}
          >
            Continuar
          </Link>
        )}
      </form>
    </Form>
  )
}
