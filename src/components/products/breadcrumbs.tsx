'use client'

// React Imports
import React from 'react'

// Next.js Imports
import { usePathname } from 'next/navigation'

// UI Imports
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

// Utility Imports
import { breakUrlToBreadcrumb, capitalizeFirstLetter } from '@/lib/utils'

/**
 * Renders a breadcrumb component based on the current path.
 *
 * @return {JSX.Element} The breadcrumb component.
 */
const Breadcrumbs = (): JSX.Element => {
	const path = usePathname()
	const breadcrumbsArray = React.useMemo(
		() => breakUrlToBreadcrumb(path),
		[path],
	)

	return (
		<section
			id='breadcrumbs'
			className='mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex flex-col gap-7'
		>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							href='/'
							className='text-gray-500 hover:text-accent transition-colors duration-150'
						>
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>
					{breadcrumbsArray.map((breadcrumb, index) => (
						<React.Fragment key={`${breadcrumb.name}-breadcrumb-${index + 1}`}>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								{index === breadcrumbsArray.length - 1 ? (
									<BreadcrumbPage className='text-accent font-medium'>
										{capitalizeFirstLetter(breadcrumb.name)}
									</BreadcrumbPage>
								) : (
									<BreadcrumbLink
										href={breadcrumb.path}
										className='text-gray-500 hover:text-accent transition-colors duration-150'
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
