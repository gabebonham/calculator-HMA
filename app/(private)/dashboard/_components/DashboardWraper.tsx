'use client'

import { Plan } from '@/app/models/plan.entity'
import { Profile } from '@/app/models/profile.entity'
import Header from './Header'
import DashboardAdmin from './DashboardAdmin'
import DashboardUser from './DashboardUser'
import { plansMapper } from '@/app/mappers/plan.mapper'
import { profileMapper, profilesMapper } from '@/app/mappers/profile.mapper'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Calculation } from '@/app/models/calculation.entity'
import PlanSection from './PlanSection'
import LoadingScreen from '@/components/shared/Loading'

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
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  const profile = {
    email: session?.user.email as string,
    name: session?.user.name as string,
    role: session?.user.role as string,
    plan: session?.user.plan,
    id: session?.user.id as string,
  }
  console.log(profile)
  if (!profile.plan)
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
      {profile.role == 'admin' ? (
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
