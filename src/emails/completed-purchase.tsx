import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import { baseUrl, TailwindWrapper } from './email-utils'
import { PurchaseConfirmationEmailProps } from '@/types'
import { eurilize } from '@/lib/utils'

export const CompletedPurchase = ({
  customerName = 'Cliente Valorado',
  orderNumber = '12345',
  totalAmount = 'N/A',
  purchaseDate = new Date().toLocaleString('es-ES'),
  id = '1q2w3e4r5t',
  reseller = false,
  products = [],
  gateway
}: PurchaseConfirmationEmailProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Preview>Compra completada</Preview>
      <Body className='bg-white font-sans'>
        <Container className='mx-auto max-w-screen-sm p-4 sm:p-6'>
          <Img
            src={`${baseUrl}/navbar-logo.png`}
            width='170'
            height='50'
            alt='Logo de tu empresa'
            className='mx-auto mb-6'
          />
          <Heading className='mb-6 text-center text-2xl font-bold text-accent sm:text-4xl'>
            Confirmación de Pago via{' '}
            <span className='font-bold uppercase'>{gateway}</span>
          </Heading>
          <Text className='mb-4 text-base text-gray-700'>
            Hola {customerName},
          </Text>
          <Text className='mb-6 text-base text-gray-700'>
            Gracias por tu compra. Estamos emocionados de confirmar que tu
            pedido ha sido procesado con éxito.
          </Text>
          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Número de pedido:</strong> #{orderNumber}
            </Text>
            <Text className='mb-2 text-sm text-gray-700'>
              <strong>Total:</strong> {eurilize(Number(totalAmount))}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Fecha de compra:</strong>{' '}
              {new Date(purchaseDate).toLocaleDateString('es-ES')}
            </Text>
          </Section>
          <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-2 text-xl text-gray-700'>
              <strong>Productos:</strong>
            </Text>
            {products.map(({ product }, quantity) => (
              <Row
                key={product.id}
                className='flex w-full items-center justify-between'
              >
                <Column>
                  <Img
                    src={product.image}
                    alt={product.nombre}
                    title={product.nombre}
                    width={50}
                    height={50}
                    className='aspect-square size-12'
                  />
                </Column>
                <Column>{product.nombre}</Column>
                <Column>{quantity}</Column>
                <Column>{eurilize(quantity * product.precio)}</Column>
              </Row>
            ))}
          </Section>
          <Text className='mb-6 text-base text-gray-700'>
            Puedes ver los detalles de tu pedido y seguir tu envío haciendo clic
            en el botón a continuación:
          </Text>
          <Link
            href={`${baseUrl}/${reseller ? 'reseller' : 'profile'}/${id}`}
            target='_blank'
            className='mx-auto mb-6 block w-full max-w-xs rounded-lg bg-accent px-6 py-3 text-center font-bold text-white'
          >
            Ver estado del pedido
          </Link>
          <Hr className='my-6 border-t border-gray-300' />
          <Text className='mb-2 text-sm text-gray-600'>
            Si tienes alguna pregunta o inquietud, no dudes en{' '}
            <Link
              href='mailto:support@example.com'
              className='text-accent underline'
            >
              contactar a nuestro equipo de soporte
            </Link>
            .
          </Text>
          <Text className='text-sm text-gray-600'>
            ¡Gracias por comprar con nosotros!
          </Text>
        </Container>
      </Body>
    </Html>
  </TailwindWrapper>
)

export default CompletedPurchase
