import ClientFullCalendar from '@/components/events/client-full-calendar'
import { events as eventsFetch } from '@/lib/queries'
import { sanityClient } from '@sanity-studio/lib/client'

const EventsPage = async () => {
	const events = await sanityClient.fetch(eventsFetch)

	return (
		<section
			id='blog'
			className='mx-auto max-w-screen-2xl px-4 py-12 lg:py-20 sm:px-6 lg:px-8 flex flex-col gap-12'
		>
			<div className='w-full space-y-3'>
				<h1 className='text-3xl font-bold'>Nuestros EVENTOS</h1>
				<p className='text-gray-600'>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
					repellat deleniti cumque a quo sit aliquam molestiae consectetur
					tempore ipsa hic eligendi voluptatum natus, dolorem vero quasi ratione
					quam eius.
				</p>
			</div>
			<ClientFullCalendar events={events} />
		</section>
	)
}

export default EventsPage
