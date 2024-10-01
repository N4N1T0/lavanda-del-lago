/* eslint-disable @typescript-eslint/no-explicit-any */
// Server Functions Imports
import { type NextRequest, NextResponse } from 'next/server'

// Sanity Secret Helper Functions
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Auth Imports
import { clerkClient } from '@/auth'
import { readBody } from '@sanity-studio/lib/utils'

// Resend Imports
import { resend } from '@/lib/resend'
import ResellerWelcomeEmail from '@/emails/reseller-welcome'

// Get the Secret Sanity Webhook from the Environment Variables
const secret = process.env.SANITY_WEBHOOK_SECRET

/**
 * Handles a POST request to update a user's public metadata based on a webhook event.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the request.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Read the request body
    const body = await readBody(req.body)
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''

    // Validate the signature
    if (!(await validateSignature(body, signature))) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Process the request if the signature is valid
    const jsonBody = JSON.parse(body)
    await updateUserResellerStatus(jsonBody.id, jsonBody.reseller)

    // Send email to user
    resend.emails.send({
      from: 'lavandadellago.es',
      to: jsonBody.email,
      subject: 'Felicidades, eres un reseller',
      react: ResellerWelcomeEmail({
        link: `https://lavandadellago.es/reseller/${jsonBody.id}`,
        nombre: jsonBody.name
      })
    })

    // Return success response
    return NextResponse.json({ success: true, message: 'Webhook success' })
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Error processing webhook:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// * HELPER FUNCTIONS ↓↓↓

/**
 * Validates the incoming request's signature.
 *
 * @param {string} body - The raw body of the request.
 * @param {string} signature - The signature from the request headers.
 * @return {Promise<boolean>} A promise that resolves to true if the signature is valid, false otherwise.
 */
async function validateSignature(
  body: string,
  signature: string
): Promise<boolean> {
  return await isValidSignature(body, signature, secret!)
}

/**
 * Updates the user's reseller status in Clerk.
 *
 * @param {string} userId - The ID of the user to update.
 * @param {boolean} resellerStatus - The new reseller status to set.
 * @return {Promise<void>} A promise that resolves when the user has been updated.
 */
async function updateUserResellerStatus(
  userId: string,
  resellerStatus: boolean
): Promise<void> {
  await clerkClient.users.updateUser(userId, {
    publicMetadata: { reseller: resellerStatus }
  })
}
