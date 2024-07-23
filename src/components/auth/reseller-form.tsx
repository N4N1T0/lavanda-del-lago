'use client'

// React Hook Form and Zod Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// UI Imports
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Form Validation Schema
const formSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().min(2).max(50),
	phone: z.string().min(2).max(50),
	company: z.string().min(2).max(50),
	role: z.string().min(2).max(50),
})

const ResellerForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			company: '',
			role: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre y Apellidos</FormLabel>
							<FormControl>
								<Input placeholder='Jose Perez' {...field} />
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
							<FormLabel>Email Corporativo</FormLabel>
							<FormControl>
								<Input placeholder='compañia.joseperez@gmail.com' {...field} />
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
							<FormLabel>Telefono Corporatico</FormLabel>
							<FormControl>
								<Input placeholder='+34 123 456 789' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='company'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre de la Compañia</FormLabel>
							<FormControl>
								<Input placeholder='Jose Perez s.a' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='role'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Posicion dentro de la Compañia</FormLabel>
							<FormControl>
								<Input placeholder='CEO, Vendedor...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Enviar</Button>
			</form>
		</Form>
	)
}

export default ResellerForm
