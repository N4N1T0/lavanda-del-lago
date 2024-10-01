import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text
} from '@react-email/components'
import * as React from 'react'
import { TailwindWrapper } from './email-utils'

interface EmailProps {
  email: string
  fecha: string
}

export const NewsletterSubscriptionEmail = ({ email, fecha }: EmailProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Body className='bg-gray-100 font-sans'>
        <Container className='mx-auto max-w-md p-4 sm:p-6'>
          <Heading className='mb-4 text-center text-2xl font-bold text-gray-800'>
            Nueva Suscripción al Newsletter
          </Heading>
          <Text className='mb-6 text-gray-800'>
            Estimado equipo administrativo,
          </Text>
          <Text className='mb-6 text-gray-800'>
            Un usuario se ha suscrito al newsletter de la plataforma.
          </Text>
          <Section className='mb-6'>
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Correo electrónico
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{email}</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Fecha de suscripción
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{fecha}</td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Text className='mb-6 text-gray-800'>
            Por favor, agreguen este usuario a la lista de envíos del
            newsletter.
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

export default NewsletterSubscriptionEmail
