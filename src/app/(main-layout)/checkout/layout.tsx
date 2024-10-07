import CheckoutSteps from '@/components/checkout/checkout-steps'

/**
 * Renders the main layout of the application.
 *
 * @param {Object} props - The props object containing the children.
 * @param {React.ReactNode} props.children - The children to be rendered inside the main content area.
 * @return {JSX.Element} The main layout JSX element.
 */
const CheckoutLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <>
      <CheckoutSteps />
      <main>{children}</main>
    </>
  )
}

export default CheckoutLayout
