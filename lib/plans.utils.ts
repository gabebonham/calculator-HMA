import { Plan } from '@/app/models/plan.entity'

export const getPlainPlans = (plans: Plan[]) => {
  return plans.map(getPlainPlan)
}
export const getPlainPlan = (plan: Plan) => {
  return {
    id: plan.id,
    createdAt: plan.createdAt,
    description: plan.description,
    name: plan.name,
    period: plan.period,
    price: plan.price,
  }
}
