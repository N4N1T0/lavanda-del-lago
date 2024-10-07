'use client'

// External Libraries Imports
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'

// Types Imports
import type { Event, URL } from '@/types'

// UI Imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

// React Imports
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { EventClickArg } from '@fullcalendar/core/index.js'

const ClientFullCalendar = ({ events }: { events: Event[] }): JSX.Element => {
  const [loading, setLoading] = useState(true)
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleDateClick = (arg: EventClickArg) => {
    setCurrentEvent(arg.event as unknown as Event)
    setModalOpen(true)
  }

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false)
    }, 300) // Simulate loading time

    return () => clearTimeout(loadingTimer) // Clean up timeout
  }, [])

  if (loading) {
    return (
      <div className='space-y-4'>
        <div className='flex w-full items-center justify-between'>
          <Skeleton className='h-12 w-1/4' />
          <Skeleton className='h-12 w-1/5' />
        </div>
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
        <Skeleton className='h-16 w-full' />
      </div>
    )
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        eventClick={handleDateClick}
        events={events}
        eventContent={EventContent}
        locale={esLocale}
      />
      <EventModal
        event={currentEvent}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
      />
    </>
  )
}

/**
 * Renders a modal dialog for displaying event details.
 *
 * @param {Object} props - The component props.
 * @param {Event | null} props.event - The event object or null.
 * @param {Dispatch<SetStateAction<boolean>>} props.setModalOpen - The function to set the modal open state.
 * @param {boolean} props.modalOpen - The current modal open state.
 * @return {JSX.Element} The rendered modal dialog.
 */
const EventModal = ({
  event,
  setModalOpen,
  modalOpen
}: {
  event: Event | null // Event can be null initially
  setModalOpen: Dispatch<SetStateAction<boolean>>
  modalOpen: boolean
}): JSX.Element => {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className='p-5 text-left'>
        <DialogHeader className='space-y-3'>
          <DialogTitle className='text-3xl font-bold text-accent'>
            {event?.title}
          </DialogTitle>
          <DialogDescription className='text-lg font-light'>
            {event?._def?.extendedProps?.description}
          </DialogDescription>
        </DialogHeader>
        {event?._def?.extendedProps?.urls && (
          <>
            <p className='test-xs italic'>
              Puedes agregar a tu calendarios este evento usando estos enlaces
            </p>
            <ul className='flex gap-3'>
              {event._def.extendedProps.urls.map(
                ({ calendarName, calendarUrl, id }: URL) => (
                  <li
                    key={id}
                    className='text-lg font-bold text-accent transition-colors duration-150 ease-in-out hover:text-accent/70'
                  >
                    <Link href={calendarUrl as string} target='_blank'>
                      {calendarName}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

/**
 * Renders the content for an event in the calendar.
 *
 * @param {Event} event - The event object containing the title.
 * @return {JSX.Element} The JSX element representing the event content.
 */
const EventContent = ({ event }: { event: Event }): JSX.Element => {
  return (
    <div className='cursor-pointer text-wrap border-none bg-accent py-3 pl-2'>
      {event.title}
    </div>
  )
}

export default ClientFullCalendar
