import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MapPin, Pencil } from 'lucide-react'

interface User {
	name: string
	email: string
	phone: string
	address: string
	avatarUrl: string
}

interface UserInfoCardProps {
	user: User
	onUserUpdate: (updatedUser: User) => void
}

// TODO add the link for the Reseller Form

export function UserInfoCard({ user, onUserUpdate }: UserInfoCardProps) {
	const handleUserUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const updatedUser = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
			address: formData.get('address') as string,
			avatarUrl: user.avatarUrl,
		}
		onUserUpdate(updatedUser)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col items-center'>
				<Avatar className='w-24 h-24 mb-4'>
					<AvatarImage src={user.avatarUrl} alt={user.name} />
					<AvatarFallback>
						{user.name
							.split(' ')
							.map((n) => n[0])
							.join('')}
					</AvatarFallback>
				</Avatar>
				<h2 className='text-xl font-semibold mb-2'>{user.name}</h2>
				<div className='flex flex-col items-start w-full'>
					<div className='flex items-center mb-2'>
						<Mail className='mr-2 h-4 w-4' />
						<span>{user.email}</span>
					</div>
					<div className='flex items-center mb-2'>
						<Phone className='mr-2 h-4 w-4' />
						<span>{user.phone}</span>
					</div>
					<div className='flex items-center'>
						<MapPin className='mr-2 h-4 w-4' />
						<span>{user.address}</span>
					</div>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className='w-full mt-4'>
							<Pencil className='mr-2 h-4 w-4' />
							Edit Profile
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Profile</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleUserUpdate} className='space-y-4'>
							<div>
								<Label htmlFor='name'>Name</Label>
								<Input id='name' name='name' defaultValue={user.name} />
							</div>
							<div>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									name='email'
									type='email'
									defaultValue={user.email}
								/>
							</div>
							<div>
								<Label htmlFor='phone'>Phone</Label>
								<Input id='phone' name='phone' defaultValue={user.phone} />
							</div>
							<div>
								<Label htmlFor='address'>Address</Label>
								<Input
									id='address'
									name='address'
									defaultValue={user.address}
								/>
							</div>
							<Button type='submit'>Save Changes</Button>
						</form>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	)
}
