'use client'

// Next.js Imports
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
// UI Imports
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

// Utils Imports
import { handlingSecurityInfo } from '@/lib/utils'

/**
 * Handles security information and displays a dialog based on the provided security status.
 *
 * @param {string} security - The security status to handle.
 * @return {JSX.Element | null} A dialog component displaying security information or null if security status is undefined.
 */
const SecurityHandling = (): JSX.Element | null => {
  // Router instance initialization, Pathname & SearchParams
  const router = useRouter()
  const path = usePathname()
  const security = useSearchParams().get('security')

  // not show the dialog if security is undefined
  if (security === undefined || security === null) {
    return null
  }

  // utils functions to handle security info
  const splitArray = security.split('-')
  const securityInfo = handlingSecurityInfo(security)

  // redirection to request page
  const handleAccept = () => {
    router.push(path.split('?')[0])
  }

  return (
    <Dialog defaultOpen>
      <DialogContent
        className={`flex flex-col items-center justify-center text-white ${
          splitArray[splitArray.length - 1] === 'ok'
            ? 'bg-green-500'
            : 'bg-red-500'
        }`}
      >
        <DialogHeader>
          <DialogTitle className='text-center text-3xl uppercase'>
            {securityInfo.title}
          </DialogTitle>
          <DialogDescription className='text-center text-lg text-white'>
            {securityInfo.description}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button className='w-fit border-0' onClick={handleAccept}>
            Aceptar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default SecurityHandling
