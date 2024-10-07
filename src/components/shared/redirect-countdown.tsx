// components/CountdownRedirect.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const CountdownRedirect = ({ url }: { url: string }) => {
  // 10 seconds countdown
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    if (countdown === 0) {
      // Redirect to home page
      router.push(url)
    } else {
      const timer = setInterval(() => {
        // Decrease countdown
        setCountdown((prev) => prev - 1)
      }, 1000) // Update every second

      // Cleanup interval on unmount
      return () => clearInterval(timer)
    }
  }, [countdown, router, url])

  return (
    <div className='text-center text-xl'>
      <p>Redirigiendo en {countdown} segundos...</p>
    </div>
  )
}

export default CountdownRedirect
