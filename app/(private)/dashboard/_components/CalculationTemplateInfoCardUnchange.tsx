'use client'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  label: string
  w: string
  calculationTemplate: CalculationTemplate
  color?: string
}
export default function CalculationTemplateInfoCardUnchange({
  label,
  w,
  calculationTemplate,
  color,
}: Props) {
  function formatFieldLabel(key: string): string {
    let label = key.replace(/_/g, ' ')

    label = label.replace(/([a-z])([A-Z])/g, '$1 $2')

    label = label.replace(/\b\w/g, (c) => c.toUpperCase())

    return label
  }
  const getValue = () => {
    return (
      <div className="grid grid-cols-2 gap-y-6 gap-x-2 ">
        {Object.entries(calculationTemplate)
          .filter((e) => e[0] != 'id' && e[0] != 'createdAt')
          .map((e, i) => {
            const key = e[0]
            const value = e[1]
            let finalValue
            if (typeof value == 'string') {
              finalValue = value
            } else if (typeof value == 'number') {
              finalValue = value.toString()
            } else {
              finalValue = new Intl.DateTimeFormat('pt-BR').format(
                new Date(value),
              )
            }
            return (
              <div key={i} className="text-start space-y-1">
                <Label className="text-muted-foreground">
                  {formatFieldLabel(key)}
                </Label>
                <p className="">{finalValue}</p>
              </div>
            )
          })}
        <div className="text-start space-y-1 ">
          <Label className="text-muted-foreground h-3.5" />
        </div>
      </div>
    )
  }
  return (
    <Card className={`px-5 lg:px-8 text-start gap-y-3 ${w} h-full`}>
      <div
        className={`w-full flex items-start justify-start ${color && color}`}
      >
        <h1 className="text-xl font-medium">{label}</h1>
      </div>
      <div className="">
        <div className="grid grid-cols-1">{getValue()}</div>
      </div>
    </Card>
  )
}
