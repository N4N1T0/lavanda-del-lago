// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

// Sanity Secret Helper Functions
import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook'

// Orama Cloud Imports
import { CloudManager } from '@oramacloud/client'

// Get the Secret Sanity Webhook and Orama Private API fron the Enviroment Variables
const sanitySecret = process.env.SANITY_WEBHOOK_SECRET
const oramaSecret = process.env.ORAMA_PRIVATE_API_KEY

// initialize the Orama Cloud Manager
const manager = new CloudManager({ api_key: oramaSecret! })
const indexManager = manager.index('l3om167fdgwjrviwbtem9vmc')

/**
 * Handles a POST request to update a user's public metadata.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the request.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		// Read the request body as a string
		const body = await readBody(req.body)
		const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''

		// Validate the signature
		const isValid = await isValidSignature(body, signature, sanitySecret!)

		// If the signature is invalid, return a 401 Unauthorized response
		if (!isValid) {
			return NextResponse.json(
				{ success: false, message: 'Invalid signature' },
				{ status: 401 },
			)
		}

		// Process the request if the signature is valid
		const jsonBody = JSON.parse(body)

		// Update index documents
		await indexManager.update([jsonBody])

		// deploy orama index
		await indexManager.deploy()

		// Return success response
		return NextResponse.json({ success: true, message: 'Webhook success' })
	} catch (error) {
		// Log the error for debugging purposes
		console.error('Error processing webhook:', error)

		// Return a 500 Internal Server Error response
		return NextResponse.json(
			{ success: false, message: 'Internal server error' },
			{ status: 500 },
		)
	}
}

// Helper function to read the body
async function readBody(
	readable: ReadableStream<Uint8Array> | null,
): Promise<string> {
	if (!readable) {
		throw new Error('Readable stream is null')
	}

	const reader = readable.getReader()
	const chunks: Uint8Array[] = []

	try {
		let done = false
		while (!done) {
			const { value, done: streamDone } = await reader.read()
			done = streamDone
			if (value) {
				chunks.push(value)
			}
		}
	} finally {
		reader.releaseLock()
	}

	const combined = new Uint8Array(
		chunks.reduce((acc, chunk) => acc + chunk.length, 0),
	)
	let position = 0
	for (const chunk of chunks) {
		combined.set(chunk, position)
		position += chunk.length
	}

	return new TextDecoder().decode(combined)
}
