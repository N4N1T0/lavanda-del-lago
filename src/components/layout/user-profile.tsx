'use client'

// Next.js Imports
import Link from 'next/link'

// UI imports
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Clerk imports
import { useClerk } from '@clerk/nextjs'

// Assets imports
import { UserPlus, LogOut, Store, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

/**
 * A dropdown menu for the user to manage their profile, sign out, and (for
 * non-resellers) apply to become a reseller.
 *
 * If the user is not signed in, this component will not render anything.
 *
 * @returns A Popover component that will display the user dropdown when
 *          clicked.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserPopover({ currentUser }: { currentUser: any }) {
  // Get the user from Clerk
  const { signOut } = useClerk()
  const path = usePathname()

  const isReseller = currentUser.publicMetadata.reseller === true

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className='group relative ml-1 h-8 w-8 rounded-full p-0'
        >
          {/* User Avatar */}
          <Avatar className='h-8 w-8 transition-opacity duration-150 ease-in-out group-hover:opacity-70'>
            <AvatarImage
              src={currentUser.imageUrl}
              alt={currentUser.username || 'Avatar de usuario'}
            />
            <AvatarFallback>{currentUser.username?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit' align='end' forceMount>
        <div className='grid gap-4'>
          <div className='flex items-center gap-4'>
            {/* User Information */}
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={currentUser.imageUrl}
                alt={currentUser.username || 'Avatar de usuario'}
              />
              <AvatarFallback>
                {currentUser.username?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>
                {currentUser.username || 'Usuario'}
              </p>
              <p className='text-muted-foreground text-xs'>
                {currentUser.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <div className='grid gap-2'>
            {isReseller ? (
              <PopoverClose asChild>
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href={`/reseller/${currentUser.id}`}
                >
                  {/* Reseller profile link */}
                  <Store className='mr-2 h-4 w-4' />
                  Perfil de Revendedor
                </Link>
              </PopoverClose>
            ) : (
              <>
                <PopoverClose asChild>
                  <Link
                    className={buttonVariants({ variant: 'default' })}
                    href={`/profile/${currentUser.id}`}
                  >
                    {/* User profile link */}
                    <User className='mr-2 h-4 w-4' />
                    Perfil de Usuario
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className={buttonVariants({ variant: 'default' })}
                    href='/reseller-form'
                  >
                    {/* Reseller registration link */}
                    <UserPlus className='mr-2 h-4 w-4' />
                    Registro de Revendedor
                  </Link>
                </PopoverClose>
              </>
            )}
            <PopoverClose asChild>
              <Button
                variant='default'
                onClick={() =>
                  signOut({
                    redirectUrl: path
                  })
                }
              >
                {/* Sign out link */}
                <LogOut className='mr-2 h-4 w-4' />
                Cerrar Sesión
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
