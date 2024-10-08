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
import type { UserSchemaType } from '@/lib/forms/form-schemas'

const PasswordCheck = ({ form }: { form: UseFormReturn<UserSchemaType> }) => {
  // State to show or hide the password
  const [showPassword, setShowPassword] = useState(false)

  // Function to toggle password visibility
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
                  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  placeholder='Contraseña...'
                  {...field}
                  className='rounded-md border border-accent/50 pr-10'
                  autoComplete='new-password'
                  id='password'
                  disabled={form.formState.isSubmitting}
                  aria-label='Contraseña' // Accessibility label
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  } // Accessibility label
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
                  className='rounded-md border border-accent/50 pr-10'
                  autoComplete='new-password'
                  id='confirmPassword'
                  disabled={form.formState.isSubmitting}
                  aria-label='Repite Contraseña' // Accessibility label
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center pr-3'
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  } // Accessibility label
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
