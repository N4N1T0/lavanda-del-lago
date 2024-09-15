'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogClose,
} from '@/components/ui/dialog'
import { handlingSecurityInfo } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const SecurityHandling = ({ security }: { security?: string | undefined }) => {
	const router = useRouter()

	if (security === undefined) {
		return null
	}

	const securityInfo = handlingSecurityInfo(security)

	const handleAccept = () => {
		router.push('/')
	}

	return (
		<Dialog defaultOpen>
			<DialogContent className='bg-red-500 text-white flex flex-col justify-center items-center'>
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
