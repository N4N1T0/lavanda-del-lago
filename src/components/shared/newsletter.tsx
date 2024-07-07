'use client'

// React Imports
import React from 'react'

// Next.js Imports
import Link from 'next/link'

// UI Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Newsletter = React.memo(() => {
	const inputRef = React.useRef<HTMLInputElement>(null)

	/**
	 * Handles the form submission event.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
	 * @return {void} This function does not return a value.
	 */
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		const input = inputRef.current
		if (input) {
			const value = input.value.trim()
			if (value) {
				input.value = ''
				// TODO: Handle email submission
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
						className='flex-1 rounded-none border border-gray-300 px-4 py-2 text-tertiary shadow-sm focus:border-gray-500 foucus:outline-none focus:ring-0 placeholder:text-tertiary'
					/>
					<Button
						type='submit'
						className='rounded-none bg-gray-100 px-4 py-2 text-tertiary shadow-sm transition-colors hover:text-tertiary hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
					>
						Subscribete
					</Button>
				</form>
				<small className='text-sm text-gray-300 block px-10 md:px-0'>
					Subsicibete a nuestro newsletter para ofertas e informacion esclusiva
					sobre nuestros eventos. Lee nuestra{' '}
					<Link
						href='#'
						className='underline text-gray-400 hover:text-white transition-colors duration-150'
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
