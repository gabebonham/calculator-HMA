'use server'

import { db } from '@/db/db'
import { planRules } from '@/db/schema/plan-rule'
import { eq } from 'drizzle-orm'

export async function sgetRulePlans() {
  try {
    const planList = await db.select().from(planRules)
    return { success: true, data: planList }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function screateRulePlans(plan: any) {
  try {
    const [planList] = await db.insert(planRules).values(plan).returning()
    return { success: true, data: planList }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function sdeleteRulePlan(id: any) {
  try {
    await db.delete(planRules).where(eq(planRules.id, id))
    return { success: true }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function supdateRulePlans(plan: any, id: string) {
  try {
    const [planList] = await db
      .update(planRules)
      .set(plan)
      .where(eq(planRules.id, id))
      .returning()
    return { success: true, data: planList }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
