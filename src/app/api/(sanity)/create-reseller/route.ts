// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

// Sanity Secret Helper Functions
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Auth Imports
import { clerkClient } from '@/auth'
import { readBody } from '@sanity-studio/lib/utils'

// Get the Secret Sanity Webhook fron the Enviroment Variables
const secret = process.env.SANITY_WEBHOOK_SECRET

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
    const isValid = await isValidSignature(body, signature, secret!)

    // If the signature is invalid, return a 401 Unauthorized response
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Process the request if the signature is valid
    const jsonBody = JSON.parse(body)

    // Change the user's reseller status in Clerk
    await clerkClient.users.updateUser(jsonBody.id, {
      publicMetadata: { reseller: jsonBody.reseller }
    })

    // Return success response
    return NextResponse.json({ success: true, message: 'Webhook success' })
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error processing webhook:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
