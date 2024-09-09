// Project assets
import { MainLogo } from '@/assets'

// Next.js imports
import Image from 'next/image'
import Link from 'next/link'

// Project components
import WishlistCart from '@/components/layout/wishlist-sheet'
import CartSheet from '@/components/layout/cart-sheet'
import { Search, SearchMobile } from '@/components/layout/search'
import {
	NavbarLinks,
	NavbarLinksMobile,
} from '@/components/layout/navbar-links'
import UserPopover from './user-popover'

// Quries Imports
import { sanityClientRead } from '@sanity-studio/lib/client'
import { categories } from '@/lib/queries'

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
	const response: CategoriesList[] = await sanityClientRead.fetch(categories)
	const filterCategories = categoriesFilter(response)

	return (
		<header className='flex items-center justify-between px-5 md:px-10 2xl:px-20 py-4 border-b border-accent/50'>
			<div className='inline-flex flex-col items-center flex-[0_0_auto]'>
				<div className='inline-flex items-center flex-[0_0_auto]'>
					<Link href='/'>
						<Image
							className='w-[50px] h-[50px] object-cover hover:opacity-50 duration-150 transition-opacity cursor-pointer hidden md:block'
							alt='Lavanda del lago'
							src={MainLogo}
						/>
					</Link>
					<NavbarLinksMobile categories={filterCategories} />
				</div>
			</div>
			<Search />

			<NavbarLinks categories={filterCategories} />

			<div className='inline-flex items-center justify-center gap-6 flex-[0_0_auto]'>
				<SearchMobile />
				<WishlistCart />
				<CartSheet />
				<UserPopover />
			</div>
		</header>
	)
}

export default Navbar
