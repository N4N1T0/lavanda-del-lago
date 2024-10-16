// Project Components Imports
import { UserProfileFormDialog } from '@/components/profile/user-info-from'

// Next Imports
import Link from 'next/link'

// UI Components Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Assets Imports
import { Mail, MapPin, Phone, ReceiptEuro } from 'lucide-react'

// Types Imports
import type { User } from '@/types'
import { formatAddress } from '@/lib/utils'

/**
 * A reusable card component for displaying user information.
 *
 * @param {User} user - The user object containing information to be displayed.
 * @return {JSX.Element} The UserInfoCard component.
 */
const UserInfoCard = ({ user }: { user: User }): JSX.Element => {
  return (
    <Card className='border border-accent/70'>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center'>
        <Avatar
          className={`mb-4 h-24 w-24 border-2 ${
            user.reseller ? 'border-green-600' : 'border-accent/70'
          }`}
        >
          <AvatarImage
            src={user.image}
            alt={user.name || 'Imagen de usuario'}
          />
          <AvatarFallback>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <h2 className='mb-2 text-xl font-semibold'>
          {user.name || 'Usuario sin nombre'}
        </h2>
        <div className='flex w-full flex-col items-start overflow-hidden text-balance'>
          <div className='mb-2 flex items-center text-sm md:text-base'>
            <Mail className='mr-2 h-4 w-4' />
            <span className='truncate text-ellipsis whitespace-nowrap'>
              {user.email || 'Sin correo'}
            </span>
          </div>

          <div className='mb-2 flex items-center'>
            <Phone className='mr-2 h-4 w-4' />
            <span>{user.phone || 'Sin teléfono'}</span>
          </div>
          <div className='flex items-center'>
            <MapPin className='mr-2 h-4 w-4' />
            <span>{formatAddress(user.address)}</span>
          </div>
          {user?.reseller && (
            <div className='flex items-center pt-2 text-green-500'>
              <span>Descuento por Revendedor</span>
              <span>-{user?.discount}%</span>
            </div>
          )}
        </div>
        <UserProfileFormDialog user={user} />
        {!user.reseller && (
          <Button asChild className='mt-4 w-full' variant='cart'>
            <Link
              href='/reseller-form'
              className='flex items-center justify-center gap-2'
            >
              <ReceiptEuro className='h-4 w-4' />
              Formulario de Revendedor
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default UserInfoCard
