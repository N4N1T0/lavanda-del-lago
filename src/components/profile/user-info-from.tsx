'use client'

// Next.js Imports
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// Forms Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import ShippingAddressForm from '@/components/profile/shipping-adress-form'

// UI Imports
import { Button } from '@/components/ui/button'
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
import { Checkbox } from '@/components/ui/checkbox'

// Assets Imports
import { Loader2, Pencil } from 'lucide-react'

// Types Imports
import type { User } from '@/types'
import { userSchema, type UserSchemaType } from '@/lib/forms/form-schemas'

// Data Imports
import { shippingCountries } from '@/constants/site-data'

export const UserProfileFormDialog = ({ user }: { user: User | null }) => {
  // Estado para controlar el diálogo abierto/cerrado
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // Función para abrir el diálogo
  const openDialog = () => setIsOpen(true)

  // Función para cerrar el diálogo
  const closeDialog = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='mt-4 w-full' variant='cart' onClick={openDialog}>
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
        <UserProfileForm user={user} closeDialog={closeDialog} isCard={true} />
      </DialogContent>
    </Dialog>
  )
}

export const UserProfileForm = ({
  user,
  closeDialog,
  isCard = false
}: {
  user: User | null
  closeDialog?: () => void
  isCard?: boolean
}) => {
  // New Address Toggle & Data
  const [isShippingAddress, setIsShippingAddress] = useState<boolean>(false)

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
      documentType: user?.idDocument?.type || 'DNI',
      documentNumber: user?.idDocument?.value || '',
      address: {
        street: user?.address?.street || '',
        floor: user?.address?.floor || '',
        reference: user?.address?.reference || '',
        postal_code: user?.address?.postal_code || '',
        locality: user?.address?.locality || '',
        country: user?.address?.country || 'España'
      },
      password: user?.password || '',
      confirmPassword: user?.password || '',
      shippingAddress: {
        street: '',
        floor: '',
        reference: '',
        postal_code: '',
        locality: '',
        country: 'España'
      }
    },
    mode: 'onBlur'
  })

  // UseEffect para actualizar valores cuando newUser cambie
  useEffect(() => {
    form.setValue('password', user ? '12345678a' : '')
    form.setValue('confirmPassword', user ? '12345678a' : '')
  }, [user, form])

  useEffect(() => {
    form.setValue(
      'shippingAddress.floor',
      !isShippingAddress ? 'Marbella 1' : ''
    )
    form.setValue(
      'shippingAddress.street',
      !isShippingAddress ? 'Marbella 2' : ''
    )
    form.setValue(
      'shippingAddress.postal_code',
      !isShippingAddress ? '12345' : ''
    )
    form.setValue(
      'shippingAddress.locality',
      !isShippingAddress ? 'Marbella 3' : ''
    )
  }, [isShippingAddress, form])

  const {
    formState: { isSubmitting, errors, dirtyFields }
  } = form

  const isDirty = Object.values(dirtyFields).length > 0
  const noErrors = Object.keys(errors).length === 0

  // Form submit handler.
  async function onSubmit(values: UserSchemaType) {
    // TODO: Add no empty fields validation
    if (!isDirty && noErrors && !isShippingAddress) {
      router.push(`/checkout/review?userId=${user?.id}&shippingAddress=null`)
      return
    }

    const response = await fetch('/api/update-user-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'new-user': user ? 'false' : 'true',
        'newShippingAddress': isShippingAddress ? 'true' : 'false'
      },
      body: JSON.stringify({
        values
      })
    })

    const data = await response.json()

    if (data.success) {
      form.reset()

      if (path === '/checkout') {
        setTimeout(() => {
          router.push(
            `/checkout/review?userId=${data.data}&shippingAddress=${data.shippingAddress}`
          )
        }, 200)
      } else {
        router.push(path)
        // Cierra el diálogo después del éxito del submit
        if (closeDialog) closeDialog()
      }
    } else {
      router.push(`${path}?security=${data.data[0].code}`)
    }
  }

  return (
    <Form {...form}>
      <form className='space-y-8'>
        <fieldset className='space-y-4'>
          <legend className='w-full border-b text-lg text-accent'>
            Información Personal
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
              options={['DNI', 'NIE', 'NIF']}
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
            Dirección de Facturación
          </legend>
          <FormFieldComponent
            control={form.control}
            name='address.street'
            label='Calle'
            placeholder='Calle Falsa 123'
            isSubmitting={isSubmitting}
          />
          <FormFieldComponent
            control={form.control}
            name='address.floor'
            label='Numero'
            placeholder='Piso 1, 1zq'
            isSubmitting={isSubmitting}
          />
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
            <FormFieldComponent
              control={form.control}
              name='address.reference'
              label='Referencia (opcional)'
              placeholder='Detrás del Mercadona'
              isSubmitting={isSubmitting}
            />
            <FormFieldComponent
              control={form.control}
              name='address.locality'
              label='Localidad'
              placeholder='Marbella'
              isSubmitting={isSubmitting}
            />
          </div>
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
            <FormFieldComponent
              control={form.control}
              name='address.postal_code'
              label='Código Postal'
              placeholder='22345'
              isSubmitting={isSubmitting}
            />
            <FormFieldComponent
              control={form.control}
              name='address.country'
              label='País de residencia'
              placeholder='España'
              type='select'
              options={shippingCountries}
              isSubmitting={isSubmitting}
            />
          </div>
        </fieldset>

        {/* Password */}
        {!user && (
          <fieldset className='space-y-4'>
            <legend className='w-full border-b text-sm text-accent'>
              Crea tu contraseña y date de alta en Lavanda del Lago España.
            </legend>
            <PasswordCheck form={form} />
          </fieldset>
        )}

        {/* Checkbox for enabling/disabling shipping form using Shadcn UI */}
        {!isCard && (
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='useShippingAddress'
              checked={isShippingAddress}
              onCheckedChange={() => setIsShippingAddress(!isShippingAddress)}
              className='h-4 w-4'
            />
            <label htmlFor='useShippingAddress' className='text-sm text-accent'>
              Usar una dirección de envío diferente a la de facturación
            </label>
          </div>
        )}

        {/* Shipping Address */}
        {isShippingAddress && (
          <fieldset className='space-y-4'>
            <legend className='w-full border-b text-lg text-accent'>
              Dirección de envío
            </legend>
            <ShippingAddressForm form={form} isSubmitting={isSubmitting} />
          </fieldset>
        )}

        {/* Submit */}
        <Button
          type='submit'
          variant='cart'
          disabled={isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : isDirty || isShippingAddress ? (
            'Guardar Cambios'
          ) : (
            'Continuar'
          )}
        </Button>
      </form>
    </Form>
  )
}
