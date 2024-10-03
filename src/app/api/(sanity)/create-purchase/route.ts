// Queries Imports
import { sanityClientWrite } from '@sanity-studio/lib/client'
import { Purchase } from '@/types/sanity'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { orderId, totalAmount, reseller, products, userId } =
      await req.json()

    if (!orderId || !totalAmount || !reseller || !products || !userId) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      })
    }

    const response = await sanityClientWrite.createIfNotExists<Purchase>({
      _type: 'purchase',
      _id: orderId,
      purchaseDate: new Date().toISOString(),
      userEmail: {
        _ref: userId,
        _type: 'reference'
      },
      totalAmount: Number(totalAmount),
      status: 'pendiente',
      reseller,
      paymentMethod: 'tarjeta_credito',
      products,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      _rev: orderId
    })

    return NextResponse.json({
      success: true,
      message: 'Purchase created successfully',
      data: response
    })
  } catch (error) {
    console.error('Error creating purchase:', error)
    return NextResponse.json({
      success: false,
      message: 'Error creating purchase',
      data: error
    })
  }
}
