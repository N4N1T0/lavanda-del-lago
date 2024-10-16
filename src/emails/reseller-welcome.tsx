import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Text,
  Link,
  Img
} from '@react-email/components'
import * as React from 'react'
import { TailwindWrapper } from './email-utils'

interface EmailProps {
  nombre: string
  link: string
}

export const ResellerWelcomeEmail = ({ nombre, link }: EmailProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Body className='bg-gray-100 font-sans'>
        <Container className='mx-auto max-w-md p-4 sm:p-6'>
          <Img
            src='https://www.lavandadellago.es/navbar-logo.png'
            width='200'
            height='50'
            alt='Logo de tu empresa'
            className='mx-auto mb-6'
          />
          <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
            ¡Bienvenido como Revendedor!
          </Heading>
          <Text className='mb-6 text-gray-800'>Hola {nombre},</Text>
          <Text className='mb-6 text-gray-800'>
            Nos complace informarte que ahora eres un Revendedor en nuestra
            plataforma. A partir de ahora, tendrás acceso a beneficios
            exclusivos que te ayudarán a maximizar tus ventas.
          </Text>
          <Text className='mb-6 text-gray-800'>
            Te animamos a explorar todos los recursos disponibles y aprovechar
            al máximo tu nueva función. Si tienes alguna pregunta, no dudes en
            ponerte en contacto con nosotros.
          </Text>
          <Link href={link} className='text-accent hover:underline'>
            puedes tu perfil de Revendedor en nuestra plataforma.
          </Link>
          <Hr className='my-4 border-gray-300' />
          <Text className='text-sm text-gray-500'>
            Este es un mensaje automático. Por favor, no respondas a este correo
            electrónico.
          </Text>
        </Container>
      </Body>
    </Html>
  </TailwindWrapper>
)

export default ResellerWelcomeEmail
