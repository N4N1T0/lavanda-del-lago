// Project Components Imports
import UserProfileForm from '@/components/profile/user-info-from'

// Next Imports
import Link from 'next/link'

// UI Components Imports
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// Assets Imports
import { Mail, Phone, MapPin, ReceiptEuro } from 'lucide-react'

// Types Imports
import type { User } from '@/types'

export function UserInfoCard({ user }: { user: User }) {
	return (
		<Card className='border-accent/70 border'>
			<CardHeader>
				<CardTitle>Información Personal</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col items-center'>
				<Avatar className='w-24 h-24 mb-4'>
					<AvatarImage
						src={user.image}
						alt={user.name || 'Imagen de usuario'}
					/>
					<AvatarFallback>
						{user.name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<h2 className='text-xl font-semibold mb-2'>
					{user.name || 'Usuario sin nombre'}
				</h2>
				<div className='flex flex-col items-start w-full'>
					<div className='flex items-center mb-2'>
						<Mail className='mr-2 h-4 w-4' />
						<span>{user.email || 'Sin correo'}</span>
					</div>
					<div className='flex items-center mb-2'>
						<Phone className='mr-2 h-4 w-4' />
						<span>{user.phone || 'Sin telefono'}</span>
					</div>
					<div className='flex items-center'>
						<MapPin className='mr-2 h-4 w-4' />
						<span>{user.address || 'Sin dirección'}</span>
					</div>
				</div>
				<UserProfileForm user={user} />
				<Button asChild className='w-full mt-4' variant='cart'>
					<Link
						href='/reseller'
						className='flex items-center justify-center gap-2'
					>
						<ReceiptEuro className='w-4 h-4' />
						Formulario de Revenedor
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}