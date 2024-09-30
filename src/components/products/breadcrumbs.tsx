'use client'

// React Imports
import React from 'react'

// Next.js Imports
import { usePathname, useSearchParams } from 'next/navigation'

// UI Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

// Utility Imports
import {
  breakUrlToBreadcrumb,
  capitalizeFirstLetter,
  desurlizeForBreadcrumbs
} from '@/lib/utils'

// External Libraries Imports
import { v4 as uuidv4 } from 'uuid'

/**
 * Renders a breadcrumb component based on the current path.
 *
 * @return {JSX.Element} The breadcrumb component.
 */
const Breadcrumbs = (): JSX.Element => {
  // Get the current path from Next.js's usePathname hook
  const path = usePathname()
  // Get the category from the search params
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'Todos'

  // Memoize an array of breadcrumbs based on the current path and category
  const breadcrumbsArray = React.useMemo(() => {
    // Get an array of breadcrumbs based on the current path
    const result = breakUrlToBreadcrumb(path)

    // If there are more than 1 breadcrumb, add the category to the middle
    if (result.length > 1) {
      result.splice(1, 0, {
        name: category,
        path: `/products?category=${category}`
      })
    } else {
      // If there is only 1 breadcrumb, add the category to the end
      result.push({
        name: category,
        path: `/products?category=${category}`
      })
    }

    return result
  }, [path, category])

  return (
    <section
      id='breadcrumbs'
      className='mx-auto flex max-w-screen-2xl flex-col gap-7 px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8'
    >
      <Breadcrumb>
        <BreadcrumbList className='w-fit'>
          <BreadcrumbItem>
            <BreadcrumbLink
              href='/'
              className='text-gray-500 transition-colors duration-150 hover:text-accent'
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbsArray.map((breadcrumb, index) => (
            <React.Fragment key={uuidv4()}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* If this is the last breadcrumb, display it as a BreadcrumbPage */}
                {index === breadcrumbsArray.length - 1 ? (
                  <BreadcrumbPage className='font-medium text-accent'>
                    {desurlizeForBreadcrumbs(breadcrumb.name)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={breadcrumb.path}
                    className='text-gray-500 transition-colors duration-150 hover:text-accent'
                  >
                    {capitalizeFirstLetter(breadcrumb.name)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}

export default Breadcrumbs
