import { Plan } from '../models/plan.entity'
export const uuid = () =>
  crypto.randomUUID() as `${string}-${string}-${string}-${string}-${string}`

const basicPlanMock = new Plan(
  uuid(),
  'Basic',
  'sadfasdfsadfasdf asdf asdf asdfasdfsadfasd fsadfasdfasd fas fasdfsadfasdf asdf sadfsd.',
  'monthly',
  'text-blue-500',
  'bg-blue-200',
  23.12,
  new Date(),
)
const standardPlanMock = new Plan(
  uuid(),
  'Standard',
  'asdfas dfasfdasdf aefadsfasdf asdfasdfasdfasdf asdf adsfasdf fdasdf asdfasdfasfas  fsadfas.',
  'semiannual',
  'text-yellow-500',
  'bg-yellow-200',
  52.59,
  new Date(),
)
const premiumPlanMock = new Plan(
  uuid(),
  'Premium',
  'asd fasdfasdfasdasdf sad fasdfasdfsadfas dfasdfasdfasd fasdfasdfasdfasdf asdf asdfasdfs',
  'yearly',
  'text-amber-500',
  'bg-amber-200',
  140.1,
  new Date(),
)
const ultimatePlanMock = new Plan(
  uuid(),
  'Ultimate',
  'asdfasdfasd fasfasdfasdf asdfas dfasfdasdf adsfasdfasfasdfas fdasdf asdfasdfasfas dfas fsadfas.',
  'lifetime',
  'text-orange-500',
  'bg-orange-200',
  210.26,
  new Date(),
)
const planListMock = [
  basicPlanMock,
  standardPlanMock,
  premiumPlanMock,
  ultimatePlanMock,
]
export {
  basicPlanMock,
  standardPlanMock,
  premiumPlanMock,
  ultimatePlanMock,
  planListMock,
}
