'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function OutputCard() {
  return (
    <div className="h-full">
      <Card className="px-4 lg:px-6 border-purple-500 border-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl lg:text-lg font-bold">PROP ACCOUNT</h1>
              <Separator />
            </div>
            <div className="space-y-4 ">
              <div className="flex gap-x-2 items-center w-full ">
                <div className=" flex flex-col items-center space-y-2 w-full ">
                  <Label className="text-lg lg:text-sm ">
                    POINTS TARGET PROFIT
                  </Label>
                  <div className="bg-purple-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-purple-600">
                      123
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-x-2 items-center w-full ">
                <div className=" flex flex-col items-center space-y-2 w-full ">
                  <Label className="text-lg lg:text-sm ">
                    POINTS STOP LOSS
                  </Label>
                  <div className="bg-purple-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-purple-600">
                      123
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl lg:text-lg font-bold">REAL ACCOUNT</h1>
              <Separator />
            </div>
            <div className="space-y-4">
              <div className="flex gap-x-2 items-center w-full  ">
                <div className=" flex flex-col items-center space-y-2 w-full ">
                  <Label className="text-lg lg:text-sm ">LOT</Label>
                  <div className="bg-purple-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-purple-600">
                      123
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
