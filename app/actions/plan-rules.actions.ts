'use service'

import { planListMock } from '../mocks/plan.mocks'
import {
  screateRulePlans,
  sdeleteRulePlan,
  sgetRulePlans,
  supdateRulePlans,
} from '../services/plan-rules.service'
import { sgetPlans } from '../services/plans.service'

export async function getPlanRules() {
  try {
    const planList = await sgetRulePlans()
    if (!planList.success) return { success: false, error: planList.error }
    return { success: true, data: planList.data }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function getPlanRuleById(id: string) {
  try {
    const targetPlan = planListMock.find((plan) => plan.id == id)
    if (!targetPlan) return { success: false, error: Error('Plan not found') }
    else return { success: true, data: planListMock }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function deletePlanRule(id: string) {
  try {
    const targetPlan = planListMock.find((plan) => plan.id == id)
    if (!targetPlan) return { success: false, error: Error('Plan not found') }
    else return { success: true, data: planListMock }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function updatePlanRule(id: string) {
  try {
    const targetPlan = planListMock.find((plan) => plan.id == id)
    if (!targetPlan) return { success: false, error: Error('Plan not found') }
    else return { success: true, data: planListMock }
  } catch (e: any) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function createRulePlans(plan: any) {
  try {
    const res = await screateRulePlans(plan)
    return { success: res.success, data: res.data, error: res.error }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function deleteRulePlan(id: any) {
  try {
    const success = await sdeleteRulePlan(id)
    return { success }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
export async function updateRulePlans(plan: any, id: string) {
  try {
    const res = await supdateRulePlans(plan, id)
    return { success: res.success, error: res.error, data: res.data }
  } catch (e) {
    console.log(e)
    return { success: false, error: e }
  }
}
