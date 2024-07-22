'use client'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// React Imports
import React from 'react'

// Data Imports
import { navItems } from '@/constants/site-data'
import { categoriesList } from '@/constants/site-data'

// UI Imports
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from '@/components/ui/sheet'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

// Uitility Imports
import { capitalizeFirstLetter } from '@/lib/utils'

// Assets Imports
import { MenuIcon, ChevronDown } from 'lucide-react'
import { NavbarLogo } from '@/assets'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

// Add All the categories to the list
categoriesList.unshift('Todos')

/**
 * Renders a navigation bar with links.
 *
 * @return {JSX.Element} The navigation bar component.
 */
const NavbarLinks = (): JSX.Element => {
	const path = usePathname()

	return (
		<nav className='md:inline-flex items-start gap-12 flex-[0_0_auto] hidden'>
			{navItems.map((item) => {
				if (item.label === 'Productos') {
					return (
						<Popover key={uuidv4()}>
							<PopoverTrigger
								className={`w-fit -mt-1 flex font-medium text-gray-900 hover:text-accent duration-150 transition-colors cursor-pointer ${
									path === item.href ? 'text-accent' : 'opacity-60'
								}`}
							>
								{item.label} <ChevronDown />
							</PopoverTrigger>
							<PopoverContent>
								<ul>
									{categoriesList.map((category) => (
										<li key={uuidv4()}>
											<Link
												href={
													category === 'Todos'
														? '/products'
														: `/products?category=${category}`
												}
												className={`w-fit -mt-1 font-medium text-gray-900 hover:text-accent duration-150 transition-colors cursor-pointer ${
													path === `/products/${category}`
														? 'text-accent'
														: 'opacity-60'
												}`}
											>
												{capitalizeFirstLetter(category)}
											</Link>
										</li>
									))}
								</ul>
							</PopoverContent>
						</Popover>
					)
				}

				return (
					<Link
						key={uuidv4()}
						href={item.href}
						className={`w-fit -mt-1 font-medium text-gray-900 hover:text-accent duration-150 transition-colors cursor-pointer ${
							path === item.href ? 'text-accent' : 'opacity-60'
						}`}
					>
						{item.label}
					</Link>
				)
			})}
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
			<SheetTrigger className='md:hidden block'>
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
				<nav className='inline-flex items-start gap-2 flex-col pt-4'>
					{navItems.map((item) => {
						if (item.label === 'Productos') {
							return (
								<div key={uuidv4()}>
									<SheetClose asChild>
										<Link
											href={item.href}
											className={`w-fit font-medium text-gray-950 text-xl ${
												path === item.href ? 'text-accent' : 'opacity-80'
											}`}
										>
											{item.label}
										</Link>
									</SheetClose>
									<ul className='space-y-1'>
										{categoriesList.map((category) => (
											<li key={uuidv4()} className='pl-2 text-gray-600'>
												<SheetClose asChild>
													<Link href={`/products?category=${category}`}>
														{capitalizeFirstLetter(category)}
													</Link>
												</SheetClose>
											</li>
										))}
									</ul>
								</div>
							)
						}

						return (
							<SheetClose key={uuidv4()} asChild>
								<Link
									href={item.href}
									className={`w-fit font-medium text-gray-950 text-xl ${
										path === item.href ? 'text-accent' : 'opacity-80'
									}`}
								>
									{item.label}
								</Link>
							</SheetClose>
						)
					})}
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export { NavbarLinks, NavbarLinksMobile }
