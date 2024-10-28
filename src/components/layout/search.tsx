'use client'

// Next.js Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// Assets Imports
import { SearchIcon } from 'lucide-react'

// UI Imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { event } from '@/lib/fpixel'

/**
 * Renders a search component with an input field and a search button.
 *
 * @return {JSX.Element} The search component.
 */
const Search = (): JSX.Element => {
  // State to hold the search term
  const [search, setSearch] = useState('')
  // Next.js router
  const router = useRouter()

  return (
    <div className='relative hidden h-full w-[170px] md:block md:w-[350px]'>
      {/* Label for screen readers */}
      <label htmlFor='Search' className='sr-only'>
        {' '}
        Search{' '}
      </label>

      {/* Search input field */}
      <input
        type='text'
        id='Search'
        placeholder='Que Buscas...'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            event('Search', {
              searchTerm: search
            })
            router.push(`/busqueda/?q=${encodeURIComponent(search)}`)
          }
        }}
        className='h-full w-full rounded-md bg-neutral-100 p-5 py-2.5 shadow-sm sm:text-sm'
      />

      {/* Search button */}
      <Link
        href={`/busqueda/?q=${search}`}
        className='text-gray-8000 absolute inset-y-0 end-0 m-1 grid w-9 place-content-center'
        onClick={() =>
          event('Search', {
            searchTerm: search
          })
        }
      >
        {/* Visually hidden text for screen readers */}
        <span className='sr-only'>Search</span>
        <SearchIcon
          size={20}
          className='transition-colors duration-150 hover:text-accent'
        />
      </Link>
    </div>
  )
}

/**
 * Renders a mobile search component with a popover trigger and input field.
 *
 * @return {JSX.Element} The mobile search component.
 */
const SearchMobile = (): JSX.Element => {
  // State to hold the search term
  const [search, setSearch] = useState('')
  // Next.js router
  const router = useRouter()

  return (
    // Popover component for mobile view
    <Popover>
      {/* Popover trigger button */}
      <PopoverTrigger className='block md:hidden'>
        {/* Visually hidden text for screen readers */}
        <span className='sr-only'>Search</span>
        {/* Search icon */}
        <SearchIcon
          size={25}
          className='text-gray-800 transition-colors duration-150 hover:text-accent'
          strokeWidth={1}
        />
      </PopoverTrigger>
      {/* Popover content */}
      <PopoverContent>
        {/* Label for screen readers */}
        <label htmlFor='Search' className='sr-only'>
          {' '}
          Search{' '}
        </label>

        {/* Search input field */}
        <input
          type='text'
          id='Search'
          placeholder='Que Buscas...'
          // Update search state on input change
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          // On enter key press, navigate to search results page
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              event('Search', {
                searchTerm: search
              })
              router.push(`/busqueda/?q=${encodeURIComponent(search)}`)
            }
          }}
          // Styling for search input field
          className='h-full w-full rounded-md bg-neutral-100 p-5 py-2.5 shadow-sm sm:text-sm'
        />
      </PopoverContent>
    </Popover>
  )
}

export { Search, SearchMobile }
