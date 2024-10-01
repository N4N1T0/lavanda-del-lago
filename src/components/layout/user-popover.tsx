// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Project components
import UserProfile from './user-profile'

// Assets Imports
import { User } from '@/assets'

// UI Imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

// Auth Imports
import { SignInButton, SignedOut } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

/**
 * A component that renders a user popover with different content based on whether the user is signed in or not.
 *
 * @return {Promise<JSX.Element>} The user popover component.
 */
const UserPopover = async (): Promise<JSX.Element> => {
  const user = await currentUser()

  if (user)
    return (
      <UserProfile
        userId={user?.id}
        reseller={user.publicMetadata.reseller as boolean}
      />
    )

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className='h-8 w-8 cursor-pointer transition-opacity duration-150 hover:opacity-50'
          alt='Icon user'
          src={User}
        />
      </PopoverTrigger>
      <PopoverContent className='flex w-fit flex-col gap-2'>
        <SignedOut>
          <SignInButton
            forceRedirectUrl='/api/create-sanity-user-from-clerk'
            signUpForceRedirectUrl='/api/create-sanity-user-from-clerk'
          >
            <Button>Iniciar Session</Button>
          </SignInButton>
          <Button asChild>
            <Link href='/reseller-form'>Registrarse como Revendedor</Link>
          </Button>
        </SignedOut>
      </PopoverContent>
    </Popover>
  )
}

export default UserPopover
