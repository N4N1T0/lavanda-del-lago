import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'
import { TailwindWrapper } from './email-utils'
import { EmailPurchaseError } from '@/types'
import { eurilize } from '@/lib/utils'

export const ErrorPurchaseNotification = ({
  customerName = 'Cliente Valorado',
  orderNumber = '12345',
  totalAmount = 'N/A',
  purchaseDate = new Date().toLocaleString('es-ES'),
  products = [],
  gateway = 'Transferencia',
  user,
  errorDetails,
  iva = 'N/A',
  shippingAddress
}: EmailPurchaseError) => (
  <TailwindWrapper>
    <Html>
      <Head />
      <Preview>Error en la creación de la compra</Preview>
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
            Error en la Creación de Compra
          </Heading>
          <Text className='mb-4 text-base text-gray-700'>
            Hola Equipo de Administración,
          </Text>
          <Text className='mb-6 text-base text-gray-700'>
            Se ha producido un error inesperado durante la creación de la compra
            para el cliente {customerName}. La compra se ha completado con
            éxito, pero los detalles no se han registrado correctamente en
            nuestro sistema. Por favor, revisen el dashboard del gateway de
            pagos ({gateway}) para verificar la confirmación de la compra.
          </Text>

          {/* Error */}
          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Detalles del Error</strong>
            </Text>
            <Text className='text-sm text-red-500'>{errorDetails}</Text>
          </Section>

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
            {user?.reseller && user?.discount && (
              <Text className='text-sm text-gray-700'>
                <strong>Descuento por Revendedor:</strong> -{user?.discount}%
              </Text>
            )}
            <Text className='text-sm text-gray-700'>
              <strong>Fecha de compra:</strong> {purchaseDate}
            </Text>
          </Section>

          {/* Billing Information Section */}
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
              <strong>Número de Documento:</strong>{' '}
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

          {/* Shipping Information Section */}
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

          {/* User Data Section */}
          <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
            <Text className='mb-4 text-xl text-gray-700'>
              <strong>Usuario</strong>
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>ID de Usuario:</strong> {user?.id || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Nombre:</strong> {user?.id || 'No disponible'}
            </Text>
            <Text className='text-sm text-gray-700'>
              <strong>Revendedor:</strong> {user?.reseller ? 'Sí' : 'No'}
            </Text>
            <Link
              href={`mailto:${user?.email}`}
              target='_blank'
              className='text-accent underline'
            >
              {user?.email || 'No disponible'}
            </Link>
            <br />
            <Link
              href={`tel:${user?.phone}`}
              target='_blank'
              className='text-accent underline'
            >
              {user?.phone || 'No disponible'}
            </Link>
          </Section>

          {/* Product Details Section */}
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
                    <td style={{ padding: '10px' }}>{product.nombre}</td>
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
        </Container>
      </Body>
    </Html>
  </TailwindWrapper>
)

export default ErrorPurchaseNotification
