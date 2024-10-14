'use client'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Project Components Imports
import UserProfile from '@/components/layout/user-profile'

// Assets Imports
import { User as UserIcon } from '@/assets'
import { LogIn, UserPlus } from 'lucide-react'

// Ui imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import { Skeleton } from '../ui/skeleton'

const UserPopover = (): JSX.Element => {
  // Get the user from Clerk
  const { user, isLoaded, isSignedIn } = useUser()

  if (!isLoaded) return <Skeleton className='h-8 w-8 rounded-full' />

  return (
    <>
      {!isSignedIn ? (
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
              <Button className='flex w-full items-center justify-center'>
                <LogIn className='mr-2 h-4 w-4' />
                Iniciar Sesión
              </Button>
            </SignInButton>
            <Link
              className={`${buttonVariants({ variant: 'default' })} flex w-full items-center justify-center`}
              href='/reseller-form'
            >
              <UserPlus className='mr-2 h-4 w-4' />
              Formulario de Revendedor
            </Link>
          </PopoverContent>
        </Popover>
      ) : (
        <UserProfile currentUser={user} />
      )}
    </>
  )
}

export default UserPopover
