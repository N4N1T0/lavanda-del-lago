import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text
} from '@react-email/components'
import { NotificacionContactoInternoProps } from '@/types'
import { TailwindWrapper } from './email-utils'

export const NotificacionContactoInterno: React.FC<
  NotificacionContactoInternoProps
> = ({ name, email, phone, message }) => (
  <Html>
    <Head />
    <Preview>Nuevo contacto recibido de {name}</Preview>
    <TailwindWrapper>
      <Body className='bg-gray-100 font-sans'>
        <Container className='mx-auto my-8 rounded-lg bg-white p-6 shadow-lg'>
          <Img
            src='https://www.lavandadellago.es/navbar-logo.png'
             width='200'
            height='50'
            alt='Logo de tu empresa'
            className='mx-auto mb-6'
          />
          <Heading className='my-8 text-center text-2xl font-bold text-accent'>
            Nuevo Contacto Recibido
          </Heading>
          <Text className='mb-4 text-base text-gray-700'>Estimado equipo,</Text>
          <Text className='mb-4 text-base text-gray-700'>
            Se ha recibido un nuevo mensaje de contacto a través del formulario
            de la página web. A continuación, se detallan los datos
            proporcionados por el usuario:
          </Text>
          <Container className='mb-4 rounded-md bg-gray-50 p-4'>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Nombre:</strong> {name}
            </Text>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Correo electrónico:</strong> {email}
            </Text>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Teléfono:</strong> {phone}
            </Text>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Mensaje:</strong>
            </Text>
            <Text className='text-sm italic text-gray-600'>
              &quot;{message}&quot;
            </Text>
          </Container>
          <Text className='mb-4 text-base text-gray-700'>
            Saludos cordiales,
            <br />
            Sistema Automatizado de Notificaciones
          </Text>
        </Container>
      </Body>
    </TailwindWrapper>
  </Html>
)

export default NotificacionContactoInterno
