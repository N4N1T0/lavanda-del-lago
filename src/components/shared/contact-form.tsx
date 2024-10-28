'use client'

// Assets Imports
import { Map } from '@/assets'
import Link from 'next/link'

// Next.js Imports
import Image from 'next/image'

// UI Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormFieldComponent from '@/components/shared/form-fields'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'

// Forms Imports
import { contactFormSchema, ContactFormValues } from '@/lib/forms/form-schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Icons Imports
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react'

// Axiom logging
import { useLogger } from 'next-axiom'
import { useState } from 'react'
import { event } from '@/lib/fpixel'

const ContactForm = () => {
  // Axiom init
  const log = useLogger()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // React Hook Form init
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting }
  } = form

  const onSubmit = async (data: ContactFormValues) => {
    log.debug('Form submitted', { data })
    setIsLoading(true)

    event('Contact', {
      method: 'contact',
      email: data.email
    })

    try {
      const response = await fetch('/api/contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const responseBody = await response.json()

      if (!responseBody.success) {
        log.info('Contact Email sent Error', { data: responseBody.data })
      }

      log.info('Contact Email sent successfully', { data: responseBody })

      // Show toast notification
      toast({
        title: 'Mensaje enviado correctamente',
        description: 'Puedes seguir comprando o explorando nuestro sitio web.',
        duration: 4000
      })

      reset() // Reset the form fields
    } catch (err) {
      log.error('Submission error', { err })
      toast({
        title: 'Error al enviar el mensaje',
        description: 'Por favor intenta de nuevo más tarde.',
        duration: 3000,
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='grid gap-8 md:grid-cols-2'>
      <Card className='flex flex-col justify-between border border-accent/30'>
        <CardHeader>
          <CardTitle className='text-accent'>Envíanos un mensaje</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <FormFieldComponent
                control={control}
                isSubmitting={isLoading || isSubmitting}
                label='Nombre'
                name='name'
                placeholder='Juan Perez'
                type='text'
              />
              <FormFieldComponent
                control={control}
                isSubmitting={isLoading || isSubmitting}
                label='Email'
                name='email'
                placeholder='juan@perez.com'
                type='email'
              />
              <FormFieldComponent
                control={control}
                isSubmitting={isLoading || isSubmitting}
                label='Teléfono'
                name='phone'
                placeholder='666 123 456'
                type='text'
              />
              <FormFieldComponent
                control={control}
                isSubmitting={isLoading || isSubmitting}
                label='Mensaje'
                name='message'
                placeholder='Quisiera saber sobre las novedades de ...'
                type='textarea'
              />
              <Button
                type='submit'
                className='w-full'
                variant='cart'
                disabled={isLoading}
              >
                {isSubmitting || isLoading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  'Enviar'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className='space-y-8'>
        <Card className='border border-accent/30'>
          <CardHeader>
            <CardTitle className='text-accent'>
              Información de contacto
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Link
              href='mailto:info@lavandadellago.es'
              target='_blank'
              className='flex items-center space-x-2 hover:underline'
            >
              <Mail className='text-muted-foreground h-5 w-5' />
              <span>info@lavandadellago.es</span>
            </Link>
            <Link
              href='tel:+34951158016'
              target='_blank'
              className='flex items-center space-x-2 hover:underline'
            >
              <Phone className='text-muted-foreground h-5 w-5' />
              <span>+34 666 123 456</span>
            </Link>
            <Link
              href='https://www.google.com/maps/place/C.+Soria,+12,+29670+San+Pedro+Alc%C3%A1ntara,+M%C3%A1laga/@36.48077,-4.9961049,17z/data=!3m1!4b1!4m6!3m5!1s0xd732a3e8acc112d:0xb9d10395a903e1ab!8m2!3d36.48077!4d-4.99353!16s%2Fg%2F11c23zs3p_?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D'
              target='_blank'
              className='flex items-center space-x-2 hover:underline'
              onClick={() =>
                event('FindLocation', { location: 'San Pedro Alcántara' })
              }
            >
              <MapPin className='text-muted-foreground h-5 w-5' />
              <span>Calle Soria, 12 cp 29670 San Pedro Alcántara (Málaga)</span>
            </Link>
          </CardContent>
        </Card>
        <Link
          href='https://www.google.com/maps/place/C.+Soria,+12,+29670+San+Pedro+Alc%C3%A1ntara,+M%C3%A1laga/@36.48077,-4.9961049,17z/data=!3m1!4b1!4m6!3m5!1s0xd732a3e8acc112d:0xb9d10395a903e1ab!8m2!3d36.48077!4d-4.99353!16s%2Fg%2F11c23zs3p_?entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D'
          className='group relative block aspect-video overflow-hidden rounded-lg border border-accent/30'
          target='_blank'
          rel='noopener noreferrer'
          onClick={() =>
            event('FindLocation', { location: 'San Pedro Alcántara' })
          }
        >
          <Image
            src={Map}
            alt='Mapa de la tienda'
            title='Mapa de la tienda'
            className='object-cover transition-transform duration-150 ease-in-out group-hover:scale-105'
            fill
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
            priority
          />
        </Link>
      </div>
    </div>
  )
}

export default ContactForm
