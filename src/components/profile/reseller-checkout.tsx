'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

// UI Components Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Assets Imports
import { ShoppingCart } from 'lucide-react'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Type Imports
import type { CartItem } from '@/types'

const DEFAULT_DISCOUNT = 10 // Default discount percentage

/**
 * Renders a checkout component for a reseller with the total number of products and the total price.
 *
 * @param {Object} props - An object containing the products to checkout and discount.
 * @param {CartItem[]} props.productsToCheckout - The items in the cart.
 * @param {number | null | undefined} props.discount - The discount percentage.
 * @return {JSX.Element} A Card component with the order summary and a checkout button.
 */
const ResellerCheckout = ({
  productsToCheckout,
  discount
}: {
  productsToCheckout: CartItem[]
  discount: number | null | undefined
}): JSX.Element => {
  // Router Initialization
  const router = useRouter()

  // Get the cart items and a function to update the cart items from the shopping cart store
  const [, setCount] = useShoppingCart()

  // Function to add to the Cart and redirect to the checkout page
  const addToCart = () => {
    setCount([...productsToCheckout.filter((item) => item.quantity > 0)])
    router.push('/checkout')
  }

  // Calculate the total number of selected products
  const totalProducts = useMemo(
    () => productsToCheckout.reduce((sum, item) => sum + item.quantity, 0),
    [productsToCheckout]
  )

  // Calculate the total price with discount
  const totalPrice = useMemo(() => {
    return productsToCheckout.reduce((sum, item) => {
      // Function to calculate discounted price
      const calculateDiscountedPrice = (precio: number) => {
        if (typeof precio !== 'number' || isNaN(precio)) return 0 // Ensure precio is a valid number
        const discountValue = discount ?? DEFAULT_DISCOUNT
        return precio - precio * (discountValue / 100)
      }

      // Calculate the total price with the quantity and discounted price
      return sum + (item.quantity || 0) * calculateDiscountedPrice(item.precio)
    }, 0)
  }, [productsToCheckout, discount])

  return (
    <Card className='border border-accent/70 pb-0' id='checkout'>
      <CardHeader className='pt-3'>
        <CardTitle>Resumen de Compra</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 pt-2'>
        <div role='status' aria-live='polite'>
          <p>Total de Productos: {totalProducts}</p>
          <p>Precio Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <Button className='mt-4 w-full' variant='cart' onClick={addToCart}>
          <ShoppingCart className='mr-2 h-4 w-4' />
          Finalizar
        </Button>
      </CardContent>
    </Card>
  )
}

export default ResellerCheckout
