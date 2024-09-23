'use client'

// Next.js Imports
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
// UI Imports
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

// Utils Imports
import { handlingSecurityInfo } from '@/lib/utils'

/**
 * Handles security information and displays a dialog based on the provided security status.
 *
 * @param {string} security - The security status to handle.
 * @return {JSX.Element | null} A dialog component displaying security information or null if security status is undefined.
 */
const SecurityHandling = ({
	security,
}: { security?: string | undefined }): JSX.Element | null => {
	// Router instance initialization
	const router = useRouter()

	// not show the dialog if security is undefined
	if (security === undefined) {
		return null
	}

	// utils functions to handle security info
	const splitArray = security.split('-')
	const securityInfo = handlingSecurityInfo(security)

	// redirection to home
	const handleAccept = () => {
		router.push('/')
	}

	return (
		<Dialog defaultOpen>
			<DialogContent
				className={`text-white flex flex-col justify-center items-center ${splitArray[splitArray.length - 1] === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}
			>
				<DialogHeader>
					<DialogTitle className='text-center uppercase text-3xl'>
						{securityInfo.title}
					</DialogTitle>
					<DialogDescription className='text-center text-white text-lg'>
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
