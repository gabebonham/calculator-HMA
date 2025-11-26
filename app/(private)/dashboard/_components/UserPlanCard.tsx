'use client'

import { Plan } from '@/app/models/plan.entity'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Check, CheckCircle } from 'lucide-react'
interface Props {
  plan: Plan
  color: string
  bgcolor: string
  owned: boolean
}
type Period = 'monthly' | 'semiannual' | 'yearly' | 'lifetime'
export default function UserPlanCard({ plan, color, bgcolor, owned }: Props) {
  const mapPeriod = (period: Period) => {
    if (period == 'monthly') return 'mês'
    else if (period == 'semiannual') return 'semestre'
    else if (period == 'yearly') return 'ano'
    else if (period == 'lifetime') return 'Vitalício'
    else return 'NDA'
  }
  return (
    <div className="">
      <Card
        className={`${
          owned
            ? 'border-4 !border-primary bg-transparent text-primary'
            : 'bg-[#1F2937] text-white/90'
        } px-6  border-muted-foreground rounded-2xl`}
      >
        <div
          className={`${
            owned ? 'text-primary' : color
          } flex justify-between items-center`}
        >
          <h1 className="text-xl font-bold">{plan.name}</h1>
          <div>{owned ? <CheckCircle /> : ''}</div>
        </div>
        <div className="flex items-end">
          <h1 className="text-3xl font-bold">R${plan.price.toString()} </h1>
          <p className={`${owned ? 'text-primary/80' : 'text-white/80'}`}>
            {' '}
            / {mapPeriod(plan.period)}
          </p>
        </div>
        <ScrollArea className="min-h-28">
          <div className="text-justify text-sm">{plan.description}</div>
        </ScrollArea>
        <div>
          <Button
            disabled={owned}
            className={`w-full font-bold hover:bg-white hover:text-[#1F2937] h-12 text-lg ${
              owned ? '' : bgcolor
            } ${owned ? '' : color}`}
          >
            {owned ? 'Plano Selecionado' : 'Escolher Plano'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
