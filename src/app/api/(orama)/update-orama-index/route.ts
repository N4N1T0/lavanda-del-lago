/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js Imports
import { type NextRequest, NextResponse } from 'next/server'

// Orama Index Imports
import { indexManager } from '@/lib/clients'

// Queries Imports
import { oramaIndexDeployUpdatedProducts } from '@sanity-studio/queries'
import { sanityClientRead } from '@sanity-studio/lib/client'

// Types Imports
import type { Product } from '@/types'

// Resend Imports
import { resend } from '@/lib/clients'
import DailyIndexingEmail from '@/emails/daily-orama-index'

export const runtime = 'nodejs'

/**
 * Handles a GET request to update and deploy products.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<NextResponse>} A JSON response indicating the success or failure of the request.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Validate API Key
    const apiKey = req.headers.get('x-api-key') || ''
    if (!isValidApiKey(apiKey)) {
      console.warn('Invalid API key')
      return NextResponse.json(
        { success: false, message: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Fetch and update products
    const sanityProducts: Product[] = await fetchUpdatedProducts()

    // Insert documents and trigger deployment
    await updateAndDeployProducts(sanityProducts)

    // Send email to admin
    resend.emails.send({
      from: 'info@lavandadellago.es',
      to: 'info@lavandadellago.es',
      subject: 'Informe diario de indexación de productos',
      react: DailyIndexingEmail({
        fecha: new Date().toLocaleDateString(),
        productosActualizados: sanityProducts.length
      })
    })

    // Log success and return response
    console.info('Deployment triggered successfully')
    return NextResponse.json({
      success: true,
      message: 'Deployment triggered'
    })
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error('Error processing request:', error)

    // Return a 500 Internal Server Error response
    return NextResponse.json(
      { success: false, message: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// * HELPER FUNCTIONS ↓↓↓

/**
 * Validates the provided API key.
 *
 * @param {string} apiKey - The API key to validate.
 * @return {boolean} True if the API key is valid, false otherwise.
 */
function isValidApiKey(apiKey: string): boolean {
  return apiKey === '952930957f1b4216b5acaa3fd0b6fbbe'
}

/**
 * Fetches updated products from Sanity.
 *
 * @return {Promise<Product[]>} A promise that resolves to an array of updated products.
 */
async function fetchUpdatedProducts(): Promise<Product[]> {
  return await sanityClientRead.fetch(oramaIndexDeployUpdatedProducts)
}

/**
 * Updates the index with new products and triggers deployment.
 *
 * @param {Product[]} products - The products to update in the index.
 * @return {Promise<void>} A promise that resolves when the update and deployment are complete.
 */
async function updateAndDeployProducts(products: Product[]): Promise<void> {
  await indexManager.update(products)
  await indexManager.deploy()
}
