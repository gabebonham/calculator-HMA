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
  planRules: any[]
  calculationActRes: any
  profile: any
}
export default function DashboardWraper({
  plans,
  profiles,
  calculations,
  planRules,
  calculationActRes,
  profile,
}: Props) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingScreen />
  }

  const profilee = {
    email: session?.user.email as string,
    name: session?.user.name as string,
    role: session?.user.role as string,
    plan: session?.user.plan,
    id: session?.user.id as string,
  }
  if (!profilee?.plan)
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
          name: profile.username as string,
          role: profilee.role as string,
          id: profile.id as string,
        }}
      />
      {profilee.role == 'admin' ? (
        <DashboardAdmin
          plans={plansMapper(plans || [])}
          adminUser={profile}
          planRules={planRules}
          adminProfile={profile}
          profiles={profilesMapper(profiles as any) as any[]}
          calculationTemplate={calculationTemplateMapper(calculations as any)}
        />
      ) : (
        <DashboardUser
          user={profile}
          calculationActRes={calculationActRes}
          calculations={calculations}
          plans={plansMapper(plans || [])}
          profile={profile}
          plan={profilee.plan}
        />
      )}
    </section>
  )
}
