'use client'

import { Plan } from '@/app/models/plan.entity'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
interface Props {
  plan: Plan
  color: string
  bgcolor: string
}
type Period = 'monthly' | 'semiannual' | 'yearly' | 'lifetime'
export default function PlanCard({ plan, color, bgcolor }: Props) {
  const mapPeriod = (period: Period) => {
    if (period == 'monthly') return 'mês'
    else if (period == 'semiannual') return 'semestre'
    else if (period == 'yearly') return 'ano'
    else if (period == 'lifetime') return 'Vitalício'
    else return 'NDA'
  }
  return (
    <div className="">
      <Card className="px-6 bg-[#1F2937] text-white/90 border-muted-foreground">
        <div className={`${color}`}>
          <h1 className="text-xl font-bold">{plan.name}</h1>
        </div>
        <div className="flex items-end">
          <h1 className="text-3xl font-bold">R${plan.price.toString()} </h1>
          <p className="text-white/80"> / {mapPeriod(plan.period)}</p>
        </div>
        <div className="text-justify">{plan.description}</div>
        <div>
          <Button
            className={`w-full font-bold h-12 text-lg hover:bg-white hover:text-[#1F2937]  ${bgcolor} ${color}`}
          >
            Escolher Plano
          </Button>
        </div>
      </Card>
    </div>
  )
}
