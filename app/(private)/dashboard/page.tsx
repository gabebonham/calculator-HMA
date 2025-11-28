import Header from './_components/Header'
import LicenseSection from './_components/PlanSection'
import { getProfileByUserId, getProfiles } from '@/app/actions/profiles.actions'
import { getPlans } from '@/app/actions/plans.actions'
import { getTokenPayload } from '@/app/actions/token.actions'
import { getCalculationTemplate } from '@/app/actions/calculations.actions'
import { profileMapper, profilesMapper } from '@/app/mappers/profile.mapper'
import { plansMapper } from '@/app/mappers/plan.mapper'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { decodeToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import DashboardWraper from './_components/DashboardWraper'
import { calculationsMapper } from '@/app/mappers/calculation.mapper'
import { Providers } from '@/app/providers/Providers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const profilesRes = await getProfiles()
  const plansRes = await getPlans()
  const calculaionRes = await getCalculationTemplate()

  if (!plansRes.success)
    return (
      <div>
        Erro ao buscar planos : {plansRes.error && plansRes.error.toString()}
      </div>
    )

  return (
    <Providers>
      <DashboardWraper
        calculations={
          calculaionRes.data &&
          (calculationTemplateMapper(calculaionRes.data) as any)
        }
        plans={plansRes.data && (plansMapper(plansRes.data as any) as any)}
        profiles={profilesRes.data && (profilesMapper(profilesRes.data) as any)}
      />
    </Providers>
  )
}
