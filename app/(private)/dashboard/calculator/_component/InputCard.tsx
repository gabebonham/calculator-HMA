'use client'

import { createCalculation } from '@/app/actions/calculations.actions'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import {
  excelForexCalc,
  HantecOutputs,
} from '@/app/services/calculator.service'

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
import { toast } from 'sonner'

export default function InputCard({
  template,
  coinPairs,
  setOutput,
  planRules,
  profileId,
}: {
  template: CalculationTemplate
  coinPairs: any[]
  setOutput: (value: HantecOutputs | undefined) => void
  planRules: any[]
  profileId: string
}) {
  const [currentStep, setStep] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()
  const [coinPairValue, setCoinPairValue] = useState<string | undefined>()

  const calculationHandler = async (formData: FormData) => {
    const INP_planCode = formData.get('INP_planCode')?.toString()
    const INP_step = currentStep
    const INP_stopLossTrade = Number(formData.get('INP_stopLossTrade'))
    const INP_safeValue = Number(formData.get('INP_safeValue'))
    const INP_currentBalance = Number(formData.get('INP_currentBalance'))
    const INP_coinPairValue = formData.get('INP_coinPairValue')?.toString()
    const INPPA_targetProfitLots = Number(
      formData.get('INPPA_targetProfitLots'),
    )
    const targetTicker = coinPairs.find(
      (pair: any) => pair.ticker == INP_coinPairValue,
    )
    if (!targetTicker) {
      setError('Par Moeda Não Encontrado')
      return
    }
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
    const output = await excelForexCalc(
      {
        INP_planCode,
        INP_step,
        INP_stopLossTrade,
        INP_safeValue,
        INP_currentBalance,
        INP_coinPair: INP_coinPairValue,
        INPPA_targetProfitLots,
      },
      template,
      targetTicker.price,
      planRules,
    )
    const res = await createCalculation(
      {
        INP_planCode,
        INP_step,
        INP_stopLossTrade,
        INP_safeValue,
        INP_currentBalance,
        INP_coinPair: INP_coinPairValue,
        INPPA_targetProfitLots,
      },
      output,
      profileId,
      targetTicker.price,
    )
    if (output && res.success) {
      setOutput(output)
      toast('Cálculo salvo!')
    } else setError('Erro ao calcular')
  }

  return (
    <div className="h-fit">
      <Card className="px-4  border-amber-500 border-2 h-fit">
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
                {coinPairs
                  .filter((cp: any) => cp.ticker)
                  .map((cp) => (
                    <SelectItem key={cp.ticker} value={cp.ticker}>
                      {cp.ticker}
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
