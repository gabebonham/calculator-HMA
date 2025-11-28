'use client'

import { Plan } from '@/app/models/plan.entity'
import { Profile } from '@/app/models/profile.entity'
import Header from './Header'
import DashboardAdmin from './DashboardAdmin'
import DashboardUser from './DashboardUser'
import { plansMapper } from '@/app/mappers/plan.mapper'
import { profileMapper, profilesMapper } from '@/app/mappers/profile.mapper'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { useSession } from 'next-auth/react'
import { Calculation } from '@/app/models/calculation.entity'
import PlanSection from './PlanSection'
import { auth } from '@/auth'

interface Props {
  plans: any[]
  profiles: any[]
  calculations: any[]
}
export default function DashboardWraper({
  plans,
  profiles,
  calculations,
}: Props) {
  const { data, status } = useSession()
  const profile = {
    email: data?.user.email as string,
    name: data?.user.name as string,
    role: data?.user.role as string,
    id: data?.user.id as string,
  }
  if (profile.role == 'user')
    return (
      <section className="h-full">
        <Header />
        <PlanSection plans={plansMapper(plans || [])} />
      </section>
    )
  return (
    <section className="">
      <Header
        profile={{
          email: profile.email as string,
          name: profile.name as string,
          role: profile.role as string,
          id: profile.id as string,
        }}
      />
      {profile?.role == 'admin' ? (
        <DashboardAdmin
          adminProfile={profile}
          profiles={profilesMapper(profiles as any) as any[]}
          calculationTemplate={calculationTemplateMapper(calculations as any)}
        />
      ) : (
        <DashboardUser plans={plansMapper(plans || [])} profile={profile} />
      )}
    </section>
  )
}
