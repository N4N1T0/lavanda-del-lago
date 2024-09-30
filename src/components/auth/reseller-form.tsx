'use client'

// React Hook Form and Zod Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

// UI Imports
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

// Next.js Imports
import { useRouter } from 'next/navigation'

// Types and Schemas Imports
import {
  type ResellerFormSchemaType,
  resellerFormSchema
} from '@/lib/form-schemas'

const ResellerForm = () => {
  // initialize of the router
  const router = useRouter()

  // Form State definition
  const form = useForm<ResellerFormSchemaType>({
    resolver: zodResolver(resellerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      nie: '',
      province: '',
      phone: '',
      birthDate: '',
      birthPlace: '',
      privacyPolicy: false
    }
  })

  // Onsubmit function
  async function onSubmit(values: ResellerFormSchemaType) {
    try {
      const response = await fetch('/api/create-reseller-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-4'>
        {/* Nombre */}
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-accent'>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='Juan' {...field} />
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
              <FormLabel className='font-bold text-accent'>Apellido</FormLabel>
              <FormControl>
                <Input placeholder='Perez' {...field} />
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
              <FormLabel className='font-bold text-accent'>
                Correo Electrónico
              </FormLabel>
              <FormControl>
                <Input placeholder='juan@perez.es' {...field} />
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
              <FormLabel className='font-bold text-accent'>NIE</FormLabel>
              <FormControl>
                <Input placeholder='Z1186708F' {...field} />
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
              <FormLabel className='font-bold text-accent'>
                Provincia de Residencia
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Selecciona un lugar'
                      className='font-normal text-gray-600'
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
              <FormLabel className='font-bold text-accent'>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder='+34 123 456 789' {...field} />
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
              <FormLabel className='font-bold text-accent'>
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
              <FormLabel className='font-bold text-accent'>
                Lugar de Nacimiento
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Selecciona un lugar'
                      className='font-normal text-gray-600'
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
              <FormLabel className='ml-3 font-bold text-accent'>
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
