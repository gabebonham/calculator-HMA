'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function OutputCard() {
  return (
    <div>
      <Card className="px-4 lg:px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl lg:text-lg font-bold">PROP ACCOUNT</h1>
              <Separator />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-lg lg:text-sm ">VALUE</Label>
                <Input className="h-10" />
              </div>
              <div className="flex gap-x-2 items-center ">
                <div className="w-1/2 space-y-2">
                  <Label className="text-lg  lg:text-sm ">COMISSION</Label>
                  <Input className="h-11" />
                </div>
                <div className="w-1/2 flex flex-col items-center space-y-2">
                  <Label className="text-lg lg:text-sm ">LOTS</Label>
                  <div className="bg-yellow-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-yellow-600">
                      123
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 items-center ">
                <div className="w-1/2 flex flex-col items-center space-y-2">
                  <Label className="text-lg lg:text-sm ">POINTS</Label>
                  <div className="bg-purple-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-purple-600">
                      123
                    </Label>
                  </div>
                </div>
                <div className="w-1/2 space-y-2"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-xl lg:text-lg font-bold ">REAL ACCOUNT</h1>
              <Separator />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-lg lg:text-sm ">VALUE</Label>
                <Input className="h-10" />
              </div>
              <div className="flex gap-x-2 items-center ">
                <div className="w-1/2 space-y-2">
                  <Label className="text-lg lg:text-sm">COMISSION</Label>
                  <Input className="h-11" />
                </div>
                <div className="w-1/2 flex flex-col items-center space-y-2">
                  <Label className="text-lg lg:text-sm ">LOTS</Label>
                  <div className="bg-yellow-200 border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-yellow-600">
                      123
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-2 items-center ">
                <div className="w-1/2 flex flex-col items-center space-y-2">
                  <Label className="text-lg lg:text-sm">POINTS</Label>
                  <div className="bg-purple-200  border-1 border-muted-foreground/30 rounded-md py-2 w-full flex justify-center">
                    <Label className="text-xl lg:text-lg font-bold text-purple-600">
                      123
                    </Label>
                  </div>
                </div>
                <div className="w-1/2 space-y-2"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
