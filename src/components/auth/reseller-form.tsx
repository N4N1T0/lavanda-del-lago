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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'

// Form Validation Schema
const formSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	email: z.string().email().min(5),
	nie: z.string().min(9).max(9), // NIE validation can be adjusted
	province: z.string().min(1, 'Por favor selecciona una provincia'),
	phone: z.string().min(9).max(15), // Adjust depending on validation needs
	birthDate: z.string(),
	birthPlace: z.string().optional(),
	privacyPolicy: z.boolean().refine((val) => val === true, {
		message: 'Debes aceptar la política de privacidad',
	}),
})

const ResellerForm = () => {
	// initialize of the router
	const router = useRouter()

	// Form State definition
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			nie: '',
			province: '',
			phone: '',
			birthDate: '',
			birthPlace: '',
			privacyPolicy: false,
		},
	})

	// Onsubmit function
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const response = await fetch('/api/create-reseller-form', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			const data = await response.json()

			if (data.success) {
				form.reset()

				if (data.already) {
					router.push('/?security=form_already-ok')
				}

				router.push('/?security=form_send-ok')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
				{/* Nombre */}
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>Nombre</FormLabel>
							<FormControl>
								<Input
									placeholder='Juan'
									className='focus-visible:ring-accent/50 focus-visible:ring-1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Apellido */}
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>Apellido</FormLabel>
							<FormControl>
								<Input
									placeholder='Perez'
									className='focus-visible:ring-accent/50 focus-visible:ring-1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>
								Correo Electrónico
							</FormLabel>
							<FormControl>
								<Input
									placeholder='juan@perez.es'
									className='focus-visible:ring-accent/50 focus-visible:ring-1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* NIE */}
				<FormField
					control={form.control}
					name='nie'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>NIE</FormLabel>
							<FormControl>
								<Input
									placeholder='Z1186708F'
									className='focus-visible:ring-accent/50 focus-visible:ring-1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Provincia de Residencia */}
				<FormField
					control={form.control}
					name='province'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>
								Provincia de Residencia
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder='Selecciona un lugar'
											className='text-gray-600 font-normal'
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='Álava'>Álava</SelectItem>
									<SelectItem value='Albacete'>Albacete</SelectItem>
									<SelectItem value='Alicante'>Alicante</SelectItem>
									<SelectItem value='Almería'>Almería</SelectItem>
									<SelectItem value='Asturias'>Asturias</SelectItem>
									<SelectItem value='Ávila'>Ávila</SelectItem>
									<SelectItem value='Badajoz'>Badajoz</SelectItem>
									<SelectItem value='Baleares'>Baleares</SelectItem>
									<SelectItem value='Barcelona'>Barcelona</SelectItem>
									<SelectItem value='Burgos'>Burgos</SelectItem>
									<SelectItem value='Cáceres'>Cáceres</SelectItem>
									<SelectItem value='Cádiz'>Cádiz</SelectItem>
									<SelectItem value='Cantabria'>Cantabria</SelectItem>
									<SelectItem value='Castellón'>Castellón</SelectItem>
									<SelectItem value='Ceuta'>Ceuta</SelectItem>
									<SelectItem value='Ciudad Real'>Ciudad Real</SelectItem>
									<SelectItem value='Córdoba'>Córdoba</SelectItem>
									<SelectItem value='Cuenca'>Cuenca</SelectItem>
									<SelectItem value='Gerona'>Gerona</SelectItem>
									<SelectItem value='Granada'>Granada</SelectItem>
									<SelectItem value='Guadalajara'>Guadalajara</SelectItem>
									<SelectItem value='Guipúzcoa'>Guipúzcoa</SelectItem>
									<SelectItem value='Huelva'>Huelva</SelectItem>
									<SelectItem value='Huesca'>Huesca</SelectItem>
									<SelectItem value='Jaén'>Jaén</SelectItem>
									<SelectItem value='La Coruña'>La Coruña</SelectItem>
									<SelectItem value='La Rioja'>La Rioja</SelectItem>
									<SelectItem value='Las Palmas'>Las Palmas</SelectItem>
									<SelectItem value='León'>León</SelectItem>
									<SelectItem value='Lérida'>Lérida</SelectItem>
									<SelectItem value='Lugo'>Lugo</SelectItem>
									<SelectItem value='Madrid'>Madrid</SelectItem>
									<SelectItem value='Málaga'>Málaga</SelectItem>
									<SelectItem value='Melilla'>Melilla</SelectItem>
									<SelectItem value='Murcia'>Murcia</SelectItem>
									<SelectItem value='Navarra'>Navarra</SelectItem>
									<SelectItem value='Orense'>Orense</SelectItem>
									<SelectItem value='Palencia'>Palencia</SelectItem>
									<SelectItem value='Pontevedra'>Pontevedra</SelectItem>
									<SelectItem value='Salamanca'>Salamanca</SelectItem>
									<SelectItem value='Santa Cruz de Tenerife'>
										Santa Cruz de Tenerife
									</SelectItem>
									<SelectItem value='Segovia'>Segovia</SelectItem>
									<SelectItem value='Sevilla'>Sevilla</SelectItem>
									<SelectItem value='Soria'>Soria</SelectItem>
									<SelectItem value='Tarragona'>Tarragona</SelectItem>
									<SelectItem value='Teruel'>Teruel</SelectItem>
									<SelectItem value='Toledo'>Toledo</SelectItem>
									<SelectItem value='Valencia'>Valencia</SelectItem>
									<SelectItem value='Valladolid'>Valladolid</SelectItem>
									<SelectItem value='Vizcaya'>Vizcaya</SelectItem>
									<SelectItem value='Zamora'>Zamora</SelectItem>
									<SelectItem value='Zaragoza'>Zaragoza</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Teléfono */}
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>Teléfono</FormLabel>
							<FormControl>
								<Input
									placeholder='+34 123 456 789'
									className='focus-visible:ring-accent/50 focus-visible:ring-1'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Fecha de Nacimiento */}
				<FormField
					control={form.control}
					name='birthDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>
								Fecha de Nacimiento
							</FormLabel>
							<FormControl>
								<Input type='date' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Lugar de Nacimiento */}
				<FormField
					control={form.control}
					name='birthPlace'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-accent font-bold'>
								Lugar de Nacimiento
							</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue
											placeholder='Selecciona un lugar'
											className='text-gray-600 font-normal'
										/>
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='Álava'>Álava</SelectItem>
									<SelectItem value='Albacete'>Albacete</SelectItem>
									<SelectItem value='Alicante'>Alicante</SelectItem>
									<SelectItem value='Almería'>Almería</SelectItem>
									<SelectItem value='Asturias'>Asturias</SelectItem>
									<SelectItem value='Ávila'>Ávila</SelectItem>
									<SelectItem value='Badajoz'>Badajoz</SelectItem>
									<SelectItem value='Baleares'>Baleares</SelectItem>
									<SelectItem value='Barcelona'>Barcelona</SelectItem>
									<SelectItem value='Burgos'>Burgos</SelectItem>
									<SelectItem value='Cáceres'>Cáceres</SelectItem>
									<SelectItem value='Cádiz'>Cádiz</SelectItem>
									<SelectItem value='Cantabria'>Cantabria</SelectItem>
									<SelectItem value='Castellón'>Castellón</SelectItem>
									<SelectItem value='Ceuta'>Ceuta</SelectItem>
									<SelectItem value='Ciudad Real'>Ciudad Real</SelectItem>
									<SelectItem value='Córdoba'>Córdoba</SelectItem>
									<SelectItem value='Cuenca'>Cuenca</SelectItem>
									<SelectItem value='Gerona'>Gerona</SelectItem>
									<SelectItem value='Granada'>Granada</SelectItem>
									<SelectItem value='Guadalajara'>Guadalajara</SelectItem>
									<SelectItem value='Guipúzcoa'>Guipúzcoa</SelectItem>
									<SelectItem value='Huelva'>Huelva</SelectItem>
									<SelectItem value='Huesca'>Huesca</SelectItem>
									<SelectItem value='Jaén'>Jaén</SelectItem>
									<SelectItem value='La Coruña'>La Coruña</SelectItem>
									<SelectItem value='La Rioja'>La Rioja</SelectItem>
									<SelectItem value='Las Palmas'>Las Palmas</SelectItem>
									<SelectItem value='León'>León</SelectItem>
									<SelectItem value='Lérida'>Lérida</SelectItem>
									<SelectItem value='Lugo'>Lugo</SelectItem>
									<SelectItem value='Madrid'>Madrid</SelectItem>
									<SelectItem value='Málaga'>Málaga</SelectItem>
									<SelectItem value='Melilla'>Melilla</SelectItem>
									<SelectItem value='Murcia'>Murcia</SelectItem>
									<SelectItem value='Navarra'>Navarra</SelectItem>
									<SelectItem value='Orense'>Orense</SelectItem>
									<SelectItem value='Palencia'>Palencia</SelectItem>
									<SelectItem value='Pontevedra'>Pontevedra</SelectItem>
									<SelectItem value='Salamanca'>Salamanca</SelectItem>
									<SelectItem value='Santa Cruz de Tenerife'>
										Santa Cruz de Tenerife
									</SelectItem>
									<SelectItem value='Segovia'>Segovia</SelectItem>
									<SelectItem value='Sevilla'>Sevilla</SelectItem>
									<SelectItem value='Soria'>Soria</SelectItem>
									<SelectItem value='Tarragona'>Tarragona</SelectItem>
									<SelectItem value='Teruel'>Teruel</SelectItem>
									<SelectItem value='Toledo'>Toledo</SelectItem>
									<SelectItem value='Valencia'>Valencia</SelectItem>
									<SelectItem value='Valladolid'>Valladolid</SelectItem>
									<SelectItem value='Vizcaya'>Vizcaya</SelectItem>
									<SelectItem value='Zamora'>Zamora</SelectItem>
									<SelectItem value='Zaragoza'>Zaragoza</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* He visto el Privacy Policy */}
				<FormField
					control={form.control}
					name='privacyPolicy'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel className='text-accent font-bold ml-3'>
								He visto el Privacy Policy
							</FormLabel>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' variant={'cart'}>
					Enviar
				</Button>
			</form>
		</Form>
	)
}

export default ResellerForm
