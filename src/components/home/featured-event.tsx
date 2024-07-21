// Types Imports
import type { Event } from '@/types'

// Next.js Imports
import Image from 'next/image'
import Link from 'next/link'

/**
+ * Render the featured event section with event details.
+ *
+ * @param {Event} event - The event object to display
+ * @return {JSX.Element} The JSX element representing the featured event section
+ */
const FeaturedEvent = ({ event }: { event: Event }): JSX.Element => {
	return (
		<section
			id='featured-event'
			className='inline-flex flex-col items-start gap-8 px-5 lg:px-10 2xl:px-20 py-10 2xl:py-20 bg-gray-100 w-full'
		>
			<div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12'>
				{/* Image of the event */}
				<Image
					src={event.image}
					width={1000}
					height={1000}
					alt={event.title}
					title={event.title}
					className='mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
				/>
				{/* Event details */}
				<div className='flex flex-col justify-center gap-5'>
					<div className='space-y-5'>
						{/* New event badge */}
						<div className='inline-block rounded-lg bg-[#e6e2f1] px-3 py-1 text-sm'>
							Nuevo Evento
						</div>
						{/* Title and description of the event */}
						<h2 className='text-3xl font-bold tracking-tighter text-accent sm:text-5xl'>
							{event.title}
						</h2>
						<p className='max-w-[600px] text-[#7b8c8d] text-base/relaxed font-light'>
							{event.description}
						</p>
					</div>
					{/* List of links to add to calendars */}
					<ul className='flex flex-wrap items-center gap-3 border-b border-gray-300 pb-2'>
						{event.urls.map(({ id, calendarName, calendarUrl }) => (
							<li key={id}>
								<Link
									href={calendarUrl}
									className='inline-flex h-10 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white shadow transition-colors hover:bg-accent/70'
								>
									{calendarName}
								</Link>
							</li>
						))}
						<li className='font-light text-tertiary'>
							Guardalo en tus calendarios
						</li>
					</ul>
					{/* Link to events page */}
					<Link
						href='/events'
						className='inline-flex h-10 items-center justify-center rounded-md bg-accent px-8 text-sm font-medium text-white shadow transition-colors hover:bg-accent/70'
						prefetch={false}
					>
						Saber mas sobre los eventos
					</Link>
				</div>
			</div>
		</section>
	)
}

export default FeaturedEvent
