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
	PopoverTrigger,
} from '@/components/ui/popover'

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
		<div className='relative w-[170px] md:w-[350px] h-full hidden md:block'>
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
						router.push(`/search/?q=${encodeURIComponent(search)}`)
					}
				}}
				className='w-full rounded-md bg-neutral-100 py-2.5 shadow-sm sm:text-sm p-5 h-full'
			/>

			{/* Search button */}
			<Link
				href={`/search/?q=${search}`}
				className='text-gray-8000 absolute inset-y-0 end-0 grid w-9 place-content-center m-1'
			>
				{/* Visually hidden text for screen readers */}
				<span className='sr-only'>Search</span>
				<SearchIcon
					size={20}
					className='hover:text-accent duration-150 transition-colors'
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
					className='hover:text-accent duration-150 transition-colors'
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
							router.push(`/search/?q=${encodeURIComponent(search)}`)
						}
					}}
					// Styling for search input field
					className='w-full rounded-md bg-neutral-100 py-2.5 shadow-sm sm:text-sm p-5 h-full'
				/>
			</PopoverContent>
		</Popover>
	)
}

export { Search, SearchMobile }
