'use client'

import { Plan } from '@/app/models/plan.entity'
import LicenseCard from './PlanCard'
import { uuid } from '@/lib/utils'
import { getPlainPlans } from '@/lib/plans.utils'
import { plansMapper } from '@/app/mappers/plan.mapper'
interface Props {
  plans: Plan[]
}
export default function PlanSection({ plans }: Props) {
  const getColor = (plan: any) => {
    if (plan.name == 'Basic') return 'text-blue-500'
    else if (plan.name == 'Standard') return 'text-yellow-500'
    else if (plan.name == 'Premium') return 'text-amber-500'
    else if (plan.name == 'Ultimate') return 'text-orange-500'
    else return 'NDA'
  }
  const getBgColor = (plan: any) => {
    if (plan.name == 'Basic') return 'bg-blue-200'
    else if (plan.name == 'Standard') return 'bg-yellow-200'
    else if (plan.name == 'Premium') return 'bg-amber-200'
    else if (plan.name == 'Ultimate') return 'bg-orange-200'
    else return 'NDA'
  }
  return (
    <section className="py-8 lg:px-12 px-4 bg-[#121826] space-y-4 min-h-screen">
      <div className="text-center space-y-4 px-8">
        <h1 className="text-3xl font-bold text-white">Selecione Seu Plano</h1>
        <p className="text-white/80">
          Bem vindo(a)! Escolha um plano abaixo pra ganhar acesso ao dashboard e
          ferramentas exclusivas.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-y-4">
        {plansMapper(plans).map((plan) => (
          <LicenseCard
            bgcolor={`${plan.bgcolor}`}
            color={`${plan.color}`}
            plan={plan}
          />
        ))}
      </div>
    </section>
  )
}
