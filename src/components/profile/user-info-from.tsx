'use client'

// Next.js Imports
import { usePathname, useRouter } from 'next/navigation'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Assets Imports
import { Loader2, Pencil } from 'lucide-react'

// Types Imports
import type { User } from '@/types'
import { userSchema, type UserSchemaType } from '@/lib/form-schemas'
import PasswordCheck from '../checkout/password-check'
import { useEffect, useMemo } from 'react'
import Link from 'next/link'

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

  // Memoized localities
  const localities = useMemo(
    () => [
      'Álava',
      'Albacete',
      'Alicante',
      'Almería',
      'Asturias',
      'Ávila',
      'Badajoz',
      'Baleares',
      'Barcelona',
      'Burgos',
      'Cáceres',
      'Cádiz',
      'Cantabria',
      'Castellón',
      'Ceuta',
      'Ciudad Real',
      'Córdoba',
      'Cuenca',
      'Gerona',
      'Granada',
      'Guadalajara',
      'Guipúzcoa',
      'Huelva',
      'Huesca',
      'Jaén',
      'La Coruña',
      'La Rioja',
      'Las Palmas',
      'León',
      'Lérida',
      'Lugo',
      'Madrid',
      'Málaga',
      'Melilla',
      'Murcia',
      'Navarra',
      'Orense',
      'Palencia',
      'Pontevedra',
      'Salamanca',
      'Santa Cruz de Tenerife',
      'Segovia',
      'Sevilla',
      'Soria',
      'Tarragona',
      'Teruel',
      'Toledo',
      'Valencia',
      'Valladolid',
      'Vizcaya',
      'Zamora',
      'Zaragoza'
    ],
    []
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <fieldset className='space-y-4'>
          <legend className='w-full border-b text-lg text-accent'>
            Informacio Personal
          </legend>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Juan Perez'
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className='border border-accent/50'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder='juan.perez@example.com'
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className='border border-accent/50'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder='+34 123456789'
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className='border border-accent/50'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid w-full grid-cols-4 space-x-4 pt-2'>
            <FormField
              control={form.control}
              name='documentType'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      {/* Input for document type */}
                      <SelectTrigger className='border border-accent/50'>
                        <SelectValue
                          placeholder='Selecciona un lugar'
                          className='rounded-md font-normal text-gray-600'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='dni' className='focus:bg-accent/30'>
                        DNI
                      </SelectItem>
                      <SelectItem value='nie' className='focus:bg-accent/30'>
                        NIE
                      </SelectItem>
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='documentNumber'
              render={({ field }) => (
                <FormItem className='col-span-3'>
                  <FormControl>
                    {/* Input for document number */}
                    <Input
                      placeholder='Número del Documento...'
                      {...field}
                      autoComplete='ID'
                      disabled={form.formState.isSubmitting}
                      className='border border-accent/50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        <fieldset className='space-y-4'>
          <legend className='w-full border-b text-lg text-accent'>
            Direccion
          </legend>
          <FormField
            control={form.control}
            name='street'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Calle Falsa 123'
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className='border border-accent/50'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='floor'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Piso</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Piso 1, 1zq'
                    {...field}
                    disabled={form.formState.isSubmitting}
                    className='border border-accent/50'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='postal_code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo Postal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='22345'
                      {...field}
                      disabled={form.formState.isSubmitting}
                      autoComplete='postal-code'
                      className='border border-accent/50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='locality'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidad</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={form.formState.isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className='border border-accent/50'>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {localities.map((locality) => (
                        <SelectItem
                          key={locality}
                          value={locality}
                          className='focus:bg-accent/30'
                        >
                          {locality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {!user && (
          <fieldset className='space-y-4'>
            <legend className='w-full border-b text-lg text-accent'>
              Contraseña
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
