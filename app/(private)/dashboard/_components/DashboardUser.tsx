'use client'

import { Profile } from '@/app/models/profile.entity'
import { Button } from '@/components/ui/button'
import CalculationsTable from './CalculationsTable'
import { Calculation } from '@/app/models/calculation.entity'
import Link from 'next/link'
import UserLicensesCard from './UserPlansCard'
import { Plan } from '@/app/models/plan.entity'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { toast } from 'sonner'
import { updateUser } from '@/app/actions/users.actions'

interface Props {
  profile: any
  user: any
  plans: any[]
  calculations: any[]
  calculationActRes: any[]
  plan: string
}
export default function DashboardUser({
  profile,
  user,
  plans,
  calculations,
  calculationActRes,
  plan,
}: Props) {
  const [name, setName] = useState<string>(profile.username)
  const [email, setEmail] = useState<string>(profile.email)
  const updateHanlder = async (formData: FormData) => {
    if (formData.get('name') || formData.get('email')) {
      const res = await updateUser(
        user.id,
        (formData.get('email') as string) || email,
        (formData.get('name') as string) || name,
      )
      if (res.success) {
        setName(formData.get('name')?.valueOf() as string)
        setEmail(formData.get('email')?.valueOf() as string)
      }
    }
  }
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
          <form
            id="edit-form"
            action={updateHanlder}
            className="flex items-center space-x-2"
          >
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                name="name"
                type="text"
                placeholder={name || profile.username}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="text"
                placeholder={email || profile.email}
              />
            </div>
          </form>
          <div>
            <Button form="edit-form" className="w-full" type="submit">
              Editar
            </Button>
          </div>
        </Card>
      </div>
      <div className="flex lg:flex-row flex-col gap-y-4 items-center gap-x-4">
        <div className="lg:w-full">
          <UserLicensesCard plans={plans} profile={profile} plan={plan} />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <h1 className="font-bold text-xl">Seus Calculos Recentes</h1>
        </div>
        <div>
          <CalculationsTable calculations={calculationActRes} />
        </div>
      </div>
    </section>
  )
}
