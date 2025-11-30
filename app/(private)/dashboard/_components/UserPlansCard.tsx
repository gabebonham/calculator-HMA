'use client'

import { Plan } from '@/app/models/plan.entity'
import UserPlanCard from './UserPlanCard'
interface Props {
  plans: Plan[]
  profile: any
  plan: string
}
export default function UserPlansCard({ plans, profile, plan }: Props) {
  return (
    <div className="space-y-4 grid grid-cols-1 lg:grid-cols-4 lg:gap-x-2">
      {plans.map((plann) => (
        <UserPlanCard
          key={plann.id}
          bgcolor={plann.bgcolor}
          color={plann.color}
          plan={plann}
          owned={plan == plann.id}
        />
      ))}
    </div>
  )
}
