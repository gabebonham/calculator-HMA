'use client'

import { Plan } from '@/app/models/plan.entity'
import { Card } from '@/components/ui/card'
import { uuid } from '@/lib/utils'
import UserPlanCard from './UserPlanCard'
import { Profile } from '@/app/models/profile.entity'
interface Props {
  plans: Plan[]
  profile: Profile
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
          owned={profile.planId == plan.id}
        />
      ))}
    </div>
  )
}
