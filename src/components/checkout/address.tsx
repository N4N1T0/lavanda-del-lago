'use client'

// React Imports
import { useEffect, useState } from 'react'

// React Hook Form and Zod Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// UI Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

// Project Components Imports
import PasswordCheck from './password-check'

// Type Imports
import type { User } from '@/types'
import { checkoutSchema, type CheckoutSchemaType } from '@/lib/form-schemas'

/**
 * Renders a form for entering an address with fields for personal details and address.
 * The form uses React Hook Form and Zod for form validation.
 *
 * @return {JSX.Element} The rendered form component.
 */
const Address = ({ user }: { user: User | null }): JSX.Element => {
  const [newUser, setnewUser] = useState(false)

  const form = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      Calle: user?.address?.street || '',
      Piso: user?.address?.floor || '',
      Codigo_Postal: user?.address?.postal_code || '',
      Localidad: user?.address?.locality || '',
      documentType: 'dni', // Valor por defecto
      documentNumber: '',
      updateInfo: false,
      password: '',
      confirmPassword: ''
    }
  })

  // UseEffect para actualizar valores cuando newUser cambie
  useEffect(() => {
    form.setValue('password', newUser ? '' : '12345678a')
    form.setValue('confirmPassword', newUser ? '' : '12345678a')
  }, [newUser, form])

  // 2. Define a submit handler.
  async function onSubmit(values: CheckoutSchemaType) {
    if (form.formState.isDirty) {
      const response = await fetch('/api/handle-checkout-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'new-user': newUser.toString()
        },
        body: JSON.stringify(values)
      })

      const data = await response.json()

      console.log(data)
    }
  }

  return (
    <Form {...form}>
      {/* Form container */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Use for disabling the form whe submitting */}
        <fieldset
          disabled={form.formState.isSubmitting}
          className='group space-y-4'
        >
          {/* Form legend */}
          <legend className='text-2xl'>Información del Destinatario</legend>
          {/* Form field for name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Input for name */}
                  <Input
                    placeholder='Nombre...'
                    {...field}
                    className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                    autoComplete='name'
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Input for email */}
                  <Input
                    placeholder='Email...'
                    {...field}
                    className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                    autoComplete='email'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for phone */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Input for phone */}
                  <Input
                    placeholder='Teléfono...'
                    {...field}
                    className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                    autoComplete='tel'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!user && (
            <div className='flex w-full items-center justify-end gap-3'>
              <Switch
                checked={newUser}
                onCheckedChange={(checked) => setnewUser(checked)}
                className='group-disabled:cursor-not-allowed group-disabled:opacity-50'
              />
              <p className='text-accent'>Quieres crearte un usuario</p>
            </div>
          )}
          {!user && newUser && <PasswordCheck form={form} />}
          {/* Form legend for address */}
          <legend className='text-2xl'>Dirección de Entrega</legend>
          {/* Form field for street */}
          <FormField
            control={form.control}
            name='Calle'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Input for street */}
                  <Input
                    placeholder='Calle...'
                    {...field}
                    className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                    autoComplete='street-address'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for floor */}
          <FormField
            control={form.control}
            name='Piso'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Input for floor */}
                  <Input
                    placeholder='No. Piso...'
                    {...field}
                    className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                    autoComplete='address-level2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form fields for postal code and locality */}
          <fieldset className='flex gap-4'>
            <FormField
              control={form.control}
              name='Codigo_Postal'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Input for postal code */}
                    <Input
                      placeholder='Código Postal...'
                      {...field}
                      className='flex-1 rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                      autoComplete='postal-code'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Localidad'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* Input for locality */}
                    <Input
                      placeholder='Localidad...'
                      {...field}
                      className='flex-1 rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                      autoComplete='address-level1'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          {/* Form fields for document type and number */}
          <fieldset className='grid w-full grid-cols-4 space-x-4'>
            <FormField
              control={form.control}
              name='documentType'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      {/* Input for document type */}
                      <SelectTrigger className='border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'>
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
                      className='rounded-md border border-accent/50 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                      autoComplete='off'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          {/* Checkbox for updating information */}
          <FormField
            control={form.control}
            name='updateInfo'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Checkbox for updating information */}
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='group-disabled:cursor-not-allowed group-disabled:opacity-50'
                  />
                </FormControl>
                <FormMessage />
                <FormLabel className='ml-2 border-accent/50'>
                  Usar como direccion principal
                </FormLabel>
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button
            type='submit'
            variant='cart'
            className='group-disabled:cursor-not-allowed group-disabled:opacity-50'
          >
            Guardar Cambios
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}

export default Address
