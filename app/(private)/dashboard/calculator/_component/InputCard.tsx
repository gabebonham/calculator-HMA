'use client'

import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import {
  calcularHantec,
  calculateHantec2,
  HantecOutputs,
} from '@/app/services/calculation.service'
import {
  calculateHantecGemini,
  PLANOS_DATA,
} from '@/app/services/calculator-service2'
import { calculateHantecWithLookup } from '@/app/services/calculator.service'
import { calculateHantecValues } from '@/app/services/calculator2.service'
import {
  computeHantecOutputs,
  planFundedMap,
} from '@/app/services/calculator3.service'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Toggle } from '@/components/ui/toggle'
import { useState } from 'react'

export default function InputCard({
  template,
  setOutput,
}: {
  template: CalculationTemplate
  setOutput: (value: HantecOutputs | undefined) => void
}) {
  const [currentStep, setStep] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [coinPairValue, setCoinPairValue] = useState<string | undefined>()
  const coinPairs = [
    'EUR/USD',
    'GBP/USD',
    'AUD/USD',
    'NZD/USD',
    'USD/CAD',
    'USD/CHF',
    'USD/JPY',
    'EUR/GBP',
    'EUR/AUD',
    'EUR/NZD',
    'EUR/JPY',
    'EUR/CAD',
    'EUR/CHF',
    'GBP/AUD',
    'GBP/NZD',
    'GBP/JPY',
    'GBP/CAD',
    'GBP/CHF',
    'AUD/NZD',
    'AUD/JPY',
    'AUD/CAD',
    'AUD/CHF',
    'NZD/JPY',
    'NZD/CAD',
    'NZD/CHF',
    'CAD/JPY',
    'CAD/CHF',
    'CHF/JPY',
  ]
  // const plans = PLANOS_DATA.map(
  //   (pl: any) =>
  //     ({
  //       id: pl.id,
  //       valor: pl.initialBalance,
  //       ddTotalF1: pl.dd_f1,
  //       targetF1: pl.target_f1,
  //       ddDayF2: pl.dd_f2,
  //       targetF2: pl.target_f2,
  //       ddDayFAC: pl.dd_fac,
  //       targetFAC: pl.target_fac,
  //       accountType: 'sdf',
  //       broker: '0',
  //       challengeType: '0',
  //       ddDayF1: -5,
  //       leverageF1: 30,
  //       leverageF2: 30,
  //       propFirm: '0',
  //     } as PlanData),
  // ) as PlanData[]
  // Defina essa constante no mesmo arquivo ou importe-a
  const TRADE_DATA = [
    // Exemplo baseado nos dados da sua planilha (NZD/JPY)
    {
      id: '6',
      par: 'NZD/JPY',
      pipMultiplier: 100, // Coluna M da Planilha (Fator de 100 para JPY)
      fatorRisco: 0.1, // Placeholder para Coluna I (Index 6 - Fator de Risco)
      fatorAjuste: 0.05, // Placeholder para Coluna R/O (Index 15/12 - Fator de Ajuste)
      valorRetorno: 60.0, // Coluna V (Index 19 - Valor de Retorno)
      outroValorRetorno: 1.0, // Placeholder para Coluna W (Index 20)
    },
    // Exemplo para USD/JPY
    {
      id: '7',
      par: 'USD/JPY',
      pipMultiplier: 156.39,
      fatorRisco: 0.1,
      fatorAjuste: 0.05,
      valorRetorno: 60.0,
      outroValorRetorno: 1.0,
    },
    // ... ADICIONE TODOS OS OUTROS PARES AQUI COM SEUS FATORES CORRETOS ...
  ]
  const pipValue: Record<string, number> = {
    'EUR/USD': 0.0001,
    'GBP/USD': 0.0001,
    'AUD/USD': 0.0001,
    'NZD/USD': 0.0001,
    'USD/CAD': 0.0001,
    'USD/CHF': 0.0001,

    'USD/JPY': 156.39,

    'EUR/GBP': 0.0001,
    'EUR/AUD': 0.0001,
    'EUR/NZD': 0.0001,
    'EUR/JPY': 0.01,
    'EUR/CAD': 0.0001,
    'EUR/CHF': 0.0001,

    'GBP/AUD': 0.0001,
    'GBP/NZD': 0.0001,
    'GBP/JPY': 0.01,
    'GBP/CAD': 0.0001,
    'GBP/CHF': 0.0001,

    'AUD/NZD': 0.0001,
    'AUD/JPY': 0.01,
    'AUD/CAD': 0.0001,
    'AUD/CHF': 0.0001,

    'NZD/JPY': 0.01,
    'NZD/CAD': 0.0001,
    'NZD/CHF': 0.0001,

    'CAD/JPY': 0.01,
    'CAD/CHF': 0.0001,

    'CHF/JPY': 0.01,
  }

  const calculationHandler = (formData: FormData) => {
    const INP_planCode = formData.get('INP_planCode')?.toString()
    const INP_step = currentStep
    const INP_stopLossTrade = Number(formData.get('INP_stopLossTrade'))
    const INP_safeValue = Number(formData.get('INP_safeValue'))
    const INP_currentBalance = Number(formData.get('INP_currentBalance'))
    const pair = formData.get('INP_coinPairValue')?.toString()
    const INP_coinPairValue = pipValue[pair!]
    const INPPA_targetProfitLots = Number(
      formData.get('INPPA_targetProfitLots'),
    )

    if (
      INP_planCode == null ||
      INP_step == null ||
      Number.isNaN(INP_stopLossTrade) ||
      Number.isNaN(INP_safeValue) ||
      Number.isNaN(INP_currentBalance) ||
      INP_coinPairValue == null ||
      Number.isNaN(INPPA_targetProfitLots)
    ) {
      setError('Campos faltando')
      return
    }

    setError(undefined)

    const output = calculateHantecValues({
      INP_planCode: Number(INP_planCode),
      INP_step: INP_step as any,
      INP_coinPairValue: 156.39,
      INP_stopLossTrade: INP_stopLossTrade,
      INP_E17_RiskRatio: 0.01,
      INP_J9_LotSize: INP_currentBalance,
      INP_lotValueBaseline: INPPA_targetProfitLots,
      INP_F14: INP_stopLossTrade,
    })

    if (output) setOutput(output)
    else setError('Erro ao calcular')
  }

  return (
    <div className="h-fit">
      <Card className="px-4 h-full border-amber-500 border-2">
        {/* <div className="space-y-4 lg:w-1/2"> */}
        <form
          id="calc-form"
          className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-2"
          action={calculationHandler}
        >
          <div className="text-start space-y-2">
            <Label className="text-lg">Plan Code</Label>
            <Input type="text" name="INP_planCode" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Step</Label>
            <ButtonGroup>
              <Toggle
                variant={'outline'}
                pressed={currentStep == '1'}
                onPressedChange={() => setStep('1')}
                className="cursor-pointer"
              >
                1
              </Toggle>
              <Toggle
                variant={'outline'}
                pressed={currentStep == '2'}
                onPressedChange={() => setStep('2')}
                className="cursor-pointer"
              >
                2
              </Toggle>
              <Toggle
                variant={'outline'}
                pressed={currentStep == 'f1'}
                onPressedChange={() => setStep('f1')}
                className="cursor-pointer"
              >
                F1
              </Toggle>
            </ButtonGroup>
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Stop Loss Trade %</Label>
            <Input type="number" name="INP_stopLossTrade" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Safe Value</Label>
            <Input type="number" name="INP_safeValue" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Current Balance</Label>
            <Input type="number" name="INP_currentBalance" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Coin Pair</Label>
            <Select onValueChange={setCoinPairValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {coinPairs.map((cp) => (
                  <SelectItem key={cp} value={cp}>
                    {cp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="INP_coinPairValue"
              value={coinPairValue ?? ''}
            />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Lot</Label>
            <Input
              type="number"
              name="INPPA_targetProfitLots"
              className="h-10"
            />
          </div>
          <div>
            <p className="text-red-600">{error && error}</p>
          </div>
        </form>
      </Card>
    </div>
  )
}
