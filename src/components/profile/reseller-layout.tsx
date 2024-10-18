'use client'

// React Imports
import { useState, useEffect } from 'react'

// Types Imports
import type { Product, User } from '@/types'

// Project Components Imports
import UserInfoCard from '@/components/profile/info-card'
import ResellerCheckout from '@/components/profile/reseller-checkout'
import ResellerTable from '@/components/profile/reseller-table'

// UI Imports
import { ArrowBigUp } from 'lucide-react'

/**
 * A layout component for resellers, displaying user information, a checkout summary, and a table of products.
 *
 * @param {User} user - The user object containing information and discount details.
 * @param {Product[]} products - An array of product objects.
 * @return {JSX.Element} The ResellerLayout component.
 */
const ResellerLayout = ({
  user,
  products
}: {
  user: User
  products: Product[]
}): JSX.Element => {
  // State Variables for Quantities using the product id as the key
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    Object.fromEntries(products.map((p) => [p.id, 0]))
  )

  // State Variables for Selected Products
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set()
  )

  // State to track if the floating button should be visible
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  // Helper function to update quantities
  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }))
  }

  // Helper function to toggle product selection
  const toggleProductSelection = (id: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const productsToCheckout = products
    .filter((p) => selectedProducts.has(p.id))
    .map((item) => ({
      ...item,
      quantity: quantities[item.id]
    }))

  // Scroll event to show/hide the floating button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop

      // Adjust this value based on when you want the button to appear
      if (scrollY > 1200) {
        setShowFloatingButton(true)
      } else {
        setShowFloatingButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='relative flex flex-col gap-6 md:flex-row'>
      <div className='top-2 h-fit w-full space-y-2 md:sticky md:w-1/4'>
        <UserInfoCard user={user} />
        <ResellerCheckout
          productsToCheckout={productsToCheckout}
          discount={user.discount}
        />
      </div>
      <div className='w-full md:w-3/4'>
        <ResellerTable
          products={products}
          selectedProducts={selectedProducts}
          toggleProductSelection={toggleProductSelection}
          discount={user.discount}
          quantities={quantities}
          setQuantities={setQuantities}
          updateQuantity={updateQuantity}
        />
      </div>

      {/* Floating Checkout Button */}
      {showFloatingButton && (
        <a
          href='#checkout'
          className='fixed bottom-2 right-2 flex items-center justify-center rounded-md bg-accent p-3 text-white md:hidden'
        >
          <ArrowBigUp className='h-6 w-6' />
        </a>
      )}
    </div>
  )
}

export default ResellerLayout
