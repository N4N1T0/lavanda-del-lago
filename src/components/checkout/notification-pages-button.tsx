'use client'

// Next.js Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// UI Imports
import { Button } from '@/components/ui/button'

// Assets Imports
import { HelpCircle, RefreshCcw, UserIcon } from 'lucide-react'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

const NotificationsPageButton = ({
  reseller,
  userId,
  status
}: {
  reseller: boolean
  userId: string
  status: 'success' | 'failed'
}) => {
  const [, setCount] = useShoppingCart()
  const router = useRouter()

  /**
   * Handles the click event on the button to navigate to the given href.
   * This function also clears the shopping cart by setting the count to an empty array.
   * @param {string} href - The href to navigate to.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClick = (href: string) => {
    setCount([])
    router.push(href)
  }

  if (status === 'success') {
    return (
      <>
        <Button variant='cart' onClick={() => handleClick('/productos')}>
          Seguir Comprando
        </Button>
        <Button
          variant='default'
          onClick={() =>
            handleClick(
              reseller === true ? `/reseller/${userId}` : `/profile/${userId}`
            )
          }
          className='flex items-center'
        >
          <UserIcon className='mr-2 h-4 w-4' />
          Tu Perfil
        </Button>
      </>
    )
  } else {
    return (
      <>
        <Button
          variant='cart'
          className='w-fit'
          onClick={() => handleClick(`/checkout/review?userId=${userId}`)}
        >
          <RefreshCcw className='mr-2 h-4 w-4' />
          Reintentar
        </Button>
        <Button variant='link'>
          <HelpCircle className='mr-2 h-4 w-4' />
          {/* TODO: Link to support */}
          <Link href='mailto:info@lavandadellago.es'>Contactar Soporte</Link>
        </Button>
      </>
    )
  }
}

export default NotificationsPageButton
