/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { CartItem, User } from '@/types'
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
  const serializedProducts = encodeURIComponent(
    JSON.stringify(
      products.map((product) => ({
        id: product.id,
        quantity: product.quantity
      }))
    )
  )
  const log = useLogger()

  const handleApprove = async (_data: any) => {
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

      router.push(
        `/exito?userId=${user?.id}&userName=${encodeURIComponent(user?.name || '')}&orderId=${details.id}&totalAmount=${Number(total.split(' ')[0].replace(',', '.'))}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}&gateway=Paypal&iva=${Number(iva.split(' ')[0].replace(',', '.'))}&shippingAddressId=${shippingAddressId}`
      )
    } catch (error: any) {
      log.error('Error capturing order:', error)
    }
  }

  return (
    <>
      <PayPalButtons
        createOrder={async () => {
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
        }}
        onApprove={handleApprove}
        style={{ layout: 'horizontal', color: 'blue', tagline: false }}
      />
    </>
  )
}

export default PaypalButton
