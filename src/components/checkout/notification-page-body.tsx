'use client'

// Next.js Imports
import Image from 'next/image'

// Utils Imports
import { calculateTotal, eurilize } from '@/lib/utils'

// Store Imports
import useShoppingCart from '@/stores/shopping-cart-store'

// Types Imports
import { CartItem, NotificationPageBodyProps } from '@/types'

// Assets Imports
import { PackageIcon, TruckIcon } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Renders the notification page body with details of the user's purchase.
 *
 * @param {NotificationPageBodyProps} props - An object containing user, gateway, and orderId.
 * @param {User} props.user - The user making the purchase.
 * @param {string} props.gateway - The payment gateway used for the purchase.
 * @param {string} props.orderId - The unique order ID for the purchase.
 * @returns {JSX.Element} A JSX element representing the notification page body.
 */
const NotificationPageBody = ({
  user,
  gateway,
  orderId,
  discountCoupon = 0
}: NotificationPageBodyProps): JSX.Element => {
  const [count, , { isLoading }] = useShoppingCart()

  const discount =
    user?.discount !== undefined ? user?.discount / 100 : undefined

  const [subTotal, total, iva, shipping] = calculateTotal(
    count,
    discount,
    user?.address?.postal_code,
    user?.address?.country,
    discountCoupon
  )

  return (
    <>
      <p className='text-center text-gray-600'>
        <span className='block text-lg font-bold text-accent'>
          {user?.name}
        </span>
        Gracias por tu compra. Tu pedido ha sido procesado con éxito.
      </p>
      <p className='text-center text-xs'>
        {gateway === 'RedSys' || gateway === 'PayPal' ? (
          <span className='text-gray-500'>
            Solo falta la confirmación de la pasarela de pago, para empezar a
            preparar tu envío, puedes ver el estado de tu pedido en tu perfil.
          </span>
        ) : (
          <div className='text-center text-gray-800'>
            Si has elegido pagar mediante transferencia, solo tienes que
            realizar la transferencia a la cuenta{' '}
            <span className='font-bold'>
              IBAN: ES04 0182 4136 9102 0178 4853{' '}
            </span>
            <span className='font-bold'>BIC: BBVAESMMXXX </span>
            con el concepto{' '}
            <span className='font-bold'>
              &quot;lavandadellago-{orderId}&quot;
            </span>
            <br />
            <br />
            Después de recibir la confirmación de la transferencia, nosotros nos
            pondremos en contacto contigo para confirmar la recepción del pago y
            proceder con el envío de tu pedido.
          </div>
        )}
      </p>
      <div className='space-y-2 rounded-lg bg-[#694DAB10] p-4'>
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>Número de Pedido:</span>
          <span>#{orderId}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>Monto Total:</span>
          <span>{total}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='font-semibold'>
            IVA <span className='text-sm'>(21%)</span>:
          </span>
          <span>{iva}</span>
        </div>
        {discountCoupon > 0 && (
          <div className='flex items-center justify-between text-green-500'>
            <span className='font-semibold'>Descuento por Cupon:</span>
            <div>
              <span className='mr-2'>-{discountCoupon}%</span>
              <span>
                (-
                {eurilize(
                  Number(total.split(' ')[0].replace(',', '.')) /
                    (1 - discountCoupon / 100) -
                    Number(total.split(' ')[0].replace(',', '.'))
                )}
                )
              </span>
            </div>
          </div>
        )}
        <div className='flex items-center justify-between text-sm font-normal'>
          <span>Gastos de Envio:</span>
          <span>{shipping}</span>
        </div>
        {user?.reseller === true && discount !== undefined && (
          <>
            <div className='flex items-center justify-between text-sm font-normal'>
              <span className='text-green-700'>Descuento de Revendedor:</span>
              <span>{discount * 100}%</span>
            </div>
            <div className='flex items-center justify-between text-base font-normal'>
              <h3>Subtotal con descuento</h3>
              <p>{subTotal}</p>
            </div>
          </>
        )}
      </div>
      <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
        <PackageIcon className='h-4 w-4 text-accent' />
        <span>Preparando tu pedido</span>
      </div>
      <div className='flex items-center justify-center space-x-2 text-sm text-gray-600'>
        <TruckIcon className='h-4 w-4 text-accent' />
        <span>Entrega estimada: 3-5 días hábiles</span>
      </div>
      <ul className='space-y-3 border-t border-accent/50 py-5'>
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className='h-16 w-full bg-neutral-200' />
            ))
          : count.map((item) => (
              <NotificationPageBodyCard key={item.id} product={item} />
            ))}
      </ul>
    </>
  )
}

/**
 * A card to display a product in the notification page.
 *
 * @param {Object} props
 * @prop {CartItem} product - The product to display.
 * @returns {JSX.Element} The card component.
 */
const NotificationPageBodyCard = ({
  product
}: {
  product: CartItem
}): JSX.Element => {
  return (
    <li className='flex rounded-lg bg-neutral-100 px-3 py-6'>
      {/* Image of the product */}
      <div className='h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
        <Image
          src={product.image}
          alt={product.nombre}
          title={product.nombre}
          width={100}
          height={100}
          className='h-full w-full object-cover object-center'
        />
      </div>

      {/* Details of the product */}
      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          {/* Product title and price */}
          <div className='flex justify-between text-base font-light text-gray-900 transition-colors duration-150 hover:text-gray-800'>
            <h3 className='text-sm'>{product.nombre}</h3>
            <p className='ml-4 font-bold'>{eurilize(Number(product.precio))}</p>
          </div>
        </div>
        <div className='flex flex-1 items-end justify-between text-sm'>
          {/* Product quantity */}
          <p className='text-gray-500'>Cantidad: {product.quantity}</p>
        </div>
      </div>
    </li>
  )
}

export default NotificationPageBody
