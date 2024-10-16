import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Text
} from '@react-email/components'
import * as React from 'react'
import { baseUrl, TailwindWrapper } from './email-utils'

interface EmailProps {
  fecha: string
  productosActualizados: number
}

export const DailyIndexingEmail = ({
  fecha,
  productosActualizados
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
            Informe diario de indexación de productos
          </Heading>
          <Text className='mb-6 text-gray-800'>
            Este es un correo electrónico automático para informarte sobre el
            proceso diario de indexación de productos para tu sitio web de
            comercio electrónico.
          </Text>
          <Section className='mb-6'>
            <table className='w-full border-collapse'>
              <tbody>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Fecha
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>{fecha}</td>
                </tr>
                <tr>
                  <td className='border border-gray-300 bg-gray-200 px-4 py-2 font-bold'>
                    Productos actualizados
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {productosActualizados}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>
          <Text className='mb-6 text-gray-800'>
            El proceso de indexación de productos se ha completado con éxito.{' '}
            {productosActualizados} productos fueron actualizados en el índice.
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

export default DailyIndexingEmail
