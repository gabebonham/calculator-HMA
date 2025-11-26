'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function InputCard() {
  return (
    <div className="h-fit">
      <Card className="px-4 h-full">
        {/* <div className="space-y-4 lg:w-1/2"> */}
        <div className="grid grid-cols-1 lg:gap-x-4 lg:grid-cols-2">
          <div className="text-start space-y-2">
            <Label className="text-lg">Plan Code</Label>
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Step</Label>
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Stop Loss Trade</Label>
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
            <Input type="text" name="" className="h-10" />
          </div>
          <div className="text-start space-y-2">
            <Label className="text-lg">Target Profit Loss</Label>
            <Input type="text" name="" className="h-10" />
          </div>
        </div>
      </Card>
    </div>
  )
}
