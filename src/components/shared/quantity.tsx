'use client'

// UI Imports
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Type imports
import type { CartItem, Product } from '@/types'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Store Imports
import { useState } from 'react'
import { MinusCircle, PlusCircle } from 'lucide-react'
import { Input } from '../ui/input'

/**
 * Renders a quantity input field with increment and decrement buttons, and a button to add the selected quantity to the cart.
 *
 * @param {Object} props - The component props.
 * @param {Product} props.prduct - The product to be added to the cart.
 * @return {JSX.Element} The rendered quantity component.
 */
const Quantity = ({ prduct }: { prduct: Product }): JSX.Element => {
  // State to hold the selected quantity
  const [quantity, setQuantity] = useState(1)
  // Get the cart items and a function to update the cart items from the shopping cart store
  const [count, setCount] = useShoppingCart()
  // initialize toast
  const { toast } = useToast()

  // Function to increment the quantity state
  const increment = () => {
    setQuantity(quantity + 1)
  }

  // Function to decrement the quantity state
  const decrement = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  // Create a new cart item object with the selected quantity and the product details
  const cartItem: CartItem = {
    quantity: quantity,
    ...prduct
  }

  // Function to add to the Cart and show a toast with a meesage of completed
  const addToCart = () => {
    // Find if the product is already in the cart
    const existingProduct = count.find(
      (productItem) => productItem.id === cartItem.id
    )

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      const updatedCart = count.map((productItem) =>
        productItem.id === cartItem.id
          ? { ...productItem, quantity: productItem.quantity + quantity }
          : productItem
      )
      setCount(updatedCart)
    } else {
      // If the product is not in the cart, add it with an initial quantity of 1
      setCount([...count, { ...cartItem }])
    }

    toast({
      title: 'Se agrego correctamente al carrito',
      duration: 2000
    })
  }

  return (
    <div className='flex w-full items-center justify-between border-b border-t border-accent/50 px-2 py-5 xl:px-10'>
      <p className='hidden text-lg font-bold md:block'>Cantidad</p>
      <label htmlFor='Quantity' className='sr-only'>
        Quantity{' '}
      </label>

      <div className='flex items-center space-x-2 text-accent'>
        <Button
          variant='outline'
          size='icon'
          onClick={decrement}
          disabled={quantity === 1}
          aria-label='Disminuir cantidad'
        >
          <MinusCircle className='h-4 w-4' />
        </Button>
        <Input
          type='number'
          id='Quantity'
          value={quantity || 0}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className='w-12 border-accent/50 text-center'
        />
        <Button
          variant='outline'
          size='icon'
          onClick={increment}
          aria-label='Incrementar cantidad'
        >
          <PlusCircle className='h-4 w-4' />
        </Button>
      </div>

      {/* Button to add the selected quantity of the product to the cart */}
      <Button variant='cart' onClick={() => addToCart()}>
        <span className='hidden md:block'>Añadir al carrito</span>
        <span className='block md:hidden'>Añadir</span>
      </Button>
    </div>
  )
}

const QuantitySmall = ({
  prduct,
  removeFromWishlist
}: {
  prduct: Product
  removeFromWishlist: (id: string) => void
}): JSX.Element => {
  // State to hold the selected quantity
  const [quantity, setQuantity] = useState(1)
  // Get the cart items and a function to update the cart items from the shopping cart store
  const [count, setCount] = useShoppingCart()
  // initialize toast
  const { toast } = useToast()

  // Function to increment the quantity state
  const increment = () => {
    setQuantity(quantity + 1)
  }

  // Function to decrement the quantity state
  const decrement = () => {
    if (quantity <= 1) return
    setQuantity(quantity - 1)
  }

  // Create a new cart item object with the selected quantity and the product details
  const cartItem: CartItem = {
    quantity: quantity,
    ...prduct
  }

  const handleAddToCartFromWishlist = () => {
    // Find if the product is already in the cart
    const existingProduct = count.find(
      (productItem) => productItem.id === cartItem.id
    )

    if (existingProduct) {
      // If the product is already in the cart, update its quantity
      const updatedCart = count.map((productItem) =>
        productItem.id === cartItem.id
          ? { ...productItem, quantity: productItem.quantity + quantity }
          : productItem
      )
      setCount(updatedCart)
    } else {
      // If the product is not in the cart, add it with an initial quantity of 1
      setCount([...count, { ...cartItem }])
    }

    removeFromWishlist(prduct.id)
    toast({
      title: 'Se agrego correctamente al carrito',
      duration: 2000
    })
  }

  return (
    <div className='flex w-full flex-wrap items-center justify-between gap-3'>
      <label htmlFor='Quantity' className='sr-only'>
        {' '}
        Quantity{' '}
      </label>

      <div className='flex items-center space-x-2 text-accent'>
        <Button
          variant='outline'
          size='sm'
          onClick={decrement}
          disabled={quantity === 1}
          aria-label='Disminuir cantidad'
        >
          <MinusCircle className='h-4 w-4' />
        </Button>
        <Input
          type='number'
          id='Quantity'
          value={quantity || 0}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className='w-12 border-accent/50 text-center'
        />
        <Button
          variant='outline'
          size='sm'
          onClick={increment}
          aria-label='Incrementar cantidad'
        >
          <PlusCircle className='h-4 w-4' />
        </Button>
      </div>

      {/* Button to add the selected quantity of the product to the cart */}
      <Button
        onClick={() => handleAddToCartFromWishlist()}
        variant='default'
        size='sm'
      >
        Añadir al carrito
      </Button>
    </div>
  )
}

const ResellerTableQuantity = ({
  updateQuantity,
  quantities,
  id,
  setQuantities
}: {
  updateQuantity: (id: string, delta: number) => void
  quantities: { [key: string]: number }
  id: string
  setQuantities: (
    id: string
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className='flex items-center space-x-2'>
      <label htmlFor='Quantity' className='sr-only'>
        Quantity
      </label>
      <Button
        variant='outline'
        size='icon'
        onClick={() => updateQuantity(id, -1)}
        disabled={quantities[id] <= 0}
        aria-label='Disminuir cantidad'
      >
        <MinusCircle className='h-4 w-4' />
      </Button>
      <Input
        type='number'
        id='Quantity'
        value={quantities[id] || 0}
        onChange={setQuantities(id)}
        className='w-10 text-center md:w-16'
      />
      <Button
        variant='outline'
        size='icon'
        onClick={() => updateQuantity(id, 1)}
        aria-label='Incrementar cantidad'
      >
        <PlusCircle className='h-4 w-4' />
      </Button>
    </div>
  )
}

export { Quantity, QuantitySmall, ResellerTableQuantity }
