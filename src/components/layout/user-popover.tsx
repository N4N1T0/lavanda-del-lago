// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Project Components Imports
import UserProfile from '@/components/layout/user-profile'

// Assets Imports
import { User as UserIcon } from '@/assets'

// Ui imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

// Auth Imports
import { SignInButton, SignedOut } from '@clerk/nextjs'
import { User } from '@clerk/backend'

const UserPopover = ({ user }: { user: User | null }): JSX.Element => {
  if (user !== null) {
    return (
      <UserProfile
        userId={user?.id}
        reseller={user?.publicMetadata.reseller as boolean}
      />
    )
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className='h-8 w-8 cursor-pointer transition-opacity duration-150 hover:opacity-50'
          alt='Icon user'
          src={UserIcon}
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,...' // Optional: add a blur data URL for a better loading experience
        />
      </PopoverTrigger>
      <PopoverContent className='flex w-fit flex-col gap-2'>
        <SignedOut>
          <SignInButton
            forceRedirectUrl='/api/create-sanity-user-from-clerk'
            signUpForceRedirectUrl='/api/create-sanity-user-from-clerk'
          >
            <Button>Iniciar Sesión</Button>
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
