import type { NextApiRequest } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { sanityClientWrite } from '@sanity-studio/lib/client'

export const GET = async (req: NextApiRequest) => {
	const user = await currentUser()

	if (!user) {
		return NextResponse.redirect('/sign-in')
	}
	const { id, fullName, emailAddresses, imageUrl } = user

	await sanityClientWrite.createIfNotExists({
		_type: 'user',
		_id: id,
		name: fullName,
		email: emailAddresses[0].emailAddress,
		image: imageUrl,
	})

	const url = req.url?.split('api/create-sanity-user')[0] || '/'
	return NextResponse.redirect(url)
}
