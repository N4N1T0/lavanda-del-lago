/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import FormFieldComponent from '../shared/form-fields'
import { UserSchemaType } from '@/lib/forms/form-schemas'
import { shippingCountries } from '@/constants/site-data'

const ShippingAddressForm = ({
  form,
  isSubmitting
}: {
  form: UseFormReturn<UserSchemaType>
  isSubmitting: boolean
}) => {
  return (
    <fieldset className='space-y-4'>
      <FormFieldComponent
        control={form.control}
        name='shippingAddress.street'
        label='Calle *'
        placeholder='Calle Falsa 123'
        isSubmitting={isSubmitting}
      />
      <FormFieldComponent
        control={form.control}
        name='shippingAddress.floor'
        label='Número *'
        placeholder='Piso 1, 1zq'
        isSubmitting={isSubmitting}
      />
      <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
        <FormFieldComponent
          control={form.control}
          name='shippingAddress.reference'
          label='Referencia (opcional)'
          placeholder='Detrás del Mercadona'
          isSubmitting={isSubmitting}
        />
        <FormFieldComponent
          control={form.control}
          name='shippingAddress.locality'
          label='Localidad *'
          placeholder='Marbella'
          isSubmitting={isSubmitting}
        />
      </div>
      <div className='grid w-full grid-cols-1 gap-5 md:grid-cols-2'>
        <FormFieldComponent
          control={form.control}
          name='shippingAddress.postal_code'
          label='Código Postal *'
          placeholder='22345'
          isSubmitting={isSubmitting}
        />
        <FormFieldComponent
          control={form.control}
          name='shippingAddress.country'
          label='País de residencia *'
          placeholder='España'
          type='select'
          options={shippingCountries}
          isSubmitting={isSubmitting}
        />
      </div>
    </fieldset>
  )
}

export default ShippingAddressForm
