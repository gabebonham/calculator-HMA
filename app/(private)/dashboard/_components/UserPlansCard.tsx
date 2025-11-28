'use client'

import { Plan } from '@/app/models/plan.entity'
import UserPlanCard from './UserPlanCard'
interface Props {
  plans: Plan[]
  profile: any
}
export default function UserPlansCard({ plans, profile }: Props) {
  return (
    <div className="space-y-4 grid grid-cols-1 lg:grid-cols-4 lg:gap-x-2">
      {plans.map((plan) => (
        <UserPlanCard
          key={plan.id}
          bgcolor={plan.bgcolor}
          color={plan.color}
          plan={plan}
          owned={profile?.plan == plan.id}
        />
      ))}
    </div>
  )
}
