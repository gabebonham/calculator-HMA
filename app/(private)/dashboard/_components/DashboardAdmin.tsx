'use client'

import InfoCard from './InfoCard'
import {
  Award,
  Badge,
  Diamond,
  Gem,
  Medal,
  Rocket,
  Shield,
  Star,
  Users,
} from 'lucide-react'
import ProfilesTable from './ProfilesTable'
import { id } from 'zod/v4/locales'
import CalculationTemplateInfoCard from './CalculationTemplateInfoCard'
import { CalculationTemplate } from '@/app/models/calculation-template.entity'
import { Profile } from '@/app/models/profile.entity'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PlanRulesTable from './PlanRulesTable'
import { updateUser } from '@/app/actions/users.actions'
import { useState } from 'react'
import { profile } from 'console'
interface Props {
  calculationTemplate: any
  profiles: any[]
  adminProfile: any
  planRules: any
  adminUser: any
  plans: any
}
export default function DashboardAdmin({
  calculationTemplate,
  profiles,
  adminProfile,
  planRules,
  adminUser,
  plans,
}: Props) {
  const [name, setName] = useState<string>(adminProfile.username)
  const [email, setEmail] = useState<string>(adminProfile.email)
  const updateHanlder = async (formData: FormData) => {
    if (formData.get('name') || formData.get('email')) {
      const res = await updateUser(
        adminUser.id,
        (formData.get('email') as string) || email,
        (formData.get('name') as string) || name,
      )
      if (res.success) {
        setName(formData.get('name')?.valueOf() as string)
        setEmail(formData.get('email')?.valueOf() as string)
      }
    }
  }
  const getCountUltimate = () => {
    const plan = plans.find((pl: any) => pl.name == 'Ultimate')
    const profs = profiles.filter((p: any) => p.planId == plan.id)
    console.log(plan)
    return profs
  }
  const getCountStandard = () => {
    const plan = plans.find((pl: any) => pl.name == 'Standard')
    const profs = profiles.filter((p: any) => p.planId == plan.id)
    return profs
  }
  const getCountBasic = () => {
    const plan = plans.find((pl: any) => pl.name == 'Basic')
    const profs = profiles.filter((p: any) => p.planId == plan.id)
    return profs
  }
  const getCountPremium = () => {
    const plan = plans.find((pl: any) => pl.name == 'Premium')
    const profs = profiles.filter((p: any) => p.planId == plan.id)
    return profs
  }
  function getThisMonthJoinPercentage(users: Profile[]): number {
    if (users.length === 0) return 0

    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() // 0–11

    let thisMonthCount = 0

    for (const user of users) {
      const d = new Date(user.createdAt)
      if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
        thisMonthCount++
      }
    }

    return Number(((thisMonthCount / users.length) * 100).toFixed(2))
  }
  return (
    <section className="bg-background space-y-8 h-screen py-6 px-4 lg:px-8">
      <div className="space-y-4 lg:flex lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Administre seus usuários e planos aqui.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
            <Card className="px-4  lg:space-y-2">
              <form
                id="edit-form"
                action={updateHanlder}
                className="flex items-center space-y-2 space-x-2"
              >
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder={name || adminUser.username}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="text"
                    placeholder={email || adminUser.email}
                  />
                </div>
              </form>
              <div>
                <Button form="edit-form" className="w-full" type="submit">
                  Editar
                </Button>
              </div>
            </Card>
            <InfoCard
              w="w-full lg:w-1/2 "
              icon={Users}
              label="Total de Usuários"
              monthlyPercentage={getThisMonthJoinPercentage(profiles as any)}
              value={profiles.length}
            />
          </div>
        </div>
        <div className="lg:gap-y-4 gap-y-4 flex-col lg:flex-row flex lg:items-center lg:gap-x-4 ">
          <CalculationTemplateInfoCard
            calculationTemplate={calculationTemplate}
            label="Template de Cálculo"
            w="w-full lg:w-2/3"
          />
          <div className="grid grid-cols-1 gap-y-3 lg:w-1/3">
            <InfoCard
              w="w-full"
              color="text-blue-500"
              icon={Badge}
              label="Usuários Basic"
              monthlyPercentage={getThisMonthJoinPercentage(getCountBasic())}
              value={getCountBasic().length}
            />
            <InfoCard
              w="w-full"
              color="text-yellow-500"
              icon={Award}
              label="Usuários Standard"
              monthlyPercentage={getThisMonthJoinPercentage(getCountStandard())}
              value={getCountStandard().length}
            />
            <InfoCard
              w="w-full"
              color="text-yellow-800"
              icon={Shield}
              label="Usuários Premium"
              monthlyPercentage={getThisMonthJoinPercentage(getCountPremium())}
              value={getCountPremium().length}
            />
            <InfoCard
              w="w-full"
              color="text-orange-500"
              icon={Gem}
              label="Usuários Ultimate"
              monthlyPercentage={getThisMonthJoinPercentage(getCountUltimate())}
              value={getCountUltimate().length}
            />
            <div>
              <PlanRulesTable plans={planRules} />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold">Usuários Registrados</h1>
        </div>
        <div>
          <ProfilesTable plans={plans} profiles={profiles} />
        </div>
      </div>
    </section>
  )
}
