import Header from './_components/Header'
import LicenseSection from './_components/PlanSection'
import {
  getProfileById,
  getProfileByUserId,
  getProfiles,
} from '@/app/actions/profiles.actions'
import { getPlans } from '@/app/actions/plans.actions'
import { getTokenPayload } from '@/app/actions/token.actions'
import {
  getCalculationsByProfileId,
  getCalculationTemplate,
} from '@/app/actions/calculations.actions'
import { profileMapper, profilesMapper } from '@/app/mappers/profile.mapper'
import { plansMapper } from '@/app/mappers/plan.mapper'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { decodeToken } from '@/lib/jwt'
import { cookies } from 'next/headers'
import DashboardWraper from './_components/DashboardWraper'
import {
  calculationMapper,
  calculationsMapper,
} from '@/app/mappers/calculation.mapper'
import { Providers } from '@/app/providers/Providers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { getPlanRules } from '@/app/actions/plan-rules.actions'
import { planRulesMapper } from '@/app/mappers/plan-rules.mapper'
import { getUserById } from '@/app/actions/users.actions'
import { userMapper } from '@/app/mappers/user.mapper'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const profilesRes = await getProfiles()
  const plansRes = await getPlans()
  const planRulesRes = await getPlanRules()
  const calculaionRes = await getCalculationTemplate()

  const profileRes = await getProfileById(session?.user.profileId as string)
  const userRes = await getUserById(session?.user.id as string)
  const calculations = await getCalculationsByProfileId(
    profileRes.data?.id as string,
  )
  return (
    <Providers>
      <DashboardWraper
        profile={userRes.data && userMapper(userRes.data as any)}
        planRules={
          planRulesRes.data && (planRulesMapper(planRulesRes.data) as any)
        }
        calculations={
          calculaionRes.data &&
          (calculationTemplateMapper(calculaionRes.data as any) as any)
        }
        calculationActRes={
          calculations.data && calculationsMapper(calculations.data as any)
        }
        plans={plansRes.data && (plansMapper(plansRes.data as any) as any)}
        profiles={
          profilesRes.data && (profilesMapper(profilesRes.data as any) as any)
        }
      />
    </Providers>
  )
}
