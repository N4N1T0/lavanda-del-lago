// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Data Imports
import { navItems } from '@/constants/site-data'

// UI Imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

// Uitility Imports
import { capitalizeFirstLetter } from '@/lib/utils'

// Assets Imports
import { NavbarLogo } from '@/assets'
import { ChevronDown, MenuIcon } from 'lucide-react'

// External Libraies Imports
import { v4 as uuidv4 } from 'uuid'

/**
 * Renders a navigation bar with links.
 *
 * @return {JSX.Element} The navigation bar component.
 */
const NavbarLinks = ({ categories }: { categories: string[] }): JSX.Element => {
  return (
    <nav className='hidden flex-[0_0_auto] items-start gap-12 md:inline-flex'>
      {navItems.map((item) => {
        if (typeof item.children !== 'string') {
          return (
            <Popover key={uuidv4()}>
              <PopoverTrigger className='-mt-1 flex w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'>
                {item.label} <ChevronDown />
              </PopoverTrigger>
              <PopoverContent>
                {item.label === 'Productos' ? (
                  <ul>
                    {categories.map((category) => (
                      <li key={uuidv4()}>
                        <Link
                          href={
                            category === 'Todos'
                              ? '/products'
                              : `/products?category=${category}`
                          }
                          className='-mt-1 w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
                        >
                          {capitalizeFirstLetter(category)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {item.children?.map((item) => (
                      <li key={uuidv4()}>
                        <Link
                          href={item.href}
                          className='-mt-1 w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </PopoverContent>
            </Popover>
          )
        }

        return (
          <Link
            key={uuidv4()}
            href={item.children as string}
            className='-mt-1 w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
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
const NavbarLinksMobile = (
  { categories }: { categories: string[] }
): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className='block md:hidden'>
        <MenuIcon
          size={25}
          className='transition-colors duration-150 hover:text-accent'
        />
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader className='border-b border-gray-400 pb-2'>
          <SheetTitle>
            <Image src={NavbarLogo} alt='Navbar Logo' title='Navbar Logo' />
          </SheetTitle>
          <SheetDescription className='text-left text-xs text-accent/70'>
            A pesar de que la empresa es relativamente joven, los valores en los
            que se basa son sólidos, verdaderos, de otros tiempos.
          </SheetDescription>
        </SheetHeader>
        <nav className='flex flex-col gap-4 py-4'>
          {navItems.map((item) => {
            if (typeof item.children !== 'string') {
              return (
                <div key={uuidv4()} className='space-y-2'>
                  <SheetClose asChild>
                    <Popover>
                      <PopoverTrigger className='flex w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'>
                        {item.label} <ChevronDown />
                      </PopoverTrigger>
                      <PopoverContent>
                        {item.label === 'Productos' ? (
                          <ul>
                            {categories.map((category) => (
                              <li key={uuidv4()}>
                                <SheetClose asChild>
                                  <Link
                                    href={`/products?category=${category}`}
                                    className='font-medium text-gray-600 transition-colors duration-150 hover:text-accent'
                                  >
                                    {capitalizeFirstLetter(category)}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul>
                            {item.children?.map((child) => (
                              <li key={uuidv4()}>
                                <SheetClose asChild>
                                  <Link
                                    href={child.href}
                                    className='font-medium text-gray-600 transition-colors duration-150 hover:text-accent'
                                  >
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        )}
                      </PopoverContent>
                    </Popover>
                  </SheetClose>
                </div>
              )
            }

            return (
              <SheetClose key={uuidv4()} asChild>
                <Link
                  href={item.children as string}
                  className='w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
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
