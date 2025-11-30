'use client'

import { PlanRules } from '@/app/models/plan-rules'
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
import CreatePlanModal from './modals/CreatePlanModal'
import EditPlanModal from './modals/EditPlanModal'
import DeletePlanModal from './modals/DeletePlanModal'
interface Props {
  plans: PlanRules[]
}
export default function PlanRulesTable({ plans }: Props) {
  return (
    <div
      className="border-1 border-muted-foreground/50 rounded-2xl px-3 py-2 max-h-62  overflow-y-scroll 
      scrollbar  scrollbar-none
    hover:scrollbar-thin

    scrollbar-thumb-transparent
    hover:scrollbar-thumb-gray-500

    scrollbar-track-transparent
    hover:scrollbar-track-transparent

    transition-all duration-200 "
    >
      <Table>
        <TableHeader>
          {' '}
          <TableCaption className="w-full flex justify-start">
            <CreatePlanModal />
          </TableCaption>
          <TableRow>
            <TableHead>Cálculo</TableHead>
            <TableHead>Pár</TableHead>
            <TableHead className="">Pip</TableHead>
            <TableHead className="">Refer</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Deletar</TableHead>
            <TableHead>Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plans &&
            plans.map((plan) => (
              <TableRow key={plan.id} className="text-muted-foreground">
                <TableCell>{plan.calc}</TableCell>
                <TableCell>{plan.pair}</TableCell>
                <TableCell>{plan.pipFactor}</TableCell>
                <TableCell>{plan.refer}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(plan.createdAt),
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <DeletePlanModal id={plan.id} />
                </TableCell>
                <TableCell className="text-right">
                  <EditPlanModal plan={plan} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
