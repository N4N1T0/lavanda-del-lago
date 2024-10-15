// Project assets
import { MainLogo } from '@/assets'

// Next.js imports
import Image from 'next/image'
import Link from 'next/link'

// Project components
import CartSheet from '@/components/layout/cart-sheet'
import {
  NavbarLinks,
  NavbarLinksMobile
} from '@/components/layout/navbar-links'
import { Search, SearchMobile } from '@/components/layout/search'
import UserPopover from '@/components/layout/user-popover'
import WishlistCart from '@/components/layout/wishlist-sheet'

// Quries Imports
import { categories } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { CategoriesList } from '@/types'

// Utils Imports
import { categoriesFilter } from '@/lib/utils'

/**
 * Renders the Navbar component.
 *
 * @return {JSX.Element} The rendered Navbar component.
 */
const Navbar = async (): Promise<JSX.Element> => {
  const response: CategoriesList[] = await sanityClientRead.fetch(
    categories,
    {},
    {
      next: { revalidate: 60 }
    }
  )
  const filterCategories = categoriesFilter(response)

  return (
    <header className='flex items-center justify-between border-b border-accent/50 px-5 py-4 md:px-10 2xl:px-20'>
      <div className='inline-flex flex-[0_0_auto] flex-col items-center'>
        <div className='inline-flex flex-[0_0_auto] items-center gap-2'>
          <Link href='/'>
            <Image
              className='h-[30px] w-[30px] cursor-pointer object-cover transition-opacity duration-150 hover:opacity-50 md:h-[50px] md:w-[50px]'
              alt='Lavanda del lago'
              src={MainLogo}
            />
          </Link>
          <NavbarLinksMobile categories={filterCategories} />
        </div>
      </div>
      <Search />

      <NavbarLinks categories={filterCategories} />

      <div className='inline-flex flex-[0_0_auto] items-center justify-center gap-6'>
        <SearchMobile />
        <WishlistCart />
        <CartSheet />
        <UserPopover />
      </div>
    </header>
  )
}

export default Navbar
