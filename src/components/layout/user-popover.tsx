import { User } from '@/assets'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { SignInButton, SignedOut } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import UserProfile from './user-profile'

const UserPopover = async () => {
	const user = await currentUser()

	if (user) return <UserProfile userId={user.id} />

	return (
		<Popover>
			<PopoverTrigger>
				<Image
					className=' w-8 h-8 hover:opacity-50 duration-150 transition-opacity cursor-pointer'
					alt='Icon user'
					src={User}
				/>
			</PopoverTrigger>
			<PopoverContent className='w-fit flex flex-col gap-2'>
				<SignedOut>
					<SignInButton
						forceRedirectUrl='/api/create-sanity-user'
						signUpForceRedirectUrl='/api/create-sanity-user'
					>
						<Button>Iniciar Session</Button>
					</SignInButton>
					<Button asChild>
						<Link href='/reseller'>Registrarse como Revendedor</Link>
					</Button>
				</SignedOut>
			</PopoverContent>
		</Popover>
	)
}

export default UserPopover
