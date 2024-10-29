'use client'

// React Imports
import { Dispatch, SetStateAction } from 'react'

// UI Imports
import { Button } from '../ui/button'
import FormFieldComponent from '../shared/form-fields'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '../ui/form'

// Form Imports
import { couponSchema, CouponSchemaType } from '@/lib/forms/form-schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Assets Imports
import { Loader2 } from 'lucide-react'

/**
 * Component that renders a form to validate a coupon.
 *
 * @param {Object} props Component props
 * @param {Function} props.setDiscountCoupon Function to set the discount coupon
 * @param {string | undefined} props.userId User ID
 *
 * @returns {JSX.Element} The rendered component
 */
const CouponValidationForm = ({
  setDiscountCoupon,
  userId,
  discountCoupon
}: {
  setDiscountCoupon: Dispatch<SetStateAction<number>>
  userId: string | undefined
  discountCoupon: number
}) => {
  // Toast function
  const { toast } = useToast()

  // React Hook Form Init
  const form = useForm<CouponSchemaType>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: ''
    }
  })

  // Form Deconstruction
  const {
    formState: { isSubmitting },
    control,
    handleSubmit,
    setError
  } = form

  // Submit Handler
  const onSubmit = async (values: CouponSchemaType) => {
    try {
      const response = await fetch('/api/coupons-validation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          coupon: values.code,
          userId: userId
        })
      })

      const data = await response.json()

      if (data.success) {
        setDiscountCoupon(data.discount)
        toast({
          title: 'Cupón Validado',
          description: 'El cupón fue validado correctamente.',
          duration: 3000
        })
      } else {
        switch (data.message) {
          case 'Cupón no válido':
            setError('code', { message: 'El código ingresado no es válido.' })
            break
          case 'El cupón no está dentro del rango de fechas válido':
            setError('code', {
              message: 'El cupón no está dentro del rango de fechas válido.'
            })
            break
          case 'El usuario ya ha utilizado este cupón':
            setError('code', {
              message: 'Ya has utilizado este cupón'
            })
            break
          default:
            setError('code', {
              message: 'Error al validar el cupón. Inténtalo de nuevo.'
            })
        }
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        duration: 3000,
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form
        className='w-full border-y border-accent/50 py-3'
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='text-sm md:text-base'>
          Cupón de Regalo o Código Promocional
        </p>
        <div className='mt-1.5 flex items-center justify-between gap-4'>
          <FormFieldComponent
            control={control}
            isSubmitting={isSubmitting || discountCoupon > 0}
            name='code'
            label=''
            placeholder='2Xc34Lq'
            type='text'
            className='w-3/4'
          />
          <Button
            disabled={isSubmitting || discountCoupon > 0}
            type='submit'
            variant='cart'
            className='mt-1 w-1/4'
          >
            {isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Validar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CouponValidationForm
