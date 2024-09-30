'use client'

// UI Imports
import { Progress } from '@/components/ui/progress'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const values = [
  {
    label: '/checkout',
    value: 30
  },
  {
    label: '/checkout/review',
    value: 60
  },
  {
    label: '/checkout/payment',
    value: 100
  }
]

const CheckoutSteps = () => {
  const path = usePathname()

  const [progress, setProgress] = useState(0)
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    // Encuentra el valor correspondiente según el path
    const currentValue = values.find((step) => path.startsWith(step.label))
    if (currentValue) {
      setProgress(currentValue.value)
      setCurrentPage(currentValue.label)
    } else {
      setProgress(0) // Valor predeterminado si la ruta no coincide
    }
  }, [path])

  return (
    <aside className='mx-auto mt-10 flex max-w-screen-lg flex-col items-center justify-center px-5'>
      <Progress value={progress} className='w-full' />
      <div className='mt-5 flex w-full items-end justify-end'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem
              className={
                currentPage === '/checkout' ? 'font-semibold text-accent' : ''
              }
            >
              Información
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              className={
                currentPage === '/checkout/review'
                  ? 'font-semibold text-accent'
                  : ''
              }
            >
              Revisión
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              className={
                currentPage === '/checkout/payment'
                  ? 'font-semibold text-accent'
                  : ''
              }
            >
              Pago
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </aside>
  )
}

export default CheckoutSteps
