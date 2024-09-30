// Components Imports
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

/**
 * Renders the main layout of the application.
 *
 * @param {Object} props - The props object containing the children.
 * @param {React.ReactNode} props.children - The children to be rendered inside the main content area.
 * @return {JSX.Element} The main layout JSX element.
 */
const MainLayout = (
  { children }: { children: React.ReactNode }
): JSX.Element => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
