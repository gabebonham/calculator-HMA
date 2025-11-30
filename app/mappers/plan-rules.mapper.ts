export function planRuleMapper(plan: any) {
  if (!plan) return undefined
  return {
    id: plan.id,
    pair: plan.pair,
    price: plan.price,
    refer: plan.refer,
    calc: plan.calc,
    pipFactor: plan.pipFactor,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
  }
}
export function planRulesMapper(plans: any[]) {
  if (!plans) return []
  return plans.map(planRuleMapper)
}
