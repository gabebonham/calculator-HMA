'use server'
import { getPlans } from '@/app/actions/plans.actions'
import {
  createProfile,
  getProfileByUserId,
  updatePlan,
} from '@/app/actions/profiles.actions'
import { findUserByEmail } from '@/app/services/users.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const rawBody = await req.text()
  const headers = Object.fromEntries(req.headers.entries())

  console.log('LastLink Webhook', rawBody)

  const signature = headers['x-lastlink-signature']

  // If LastLink requires signature verification
  // if (!verifySignature(rawBody, signature, process.env.LASTLINK_WEBHOOK_SECRET!)) {
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  // }

  let body
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  if (body.Event == 'Purchase_Order_Confirmed') {
    const product = body.Data.Products[0]
    const userEmail = body.Data.Buyer.Email
    const plans = await getPlans()
    const user = await findUserByEmail(userEmail)
    const profile = await getProfileByUserId(user.data?.id as string)
    if (!plans.success) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }
    const plan = plans.data?.find((pl: any) => pl.name == product.Name)
    if (profile.success) {
      const updateRes = await updatePlan(
        user.data?.id as string,
        plan?.id as string,
      )
      if (updateRes.success) {
        return NextResponse.json({ ok: false }, { status: 400 })
      } else {
        console.log(profile.error)
        await createProfile(
          user.data?.email as string,
          user.data?.username as string,
          plan?.id as string,
          user.data?.id as string,
        )
      }
    }
    return NextResponse.json({ ok: true }, { status: 200 })
  }
}
