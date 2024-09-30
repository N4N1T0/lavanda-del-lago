// Next.js Imports
import { type NextRequest, NextResponse } from 'next/server'

// Orama Index Imports
import { indexManager } from '@/lib/orama'

// Queries Imports
import { oramaIndexDeployUpdatedProducts } from '@/lib/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { Product } from '@/types'

// Environment Variables for API Key
const cronJobApiKey = process.env.CRON_JOB_API_KEY

/**
 * Handles a GET request to update and deploy products.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the request.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const apiKey = req.headers.get('x-api-key') || ''

    // Validate API Key
    if (!apiKey || apiKey !== cronJobApiKey) {
      console.warn('Invalid API key')
      return NextResponse.json(
        { success: false, message: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Fetch all the updated products
    const sanityProducts: Product[] = await sanityClientRead.fetch(
      oramaIndexDeployUpdatedProducts
    )

    // Insert documents
    await indexManager.update(sanityProducts)

    // Trigger a new deployment
    await indexManager.deploy()

    // Log success and return response
    console.info('Deployment triggered successfully')
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered'
    })
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error processing request:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
