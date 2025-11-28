'use server'

import { db } from '@/db/db'
import { plans, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getPlanByProfileId(id: string) {
  try {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id))
    if (plan) return { success: true, data: plan }
    else return { success: false, error: Error('Plan not found') }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}

export async function sgetPlans() {
  try {
    const planList = await db.select().from(plans)
    return { success: true, data: planList }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
