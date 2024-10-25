import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { TailwindWrapper } from './email-utils'
import { eurilize } from '@/lib/utils'
import { PaymentErrorNotificationProps } from '@/types'

export const PaymentErrorNotification = ({
  user,
  orderId,
  totalAmount,
  errorDetails
}: PaymentErrorNotificationProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Preview>Error en el Pago</Preview>
      <Body className='bg-white font-sans'>
        <Container className='mx-auto max-w-screen-sm p-4 sm:p-6'>
          <Img
            src='https://www.lavandadellago.es/navbar-logo.png'
            width='200'
            height='50'
            alt='Logo de tu empresa'
            className='mx-auto mb-6'
          />
          <Heading className='mb-6 text-center text-2xl font-bold text-red-500 sm:text-4xl'>
            Error en el Pago
          </Heading>
          <Text className='mb-4 text-base text-gray-700'>
            Hola Equipo de Administración,
          </Text>
          <Text className='mb-6 text-base text-gray-700'>
            Se ha producido un error inesperado durante el proceso de pago para
            el cliente {user?.name}. Por favor, revisen los detalles a
            continuación para investigar el problema.
          </Text>

          {/* Error Details */}
          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Detalles del Error</strong>
            </Text>
            <Text className='text-sm text-red-500'>{errorDetails || ''}</Text>
          </Section>

          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Número de Pedido:</strong> #
              {orderId || 'Sin Número de Orden'}
            </Text>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Total:</strong> {eurilize(Number(totalAmount))}
            </Text>
          </Section>

          {/* User Data Section */}
          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Datos del Usuario</strong>
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Nombre:</strong> {user?.name || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Email:</strong> {user?.email || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Teléfono:</strong> {user?.phone || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Tipo de Documento:</strong>{' '}
              {user?.idDocument?.type || 'DNI'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Número de Documento:</strong>{' '}
              {user?.idDocument?.value || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Calle:</strong> {user?.address?.street || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Piso:</strong> {user?.address?.floor || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Referencia:</strong>{' '}
              {user?.address?.reference || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Código Postal:</strong>{' '}
              {user?.address?.postal_code || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Localidad:</strong>{' '}
              {user?.address?.locality || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>País:</strong> {user?.address?.country || 'No disponible'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </TailwindWrapper>
)

export default PaymentErrorNotification
