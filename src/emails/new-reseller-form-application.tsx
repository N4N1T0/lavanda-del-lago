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
import { TailwindWrapper } from './email-utils'

interface EmailProps {
  nombre: string
  email: string
  fecha: string
  link: string
}

export const NewResellerApplicationEmail = ({
  nombre,
  email,
  fecha,
  link
}: EmailProps) => (
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
            Nueva Solicitud de Reseller
          </Heading>
          <Text className='mb-6 text-gray-800'>
            Estimado equipo administrativo,
          </Text>
          <Text className='mb-6 text-gray-800'>
            Se ha recibido una nueva solicitud de un usuario que desea
            convertirse en reseller en nuestra plataforma.
          </Text>
          <Section className='mb-6'>
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Nombre del solicitante
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
                    Fecha de solicitud
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{fecha}</td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Text className='mb-6 text-gray-800'>
            Por favor, revisen la solicitud{' '}
            <Link href={link}>Puedes revisar la info aqui</Link>
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

export default NewResellerApplicationEmail
