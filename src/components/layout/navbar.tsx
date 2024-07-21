// Project assets
import { User, MainLogo } from '@/assets'

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

/**
 * Renders the Navbar component.
 *
 * @return {JSX.Element} The rendered Navbar component.
 */
const Navbar = (): JSX.Element => {
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
					<NavbarLinksMobile />
				</div>
			</div>
			<Search />

			<NavbarLinks />

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
