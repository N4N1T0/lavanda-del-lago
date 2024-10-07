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

// Define the props for the FormFieldComponent
interface FormFieldComponentProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'date' | 'select' | 'checkbox' // Extend types as needed
  options?: string[] // Only applicable if type is 'select'
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
        className={`${type === 'checkbox' ? 'flex-row-reverse' : ''} ${className}`}
      >
        <FormLabel className='font-bold text-gray-800'>{label}</FormLabel>
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
