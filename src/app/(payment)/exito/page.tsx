// Next.js Imports
import React from 'react'
import { redirect } from 'next/navigation'

// Project Components Imports
import NotificationsPageButton from '@/components/checkout/notification-pages-button'

// UI Imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// Assets Imports
import { CheckCircle2Icon } from 'lucide-react'

// Types Imports
import { Product, SuccessPage, User } from '@/types'
import { Purchase } from '@/types/sanity'

// Query Imports
import { sanityClientRead, sanityClientWrite } from '@sanity-studio/lib/client'
import { PurchaseById, userByIdCompleted } from '@sanity-studio/queries'

// Resend Imports
import { resend } from '@/lib/clients'
import CompletedPurchase from '@/emails/completed-purchase'
import NotificationPageBody from '@/components/checkout/notification-page-body'

// Axiom Imports
import { Logger } from 'next-axiom'

/**
 * Asynchronously processes a successful payment, creates a purchase order, and sends an email notification to the user.
 *
 * @param {SuccessPage} searchParams - The search parameters containing userId, orderId, totalAmount, gateway, and products.
 * @returns {Promise<JSX.Element>} A React component representing the success payment page.
 */
const SuccessPaymentPage = async ({
  searchParams
}: {
  searchParams: SuccessPage
}): Promise<JSX.Element> => {
  const log = new Logger()

  // Destructure search parameters
  const {
    userId,
    orderId,
    totalAmount,
    gateway,
    products: productsParam,
    iva
  } = searchParams

  // Verify the presence of required parameters
  if (!orderId || !totalAmount || !userId) {
    log.debug('Missing required parameters in success page')
    redirect('/')
  }

  // fetch the user
  const user: User = await sanityClientRead.fetch(
    userByIdCompleted,
    {
      id: userId
    },
    {
      cache: 'no-store'
    }
  )

  // Verify the presence of required user information
  if (user?.name === undefined || user?.reseller === undefined) {
    log.debug('Missing required user information in success page')
    redirect('/')
  }

  // Parse products from the URL parameter
  const products: { id: string; quantity: number }[] = productsParam
    ? JSON.parse(decodeURIComponent(productsParam))
    : []

  // create the Purchase Order
  try {
    const purchaseResponse =
      await sanityClientWrite.createIfNotExists<Purchase>({
        _type: 'purchase',
        _id: orderId,
        purchaseDate: new Date().toISOString(),
        userEmail: {
          _ref: userId,
          _type: 'reference'
        },
        totalAmount: Number(totalAmount),
        status:
          gateway === 'PayPal' || gateway === 'Transferencia'
            ? 'completado'
            : 'pendiente',
        reseller: user?.reseller === null ? false : user?.reseller,
        paymentMethod: gateway,
        products: products?.map((item) => ({
          product: { _ref: item.id, _type: 'reference' }, // Fix: product reference
          quantity: item.quantity,
          _key: item.id
        })),
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: orderId
      })

    const productsResponse: {
      products: { product: Product; quantity: number }[]
    } = await sanityClientRead.fetch(
      PurchaseById,
      {
        id: purchaseResponse._id
      },
      {
        cache: 'no-store'
      }
    )

    // Send email to user
    const { data, error } = await resend.emails.send({
      from: 'info@lavandadellago.es',
      to: [user.email],
      subject: 'Orden Completada',
      react: CompletedPurchase({
        customerName: user.name,
        orderNumber: orderId,
        totalAmount: Number(totalAmount),
        purchaseDate: new Date().toLocaleString('es-ES'),
        id: userId,
        reseller: user?.reseller === null ? false : user?.reseller,
        products: productsResponse.products,
        gateway,
        user,
        iva
      })
    })

    // Log the response for debugging purposes
    if (error && data === null) {
      log.debug('Error sending email', { data: error })
    }
  } catch (error) {
    // Log the error for debugging purposes
    log.debug('Error creating Purchase', { data: error })
  }

  // Ending Logger
  log.flush()
  return (
    <main className='flex min-h-screen items-center justify-center bg-green-100 p-4'>
      <Card className='w-full max-w-lg border-accent'>
        <CardHeader className='text-center'>
          <CheckCircle2Icon className='mx-auto mb-4 h-16 w-16 text-green-500' />
          <CardTitle className='text-2xl font-bold text-green-500'>
            ¡Pago Exitoso!
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <NotificationPageBody
            gateway={gateway}
            user={user}
            orderId={orderId}
          />
        </CardContent>
        <CardFooter className='flex justify-center space-x-4'>
          <NotificationsPageButton
            reseller={user?.reseller === null ? false : user?.reseller}
            userId={userId}
            status='success'
          />
        </CardFooter>
      </Card>
    </main>
  )
}

export default SuccessPaymentPage
