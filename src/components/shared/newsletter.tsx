'use client'

// React Imports
import React from 'react'

// Next.js Imports
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

/**
 * Render a form to subscribe to the newsletter.
 *
 * @return {JSX.Element} This returns a JSX element.
 */
const Newsletter = React.memo(() => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const { toast } = useToast()

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault()
		const input = inputRef.current
		if (input) {
			const email = input.value.trim()

			if (email) {
				try {
					const response = await fetch('/api/subscribe-newsletter', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email }),
					})

					const result = await response.json()

					if (response.ok && result.success) {
						toast({
							title: 'Se agrego correctamente al newsletter',
							description:
								'Puedes seguir comprando o ir al checkout desde el carrito de compras',
						})
					} else {
						toast({
							title: 'Ya estas suscrito al newsletter',
							description:
								'Puedes seguir comprando o ir al checkout desde el carrito de compras',
						})
					}

					input.value = ''
				} catch (error) {
					console.error('Error subscribing to newsletter:', error)
					toast({
						title: 'Error',
						description:
							'Ocurrió un error al intentar suscribirte. Inténtalo de nuevo.',
					})
				}
			}
		}
	}

	return (
		<section
			id='newsletter'
			className='flex w-full flex-col items-center justify-center bg-tertiary text-white py-20'
		>
			<div className='max-w-2xl space-y-6 text-center'>
				<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase'>
					Se parte de nuestra comunidad
				</h1>
				<form
					className='flex w-full items-center px-10 md:px-0'
					onSubmit={handleSubmit}
				>
					<Input
						type='email'
						placeholder='tu email...'
						required
						ref={inputRef}
						className='flex-1 rounded-none border border-gray-300 px-4 py-2 text-tertiary shadow-sm focus:border-gray-500 foucus:outline-none focus:ring-0 placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-0'
					/>
					<Button
						type='submit'
						className='rounded-none bg-gray-100 px-4 py-2 text-tertiary shadow-sm transition-colors hover:text-tertiary hover:bg-gray-300 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0'
					>
						Subscribete
					</Button>
				</form>
				<small className='text-sm text-gray-100 block px-10 md:px-0'>
					Subsicibete a nuestro newsletter para ofertas e informacion exclusiva
					sobre nuestros eventos. Lee nuestra{' '}
					<Link
						href='/privacy-policy'
						className='underline text-gray-300 hover:text-white transition-colors duration-150'
						prefetch={false}
					>
						politica de privacidad
					</Link>
					.
				</small>
			</div>
		</section>
	)
})

export default Newsletter
