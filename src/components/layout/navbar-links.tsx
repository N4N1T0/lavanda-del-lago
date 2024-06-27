'use client'

// Next.js Imports
import { usePathname } from 'next/navigation'

// React Imports
import React from 'react'

// Data Imports
import { navItems } from '@/constants/site-data'

// UI Imports
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

// Assets Imports
import { MenuIcon } from 'lucide-react'
import { NavbarLogo } from '@/assets'
import Image from 'next/image'

/**
 * Renders a navigation bar with links.
 *
 * @return {JSX.Element} The navigation bar component.
 */
const NavbarLinks = (): JSX.Element => {
	const path = usePathname()

	return (
		<nav className='md:inline-flex items-start gap-12 flex-[0_0_auto] hidden'>
			{navItems.map((item) => (
				<a
					key={item.label}
					href={item.href}
					className={`w-fit -mt-1 font-medium text-gray-900 hover:text-accent duration-150 transition-colors cursor-pointer ${
						path === item.href ? 'text-accent' : 'opacity-60'
					}`}
				>
					{item.label}
				</a>
			))}
		</nav>
	)
}

/**
 * Renders the mobile version of the navigation bar with links.
 *
 * @return {JSX.Element} The mobile navigation bar component.
 */
const NavbarLinksMobile = (): JSX.Element => {
	const path = usePathname()
	return (
		<Sheet>
			<SheetTrigger>
				<MenuIcon
					size={25}
					className='hover:text-accent duration-150 transition-colors'
				/>
			</SheetTrigger>
			<SheetContent side='left'>
				<SheetHeader className='border-b border-gray-400 pb-2'>
					<SheetTitle>
						<Image src={NavbarLogo} alt='Navbar Logo' title='Navbar Logo' />
					</SheetTitle>
					<SheetDescription className='text-xs text-accent/70 text-left'>
						A pesar de que la empresa es relativamente joven, los valores en los
						que se basa son sólidos, verdaderos, de otros tiempos.
					</SheetDescription>
				</SheetHeader>
				<nav className='md:hidden inline-flex items-start gap-12 flex-col pt-4'>
					{navItems.map((item) => (
						<a
							key={item.label}
							href={item.href}
							className={`w-fit font-medium text-gray-900 hover:text-accent duration-150 transition-colors cursor-pointer ${
								path === item.href ? 'text-accent' : 'opacity-60'
							}`}
						>
							{item.label}
						</a>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export { NavbarLinks, NavbarLinksMobile }
