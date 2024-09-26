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
	Text,
} from '@react-email/components'
import { TailwindWrapper } from './email-utils'
import type { Product } from '@/types'

interface PurchaseConfirmationEmailProps {
	customerName: string
	orderNumber: string
	totalAmount: string
	purchaseDate: string
	id: string
	reseller: boolean
	products: Product[]
}

const baseUrl = 'https://localhost:3000'

export const CompletedPurchase = ({
	customerName = 'Cliente Valorado',
	orderNumber = '12345',
	totalAmount = '$99.99',
	purchaseDate = '1 de Enero de 2023',
	id = '1q2w3e4r5t',
	reseller = false,
}: PurchaseConfirmationEmailProps) => (
	<TailwindWrapper>
		<Html>
			<Head />
			<Preview>Compra completada</Preview>
			<Body className='bg-white font-sans'>
				<Container className='mx-auto p-4 sm:p-6 max-w-screen-sm'>
					<Img
						src={`${baseUrl}/navbar-logo.png`}
						width='170'
						height='50'
						alt='Logo de tu empresa'
						className='mx-auto mb-6'
					/>
					<Heading className='text-2xl sm:text-4xl font-bold text-center text-accent mb-6'>
						Confirmación de Pago
					</Heading>
					<Text className='text-base text-gray-700 mb-4'>
						Hola {customerName},
					</Text>
					<Text className='text-base text-gray-700 mb-6'>
						Gracias por tu compra. Estamos emocionados de confirmar que tu
						pedido ha sido procesado con éxito.
					</Text>
					<Section className='bg-gray-100 rounded-lg p-6 mb-6'>
						<Text className='text-sm text-gray-700 mb-2'>
							<strong>Número de pedido:</strong> {orderNumber}
						</Text>
						<Text className='text-sm text-gray-700 mb-2'>
							<strong>Total:</strong> {totalAmount}
						</Text>
						<Text className='text-sm text-gray-700'>
							<strong>Fecha de compra:</strong> {purchaseDate}
						</Text>
					</Section>
					<Section className='bg-gray-100 rounded-lg p-6 mb-6 mt-3'>
						<Text className='text-xl text-gray-700 mb-2'>
							<strong>Productos:</strong>
						</Text>
					</Section>
					<Text className='text-base text-gray-700 mb-6'>
						Puedes ver los detalles de tu pedido y seguir tu envío haciendo clic
						en el botón a continuación:
					</Text>
					<Link
						href={`${baseUrl}/${reseller ? 'reseller' : 'profile'}/${id}`}
						target='_blank'
						className='bg-accent text-white font-bold py-3 px-6 rounded-lg text-center block w-full max-w-xs mx-auto mb-6'
					>
						Ver estado del pedido
					</Link>
					<Hr className='border-t border-gray-300 my-6' />
					<Text className='text-sm text-gray-600 mb-2'>
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
