import { User } from '@/assets'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'

const UserPopover = () => {
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
					<SignInButton>
						<Button>Iniciar Session</Button>
					</SignInButton>
					<Button asChild>
						<Link href='/reseller'>Registrarse como Revendedor</Link>
					</Button>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</PopoverContent>
		</Popover>
	)
}

export default UserPopover
