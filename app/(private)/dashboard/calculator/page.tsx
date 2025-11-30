import {
  getCalculationsByProfileId,
  getCalculationTemplate,
} from '@/app/actions/calculations.actions'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { Providers } from '@/app/providers/Providers'
import { getServerSession } from 'next-auth'
import CalculatorWrapper from '../_components/CalculatorWrapper'
import { getCoins } from '@/app/services/integration.service'
import { getPlanRules } from '@/app/actions/plan-rules.actions'
import { planRulesMapper } from '@/app/mappers/plan-rules.mapper'
import { getProfileByUserId } from '@/app/actions/profiles.actions'
export default async function CalculatePage() {
  const session = await getServerSession()
  const calculationRes = await getCalculationTemplate()

  const coinsRes = await getCoins()
  const planRulesRes = await getPlanRules()
  const id = session?.user.profileId!
  return (
    <Providers>
      <CalculatorWrapper
        profileId={id}
        planRules={
          planRulesRes.data && (planRulesMapper(planRulesRes.data) as any)
        }
        calculationTemplate={
          calculationRes.data &&
          calculationTemplateMapper(calculationRes.data as any)
        }
        coins={(coinsRes.data && coinsRes.data) || []}
      />
    </Providers>
  )
}
