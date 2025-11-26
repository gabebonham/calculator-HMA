'use client'

import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import CalculationTemplateInfoCard from '../../_components/CalculationTemplateInfoCard'
import InputCard from './InputCard'
import OutputCard from './OutputCard'
import { uuid } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CalculationTemplateInfoCardUnchange from '../../_components/CalculationTemplateInfoCardUnchange'
interface Props {
  calculationTemplate: CalculationTemplate
}
export default function CalculatePageComponent({ calculationTemplate }: Props) {
  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div>
        <Link href={'/dashboard'}>
          <Button>
            <ArrowLeft />
            Dashboard
          </Button>
        </Link>
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Calculadora Forex</h1>
        <p className="text-muted-foreground">
          Informe os parâmetros de seu trade para calcular os detalhes.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4">
        <div className="h-full space-y-4">
          <div>
            <InputCard />
          </div>
          <div className="hidden lg:block">
            <OutputCard />
          </div>
        </div>
        <div className="h-full">
          <CalculationTemplateInfoCardUnchange
            calculationTemplate={calculationTemplate}
            label="Calculation Template"
            w="w-full"
          />
        </div>
      </div>
      <div>
        <Button className="text-xl h-12 w-full">Calculate</Button>
      </div>
      <div className="lg:hidden">
        <OutputCard />
      </div>
    </div>
  )
}
