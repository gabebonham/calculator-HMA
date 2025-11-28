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
interface Props {
  calculationTemplate: any
  profiles: any[]
  adminProfile: any
}
export default function DashboardAdmin({
  calculationTemplate,
  profiles,
  adminProfile,
}: Props) {
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
            <Card className="px-4 lg:space-y-2 lg:w-1/2">
              <div className="flex items-center space-x-2">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input placeholder={adminProfile.name} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder={adminProfile.email} />
                </div>
              </div>
              <div>
                <Button className="w-full">Editar</Button>
              </div>
            </Card>
            <InfoCard
              w="w-full lg:w-1/2 "
              icon={Users}
              label="Total de Usuários"
              monthlyPercentage={23}
              value={423}
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
              monthlyPercentage={23}
              value={40}
            />
            <InfoCard
              w="w-full"
              color="text-yellow-500"
              icon={Award}
              label="Usuários Standard"
              monthlyPercentage={18}
              value={32}
            />
            <InfoCard
              w="w-full"
              color="text-yellow-800"
              icon={Shield}
              label="Usuários Premium"
              monthlyPercentage={3}
              value={12}
            />
            <InfoCard
              w="w-full"
              color="text-orange-500"
              icon={Gem}
              label="Usuários Ultimate"
              monthlyPercentage={-5}
              value={3}
            />
          </div>
        </div>
      </div>
      <div className="py-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold">Usuários Registrados</h1>
        </div>
        <div>
          <ProfilesTable profiles={profiles} />
        </div>
      </div>
    </section>
  )
}
