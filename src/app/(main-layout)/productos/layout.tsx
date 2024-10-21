// Project Comonents Imports
import Breadcrumbs from '@/components/products/breadcrumbs'

/**
 * Renders the layout for the products page.
 *
 * @param {Readonly<{ children: React.ReactNode }>} props - The component props.
 * @param {React.ReactNode} props.children - The children to be rendered within the layout.
 * @return {JSX.Element} The rendered layout component.
 */
export default function ProductsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <section id='products-layout' className='relative w-full'>
      <Breadcrumbs />
      {children}
    </section>
  )
}
