/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CartItem, User } from '@/types'
import { useState } from 'react'
import { useLogger } from 'next-axiom'

const PaypalButton = ({
  products,
  total,
  user,
  iva,
  shippingAddressId
}: {
  products: CartItem[]
  total: string
  user: User | null
  iva: string
  shippingAddressId: string
}): JSX.Element => {
  const router = useRouter()
  const log = useLogger()

  // New state for loading and error handling
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Serialize products to pass in the query params
  const serializedProducts = encodeURIComponent(
    JSON.stringify(
      products.map((product) => ({
        id: product.id,
        quantity: product.quantity
      }))
    )
  )

  // Helper function to validate inputs before proceeding
  const validateInputs = () => {
    if (!total || !user || !shippingAddressId || !products.length) {
      log.error('Faltan campos obligatorios para completar el pago.')
      setErrorMessage(
        'Faltan algunos datos requeridos. Por favor, compruébalos e inténtalo de nuevo.'
      )
      return false
    }
    return true
  }

  // Function to handle the approval of the order
  const handleApprove = async (_data: any) => {
    setIsLoading(true) // Set loading state to true
    let attempt = 0
    let success = false

    while (attempt < 3 && !success) {
      try {
        const details = await fetch('/api/paypal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'capture',
            orderId: _data.orderID
          })
        }).then((res) => res.json())

        success = true // Success flag
        // Redirect to the success page with required params
        router.push(
          `/exito?userId=${user?.id}&userName=${encodeURIComponent(user?.name || '')}&orderId=${details.id}&totalAmount=${Number(total.split(' ')[0].replace(',', '.'))}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}&gateway=Paypal&iva=${Number(iva.split(' ')[0].replace(',', '.'))}&shippingAddressId=${shippingAddressId}`
        )
      } catch (error: any) {
        attempt += 1 // Increase attempt count
        log.error(`Intento ${attempt}: Error al capturar el pedido`, error)
      }
    }

    if (!success) {
      setErrorMessage(
        'No se pudo capturar el pago. Por favor, inténtalo más tarde.'
      )
    }

    setIsLoading(false) // Set loading state to false
  }

  // Function to create the PayPal order
  const createOrder = async () => {
    if (!validateInputs()) return '' // Return early if inputs are invalid
    try {
      const response = await fetch('/api/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create',
          total: Number(total.split(' ')[0].replace(',', '.')).toFixed(2)
        })
      })

      const order = await response.json()
      return order.id
    } catch (error: any) {
      log.error('Error al crear el pedido:', error)
      setErrorMessage(
        'Error al crear el pedido de PayPal. Por favor, inténtalo de nuevo.'
      )
      return ''
    }
  }

  return (
    <>
      {/* Show loading or error messages to the user */}
      {isLoading && <p>Procesando pago...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <PayPalButtons
        createOrder={createOrder}
        onApprove={handleApprove}
        style={{ layout: 'horizontal', color: 'blue', tagline: false }}
      />
    </>
  )
}

export default PaypalButton
