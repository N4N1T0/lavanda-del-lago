'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { ContactRound } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UserProfile = ({ userId }: { userId: string }) => {
	const router = useRouter()

	return (
		<SignedIn>
			<UserButton>
				<UserButton.MenuItems>
					<UserButton.Action
						label='Perfil de Usuario'
						labelIcon={<ContactRound className='w-4 h-4' />}
						onClick={() => router.push(`/profile/${userId}`)}
					/>
				</UserButton.MenuItems>
			</UserButton>
		</SignedIn>
	)
}

export default UserProfile
