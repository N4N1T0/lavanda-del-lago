// Next.js Imports
import Image from 'next/image'

// Assets Imports
import SignUpImage from '@/assets/baraa-jalahej-qfZGhapxoa4-unsplash.webp'

/**
 * A layout component for Clerk authentication pages.
 *
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @return {JSX.Element} The JSX element representing the layout.
 */
const ClerkLayout = (
  { children }: { children: React.ReactNode }
): JSX.Element => {
  return (
    <section className='bg-white lg:grid lg:min-h-screen lg:grid-cols-12'>
      <aside className='bottom-0 left-1/2 right-0 top-0 hidden md:fixed md:block'>
        <Image
          alt='Sign up image'
          src={SignUpImage}
          className='h-full w-full object-cover'
          priority
        />
      </aside>

      <article className='flex h-full items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
        {children}
      </article>
    </section>
  )
}

export default ClerkLayout
