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
import * as React from 'react'
import { TailwindWrapper } from './email-utils'
import { PackageOnTheWayProps } from '@/types'

export const PackageOnTheWayEmail = ({
  customerName = 'Cliente Valorado',
  orderNumber = '12345',
  expectedDeliveryDate = new Date(),
  products = [],
  shippingAddress,
  currier = 'correos',
  currierCode = '#dddddd'
}: PackageOnTheWayProps) => {
  const currierLink =
    currier === 'nacex'
      ? 'https://nacex.com'
      : 'https://www.correos.es/es/es/herramientas/localizador/envios'

  return (
    <TailwindWrapper>
      <Html>
        <Head />
        <Preview>Tu paquete está en camino</Preview>
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
              Tu Paquete Está en Camino
            </Heading>
            <Text className='mb-4 text-base text-gray-700'>
              Hola {customerName},
            </Text>
            <Text className='mb-6 text-base text-gray-700'>
              ¡Buenas noticias! Tu pedido con número de orden #{orderNumber} ha
              sido enviado y está en camino hacia ti.
            </Text>

            {/* Shipping Information */}
            <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
              <Text className='mb-4 text-xl text-gray-700'>
                <strong>Detalles de Envío</strong>
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Calle:</strong> {shippingAddress?.street}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Piso:</strong> {shippingAddress?.floor}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Referencia:</strong> {shippingAddress?.reference}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Código Postal:</strong> {shippingAddress?.postal_code}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Localidad:</strong> {shippingAddress?.locality}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>País:</strong> {shippingAddress?.country}
              </Text>
            </Section>

            {/* Expected Delivery and Tracking */}
            <Section className='mb-6 rounded-lg bg-gray-100 p-6'>
              <Text className='mb-4 text-xl text-gray-700'>
                <strong>Información de Entrega</strong>
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Fecha Estimada de Entrega:</strong>{' '}
                {expectedDeliveryDate.toLocaleString('es-ES').split(',')[0]}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Transportista:</strong> {currier}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Código de Seguimiento:</strong> {currierCode}
              </Text>
              <Text className='text-sm text-gray-700'>
                <strong>Enlace de seguimiento:</strong>{' '}
                <Link href={currierLink} target='_blank'>
                  Clique aquí
                </Link>
              </Text>
            </Section>

            {/* Product Details */}
            <Section className='mb-6 mt-3 rounded-lg bg-gray-100 p-6'>
              <Text className='mb-4 text-xl text-gray-700'>
                <strong>Productos en este Envío:</strong>
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
                  </tr>
                </thead>
                <tbody>
                  {products.map(({ product, quantity }) => (
                    <tr
                      key={product.id}
                      style={{ borderBottom: '1px solid #dddddd' }}
                    >
                      <td style={{ padding: '10px' }}>
                        <Img
                          src={product.image}
                          alt={product.nombre}
                          width={50}
                          height={50}
                        />
                        <p>{product.nombre}</p>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        {quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* Closing */}
            <Text className='mt-6 text-center text-base text-gray-700'>
              Gracias por elegirnos. ¡Esperamos que disfrutes de tu compra!
            </Text>
            <Text className='mt-2 text-center text-sm text-gray-500'>
              Si tienes alguna pregunta, no dudes en{' '}
              <Link href='mailto:support@empresa.com'>contactarnos</Link>.
            </Text>
          </Container>
        </Body>
      </Html>
    </TailwindWrapper>
  )
}

export default PackageOnTheWayEmail
