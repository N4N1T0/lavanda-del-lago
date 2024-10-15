// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

// Data Imports
import { navItems } from '@/constants/site-data'

// UI Imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

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
    <nav className='hidden flex-[0_0_auto] items-start gap-12 xl:inline-flex'>
      {navItems.map(({ label, children }) => {
        if (typeof children !== 'string') {
          return (
            <Popover key={uuidv4()}>
              <PopoverTrigger className='-mt-1 flex w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'>
                {label} <ChevronDown />
              </PopoverTrigger>
              <PopoverContent>
                {label === 'Productos' ? (
                  <ul>
                    {categories.map((category) => (
                      <li key={uuidv4()}>
                        <PopoverClose asChild>
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
                        </PopoverClose>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {children?.map(({ label: subLabel, href: subHref }) => (
                      <li key={uuidv4()}>
                        <PopoverClose asChild>
                          <Link
                            href={subHref}
                            className='-mt-1 w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
                          >
                            {subLabel}
                          </Link>
                        </PopoverClose>
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
            href={children as string}
            className='-mt-1 w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'
          >
            {label}
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
const NavbarLinksMobile = ({
  categories
}: {
  categories: string[]
}): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className='block xl:hidden'>
        <MenuIcon
          size={30}
          className='transition-colors duration-150 hover:text-accent'
          strokeWidth={1}
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
          <Accordion type='single' collapsible>
            {navItems.map((item) => {
              if (typeof item.children !== 'string') {
                return (
                  <AccordionItem key={uuidv4()} value={`item-${uuidv4()}`}>
                    <AccordionTrigger className='flex w-fit cursor-pointer font-medium text-gray-900 transition-colors duration-150 hover:text-accent'>
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.label === 'Productos' ? (
                        <ul>
                          {categories.map((category) => (
                            <li key={uuidv4()}>
                              <SheetClose asChild>
                                <Link
                                  href={
                                    category === 'Todos'
                                      ? '/products'
                                      : `/products?category=${category}`
                                  }
                                  className='mt-1 text-base font-medium text-gray-600 transition-colors duration-150 hover:text-accent'
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
                                  className='mt-1 text-base font-medium text-gray-600 transition-colors duration-150 hover:text-accent'
                                >
                                  {child.label}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                )
              }

              return (
                <SheetClose key={uuidv4()} asChild>
                  <Link
                    href={item.children as string}
                    className='block w-full cursor-pointer border-b border-gray-200 py-3 font-medium'
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )
            })}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { NavbarLinks, NavbarLinksMobile }
