// Project Components Imports
import ClientFullCalendar from '@/components/events/client-full-calendar'

// Queries Imports
import { events as eventsFetch } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { Metadata } from 'next'

// Metadata for this page
export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Eventos de la tienda en linea de Lavanda del lago. estos eventos son parte del esfuerzo de Lavanda del Lago españa para promover el el uso de prodcutos naturales apartir de lavanda.'
}

/**
 * Fetches events data from the Sanity API and renders the Events page with a full calendar component.
 *
 * @return {Promise<JSX.Element>} The JSX element representing the Events page content.
 */
const EventsPage = async (): Promise<JSX.Element> => {
  const response = await sanityClientRead.fetch(
    eventsFetch,
    {},
    {
      next: { revalidate: 60 }
    }
  )

  return (
    <section
      id='blog'
      className='mx-auto flex max-w-screen-2xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8 lg:py-20'
    >
      <div className='w-full space-y-3'>
        <h1 className='text-3xl font-bold'>Nuestros EVENTOS</h1>
        <p className='text-gray-600'>
          En esta sección encontraras todos los eventos que tenemos para ti.
          estos eventos son parte del esfuerzo de Lavanda del Lago españa para
          promover el el uso de prodcutos naturales apartir de lavanda.
        </p>
      </div>
      <ClientFullCalendar events={response} />
    </section>
  )
}

export default EventsPage
