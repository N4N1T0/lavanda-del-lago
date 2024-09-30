// React Imports
import { useState } from 'react'

// UI Imports
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Assets Imports
import { Eye, EyeOff } from 'lucide-react'

// React Hook Form Imports
import type { UseFormReturn } from 'react-hook-form'
import type { CheckoutSchemaType } from '@/lib/form-schemas'

const PasswordCheck = ({
  form
}: {
  form: UseFormReturn<CheckoutSchemaType>
}) => {
  // Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false)

  // Función para cambiar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'} // Cambiamos entre 'text' y 'password'
                  placeholder='Contraseña...'
                  {...field}
                  className='rounded-md border border-accent/50 pr-10 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                  autoComplete='new-password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-600' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-600' />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='confirmPassword'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Repite Contraseña...'
                  {...field}
                  className='rounded-md border border-accent/50 pr-10 group-disabled:cursor-not-allowed group-disabled:opacity-50'
                  autoComplete='new-password'
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-600' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-600' />
                  )}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default PasswordCheck
