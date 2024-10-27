import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
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
  gateway = 'Transferencia',
  user,
  iva = 'N/A',
  shippingAddress,
  discountCoupon
}: PurchaseConfirmationEmailProps) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Preview>Compra completada</Preview>
      <Body className='bg-white font-sans'>
        <Container className='mx-auto max-w-screen-sm p-4 sm:p-6'>
          <Img
            src='https://www.lavandadellago.es/navbar-logo.png'
            width='200'
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
              <strong>Iva:</strong> {eurilize(Number(iva))}
            </Text>
            {discountCoupon > 0 && (
              <Text className='text-sm text-gray-700'>
                <strong>Descuento por Cupon:</strong> -
                {eurilize(discountCoupon)}
              </Text>
            )}
            {user?.reseller && user?.discount && (
              <Text className='text-sm text-gray-700'>
                <strong>Descuento por Revendedor:</strong> -{user?.discount}%
              </Text>
            )}
            <Text className='text-sm text-gray-700'>
              <strong>Fecha de compra:</strong> {purchaseDate}
            </Text>
          </Section>

          {/* New Section for Shipping Information */}
          <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Datos de Facturación</strong>
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Nombre:</strong> {user?.name || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Email:</strong> {user?.email || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Teléfono:</strong> {user?.phone || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Tipo de Documento:</strong>{' '}
              {user?.idDocument?.type || 'DNI'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Número de Documento:</strong>
              {user?.idDocument?.value || ''}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Calle:</strong> {user?.address?.street}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Piso:</strong> {user?.address?.floor}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Referencia:</strong> {user?.address?.reference}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Código Postal:</strong> {user?.address?.postal_code}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Localidad:</strong> {user?.address?.locality}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>País:</strong> {user?.address?.country}
            </Text>
          </Section>

          {/* New Section for Shipping Information */}
          <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Datos del Envío</strong>
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Calle:</strong>{' '}
              {shippingAddress?.address?.street || user?.address?.street}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Piso:</strong>{' '}
              {shippingAddress?.address?.floor || user?.address?.floor}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Referencia:</strong>{' '}
              {shippingAddress?.address?.reference || user?.address?.reference}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Código Postal:</strong>{' '}
              {shippingAddress?.address?.postal_code ||
                user?.address?.postal_code}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Localidad:</strong>{' '}
              {shippingAddress?.address?.locality || user?.address?.locality}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>País:</strong>{' '}
              {shippingAddress?.address?.country || user?.address?.country}
            </Text>
          </Section>

          <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-2 text-xl text-gray-700'>
              <strong>Productos:</strong>
            </Text>
            <table width='100%' style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '10px', textAlign: 'left' }}>
                    Producto
                  </th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>
                    Cantidad
                  </th>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.map(({ product, quantity }) => (
                  <tr
                    key={product.id}
                    style={{ borderBottom: '1px solid #dddddd' }}
                  >
                    <td
                      style={{
                        padding: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <Img
                        src={product.image}
                        alt={product.nombre}
                        title={product.nombre}
                        width={50}
                        height={50}
                        style={{ marginRight: '10px' }}
                      />
                      <p>{product.nombre}</p>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      {quantity}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>
                      {eurilize(quantity * product.precio)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          {gateway === 'Transferencia' && (
            <>
              <Text className='text-center text-gray-800'>
                Si has elegido pagar mediante transferencia, solo tienes que
                realizar la transferencia a la cuenta{' '}
              </Text>
              <Text className='font-bold'>
                IBAN: ES04 0182 4136 9102 0178 4853
              </Text>
              <Text className='font-bold'>BIC: BBVAESMMXXX</Text>
              <Text className='font-bold'>
                con el concepto: &quot;lavandadellago-{orderNumber}&quot;
              </Text>
              <Text>
                Después de recibir la confirmación de la transferencia, nosotros
                nos pondremos en contacto contigo para confirmar la recepción
                del pago y proceder con el envío de tu pedido.
              </Text>
            </>
          )}

          <Text className='mb-6 text-base text-gray-700'>
            Puedes ver los detalles de tu pedido y seguir tu envío haciendo clic
            en el botón a continuación:
          </Text>
          <Link
            href={`${baseUrl}/${reseller ? 'reseller' : 'profile'}/${id}`}
            target='_blank'
            className='mx-auto mb-6 block w-full max-w-[200px] rounded-lg bg-accent px-6 py-3 text-center font-bold text-white'
          >
            Ver estado del pedido
          </Link>
          <Hr className='my-6 border-t border-gray-300' />
          <Text className='mb-2 text-sm text-gray-600'>
            Si tienes alguna pregunta o inquietud, no dudes en{' '}
            <Link
              href='mailto:info@lavandadellago.es'
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
