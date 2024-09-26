// Next.js Imports
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { AlertCircle, HelpCircle, RefreshCcw } from 'lucide-react'

// Types Imports
import type { Metadata } from 'next'

// Metadata for this page
export const metadata: Metadata = {
	title: 'Pago Fallido',
	description: 'Pago Fallido',
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const FailedPaymentPage = async (): Promise<JSX.Element> => {
	return (
		<div className='min-h-screen bg-red-100 flex items-center justify-center p-4'>
			<Card className='w-full max-w-2xl border-accent'>
				<CardHeader className='text-center'>
					<AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
					<CardTitle className='text-2xl font-bold text-red-600'>
						Pago Fallido
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-6'>
					<p className='text-center text-gray-600'>
						Lo sentimos, hubo un problema al procesar tu pago. Por favor, revisa
						la información a continuación e intenta nuevamente.
					</p>

					<div className='bg-[#694DAB10] p-4 rounded-lg space-y-4'>
						<h3 className='font-semibold text-lg text-accent'>
							Detalles del Pedido
						</h3>
						<div className='grid grid-cols-2 gap-2 text-sm'>
							<span className='font-medium'>Número de Pedido:</span>
							<span>#12345678</span>
							<span className='font-medium'>Total:</span>
							<span>$99.99</span>
							<span className='font-medium'>Fecha:</span>
							<span>{new Date().toLocaleDateString()}</span>
						</div>
					</div>

					<div className='space-y-2'>
						<h3 className='font-semibold text-lg text-accent'>
							Posibles Razones del Fallo
						</h3>
						<ul className='list-disc list-inside text-sm text-gray-600 space-y-1'>
							<li>Fondos insuficientes en la cuenta</li>
							<li>Información de la tarjeta incorrecta</li>
							<li>La transacción fue rechazada por el banco</li>
							<li>Problemas técnicos temporales</li>
						</ul>
					</div>

					<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded'>
						<div className='flex'>
							<div className='flex-shrink-0'>
								<HelpCircle className='h-5 w-5 text-yellow-400' />
							</div>
							<div className='ml-3'>
								<p className='text-sm text-yellow-700'>
									Si continúas teniendo problemas, por favor contacta a tu banco
									o a nuestro servicio de atención al cliente.
								</p>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4'>
					<Button variant='cart' className='w-fit'>
						<RefreshCcw className='w-4 h-4 mr-2' />
						<Link href='/checkout'>Reintentar Pago</Link>
					</Button>
					<Button variant='link'>
						<HelpCircle className='w-4 h-4 mr-2' />
						<Link href='/support'>Contactar Soporte</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default FailedPaymentPage
