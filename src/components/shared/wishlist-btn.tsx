'use client'

// Utils Imports
import { cn, removeFromWishlist } from '@/lib/utils'
import useShoppingCart from '@/stores/shopping-cart-store'

// Stores Imports
import useWishlist from '@/stores/wishlist-store'

// Types Imports
import type { Product } from '@/types'

// Assets Imports
import { Heart } from 'lucide-react'
import { useToast } from '../ui/use-toast'

/**
 * Renders a heart component that changes color based on whether the product is wishlisted.
 *
 * @param {WPProduct} product - The product to be added to the wishlist.
 * @param {string} className - The class name to be applied to the heart component.
 * @return {JSX.Element} The heart component with dynamic color and click functionality.
 */
const WishlistBtn = (
  { product, className }: { product: Product; className?: string }
): JSX.Element => {
  // State hook to access and update the wishlist items
  const [count, setCount] = useWishlist()
  const [shoppingCart, _] = useShoppingCart()
  const { toast } = useToast()
  // Check if the product is already in the wishlist
  const isWishlisted = count.some((obj) => obj.id === product.id)

  /**
   * Function to handle adding or removing a product from the wishlist
   * @param {boolean} isWishlisted - Indicates whether the product is already in the wishlist
   * @param {string} id - The ID of the product
   * @param {WPProduct} product - The product object
   */
  const handleWishlist = (
    isWishlisted: boolean,
    id: string,
    product: Product
  ) => {
    // if the product is in the Cart, show a toast and return
    if (shoppingCart.some((cartProduct) => cartProduct.id === product.id)) {
      toast({
        title: 'Ya lo tienes en el carrito',
        description: 'Puedes verlo, modificarlo y comprarlo.'
      })
      return
    }

    if (isWishlisted) {
      // Remove the product from the wishlist
      setCount((prev) => removeFromWishlist(prev, id))
    } else {
      // Add the product to the wishlist
      setCount((prev) => [...prev, product])
    }
  }

  return (
    <Heart
      data-checked={isWishlisted}
      size={23}
      fill={isWishlisted ? 'red' : 'white'}
      onClick={() => {
        handleWishlist(isWishlisted, product.id, product)
      }}
      className={cn(
        'shrink-0 cursor-pointer self-start text-gray-500 transition-colors duration-200 ease-out hover:text-red-500 data-[checked=true]:text-red-500',
        className
      )}
    />
  )
}

export default WishlistBtn
