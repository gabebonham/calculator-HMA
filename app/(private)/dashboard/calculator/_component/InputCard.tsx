'use client'

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

export default function InputCard() {
  const [currentStep, setStep] = useState<string | undefined>()
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
  return (
    <div className="h-fit">
      <Card className="px-4 h-full border-amber-500 border-2">
        {/* <div className="space-y-4 lg:w-1/2"> */}
        <div className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-2">
          <div className="text-start space-y-2">
            <Label className="text-lg">Plan Code</Label>
            <Input type="text" name="" className="h-10" />
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
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Safe Value</Label>
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Current Balance</Label>
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Coin Pair</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {coinPairs.map((cp) => (
                  <SelectItem value={cp}>{cp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Lot</Label>
            <Input type="text" name="" className="h-10" />
          </div>
        </div>
      </Card>
    </div>
  )
}
