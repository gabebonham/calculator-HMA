import { getCalculationTemplate } from '@/app/actions/calculations.actions'
import { calculationTemplateMapper } from '@/app/mappers/calculation-template.mapper'
import { Providers } from '@/app/providers/Providers'
import { getServerSession } from 'next-auth'
import CalculatorWrapper from '../_components/CalculatorWrapper'
export default async function CalculatePage() {
  const session = await getServerSession()
  const calculationRes = await getCalculationTemplate()
  return (
    <Providers>
      <CalculatorWrapper
        calculationTemplate={
          calculationRes.data && calculationTemplateMapper(calculationRes.data)
        }
      />
    </Providers>
  )
}
