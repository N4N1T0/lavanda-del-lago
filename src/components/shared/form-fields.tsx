// Next.js Imports
import Link from 'next/link'

// React Hook Imports
import { Control, FieldValues, Path } from 'react-hook-form'

// UI Imports
import {
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
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Define the props for the FormFieldComponent
interface FormFieldComponentProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'date' | 'select' | 'checkbox' | 'radio' | 'file' // Added 'file' type
  options?: string[] // Only applicable if type is 'select' or 'radio'
  isSubmitting: boolean
  className?: string | null
}


const FormFieldComponent = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  options = [],
  isSubmitting,
  className = ''
}: FormFieldComponentProps<T>) => (
  <FormField
    control={control}
    name={name} // Type assertion for the name
    render={({ field }) => (
      <FormItem
        className={`${type === 'checkbox' ? 'flex flex-row-reverse items-center justify-end gap-2' : ''} ${className}`}
      >
        <FormLabel className='font-bold text-gray-800'>
          {label === 'He Leído las Privacy Policy' ? (
            <span>
              He Leído{' '}
              <Link
                className='text-accent hover:underline'
                target='_blank'
                href='/privacy policy'
              >
                las Privacy Policy
              </Link>
            </span>
          ) : (
            label
          )}
        </FormLabel>
        <FormControl>
          {type === 'select' ? (
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isSubmitting}
            >
              <FormControl>
                <SelectTrigger className='border border-accent/50'>
                  <SelectValue
                    placeholder={placeholder}
                    className='font-normal text-gray-600'
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === 'checkbox' ? (
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isSubmitting}
              className='!mt-0'
            />
          ) : type === 'radio' ? (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className='flex flex-col space-y-1'
            >
              {options.map((option) => (
                <FormItem key={option} className='flex items-center space-x-3'>
                  <FormControl>
                    <RadioGroupItem value={option} />
                  </FormControl>
                  <FormLabel className='font-normal'>{option}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          ) : type === 'file' ? (
            <Input
              type='file'
              onChange={(e) => field.onChange(e.target.files)} // Handle file input change
              disabled={isSubmitting}
              className='border border-accent/50'
            />
          ) : (
            <Input
              type={type}
              autoComplete={type}
              placeholder={placeholder}
              {...field}
              disabled={isSubmitting}
              className='border border-accent/50'
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormFieldComponent
