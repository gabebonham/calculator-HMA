'use client'

import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import InputCard from './InputCard'
import OutputCard from './OutputCard'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CalculationTemplateInfoCardUnchange from '../../_components/CalculationTemplateInfoCardUnchange'
import { useState } from 'react'
import { HantecOutputs } from '@/app/services/calculation.service'
interface Props {
  calculationTemplate: any
}

export default function CalculatePageComponent({ calculationTemplate }: Props) {
  const [output, setOutput] = useState<HantecOutputs | undefined>()
  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      <div>
        <Link href={'/dashboard'}>
          <Button className="flex items-center gap-x-2">
            <ArrowLeft className="size-5" />
            Dashboard
          </Button>
        </Link>
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Calculator HMA</h1>
        <p className="text-muted-foreground">
          Informe os parâmetros de seu trade para calcular os detalhes.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-4">
        <div className="h-full space-y-4">
          <div>
            <InputCard setOutput={setOutput} template={calculationTemplate} />
          </div>
          <div className="hidden lg:block">
            <OutputCard output={output} />
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
        <Button form="calc-form" className="text-xl h-12 w-full">
          Calculate
        </Button>
      </div>
      <div className="lg:hidden">
        <OutputCard output={output} />
      </div>
    </div>
  )
}
