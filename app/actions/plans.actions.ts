'use service'

import { planListMock } from '../mocks/plan.mocks'
import { sgetPlans } from '../services/plans.service'

export async function getPlans() {
  try {
    const planList = await sgetPlans()
    if (!planList.success) return { success: false, error: planList.error }
    return { success: true, data: planList.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
