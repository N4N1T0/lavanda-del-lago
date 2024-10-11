'use client'

// React Imports
import { useState } from 'react'

// UI imports
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Clerk imports
import { useUser, useClerk } from '@clerk/nextjs'

// Assets imports
import { User, UserPlus, LogOut, Store } from 'lucide-react'

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
  const [open, setOpen] = useState(false)

  // If the user is not signed in, this component will not render anything.
  if (!user) return <></>

  const isReseller = user.publicMetadata.reseller === true

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
              <Button
                variant='default'
                className='w-full justify-start'
                onClick={() => setOpen(false)}
              >
                {/* Reseller profile link */}
                <Store className='mr-2 h-4 w-4' />
                Perfil de Revendedor
              </Button>
            ) : (
              <>
                <Button
                  variant='default'
                  className='w-full justify-start'
                  onClick={() => setOpen(false)}
                >
                  {/* User profile link */}
                  <User className='mr-2 h-4 w-4' />
                  Perfil de Usuario
                </Button>
                <Button
                  variant='default'
                  className='w-full justify-start'
                  onClick={() => setOpen(false)}
                >
                  {/* Reseller registration link */}
                  <UserPlus className='mr-2 h-4 w-4' />
                  Registro de Revendedor
                </Button>
              </>
            )}
            <Button
              variant='default'
              className='w-full justify-start'
              onClick={() => signOut()}
            >
              {/* Sign out link */}
              <LogOut className='mr-2 h-4 w-4' />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
