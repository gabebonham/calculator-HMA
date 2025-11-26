import { uuid } from '@/lib/utils'
import Header from '../_components/Header'
import CalculatePageComponent from './_component/CalculatePage'
import { getProfileByCookie } from '@/app/actions/profiles.actions'
import { profileMapper } from '@/app/mappers/profile.mapper'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { getCalculationTemplate } from '@/app/actions/calculations.actions'
import { calculationMapper } from '@/app/mappers/calculation.mapper'
export default async function CalculatePage() {
  const profileRes = await getProfileByCookie()
  const calculationRes = await getCalculationTemplate()
  return (
    <section>
      <Header
        profile={
          profileRes.success && (profileMapper(profileRes.data as any) as any)
        }
      />
      <CalculatePageComponent
        calculationTemplate={
          calculationRes.success &&
          (calculationMapper(calculationRes.data as any) as any)
        }
      />
    </section>
  )
}
