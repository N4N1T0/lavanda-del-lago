'use client'

// React Hook Form and Zod Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// UI Imports
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Form Validation Schema
const formSchema = z.object({
	Calle: z.string().min(2, { message: 'La Calle es necesaria' }),
	Piso: z.string().min(2, { message: 'El Piso es necesario' }),
	Codigo_Postal: z
		.string()
		.min(2, { message: 'El Codigo Postal es necesario' }),
	Localidad: z.string().min(2, { message: 'La Localidad es necesaria' }),
})

/**
 * Renders a form for entering an address with fields for street, floor, postal code, and city.
 * The form uses React Hook Form and Zod for form validation.
 *
 * @return {JSX.Element} The rendered form component.
 */
const Address = (): JSX.Element => {
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Calle: '',
			Piso: '',
			Codigo_Postal: '',
			Localidad: '',
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<Form {...form}>
			{/* Form container */}
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				{/* Form legend */}
				<legend className='text-2xl'>Direccion de Entrega</legend>
				{/* Form field for street */}
				<FormField
					control={form.control}
					name='Calle'
					render={({ field }) => (
						<FormItem className='border-accent/20 rounded-md border'>
							<FormControl>
								{/* Input for street */}
								<Input placeholder='Calle...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Form field for floor */}
				<FormField
					control={form.control}
					name='Piso'
					render={({ field }) => (
						<FormItem className='border-accent/20 rounded-md border'>
							<FormControl>
								{/* Input for floor */}
								<Input placeholder='No. Piso...' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* Form fields for postal code and city */}
				<fieldset className='flex gap-4'>
					<FormField
						control={form.control}
						name='Codigo_Postal'
						render={({ field }) => (
							<FormItem className='border-accent/20 rounded-md border flex-1'>
								<FormControl>
									{/* Input for postal code */}
									<Input placeholder='Codigo Postal...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='Localidad'
						render={({ field }) => (
							<FormItem className='border-accent/20 rounded-md border flex-1'>
								<FormControl>
									{/* Input for city */}
									<Input placeholder='Localidad...' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</fieldset>
			</form>
		</Form>
	)
}

export default Address
