import DashboardAdmin from './_components/DashboardAdmin'
import DashboardUser from './_components/DashboardUser'
import Header from './_components/Header'
import LicenseSection from './_components/PlanSection'
import { getProfileByCookie, getProfiles } from '@/app/actions/profiles.actions'
import { getPlans } from '@/app/actions/plans.actions'
import { getTokenPayload } from '@/app/actions/token.actions'
import { getCalculationTemplate } from '@/app/actions/calculations.actions'
import { profileMapper, profilesMapper } from '@/app/mappers/profile.mapper'
import { plansMapper } from '@/app/mappers/plan.mapper'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'

export default async function Dashboard() {
  const profileRes = await getProfileByCookie()
  const profilesRes = await getProfiles()
  const plansRes = await getPlans()
  const payload = await getTokenPayload()
  const calculaionRes = await getCalculationTemplate()
  if (!profileRes.success)
    return (
      <div>
        Erro ao buscar perfil :{' '}
        {profileRes.error && profileRes.error.toString()}
      </div>
    )
  if (!profilesRes.success)
    return (
      <div>
        Erro ao buscar perfís :{' '}
        {profilesRes.error && profilesRes.error.toString()}
      </div>
    )
  if (!calculaionRes.success)
    return (
      <div>
        Erro ao buscar template de cálculo :{' '}
        {calculaionRes.error && calculaionRes.error}
      </div>
    )
  if (!plansRes.success)
    return (
      <div>
        Erro ao buscar planos : {plansRes.error && plansRes.error.toString()}
      </div>
    )
  if (!profileRes.data)
    return (
      <section className="h-full">
        <Header />
        <LicenseSection plans={plansMapper(plansRes.data || [])} />
      </section>
    )
  else
    return (
      <section className="">
        <Header
          profile={
            profileRes.success && (profileMapper(profileRes.data as any) as any)
          }
        />
        {payload.role == 'admin' ? (
          <DashboardAdmin
            adminProfile={
              profileRes.success &&
              (profileMapper(profileRes.data as any) as any)
            }
            profiles={
              profilesRes.success &&
              (profilesMapper(profilesRes.data as any) as any[])
            }
            calculationTemplate={calculationTemplateMapper(
              calculaionRes.data as any,
            )}
          />
        ) : (
          <DashboardUser
            plans={plansMapper(plansRes.data || [])}
            profile={profileMapper(profileRes.data) as any}
          />
        )}
      </section>
    )
}
