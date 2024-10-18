'use client'

import { useState, useEffect } from 'react'
import { hasCookie, setCookie } from 'cookies-next'
import { Button } from './button'
import Link from 'next/link'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true)

  useEffect(() => {
    setShowConsent(hasCookie('localConsent'))
  }, [])

  const acceptCookie = () => {
    setShowConsent(true)
    setCookie('localConsent', 'true', {})
  }

  const rejectCookie = () => {
    setShowConsent(true)
    setCookie('localConsent', 'false', {})
  }

  if (showConsent) {
    return null
  }

  return (
    <div className='fixed inset-0 z-50 bg-accent/50 bg-opacity-70'>
      <div className='fixed bottom-0 left-0 right-0 bg-gray-100 px-4 py-6 shadow-lg sm:px-6 sm:py-8'>
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <span className='text-dark text-center text-sm sm:text-left sm:text-base'>
            Este sitio web utiliza cookies para mejorar la experiencia del
            usuario. Al utilizar nuestro sitio web, consientes el uso de todas
            las cookies de acuerdo con nuestra{' '}
            <Link
              href='/politica-de-cookies'
              target='_blank'
              className='text-accent/90 hover:underline'
            >
              Política de Cookies
            </Link>{' '}
            o nuestra{' '}
            <Link
              href='/politica-de-privacidad'
              target='_blank'
              className='text-accent/90 hover:underline'
            >
              Política de Privacidad
            </Link>
          </span>
          <div className='flex justify-center space-x-4'>
            <Button variant='cart' onClick={acceptCookie}>
              Aceptar
            </Button>
            <Button
              variant='cart'
              className='bg-tertiary'
              onClick={rejectCookie}
            >
              Rechazar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
