import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Section,
  Text
} from '@react-email/components'
import * as React from 'react'
import { baseUrl, TailwindWrapper } from './email-utils'

interface EmailProps {
  nombre: string
  email: string
  fecha: string
  link: string
}

export const NewUserCreatedEmail = ({ nombre, email, fecha, link }: EmailProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Body className='bg-gray-100 font-sans'>
        <Container className='mx-auto max-w-md p-4 sm:p-6'>
          <Img
            src={`${baseUrl}/navbar-logo.png`}
            width='170'
            height='50'
            alt='Logo de tu empresa'
            className='mx-auto mb-6'
          />
          <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
            Nuevo Usuario Registrado
          </Heading>
          <Text className='mb-6 text-gray-800'>
            Estimado equipo administrativo,
          </Text>
          <Text className='mb-6 text-gray-800'>
            Se ha creado una nueva cuenta de usuario en la plataforma.
          </Text>
          <Section className='mb-6'>
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Nombre del usuario
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{nombre}</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Correo electrónico
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{email}</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Fecha de creación
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{fecha}</td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Text className='mb-6 text-gray-800'>
            Por favor, verifiquen la información del usuario si es necesario.
            <Link href={link}>Puedes verificar la info aqui</Link>
          </Text>
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

export default NewUserCreatedEmail
