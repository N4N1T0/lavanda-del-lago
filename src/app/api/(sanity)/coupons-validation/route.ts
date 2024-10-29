/* eslint-disable @typescript-eslint/no-explicit-any */

// Types Imports
import { Coupon } from '@/types'

// Query Imports
import { sanityClientRead, sanityClientWrite } from '@sanity-studio/lib/client'
import { couponQuery } from '@sanity-studio/queries'

// Axiom Imports
import { AxiomRequest, withAxiom } from 'next-axiom'
import { NextResponse } from 'next/server'

export const POST = withAxiom(
  async (req: AxiomRequest): Promise<NextResponse> => {
    // Request Json
    const { coupon, userId } = await req.json()

    console.log('hit that')

    try {
      req.log.info('Coupon validation request received', { coupon, userId })

      const result: Coupon = await sanityClientRead.fetch(couponQuery, {
        coupon
      })

      console.log('result', result)

      // Validate if the coupon exists
      if (!result) {
        req.log.info('Coupon validation failed - invalid coupon', {
          coupon,
          userId
        })
        return NextResponse.json(
          { success: false, message: 'Cupón no válido' },
          { status: 400 }
        )
      }

      // Check if within valid date range
      const now = new Date()

      if (
        (result.validFrom && new Date(result.validFrom) > now) ||
        (result.validTo && new Date(result.validTo) < now)
      ) {
        console.log('out of date')
        req.log.info('Coupon validation failed - out of date range', {
          coupon,
          userId,
          validFrom: result.validFrom,
          validTo: result.validTo
        })
        return NextResponse.json(
          {
            success: false,
            message: 'El cupón no está dentro del rango de fechas válido'
          },
          { status: 400 }
        )
      }

      // Check if users is an array and not null
      const hasUserUsedCoupon =
        Array.isArray(result.users) &&
        result.users.some((user) => user.id === userId)

      if (hasUserUsedCoupon) {
        req.log.info('Coupon validation failed - coupon already used by user', {
          coupon,
          userId
        })
        return NextResponse.json(
          { success: false, message: 'El usuario ya ha utilizado este cupón' },
          { status: 400 }
        )
      }

      // Add user to the coupon
      await sanityClientWrite
        .patch(result._id)
        .setIfMissing({ users: [] })
        .inc({ uses: 1 })
        .append('users', [{ _ref: userId, _type: 'reference' }])
        .commit({ autoGenerateArrayKeys: true })

      req.log.info('Coupon validated successfully', {
        coupon,
        userId,
        discount: result.discount
      })
      return NextResponse.json({ success: true, discount: result.discount })
    } catch (error: any) {
      console.log(error)

      req.log.error('Error validating coupon', {
        error: error.message,
        userId,
        coupon
      })
      return NextResponse.json(
        { success: false, message: 'Error al validar el cupón', data: error },
        { status: 500 }
      )
    }
  }
)
