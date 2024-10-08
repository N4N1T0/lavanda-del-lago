/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'

// External Packages Imports
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

// Types Imports
import { CartItem, User } from '@/types'

/**
 * Componente que renderiza un bot n de PayPal para realizar pagos.
 *
 * @param {CartItem[]} products - Productos que se van a comprar.
 * @param {string} total - Precio total de la compra.
 * @param {User | null} user - Usuario que est  realizando la compra.
 *
 * @returns {JSX.Element} Un JSX.Element que representa el bot n de PayPal.
 */
const PaypalButton = ({
  products,
  total,
  user
}: {
  products: CartItem[]
  total: string
  user: User | null
}): JSX.Element => {
  const router = useRouter()
  const serializedProducts = encodeURIComponent(JSON.stringify(products))

  // This function gets called when the user clicks on the PayPal button
  const handleApprove = async (_data: any, actions: any) => {
    if (actions.order) {
      // Get the details of the order
      const details = await actions.order.capture()

      // Redirect the user to the success page
      router.push(
        `${process.env.CI ? 'http://www.lavandadellago.es' : 'http://localhost:3000'}/success?userId=${user?.id}&userName=${encodeURIComponent(user?.name ? user.name.normalize('NFC') : '')}&orderId=${details.id}&totalAmount=${total}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}`
      )
    } else {
      // If the order is null or undefined, log an error
      console.error('actions.order is null or undefined')
      return Promise.reject()
    }
  }

  // This function gets called when the user clicks on the cancel button
  const handleOnCancel = () => {
    // Redirect the user to the success page with an orderId of null
    router.push(
      `${process.env.CI ? 'http://www.lavandadellago.es' : 'http://localhost:3000'}/success?userId=${user?.id}&userName=${encodeURIComponent(user?.name ? user.name.normalize('NFC') : '')}&orderId=null&totalAmount=${total}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}`
    )
  }

  return (
    // This is the PayPal button component
    <PayPalScriptProvider
      options={{
        clientId:
          'ARVFu5YwJzX47SVNwU5c9WlQ1zzfgjPoa6KCeenXoy1KL-kK5PyLUjiKzewOcnzm2uKEEWH3qTSJbrEM',
        currency: 'EUR',
        buyerCountry: 'ES'
      }}
    >
      <PayPalButtons
        createOrder={(_data, actions) =>
          actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: total,
                  currency_code: 'EUR'
                },
                items: [
                  ...products.map((product) => ({
                    name: product.nombre,
                    quantity: product.quantity.toString(),
                    description: product.descripcion,
                    unit_amount: {
                      currency_code: 'EUR',
                      value: product.precio.toString()
                    },
                    category: 'PHYSICAL_GOODS' as const
                  }))
                ]
              }
            ]
          })
        }
        onApprove={handleApprove}
        onCancel={handleOnCancel}
        style={{ layout: 'horizontal', color: 'blue', tagline: false }}
      />
    </PayPalScriptProvider>
  )
}

export default PaypalButton
