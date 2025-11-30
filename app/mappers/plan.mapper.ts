import { Plan } from '../models/plan.entity'

export function planMapper(plan: any) {
  if (!plan) return undefined
  return {
    id: plan.id,
    name: plan.name,
    description: plan.description,
    period: plan.period,
    price: plan.price,
    bgcolor: plan.bgcolor,
    color: plan.color,
    createdAt: plan.createdAt,
  }
}
export function plansMapper(plans: any[]) {
  if (!plans) return []
  return plans.map(planMapper)
}
