'use client'

import { Profile } from '@/app/models/profile.entity'
import { Button } from '@/components/ui/button'
import CalculationsTable from './CalculationsTable'
import { Calculation } from '@/app/models/calculation.entity'
import { uuid } from '@/lib/utils'
import Link from 'next/link'
import UserLicensesCard from './UserPlansCard'
import { Plan } from '@/app/models/plan.entity'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
function mockCalculation(): Calculation {
  return new Calculation(
    uuid() as any,
    uuid() as any,
    Math.floor(Math.random() * 5) + 1, // INP_planCode
    Math.floor(Math.random() * 3) + 1, // INP_step
    Number((Math.random() * 50).toFixed(2)), // INP_stopLossTrade
    Number((Math.random() * 100).toFixed(2)), // INP_safeValue
    Number((Math.random() * 10000).toFixed(2)), // INP_currentBalance
    Number((Math.random() * 10).toFixed(4)), // INP_coinPairValue
    Number((Math.random() * 0.5).toFixed(2)), // INPPA_targetProfitLots
    Math.floor(Math.random() * 100), // OUTPA_targetProfitPoints
    Math.floor(Math.random() * 200), // OUTPA_stopLossPoints
    Number((Math.random() * 0.5).toFixed(2)), // OUTRA_stopLossLots
    new Date(),
    undefined,
  )
}

export const calculationsMock = Array.from({ length: 10 }, () =>
  mockCalculation(),
)
interface Props {
  profile: Profile
  plans: Plan[]
}
export default function DashboardUser({ profile, plans }: Props) {
  const calculations = calculationsMock
  return (
    <section className="px-4 py-8 lg:px-8 space-y-6">
      <div className="lg:flex lg:items-center lg:justify-between space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl ">Dashboard</h1>
            <h1 className="text-muted-foreground ">
              Administre seus cálculos e planos por aqui!
            </h1>
          </div>
          <div>
            <Link href={'/dashboard/calculator'}>
              <Button className="font-bold">Iniciar Novo Calculo</Button>
            </Link>
          </div>
        </div>
        <Card className="px-4  lg:space-y-2">
          <div className="flex items-center space-x-2">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input placeholder={profile.name} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder={profile.email} />
            </div>
          </div>
          <div>
            <Button className="w-full">Editar</Button>
          </div>
        </Card>
      </div>
      <div className="flex lg:flex-row flex-col gap-y-4 items-center gap-x-4">
        <div className="lg:w-full">
          <UserLicensesCard plans={plans} profile={profile} />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-xl">Seus Calculos Recentes</h1>
        </div>
        <div>
          <CalculationsTable calculations={calculations} />
        </div>
      </div>
    </section>
  )
}
