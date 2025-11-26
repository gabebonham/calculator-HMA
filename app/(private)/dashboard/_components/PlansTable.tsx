'use client'

import { Plan } from '@/app/models/plan.entity'
import { Profile } from '@/app/models/profile.entity'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
interface Props {
  plans: Plan[]
}
type Period = 'monthly' | 'semiannual' | 'yearly' | 'lifetime'
export default function PlansTable({ plans }: Props) {
  const mapPeriod = (period: Period) => {
    if (period == 'monthly') return 'Mensal'
    else if (period == 'semiannual') return 'Semestral'
    else if (period == 'yearly') return 'Anual'
    else if (period == 'lifetime') return 'Vitalício'
    else return 'NDA'
  }
  return (
    <div className="border-1 border-muted-foreground rounded-2xl px-3 py-1 max-h-96 overflow-y-auto">
      <Table>
        <TableCaption>Lista de seus planos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Cor Fundo</TableHead>
            <TableHead>Cor Texto</TableHead>
            <TableHead className="text-center">Preço</TableHead>
            <TableHead className="text-center ">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans &&
            plans.map((plan) => (
              <TableRow key={plan.id} className="text-muted-foreground">
                <TableCell className="font-medium">{plan.id}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{mapPeriod(plan.period)}</TableCell>
                <TableCell>{plan.bgcolor}</TableCell>
                <TableCell>{plan.color}</TableCell>
                <TableCell>R$: {plan.price}</TableCell>
                <TableCell className="text-right">
                  <Button variant={'default'}>Editar</Button>
                  <Button variant={'destructive'}>Deletar</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
