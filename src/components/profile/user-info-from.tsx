'use client'

// React Imports
import { useState } from 'react'

// Next.js Imports
import { useRouter } from 'next/navigation'

// Forms Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// UI Imports
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

// Assets Imports
import { Loader2, Pencil } from 'lucide-react'

// Type Imports
import type { User } from '@/types'

// Form Validation Schema
const formSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres',
	}),
	email: z
		.string()
		.min(2, {
			message: 'El correo electrónico es obligatorio',
		})
		.email({
			message: 'Correo electrónico no válido',
		}),
	phone: z
		.string()
		.min(10, {
			message: 'El teléfono debe tener al menos 10 dígitos',
		})
		.regex(/^\d+$/, {
			message: 'El teléfono solo debe contener números',
		}),
	address: z.string().min(5, {
		message: 'La dirección debe tener al menos 5 caracteres',
	}),
})

const UserProfileForm = ({ user }: { user: User }) => {
	// initialize the Router
	const router = useRouter()

	// Dialgo state definition control
	const [open, setOpen] = useState(false)

	// Form State definition
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			phone: user.phone || '',
			address: user.address || '',
		},
	})

	// Form submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const response = await fetch('/api/update-user-info', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...values,
				id: user.id,
			}),
		})

		const data = await response.json()

		if (data.success) {
			setOpen(false)

			setTimeout(() => {
				router.refresh()
			}, 1000)
		} else {
			console.log(data.message)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='w-full mt-4' variant='cart'>
					<Pencil className='mr-2 h-4 w-4' />
					Editar Perfil
				</Button>
			</DialogTrigger>
			<DialogContent
				aria-describedby='Editar Perfil'
				className='max-w-xs sm:max-w-xl md:max-w-2xl'
			>
				<DialogHeader>
					<DialogTitle>Editar Perfil</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input
											placeholder='Juan Perez'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Correo Electrónico</FormLabel>
									<FormControl>
										<Input
											placeholder='juan.perez@example.com'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Teléfono</FormLabel>
									<FormControl>
										<Input
											placeholder='+34 123456789'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dirección</FormLabel>
									<FormControl>
										<Input
											placeholder='Calle Falsa 123'
											{...field}
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : (
								'Guardar Cambios'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}

export default UserProfileForm
