import { type NextRequest, NextResponse } from 'next/server'

// TODO Make an API endpoint to create a new reseller
export async function GET(req: NextRequest) {
	return NextResponse.json({
		message: 'Hello World',
	})
}
