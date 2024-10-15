/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'

// External Packages Imports
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

// Types Imports
import { CartItem, User } from '@/types'

// UI Imports
import { Skeleton } from '@/components/ui/skeleton'

// Axiom imports
import { useLogger } from 'next-axiom'

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
  const serializedProducts = encodeURIComponent(
    JSON.stringify(
      products.map((product) => ({
        id: product.id,
        quantity: product.quantity
      }))
    )
  )
  const [{ isPending }] = usePayPalScriptReducer()

  // Axiom Init
  const log = useLogger()

  // This function gets called when the user clicks on the PayPal button
  const handleApprove = async (_data: any, actions: any) => {
    if (actions.order) {
      // Get the details of the order
      const details = await actions.order.capture()

      // Redirect the user to the success page
      router.push(
        `/success?userId=${user?.id}&userName=${encodeURIComponent(user?.name ? user.name.normalize('NFC') : '')}&orderId=${details.id}&totalAmount=${Number(total.split(' ')[0].replace(',', '.'))}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}&gateway=Paypal`
      )
    } else {
      // If the order is null or undefined, log an error
      log.debug('actions.order is null or undefined')
      return Promise.reject()
    }
  }

  // This function gets called when the user clicks on the cancel button
  const handleOnCancel = () => {
    // Redirect the user to the success page with an orderId of null
    router.push(
      `/failed?userId=${user?.id}&userName=${encodeURIComponent(user?.name ? user.name.normalize('NFC') : '')}&orderId=null&totalAmount=${Number(total.split(' ')[0].replace(',', '.'))}&reseller=${user?.reseller}&userEmail=${user?.email}&products=${serializedProducts}`
    )
  }

  return (
    <>
      {isPending ? <Skeleton className='bg-blue h-12 w-full' /> : null}
      <PayPalButtons
        createOrder={(_data, actions) =>
          actions.order.create({
            'intent': 'CAPTURE',
            'purchase_units': [
              {
                'reference_id': 'd9f80740-38f0-11e8-b467-0ed5f89f718b',
                'amount': { 'currency_code': 'EUR', 'value': '100.00' }
              }
            ],
            'payment_source': {
              'paypal': {
                'experience_context': {
                  'payment_method_preference': 'IMMEDIATE_PAYMENT_REQUIRED',
                  'brand_name': 'Lavanda del Lago',
                  'locale': 'es-ES',
                  'user_action': 'PAY_NOW'
                }
              }
            }
          })
        }
        onApprove={handleApprove}
        onCancel={handleOnCancel}
        style={{ layout: 'horizontal', color: 'blue', tagline: false }}
      />
    </>
  )
}

export default PaypalButton
