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
import { useUser, useClerk } from '@clerk/nextjs'

// Assets imports
import { User, UserPlus, LogOut, Store } from 'lucide-react'
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
export default function UserPopover() {
  // Get the user from Clerk
  const { user } = useUser()
  const { signOut } = useClerk()

  const path = usePathname()

  // If the user is not signed in, this component will not render anything.
  if (!user) return <></>

  const isReseller = user.publicMetadata.reseller === true

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
              src={user.imageUrl}
              alt={user.username || 'Avatar de usuario'}
            />
            <AvatarFallback>{user.username?.[0] || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-fit' align='end' forceMount>
        <div className='grid gap-4'>
          <div className='flex items-center gap-4'>
            {/* User Information */}
            <Avatar className='h-10 w-10'>
              <AvatarImage
                src={user.imageUrl}
                alt={user.username || 'Avatar de usuario'}
              />
              <AvatarFallback>{user.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>
                {user.username || 'Usuario'}
              </p>
              <p className='text-muted-foreground text-xs'>
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
          <div className='grid gap-2'>
            {isReseller ? (
              <PopoverClose asChild>
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href={`/reseller/${user.id}`}
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
                    href={`/profile/${user.id}`}
                  >
                    {/* User profile link */}
                    <User className='mr-2 h-4 w-4' />
                    Perfil de Usuario
                  </Link>
                </PopoverClose>
                <PopoverClose asChild>
                  <Link
                    className={buttonVariants({ variant: 'default' })}
                    href='reseller-form'
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
                    redirectUrl:
                      path.startsWith('/reseller') ||
                      path.startsWith('/profile')
                        ? '/'
                        : path
                          ? '/'
                          : path
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
