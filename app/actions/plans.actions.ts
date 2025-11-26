'use service'

import { planListMock } from '../mocks/plan.mocks'

export async function getPlans() {
  try {
    return { success: true, data: planListMock }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getPlanById(id: string) {
  try {
    const targetPlan = planListMock.find((plan) => plan.id == id)
    if (!targetPlan) return { success: false, error: Error('Plan not found') }
    else return { success: true, data: planListMock }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
