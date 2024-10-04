import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const PaypalButton = () => {
  const createOrder = async () => {
    return await fetch('/my-server/create-paypal-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: 'YOUR_PRODUCT_ID',
            quantity: 'YOUR_PRODUCT_QUANTITY'
          }
        ]
      })
    })
      .then((response) => response.json())
      .then((order) => order.id)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApprove = async (data: any) => {
    return await fetch('/my-server/capture-paypal-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then((response) => response.json())
      .then((orderData) => {
        const name = orderData.payer.name.given_name
        alert(`Transaction completed by ${name}`)
      })
  }
  return (
    <PayPalScriptProvider options={{ clientId: 'test' }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  )
}

export default PaypalButton
