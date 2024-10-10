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
import { SignInButton, SignedOut, SignedIn } from '@clerk/nextjs'

const UserPopover = (): JSX.Element => {
  return (
    <>
      <SignedOut>
        <Popover>
          <PopoverTrigger>
            <Image
              className='h-8 w-8 cursor-pointer transition-opacity duration-150 hover:opacity-50'
              alt='Icon user'
              src={UserIcon}
            />
          </PopoverTrigger>
          <PopoverContent className='flex w-fit flex-col gap-2'>
            <SignInButton
              forceRedirectUrl='/api/create-sanity-user-from-clerk'
              signUpForceRedirectUrl='/api/create-sanity-user-from-clerk'
            >
              <Button>Iniciar Sesión</Button>
            </SignInButton>
            <Button asChild>
              <Link href='/reseller-form'>Registrarse como Revendedor</Link>
            </Button>
          </PopoverContent>
        </Popover>
      </SignedOut>
      <SignedIn>
        <UserProfile />
      </SignedIn>
    </>
  )
}

export default UserPopover
