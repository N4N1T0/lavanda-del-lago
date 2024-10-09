'use client'

// External Package Imports (Auth)
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'

// Assets Imports
import { ContactRound, ReceiptEuro } from 'lucide-react'

// Next.js Imports
import { useRouter } from 'next/navigation'

// Clerk Imports
import { User } from '@clerk/backend'
import { Skeleton } from '../ui/skeleton'

/**
 * UserProfile component.
 *
 * Render a UserButton with a menu of two options,
 * depending on if the user is a reseller or not.
 *
 * If the user is not a reseller, the menu will have two
 * options: 'Perfil de Usuario' and 'Formulario de Revenedor'.
 *
 * If the user is a reseller, the menu will have one option:
 * 'Perfil de Revenedor'.
 *
 * @returns A JSX.Element representing the UserButton with the menu.
 */
const UserProfile = (): JSX.Element => {
  // initialize of the router
  const router = useRouter()
  // User Getting Hook
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    // Handle loading state however you like
    return <Skeleton className='h-8 w-8' />
  }

  const {
    id,
    publicMetadata: { reseller }
  } = user as unknown as User

  return (
    <SignedIn>
      <UserButton>
        {!reseller ? (
          <UserButton.MenuItems>
            <UserButton.Action
              label='Perfil de Usuario'
              labelIcon={<ContactRound className='h-4 w-4' />}
              onClick={() => router.push(`/profile/${id}`)}
            />
            <UserButton.Action
              label='Formulario de Revenedor'
              labelIcon={<ReceiptEuro className='h-4 w-4' />}
              onClick={() => router.push('/reseller-form')}
            />
          </UserButton.MenuItems>
        ) : (
          <UserButton.MenuItems>
            <UserButton.Action
              label='Perfil de Revenedor'
              labelIcon={<ReceiptEuro className='h-4 w-4' />}
              onClick={() => router.push(`/reseller/${id}`)}
            />
          </UserButton.MenuItems>
        )}
      </UserButton>
    </SignedIn>
  )
}

export default UserProfile
