'use client'

import { event } from '@/lib/fpixel'
import Link from 'next/link'

const FooterLinks = ({
  link,
  value,
  key
}: {
  link: string
  value: string
  key: string
}) => {
  return (
    <Link
      target='_blank'
      className='transition-colors duration-150 hover:text-gray-400'
      href={link}
      onClick={() =>
        event('Contact', {
          method: key
        })
      }
    >
      {value}
    </Link>
  )
}

export default FooterLinks
