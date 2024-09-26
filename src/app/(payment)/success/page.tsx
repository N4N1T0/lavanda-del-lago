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

// Assets Imports
import {
	CheckCircle2Icon,
	PackageIcon,
	TruckIcon,
	UserIcon,
} from 'lucide-react'

// Types Imports
import type { Metadata } from 'next'

// Metadata for this page
export const metadata: Metadata = {
	title: 'Pago Exitoso',
	description: 'Pago Exitoso',
}

/**
 * Fetches data from
 *
 * @return {Promise<JSX.Element>} The JSX element representing the.
 */
const SuccesPaymentPage = async (): Promise<JSX.Element> => {
	return (
		<div className='min-h-screen bg-[#694DAB20] flex items-center justify-center p-4'>
			<Card className='w-full max-w-md border-accent'>
				<CardHeader className='text-center'>
					<CheckCircle2Icon className='w-16 h-16 text-accent mx-auto mb-4' />
					<CardTitle className='text-2xl font-bold text-accent'>
						¡Pago Exitoso!
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<p className='text-center text-gray-600'>
						Gracias por tu compra. Tu pedido ha sido procesado con éxito.
					</p>
					<div className='bg-[#694DAB10] p-4 rounded-lg space-y-2'>
						<div className='flex justify-between items-center'>
							<span className='font-semibold'>Número de Pedido:</span>
							<span>#12345678</span>
						</div>
						<div className='flex justify-between items-center'>
							<span className='font-semibold'>Monto Total:</span>
							<span>$99.99</span>
						</div>
					</div>
					<div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
						<PackageIcon className='w-4 h-4 text-accent' />
						<span>Preparando tu pedido</span>
					</div>
					<div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
						<TruckIcon className='w-4 h-4 text-accent' />
						<span>Entrega estimada: 3-5 días hábiles</span>
					</div>
				</CardContent>
				<CardFooter className='flex justify-center space-x-4'>
					<Button variant='cart'>
						<Link href='/'>Seguir Comprando</Link>
					</Button>
					<Button variant='default'>
						<Link href='/perfil' className='flex items-center'>
							<UserIcon className='w-4 h-4 mr-2' />
							Tu Perfil
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default SuccesPaymentPage
