'use client'

// External Package Imports (Auth)
import { SignedIn, UserButton } from '@clerk/nextjs'

// Assets Imports
import { ContactRound, ReceiptEuro } from 'lucide-react'

// Next.js Imports
import { useRouter } from 'next/navigation'

/**
 * A component that renders a user profile button with different menu items based on whether the user is a reseller or not.
 *
 * @param {string} userId - The ID of the user.
 * @param {boolean} reseller - Whether the user is a reseller or not. Defaults to false.
 * @return {JSX.Element} The user profile button component.
 */
const UserProfile = ({
	userId,
	reseller = false,
}: { userId: string; reseller: boolean }): JSX.Element => {
	// initialize of the router
	const router = useRouter()

	return (
		<SignedIn>
			<UserButton>
				{!reseller ? (
					<UserButton.MenuItems>
						<UserButton.Action
							label='Perfil de Usuario'
							labelIcon={<ContactRound className='w-4 h-4' />}
							onClick={() => router.push(`/profile/${userId}`)}
						/>
						<UserButton.Action
							label='Formulario de Revenedor'
							labelIcon={<ReceiptEuro className='w-4 h-4' />}
							onClick={() => router.push('/reseller-form')}
						/>
					</UserButton.MenuItems>
				) : (
					<UserButton.MenuItems>
						<UserButton.Action
							label='Perfil de Revenedor'
							labelIcon={<ReceiptEuro className='w-4 h-4' />}
							onClick={() => router.push(`/reseller/${userId}`)}
						/>
					</UserButton.MenuItems>
				)}
			</UserButton>
		</SignedIn>
	)
}

export default UserProfile
